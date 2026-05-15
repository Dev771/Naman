'use client';

/**
 * AmbientAudioContext
 *
 * Manages a single <audio> element for the whole app.
 * Hero sections register/unregister themselves; as long as at least
 * one registered section is visible the music plays.  Volume is always
 * ramped smoothly so transitions feel cinematic, never jarring.
 *
 * Browser autoplay policy: audio is only started after the first user
 * gesture anywhere on the page (click / keydown / touchstart).
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

const AUDIO_SRC =
  '/freesound_community-birds-singing-in-and-leaves-rustling-with-the-wind-14557.mp3.mpeg';

const FADE_DURATION = 1400; // ms
const TARGET_VOLUME = 1.00; // 80 % — immersive but not intrusive
const TICK_MS = 16;   // ~60 fps ramp steps

interface AmbientAudioCtx {
  /** True if the user has toggled mute on */
  muted: boolean;
  toggleMute: () => void;
  /** Called by each hero section's IntersectionObserver */
  setHeroVisible: (key: string, visible: boolean) => void;
}

const Ctx = createContext<AmbientAudioCtx>({
  muted: false,
  toggleMute: () => { },
  setHeroVisible: () => { },
});

export function useAmbientAudio() {
  return useContext(Ctx);
}

export function AmbientAudioProvider({ children }: { children: React.ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const visibleKeys = useRef<Set<string>>(new Set());
  const unlockedRef = useRef(false);      // has user gesture occurred?
  const wantsPlay = useRef(false);      // should audio be playing right now?

  const [muted, setMuted] = useState(false);
  const mutedRef = useRef(false);

  /* ── audio element (created once, client-side) ─────────────────────── */
  useEffect(() => {
    const audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;
    return () => { audio.pause(); audio.src = ''; };
  }, []);

  /* ── unlock on first user gesture ──────────────────────────────────── */
  useEffect(() => {
    const unlock = () => {
      if (unlockedRef.current) return;
      unlockedRef.current = true;
      // If a hero was already visible before the gesture, start playing now
      if (wantsPlay.current && !mutedRef.current) {
        fadeIn();
      }
    };
    window.addEventListener('click', unlock, { once: true });
    window.addEventListener('keydown', unlock, { once: true });
    window.addEventListener('touchstart', unlock, { once: true, passive: true });
    return () => {
      window.removeEventListener('click', unlock);
      window.removeEventListener('keydown', unlock);
      window.removeEventListener('touchstart', unlock);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── volume ramp helpers ────────────────────────────────────────────── */
  const clearFade = () => {
    if (fadeTimer.current) { clearInterval(fadeTimer.current); fadeTimer.current = null; }
  };

  const fadeIn = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    clearFade();
    audio.play().catch(() => {/* autoplay blocked — user gesture pending */ });
    const step = (TARGET_VOLUME / (FADE_DURATION / TICK_MS));
    fadeTimer.current = setInterval(() => {
      if (!audioRef.current) { clearFade(); return; }
      const next = Math.min(audioRef.current.volume + step, TARGET_VOLUME);
      audioRef.current.volume = next;
      if (next >= TARGET_VOLUME) clearFade();
    }, TICK_MS);
  }, []);

  const fadeOut = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    clearFade();
    const step = (audio.volume / (FADE_DURATION / TICK_MS));
    fadeTimer.current = setInterval(() => {
      if (!audioRef.current) { clearFade(); return; }
      const next = Math.max(audioRef.current.volume - step, 0);
      audioRef.current.volume = next;
      if (next <= 0) {
        audioRef.current.pause();
        clearFade();
      }
    }, TICK_MS);
  }, []);

  /* ── public API ─────────────────────────────────────────────────────── */
  const setHeroVisible = useCallback((key: string, visible: boolean) => {
    if (visible) {
      visibleKeys.current.add(key);
    } else {
      visibleKeys.current.delete(key);
    }

    const anyVisible = visibleKeys.current.size > 0;
    wantsPlay.current = anyVisible;

    if (anyVisible && !mutedRef.current) {
      if (unlockedRef.current) fadeIn();
      // else: will fire once user unlocks (see unlock handler above)
    } else {
      fadeOut();
    }
  }, [fadeIn, fadeOut]);

  const toggleMute = useCallback(() => {
    setMuted(prev => {
      const next = !prev;
      mutedRef.current = next;
      if (next) {
        fadeOut();
      } else if (wantsPlay.current && unlockedRef.current) {
        fadeIn();
      }
      return next;
    });
  }, [fadeIn, fadeOut]);

  return (
    <Ctx.Provider value={{ muted, toggleMute, setHeroVisible }}>
      {children}
    </Ctx.Provider>
  );
}

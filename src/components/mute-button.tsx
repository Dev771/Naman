'use client';

/**
 * MuteButton — subtle ambient audio toggle.
 * Floats in the bottom-right corner of whichever hero section renders it.
 * Uses a waveform / mute icon with a smooth opacity transition.
 */

import { useAmbientAudio } from '@/lib/ambient-audio';

export function MuteButton() {
  const { muted, toggleMute } = useAmbientAudio();

  return (
    <button
      onClick={toggleMute}
      aria-label={muted ? 'Unmute ambient music' : 'Mute ambient music'}
      title={muted ? 'Unmute ambient music' : 'Mute ambient music'}
      className="group flex items-center gap-2 rounded-full border border-ink/10 bg-bg-tint1/70 px-3 py-2 text-[12px] font-medium text-ink/60 backdrop-blur-sm transition-all duration-300 hover:border-ink/20 hover:bg-bg-tint1 hover:text-ink/90 hover:shadow-sm"
    >
      {muted ? <MutedIcon /> : <SoundIcon />}
      <span className="select-none">{muted ? 'Muted' : 'Ambient'}</span>
    </button>
  );
}

function SoundIcon() {
  return (
    <span className="flex items-end gap-[3px] h-[14px]">
      <span className="w-[3px] rounded-full bg-current animate-bar-1" style={{ height: '6px' }} />
      <span className="w-[3px] rounded-full bg-current animate-bar-2" style={{ height: '10px' }} />
      <span className="w-[3px] rounded-full bg-current animate-bar-3" style={{ height: '14px' }} />
      <span className="w-[3px] rounded-full bg-current animate-bar-2" style={{ height: '10px' }} />
      <span className="w-[3px] rounded-full bg-current animate-bar-1" style={{ height: '6px' }} />
    </span>
  );
}

function MutedIcon() {
  return (
    <span className="flex items-end gap-[3px] h-[14px] opacity-40">
      <span className="w-[3px] rounded-full bg-current" style={{ height: '6px' }} />
      <span className="w-[3px] rounded-full bg-current" style={{ height: '6px' }} />
      <span className="w-[3px] rounded-full bg-current" style={{ height: '6px' }} />
      <span className="w-[3px] rounded-full bg-current" style={{ height: '6px' }} />
      <span className="w-[3px] rounded-full bg-current" style={{ height: '6px' }} />
    </span>
  );
}

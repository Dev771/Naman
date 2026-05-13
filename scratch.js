const https = require('https');
const urls = [
  'I1_wusezc.png','I2_r5pnab.png','I3_txwsud.png','I4_nfed2v.png',
  'I5_zadikn.png','I6_izqmxl.png','I7_rjd4nd.png','I8_bsyxk8.png',
  'I9_vv9zci.png','I10_nuiy8c.png','I11_fjejcg.png','I12_k9zvfo.png',
  'I13_tqbt26.png','I14_zbrx5l.png','I15_bsbmqh.png','I16_ercic9.png','I17_wiljma.png'
].map(p=>'https://res.cloudinary.com/duqqte7b4/image/upload/fl_getinfo/v1777222162/'+p);

Promise.all(urls.map(u => new Promise(r => https.get(u, res => {
  let d=''; res.on('data', c=>d+=c); res.on('end', ()=>r(JSON.parse(d)));
})))).then(res => console.log(res.map((r,i) => `I${i+1}: ${r.output.width}x${r.output.height} (AR: ${(r.output.width/r.output.height).toFixed(2)})`).join('\n')));

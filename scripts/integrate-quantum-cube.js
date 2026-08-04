const fs=require('fs');
const path='index.html';
let html=fs.readFileSync(path,'utf8');

const style=`
/* Umbracore quantum cube integration */
.hero{isolation:isolate}
#quantumRain{position:absolute;inset:0;width:100%;height:100%;z-index:1;pointer-events:none;mix-blend-mode:screen}
.visual.quantum-ready{position:relative;min-height:500px;z-index:3}
#quantumCube{display:block;width:100%;height:100%;min-height:500px;touch-action:none;cursor:grab;outline:none}
#quantumCube:active{cursor:grabbing}
#quantumCube:focus-visible{outline:3px solid var(--p2);outline-offset:5px;border-radius:18px}
.cubeFallback{width:min(440px,88%);aspect-ratio:1;display:grid;place-items:center}
.cubeFallback img{width:100%;height:100%;object-fit:contain}
.hero h1,.hero .eyebrow,.hero .lead,.head h2,.head p,.panel h3,.panel p,.method h3,.method p,.industry h3,.industry p,.standard{ text-shadow:0 2px 4px rgba(0,0,0,.88),0 0 18px rgba(5,3,8,.8)}
html[data-theme="light"] .hero h1,html[data-theme="light"] .hero .eyebrow,html[data-theme="light"] .hero .lead,html[data-theme="light"] .head h2,html[data-theme="light"] .head p,html[data-theme="light"] .panel h3,html[data-theme="light"] .panel p,html[data-theme="light"] .method h3,html[data-theme="light"] .method p,html[data-theme="light"] .industry h3,html[data-theme="light"] .industry p,html[data-theme="light"] .standard{text-shadow:0 1px 2px rgba(255,255,255,.95),0 0 12px rgba(255,255,255,.8)}
@media(max-width:620px){.visual.quantum-ready,#quantumCube{min-height:370px}}
@media(prefers-reduced-motion:reduce){#quantumRain{opacity:.45}}
`;

if(!html.includes('/* Umbracore quantum cube integration */')){
  html=html.replace('</style>',style+'\n</style>');
}

if(!html.includes('assets/quantum-cube.js')){
  html=html.replace('</body>','<script src="assets/quantum-cube.js" defer></script>\n</body>');
}

html=html.replace('<div class="visual">','<div class="visual quantum-ready">');
fs.writeFileSync(path,html);

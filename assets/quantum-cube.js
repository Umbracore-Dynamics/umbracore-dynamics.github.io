(()=>{
'use strict';
const ready=fn=>document.readyState==='loading'?document.addEventListener('DOMContentLoaded',fn,{once:true}):fn();
ready(()=>{
  const hero=document.querySelector('.hero');
  const visual=document.querySelector('.visual');
  const legacy=document.getElementById('rain');
  if(!hero||!visual)return;
  if(legacy)legacy.style.display='none';

  const rain=document.createElement('canvas');
  rain.id='quantumRain';
  rain.setAttribute('aria-hidden','true');
  hero.prepend(rain);

  visual.innerHTML='';
  const cube=document.createElement('canvas');
  cube.id='quantumCube';
  cube.tabIndex=0;
  cube.setAttribute('role','img');
  cube.setAttribute('aria-label','Interactive three-dimensional Umbracore Dynamics values cube. Drag with mouse or touch to rotate.');
  visual.appendChild(cube);

  const rctx=rain.getContext('2d');
  const BINARY=['0','1'];
  const HEBREW=['א','ב','ג','ד','ה','ו','ז','ח','ט','י','כ','ל','מ','נ','ס','ע','פ','צ','ק','ר','ש','ת'];
  const JAPANESE=['ア','イ','ウ','エ','オ','カ','キ','ク','ケ','コ','サ','シ','ス','セ','ソ','タ','チ','ツ','テ','ト'];
  const CHINESE=['安','全','信','頼','守','護','強','靭','未','来','知','能','防','御','監','視','連','携','整','合'];
  const GREEK=['Α','Β','Γ','Δ','Ε','Ζ','Η','Θ','Ι','Κ','Λ','Μ','Ν','Ξ','Ο','Π','Ρ','Σ','Τ','Υ','Φ','Χ','Ψ','Ω'];
  const DEVANAGARI=['अ','आ','इ','ई','उ','ऊ','ऋ','ए','ऐ','ओ','औ','क','ख','ग','घ','च','ज','ट','ड','त','द','न','प','ब','म','य','र','ल','व','श','ष','स','ह'];
  const MONEY=['$','€','£','¥','₩','₹','₿','¢','₽','₺','₴','₦','₱','₪'];
  const scripts=[HEBREW,JAPANESE,CHINESE,GREEK,DEVANAGARI,MONEY];
  const glyph=(seed)=>{
    const n=Math.abs((Math.sin(seed*12.9898)*43758.5453)%1);
    if(n<.72)return BINARY[Math.floor(n*1000)%2];
    const group=scripts[Math.min(scripts.length-1,Math.floor((n-.72)/.28*scripts.length))];
    return group[Math.floor(n*1000)%group.length];
  };

  let streams=[];
  let speedFactor=1;
  let targetFactor=1;
  function makeStream(x,layer){
    const tier=Math.random();
    const base=tier<.28?1.45+Math.random()*1.1:tier<.72?.58+Math.random()*.66:.2+Math.random()*.3;
    return{x,y:-Math.random()*hero.clientHeight,speed:base*(layer===0?1:layer===1?.78:.56),length:14+Math.floor(Math.random()*18),phase:Math.floor(Math.random()*997),alpha:(layer===0?.17:layer===1?.12:.075)+Math.random()*.05,changeRate:260+Math.random()*520,fontSize:layer===0?17+Math.floor(Math.random()*3):layer===1?15+Math.floor(Math.random()*2):13+Math.floor(Math.random()*2),fontWeight:layer===0?(Math.random()<.58?800:700):layer===1?(Math.random()<.42?700:600):(Math.random()<.28?600:500),rowGap:layer===0?23:layer===1?21:19,layer};
  }
  function resizeRain(){
    const dpr=Math.min(devicePixelRatio||1,3);
    const rect=hero.getBoundingClientRect();
    rain.width=Math.max(1,Math.round(rect.width*dpr));
    rain.height=Math.max(1,Math.round(rect.height*dpr));
    rain.style.width=rect.width+'px';rain.style.height=rect.height+'px';
    rctx.setTransform(dpr,0,0,dpr,0,0);
    streams=[];
    [20,28,38].forEach((spacing,layer)=>{
      const count=Math.ceil(rect.width/spacing)+2;
      const offset=layer?spacing/2:0;
      for(let i=0;i<count;i++)streams.push(makeStream(i*spacing+offset,layer));
    });
  }
  function drawRain(now){
    speedFactor+=(targetFactor-speedFactor)*.055;
    const w=rain.clientWidth,h=rain.clientHeight;
    rctx.fillStyle='rgba(5,3,8,.22)';rctx.fillRect(0,0,w,h);rctx.textAlign='center';rctx.shadowBlur=0;
    for(let s=0;s<streams.length;s++){
      const col=streams[s];
      const tick=Math.floor(now/col.changeRate);
      rctx.font=`${col.fontWeight} ${col.fontSize}px ui-monospace,"Noto Sans Hebrew","Noto Sans JP","Noto Sans SC","Noto Sans Devanagari",Consolas,monospace`;
      for(let i=0;i<col.length;i++){
        const y=col.y-i*col.rowGap;if(y<-30||y>h+30)continue;
        const fade=Math.max(.1,1-i/col.length);
        const char=glyph(col.phase+s*3+i*5+tick);
        const head=i===0;
        const a=head?Math.min(.62,col.alpha*fade*2.8):col.layer===0?Math.min(.44,col.alpha*fade*2.1):col.layer===1?Math.min(.31,col.alpha*fade*1.65):Math.min(.22,col.alpha*fade*1.25);
        rctx.fillStyle=head?`rgba(205,184,255,${a})`:`rgba(139,92,246,${a})`;
        rctx.fillText(char,Math.round(col.x),Math.round(y));
      }
      col.y+=col.speed*speedFactor;
      if(col.y-col.length*col.rowGap>h+40){col.y=-Math.random()*h*.18;col.phase=Math.floor(Math.random()*997)}
    }
    requestAnimationFrame(drawRain);
  }

  const gl=cube.getContext('webgl',{alpha:true,antialias:true});
  if(!gl){visual.innerHTML='<div class="cubeFallback"><img src="assets/umbracore-cube-logo.svg" alt="Umbracore Dynamics"></div>';resizeRain();requestAnimationFrame(drawRain);return;}
  const vs='attribute vec3 aPosition;attribute vec2 aTexCoord;uniform mat4 uMVP;varying vec2 vTexCoord;void main(){gl_Position=uMVP*vec4(aPosition,1.0);vTexCoord=aTexCoord;}';
  const fs='precision mediump float;varying vec2 vTexCoord;uniform sampler2D uTexture;void main(){gl_FragColor=texture2D(uTexture,vTexCoord);}';
  const shader=(type,src)=>{const s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(s));return s};
  const program=gl.createProgram();gl.attachShader(program,shader(gl.VERTEX_SHADER,vs));gl.attachShader(program,shader(gl.FRAGMENT_SHADER,fs));gl.linkProgram(program);gl.useProgram(program);
  const faces=[
    {p:[-1,-1,1,1,-1,1,1,1,1,-1,1,1],label:'logo'},
    {p:[1,-1,1,1,-1,-1,1,1,-1,1,1,1],label:'Integrity · Rigor'},
    {p:[1,-1,-1,-1,-1,-1,-1,1,-1,1,1,-1],label:'Confidentiality · Discipline'},
    {p:[-1,-1,-1,-1,-1,1,-1,1,1,-1,1,-1],label:'Availability · Consistency'},
    {p:[-1,1,1,1,1,1,1,1,-1,-1,1,-1],label:'Excellence · Commitment'},
    {p:[-1,-1,-1,1,-1,-1,1,-1,1,-1,-1,1],label:'Resilience · Trust'}
  ];
  const uv=[0,1,1,1,1,0,0,0],idx=[0,1,2,0,2,3];
  const texture=(source)=>{const t=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,t);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,source);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);return t};
  function valueCanvas(label){const c=document.createElement('canvas');c.width=c.height=512;const x=c.getContext('2d');const g=x.createLinearGradient(0,0,512,512);g.addColorStop(0,'#151022');g.addColorStop(1,'#07030d');x.fillStyle=g;x.fillRect(0,0,512,512);x.strokeStyle='rgba(165,110,255,.58)';x.lineWidth=4;x.strokeRect(8,8,496,496);x.strokeStyle='rgba(165,110,255,.12)';x.lineWidth=2;x.strokeRect(28,28,456,456);const parts=label.split(' · ');x.textAlign='center';x.textBaseline='middle';x.fillStyle='#f8f5ff';x.font='760 33px Inter,Arial,sans-serif';x.fillText(parts[0].toUpperCase(),256,238);x.strokeStyle='rgba(165,110,255,.2)';x.beginPath();x.moveTo(150,270);x.lineTo(362,270);x.stroke();x.fillStyle='rgba(184,172,199,.94)';x.font='700 28px Inter,Arial,sans-serif';x.fillText(parts[1].toUpperCase(),256,315);return c;}
  const img=new Image();img.src='assets/umbracore-cube-logo.svg';
  let meshes=[];
  img.onload=()=>{
    meshes=faces.map(f=>{const p=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,p);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(f.p),gl.STATIC_DRAW);const u=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,u);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(uv),gl.STATIC_DRAW);const e=gl.createBuffer();gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,e);gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(idx),gl.STATIC_DRAW);return{p,u,e,t:texture(f.label==='logo'?img:valueCanvas(f.label))}});
    resizeAll();requestAnimationFrame(drawRain);requestAnimationFrame(render);
  };
  const ap=gl.getAttribLocation(program,'aPosition'),at=gl.getAttribLocation(program,'aTexCoord'),um=gl.getUniformLocation(program,'uMVP');
  const mul=(a,b)=>{const o=new Float32Array(16);for(let r=0;r<4;r++)for(let c=0;c<4;c++)o[c*4+r]=a[r]*b[c*4]+a[4+r]*b[c*4+1]+a[8+r]*b[c*4+2]+a[12+r]*b[c*4+3];return o};
  const persp=(fovy,aspect,n,f)=>{const q=1/Math.tan(fovy/2),nf=1/(n-f);return new Float32Array([q/aspect,0,0,0,0,q,0,0,0,0,(f+n)*nf,-1,0,0,2*f*n*nf,0])};
  const trans=(x,y,z)=>new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,x,y,z,1]);
  const rxm=a=>{const c=Math.cos(a),s=Math.sin(a);return new Float32Array([1,0,0,0,0,c,s,0,0,-s,c,0,0,0,0,1])};
  const rym=a=>{const c=Math.cos(a),s=Math.sin(a);return new Float32Array([c,0,-s,0,0,1,0,0,s,0,c,0,0,0,0,1])};
  let rx=-.35,ry=.58,trx=rx,tryy=ry,drag=false,lx=0,ly=0,resumeAt=0;
  function resizeCube(){const dpr=Math.min(devicePixelRatio||1,2);const rect=visual.getBoundingClientRect();cube.width=Math.max(1,Math.round(rect.width*dpr));cube.height=Math.max(1,Math.round(rect.height*dpr));cube.style.width=rect.width+'px';cube.style.height=rect.height+'px';gl.viewport(0,0,cube.width,cube.height)}
  function resizeAll(){resizeRain();resizeCube()}
  function render(now){if(!drag){if(now>resumeAt)tryy+=.0045;rx+=(trx-rx)*.1;ry+=(tryy-ry)*.1}gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);gl.enable(gl.DEPTH_TEST);gl.enable(gl.CULL_FACE);gl.cullFace(gl.BACK);const p=persp(Math.PI/4,cube.width/cube.height,.1,100),t=trans(0,0,-5.2),m=mul(rym(ry),rxm(rx)),mvp=mul(p,mul(t,m));gl.uniformMatrix4fv(um,false,mvp);for(const o of meshes){gl.bindBuffer(gl.ARRAY_BUFFER,o.p);gl.enableVertexAttribArray(ap);gl.vertexAttribPointer(ap,3,gl.FLOAT,false,0,0);gl.bindBuffer(gl.ARRAY_BUFFER,o.u);gl.enableVertexAttribArray(at);gl.vertexAttribPointer(at,2,gl.FLOAT,false,0,0);gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,o.e);gl.bindTexture(gl.TEXTURE_2D,o.t);gl.drawElements(gl.TRIANGLES,6,gl.UNSIGNED_SHORT,0)}requestAnimationFrame(render)}
  function overCube(e){const r=cube.getBoundingClientRect(),x=(e.clientX-r.left-r.width/2)/(Math.min(r.width*.34,250)),y=(e.clientY-r.top-r.height/2)/(Math.min(r.height*.4,250));return x*x+y*y<=1}
  cube.addEventListener('pointermove',e=>{const over=overCube(e);targetFactor=over?.24:1;if(!drag)return;tryy+=(e.clientX-lx)*.009;trx=Math.max(-1.25,Math.min(1.25,trx+(e.clientY-ly)*.009));lx=e.clientX;ly=e.clientY});
  cube.addEventListener('pointerdown',e=>{if(!overCube(e))return;drag=true;targetFactor=.16;cube.setPointerCapture(e.pointerId);lx=e.clientX;ly=e.clientY});
  const release=e=>{drag=false;resumeAt=performance.now()+800;targetFactor=e&&overCube(e)?.24:1};
  cube.addEventListener('pointerup',release);cube.addEventListener('pointercancel',release);cube.addEventListener('pointerleave',()=>{if(!drag)targetFactor=1});
  addEventListener('resize',resizeAll,{passive:true});
});
})();

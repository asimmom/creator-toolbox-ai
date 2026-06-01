function copyText(id){const el=document.getElementById(id);const text=el.innerText||el.value||'';navigator.clipboard.writeText(text).then(()=>alert('Copied!'));}
function randomFrom(arr){return arr[Math.floor(Math.random()*arr.length)];}
function generatePrompt(){
  const topic=document.getElementById('topic').value.trim()||'mysterious story';
  const style=document.getElementById('style').value;
  const ratio=document.getElementById('ratio').value;
  const mood=document.getElementById('mood').value;
  const details=document.getElementById('details').value.trim();
  const camera=randomFrom(['slow cinematic push-in','wide establishing shot','dramatic low angle','close-up emotional shot','over-the-shoulder view']);
  const light=randomFrom(['volumetric lighting','soft film lighting','moonlit atmosphere','golden hour glow','dramatic rim light']);
  const prompt=`${style} ${ratio} image prompt:\n\n${topic}. ${details ? details + '. ' : ''}${mood} mood, ${camera}, ${light}, ultra-detailed, sharp focus, professional composition, cinematic depth of field, realistic textures, high quality, no text, no watermark.\n\nNegative prompt: blurry, low quality, distorted face, extra fingers, bad anatomy, text, watermark, logo, duplicate subject.`;
  document.getElementById('output').innerText=prompt;
}
function generateScript(){
  const topic=document.getElementById('scriptTopic').value.trim()||'a strange mystery story';
  const niche=document.getElementById('niche').value;
  const length=document.getElementById('length').value;
  const tone=document.getElementById('tone').value;
  const hook=randomFrom([
    `Most people have never heard about ${topic}...`,
    `This sounds fake, but ${topic} is real.`,
    `What happened with ${topic} still feels impossible.`,
    `In just a few seconds, you will understand why ${topic} is so shocking.`
  ]);
  const script=`HOOK:\n${hook}\n\nVOICEOVER SCRIPT (${length}, ${tone}, ${niche}):\n${topic} started like something ordinary, but one detail changed everything. People noticed the signs, ignored the warnings, and only later realized how strange the story really was. The most shocking part is not what happened first — it is what happened after. And that is why ${topic} still grabs attention today.\n\nTITLE IDEAS:\n1. The Truth About ${topic}\n2. This Story Still Feels Impossible\n3. The Strange Mystery People Still Talk About\n\nDESCRIPTION:\nDiscover the strange story of ${topic}. A short, cinematic video made for curious viewers who love mysteries, facts, history, and unbelievable true stories.\n\nHASHTAGS:\n#Shorts #DidYouKnow #Mystery #Facts #ViralShorts\n\nTAGS:\n${topic}, ${niche}, youtube shorts, viral shorts, facts, mystery, story video, faceless video, AI video, short video`;
  document.getElementById('scriptOutput').innerText=script;
}
let uploadedImage=null;
function handleImage(e){const file=e.target.files[0];if(!file)return;const img=new Image();img.onload=()=>{uploadedImage=img;drawResized();};img.src=URL.createObjectURL(file);}
function drawResized(){
  if(!uploadedImage)return alert('Please upload an image first.');
  const preset=document.getElementById('preset').value.split('x');
  const w=parseInt(preset[0],10),h=parseInt(preset[1],10);
  const mode=document.getElementById('fitMode').value;
  const canvas=document.getElementById('resizeCanvas');
  const ctx=canvas.getContext('2d');
  canvas.width=w;canvas.height=h;
  ctx.fillStyle='#0b0d14';ctx.fillRect(0,0,w,h);
  const iw=uploadedImage.width, ih=uploadedImage.height;
  let scale=mode==='cover'?Math.max(w/iw,h/ih):Math.min(w/iw,h/ih);
  const nw=iw*scale, nh=ih*scale;
  const x=(w-nw)/2, y=(h-nh)/2;
  ctx.drawImage(uploadedImage,x,y,nw,nh);
  const link=document.getElementById('downloadImage');
  link.href=canvas.toDataURL('image/png');
  link.download='resized-image.png';
  link.style.display='inline-flex';
}

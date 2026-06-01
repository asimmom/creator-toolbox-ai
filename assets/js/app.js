function $(id){return document.getElementById(id)}
function copyText(id){const el=$(id); const text=el.innerText || el.value || ''; navigator.clipboard.writeText(text).then(()=>alert('Copied!')).catch(()=>alert('Could not copy. Select the text and copy manually.'))}
function downloadText(filename, text){const blob=new Blob([text],{type:'text/plain'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=filename; a.click(); URL.revokeObjectURL(a.href)}
function cleanTopic(t){return (t||'').trim() || 'an interesting story'}
function pickToneWords(tone){const map={cinematic:'cinematic, dramatic, emotional, high detail',scary:'dark, suspenseful, eerie, horror atmosphere',history:'ancient, realistic, historical, documentary style',facts:'clean, educational, modern, curiosity-driven',product:'professional, clean studio lighting, commercial style',motivational:'uplifting, inspiring, emotional, cinematic'};return map[tone]||map.cinematic}
function generatePrompt(){const topic=cleanTopic($('topic').value); const style=$('style').value; const ratio=$('ratio').value; const count=parseInt($('count').value||'5',10); let out=''; for(let i=1;i<=count;i++){out+=`Scene ${i}: ${topic}. ${pickToneWords(style)}. Strong visual storytelling, clear subject, realistic lighting, depth of field, sharp details, professional composition, vertical ${ratio}, no text, no watermark.\n\n`} $('output').innerText=out.trim()}
function generateScript(){const topic=cleanTopic($('topic').value); const tone=$('tone').value; const length=$('length').value; const hook=tone==='scary'?`Something about ${topic} still feels wrong...`:tone==='facts'?`Most people never knew this about ${topic}.`:`What happened with ${topic} is more interesting than it looks.`; const scenes=length==='short'?4:length==='medium'?6:8; let script=`HOOK:\n${hook}\n\nVOICEOVER:\n`; for(let i=1;i<=scenes;i++){script+=`${i}. ${topic} — reveal one powerful detail with a ${tone} feeling. Keep the sentence short, visual, and easy to understand.\n`} script+=`\nENDING CTA:\nFollow for more stories like this.\n\nTITLE IDEAS:\n- The Truth About ${topic}\n- This ${topic} Story Is Hard To Believe\n- What Nobody Told You About ${topic}\n\nHASHTAGS:\n#shorts #viral #story #facts #creator`; $('output').innerText=script}
function generateTitles(){const topic=cleanTopic($('topic').value); const niche=$('niche').value; const titles=[`The Truth About ${topic}`,`This ${topic} Story Is Hard To Believe`,`What Nobody Told You About ${topic}`,`${topic}: The Moment Everything Changed`,`The Strange Story of ${topic}`,`Why ${topic} Is Going Viral`,`The Dark Secret Behind ${topic}`,`I Tried To Understand ${topic}... Then This Happened`,`${topic} Explained in 60 Seconds`,`You Won't Believe This About ${topic}`]; $('output').innerText=`Title ideas for ${niche}:\n\n`+titles.map((t,i)=>`${i+1}. ${t}`).join('\n')}
function generateHashtags(){const topic=cleanTopic($('topic').value).replace(/\s+/g,''); const platform=$('platform').value; const base=['#shorts','#viral','#trending','#fyp','#creator','#video','#story']; const niche={scary:['#scary','#horror','#mystery','#creepy','#darkstory'],facts:['#facts','#didyouknow','#knowledge','#amazingfacts','#learnontiktok'],history:['#history','#ancienthistory','#historystory','#documentary','#legend'],ai:['#ai','#aitools','#aivideo','#facelesschannel','#contentcreator'],money:['#makemoneyonline','#sidehustle','#onlinebusiness','#digitalproducts','#creatorbusiness']}[$('niche').value]||[]; $('output').innerText=`${platform} hashtags:\n\n`+[`#${topic}`,...base,...niche].slice(0,18).join(' ')}
function generateDescription(){const topic=cleanTopic($('topic').value); const niche=$('niche').value; const cta=$('cta').value || 'Subscribe for more videos like this.'; const desc=`Discover this ${niche} video about ${topic}. In this short video, we explore the most interesting details, surprising facts, and powerful moments connected to ${topic}. This content is made for viewers who enjoy fast, visual, and engaging short-form videos.\n\n${cta}\n\nKeywords: ${topic}, ${niche} video, YouTube Shorts, TikTok video, viral short, faceless video, story video, facts video, AI video creator, short-form content\n\nHashtags:\n#shorts #viral #trending #story #facts #contentcreator`; $('output').innerText=desc}
let availableVoices=[];
function voiceLooksFemale(v){const n=(v.name||'').toLowerCase();return /(female|woman|girl|zira|susan|samantha|victoria|karen|moira|tessa|sara|sarah|heera|hazel|helena|sabina|luciana|paulina|thalia|maria|laura|anna|elena|amelie|audrey|yasmin|salma|hoda|mageda)/.test(n)}
function voiceLooksMale(v){const n=(v.name||'').toLowerCase();return /(male|man|boy|david|mark|daniel|george|alex|fred|tom|diego|jorge|paul|joris|thomas|xander|youssef|tarik|naayf|majid)/.test(n)}
function getFilteredVoices(){
  const langEl=$('voiceLanguage'), typeEl=$('voiceType');
  const lang=langEl?langEl.value:'all';
  const type=typeEl?typeEl.value:'any';
  let voices=[...availableVoices];
  if(lang && lang!=='all') voices=voices.filter(v=>(v.lang||'').toLowerCase().startsWith(lang.toLowerCase()));
  if(type==='female'){const f=voices.filter(voiceLooksFemale); if(f.length) voices=f}
  if(type==='male'){const m=voices.filter(voiceLooksMale); if(m.length) voices=m}
  return voices.length?voices:availableVoices;
}
function loadVoices(){
  if(!('speechSynthesis' in window))return;
  const select=$('voice'); if(!select)return;
  availableVoices=speechSynthesis.getVoices()||[];
  select.innerHTML='';
  const filtered=getFilteredVoices();
  filtered.forEach((v,i)=>{
    const opt=document.createElement('option');
    opt.value=availableVoices.indexOf(v);
    const guess=voiceLooksFemale(v)?'Female style':voiceLooksMale(v)?'Male style':'Voice';
    opt.textContent=`${v.name} — ${guess} (${v.lang})`;
    select.appendChild(opt);
  });
  if(filtered.length===0){const opt=document.createElement('option'); opt.textContent='Loading voices...'; select.appendChild(opt)}
}
function applyTonePreset(){
  const preset=$('tonePreset')?.value||'natural';
  const settings={
    natural:{rate:1.00,pitch:1.00,volume:1},
    story:{rate:0.92,pitch:1.02,volume:1},
    scary:{rate:0.78,pitch:0.82,volume:1},
    calm:{rate:0.86,pitch:0.95,volume:1},
    energetic:{rate:1.20,pitch:1.12,volume:1},
    deep:{rate:0.82,pitch:0.70,volume:1},
    soft:{rate:0.94,pitch:1.22,volume:1}
  }[preset]||{rate:1,pitch:1,volume:1};
  if($('rate')) $('rate').value=settings.rate;
  if($('pitch')) $('pitch').value=settings.pitch;
  if($('volume')) $('volume').value=settings.volume;
  updateVoiceNumbers();
}
function updateVoiceNumbers(){['rate','pitch','volume'].forEach(id=>{const el=$(id); const out=$(id+'Val'); if(el&&out) out.textContent=Number(el.value).toFixed(2).replace(/\.00$/,'')})}
function speakText(){
  if(!('speechSynthesis' in window)){alert('Your browser does not support text-to-speech. Try Chrome or Edge.');return}
  speechSynthesis.cancel();
  const text=$('voiceText').value.trim(); if(!text){alert('Paste text first.');return}
  const voices=speechSynthesis.getVoices();
  const utter=new SpeechSynthesisUtterance(text);
  const selected=parseInt($('voice').value||'0',10);
  if(voices[selected]){utter.voice=voices[selected]; utter.lang=voices[selected].lang}
  else if($('voiceLanguage')?.value && $('voiceLanguage').value!=='all'){utter.lang=$('voiceLanguage').value}
  utter.rate=parseFloat($('rate').value);
  utter.pitch=parseFloat($('pitch').value);
  utter.volume=parseFloat($('volume').value);
  utter.onstart=()=>{$('voiceStatus').textContent='Speaking...'};
  utter.onpause=()=>{$('voiceStatus').textContent='Paused.'};
  utter.onresume=()=>{$('voiceStatus').textContent='Speaking...'};
  utter.onend=()=>{$('voiceStatus').textContent='Finished.'};
  utter.onerror=()=>{$('voiceStatus').textContent='Voice playback error. Try another voice or shorter text.'};
  speechSynthesis.speak(utter);
}
function pauseVoice(){if('speechSynthesis' in window){speechSynthesis.pause(); const s=$('voiceStatus'); if(s)s.textContent='Paused.'}}
function resumeVoice(){if('speechSynthesis' in window){speechSynthesis.resume(); const s=$('voiceStatus'); if(s)s.textContent='Speaking...'}}
function stopVoice(){if('speechSynthesis' in window){speechSynthesis.cancel(); const s=$('voiceStatus'); if(s)s.textContent='Stopped.'}}
function setupVoicePage(){
  loadVoices();
  if('speechSynthesis' in window){speechSynthesis.onvoiceschanged=loadVoices}
  ['voiceLanguage','voiceType'].forEach(id=>{const el=$(id); if(el)el.addEventListener('change',loadVoices)});
  const tone=$('tonePreset'); if(tone) tone.addEventListener('change',applyTonePreset);
  ['rate','pitch','volume'].forEach(id=>{const el=$(id); if(el){el.addEventListener('input',updateVoiceNumbers)}});
  updateVoiceNumbers();
}
function setupResizer(){const file=$('imageFile'), canvas=$('canvas'), ctx=canvas?.getContext('2d'); let img=new Image(); if(!file||!canvas)return; function draw(){if(!img.src)return; const preset=$('preset').value.split('x'); canvas.width=parseInt(preset[0],10); canvas.height=parseInt(preset[1],10); ctx.fillStyle=$('bgColor').value; ctx.fillRect(0,0,canvas.width,canvas.height); const mode=$('fitMode').value; const scale=mode==='cover'?Math.max(canvas.width/img.width,canvas.height/img.height):Math.min(canvas.width/img.width,canvas.height/img.height); const w=img.width*scale,h=img.height*scale,x=(canvas.width-w)/2,y=(canvas.height-h)/2; ctx.drawImage(img,x,y,w,h)} file.addEventListener('change',e=>{const f=e.target.files[0]; if(!f)return; img.onload=draw; img.src=URL.createObjectURL(f)}); ['preset','fitMode','bgColor'].forEach(id=>$(id).addEventListener('change',draw)); $('downloadImage').addEventListener('click',()=>{const a=document.createElement('a'); a.download='resized-image.png'; a.href=canvas.toDataURL('image/png'); a.click()})}
window.addEventListener('DOMContentLoaded',()=>{setupVoicePage(); setupResizer();});

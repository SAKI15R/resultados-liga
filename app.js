var K='copa-resultados-v1';
var DEF={i:0,j:[{name:'3er Encuentro',date:'Domingo 8 de noviembre de 2026 · 10:30 a. m.',place:'Cuadro P. Velásquez #1, El Panti',m:[
{h:'Atlético Oro del Mar',a:'Deportivo Lesly',hs:0,as:0,d:false},
{h:'Chimbi',a:'El Naranjal',hs:0,as:0,d:false},
{h:'Kraken',a:'Deliany (Sports Academy)',hs:0,as:0,d:false},
{h:'Diana',a:'Vuelve a Cristo F.C.',hs:0,as:0,d:false}]}]};
var view='r';
var G={A:[{n:'Kraken',k:'kraken'},{n:'Atlético Oro del Mar',k:'oro del mar'},{n:'Diana',k:'diana'},{n:'El Naranjal',k:'naranjal'}],B:[{n:'Deportivo Lesly',k:'lesly'},{n:'Vuelve a Cristo F.C.',k:'cristo'},{n:'Deliany',k:'delian'},{n:'Chimbi',k:'chimb'}]};
function norm(s){return String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')}
function find(name){var n=norm(name);for(var g in G)for(var i=0;i<G[g].length;i++)if(n.indexOf(G[g][i].k)>=0)return G[g][i];return null}
var META={'kraken':['kraken','KR',190],'oro del mar':['oro-del-mar','OM',45],'diana':['diana','DI',320],'naranjal':['naranjal','NA',28],'lesly':['lesly','LE',130],'cristo':['vuelve-a-cristo','VC',270],'delian':['deliany','DE',5],'chimb':['chimbi','CH',210]};
for(var g in G)G[g].forEach(function(t){var m=META[t.k];t.f=m[0];t.i=m[1];t.h=m[2]});
function ld(t,i){var e=['png','jpg','jpeg','webp'];if(i>=e.length)return;var im=new Image();im.onload=function(){t.img=im;render()};im.onerror=function(){ld(t,i+1)};im.src='logos/'+t.f+'.'+e[i]}
function bd(name,sz){var t=find(name);if(!t)return '';
 if(t.img)return '<img class="lg" alt="" width="'+sz+'" height="'+sz+'" src="'+t.img.src+'">';
 return '<span class="lg ph" style="width:'+sz+'px;height:'+sz+'px;font-size:'+Math.round(sz*.42)+'px;background:hsl('+t.h+',55%,32%)">'+t.i+'</span>'}
function LG(x,name,cx,cy,s){var t=find(name);if(!t)return;
 if(t.img){var r=Math.min(s/t.img.width,s/t.img.height),w=t.img.width*r,h=t.img.height*r;x.drawImage(t.img,cx-w/2,cy-h/2,w,h);return}
 x.beginPath();x.arc(cx,cy,s/2,0,7);x.fillStyle='hsl('+t.h+',55%,32%)';x.fill();x.lineWidth=4;x.strokeStyle='rgba(255,255,255,.3)';x.stroke();
 T(x,t.i,cx,cy+s*.14,Math.round(s*.42),BN,'#ffffff')}
function lgui(){var h='<h2 class="gt">Escudos de los equipos</h2><div class="lgrid">';
 for(var g in G)G[g].forEach(function(t){h+='<label class="lrow">'+bd(t.n,44)+'<span>'+esc(t.n)+'</span><input type="file" accept="image/*" data-lg="'+t.k+'" hidden><b class="btn">Subir</b></label>'});
 return h+'</div><p class="info">El escudo se guarda en este navegador. Para que lo vea todo el que abra la página publicada, ponlo en la carpeta logos o pásalo a Claude.</p>'}
document.addEventListener('change',function(e){var k=e.target.dataset&&e.target.dataset.lg;if(!k)return;var f=e.target.files[0];if(!f)return;
 var fr=new FileReader();fr.onload=function(){var im=new Image();im.onload=function(){var c=document.createElement('canvas');c.width=c.height=256;var x=c.getContext('2d'),r=Math.min(256/im.width,256/im.height);x.drawImage(im,(256-im.width*r)/2,(256-im.height*r)/2,im.width*r,im.height*r);
  var u=c.toDataURL('image/png'),t=null;for(var g in G)G[g].forEach(function(q){if(q.k==k)t=q});
  var n=new Image();n.onload=function(){t.img=n;try{var L=JSON.parse(localStorage.getItem('copa-logos-v1'))||{};L[t.f]=u;localStorage.setItem('copa-logos-v1',JSON.stringify(L))}catch(er){}render()};n.src=u};im.src=fr.result};fr.readAsDataURL(f)});
var TH={azul:['#020a22','#0a2d8c','60,140,255','#9ad8ff','#4cc3ff'],verde:['#03140b','#0b5a30','57,255,136','#7dffb0','#39ff88'],fuego:['#1a0505','#7a1a0a','255,120,40','#ffb067','#ff7a2f']};
function setTh(n){if(!TH[n])n='azul';document.body.setAttribute('data-th',n);try{localStorage.setItem('copa-tema',n)}catch(e){}
 document.querySelectorAll('.swb').forEach(function(b){b.classList.toggle('on',b.dataset.th==n)})}
function stand(){
 for(var g in G)G[g].forEach(function(t){t.pj=t.g=t.e=t.p=t.gf=t.gc=0});
 S.j.forEach(function(j){j.m.forEach(function(m){if(!m.d)return;var x=+m.hs||0,y=+m.as||0;
  [[find(m.h),x,y],[find(m.a),y,x]].forEach(function(r){var t=r[0];if(!t)return;t.pj++;t.gf+=r[1];t.gc+=r[2];if(r[1]>r[2])t.g++;else if(r[1]==r[2])t.e++;else t.p++})})});
 var R={};for(var g in G)R[g]=G[g].slice().sort(function(a,b){return (b.g*3+b.e)-(a.g*3+a.e)||(b.gf-b.gc)-(a.gf-a.gc)||b.gf-a.gf});return R}
function table(){
 var out='',R=stand();
 for(var g in G){var rows=R[g];
  out+='<h2 class="gt">Grupo '+g+'</h2><div class="tw"><table><thead><tr><th>#</th><th class="l">Equipo</th><th>PJ</th><th>G</th><th>E</th><th>P</th><th>GF</th><th>GC</th><th>DG</th><th>Pts</th></tr></thead><tbody>'+rows.map(function(t,i){var dg=t.gf-t.gc;return '<tr><td>'+(i+1)+'</td><td class="l"><span class="tn">'+bd(t.n,28)+esc(t.n)+'</span></td><td>'+t.pj+'</td><td>'+t.g+'</td><td>'+t.e+'</td><td>'+t.p+'</td><td>'+t.gf+'</td><td>'+t.gc+'</td><td>'+(dg>0?'+':'')+dg+'</td><td class="pt">'+(t.g*3+t.e)+'</td></tr>'}).join('')+'</tbody></table></div>'}
 return out+'<p class="info">Se calcula sola con los partidos marcados como Finalizado. Victoria = 3 pts, empate = 1.</p>'}
var S=null;
try{S=JSON.parse(localStorage.getItem(K))}catch(e){}
if(!S||!S.j||!S.j.length)S=JSON.parse(JSON.stringify(DEF));
S.i=Math.min(S.i||0,S.j.length-1);var edit=false;
function save(){try{localStorage.setItem(K,JSON.stringify(S))}catch(e){}}
function esc(s){return String(s==null?'':s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function $(i){return document.getElementById(i)}
function stats(){var j=S.j[S.i],p=0,g=0;j.m.forEach(function(m){if(m.d){p++;g+=(+m.hs||0)+(+m.as||0)}});
$('stats').innerHTML='<div><b>'+j.m.length+'</b><span>Partidos</span></div><div><b>'+p+'</b><span>Jugados</span></div><div><b>'+g+'</b><span>Goles</span></div>'}
function sel(n,f,v){var c=find(v),cur=c?c.n:v,all=[];for(var g in G)G[g].forEach(function(t){all.push(t.n)});
 if(all.indexOf(cur)<0)all.push(cur);
 return '<select data-n="'+n+'" data-f="'+f+'">'+all.map(function(o){return '<option'+(o==cur?' selected':'')+'>'+esc(o)+'</option>'}).join('')+'</select>'}
function render(){
 document.querySelectorAll('.seg .tab').forEach(function(b){b.classList.toggle('on',b.dataset.v==view)});
 ['tabs','head','stats','list','bar','lgs'].forEach(function(i){$(i).hidden=view=='p'});
 $('pos').hidden=view!='p';
 if(view=='p'){$('pos').innerHTML=table();return}
 $('lgs').innerHTML=edit?lgui():'';
 $('tabs').innerHTML=S.j.map(function(j,n){return '<button class="tab'+(n==S.i?' on':'')+'" data-i="'+n+'">'+esc(j.name)+'</button>'}).join('')+(edit?'<button class="tab add" id="addJ">+ Encuentro</button>':'');
 var j=S.j[S.i];
 $('head').innerHTML=edit?'<div class="ej"><input type="text" data-f="name" value="'+esc(j.name)+'" placeholder="Nombre (ej. 4to Encuentro)"><input type="text" data-f="date" value="'+esc(j.date)+'" placeholder="Fecha y hora"><input type="text" data-f="place" value="'+esc(j.place)+'" placeholder="Lugar"></div>':'<div class="info"><span>📅 '+esc(j.date)+'</span><span>📍 '+esc(j.place)+'</span></div>';
 stats();
 var h='';
 j.m.forEach(function(m,n){
  if(edit){h+='<article class="m em">'+sel(n,'h',m.h)+'<div class="sc"><input type="number" min="0" data-n="'+n+'" data-f="hs" value="'+(+m.hs||0)+'"><span>:</span><input type="number" min="0" data-n="'+n+'" data-f="as" value="'+(+m.as||0)+'"></div>'+sel(n,'a',m.a)+'<div class="ck"><label><input type="checkbox" data-n="'+n+'" data-f="d"'+(m.d?' checked':'')+'> Finalizado</label><button class="btn dng" data-del="'+n+'">Quitar</button></div></article>'}
  else{var w=!m.d?'':(+m.hs>+m.as?'h':(+m.as>+m.hs?'a':''));
   h+='<article class="m'+(m.d?' done':'')+'"><div class="t'+(w=='h'?' win':'')+'">'+bd(m.h,58)+'<span>'+esc(m.h)+'</span></div><div class="sc"><b>'+(m.d?(+m.hs||0):'–')+'</b><span>:</span><b>'+(m.d?(+m.as||0):'–')+'</b></div><div class="t r'+(w=='a'?' win':'')+'">'+bd(m.a,58)+'<span>'+esc(m.a)+'</span></div><div class="st">'+(m.d?'Finalizado':'Por jugar')+'</div></article>'}
 });
 $('list').innerHTML=h||'<p class="empty">Aún no hay partidos.</p>';
 $('bar').innerHTML=edit?'<button class="btn" id="addM">+ Partido</button>'+(S.j.length>1?'<button class="btn dng" id="delJ">Borrar encuentro</button>':'')+'<button class="btn dng" id="clr">Marcadores en 0</button><button class="btn dng" id="rst">Reiniciar todo</button><button class="btn pri" id="done">Listo</button>':'<button class="btn pri" id="ed">✏️ Editar resultados</button>';
}
document.addEventListener('click',function(e){var t=e.target.closest('button');if(!t)return;
 if(t.dataset.th){setTh(t.dataset.th)}
 else if(t.dataset.dl){go(t.dataset.dl)}
 else if(t.dataset.v!=null){view=t.dataset.v;render()}
 else if(t.dataset.i!=null){S.i=+t.dataset.i;save();render()}
 else if(t.id=='ed'){edit=true;render()}
 else if(t.id=='clr'||t.id=='rst'){if(t.dataset.ask!='1'){t.dataset.ask='1';t.textContent='¿Seguro? Toca otra vez';return}
  if(t.id=='clr'){S.j.forEach(function(j){j.m.forEach(function(m){m.hs=0;m.as=0;m.d=false})})}else{var e0=JSON.parse(JSON.stringify(DEF));S.j=e0.j;S.i=0}
  save();render()}
 else if(t.id=='done'){edit=false;save();render()}
 else if(t.id=='addM'){S.j[S.i].m.push({h:'Equipo A',a:'Equipo B',hs:0,as:0,d:false});save();render()}
 else if(t.id=='addJ'){S.j.push({name:'Nuevo encuentro',date:'Fecha y hora',place:'Lugar',m:[{h:'Equipo A',a:'Equipo B',hs:0,as:0,d:false}]});S.i=S.j.length-1;save();render()}
 else if(t.id=='delJ'){if(S.j.length>1){S.j.splice(S.i,1);S.i=0;save();render()}}
 else if(t.dataset.del!=null){S.j[S.i].m.splice(+t.dataset.del,1);save();render()}
});
document.addEventListener('input',function(e){var d=e.target.dataset,f=d.f;if(!f)return;var j=S.j[S.i],v=e.target.type=='checkbox'?e.target.checked:e.target.value;
 if(d.n==null){j[f]=v;if(f=='name')document.querySelector('.tab.on').textContent=v}
 else{j.m[+d.n][f]=v}
 save();stats()});
var CW=1080,CH=1920,BN='"Bebas Neue",Impact,sans-serif',OS='Oswald,Arial,sans-serif';
function T(x,s,px,py,sz,fam,col,mw,al){var w=fam==OS?'600 ':'400 ';x.font=w+sz+'px '+fam;while(mw&&x.measureText(s).width>mw&&sz>16){sz-=2;x.font=w+sz+'px '+fam}x.fillStyle=col;x.textAlign=al||'center';x.textBaseline='alphabetic';x.fillText(s,px,py)}
function RR(x,a,b,w,h,r,f,s){x.beginPath();x.moveTo(a+r,b);x.arcTo(a+w,b,a+w,b+h,r);x.arcTo(a+w,b+h,a,b+h,r);x.arcTo(a,b+h,a,b,r);x.arcTo(a,b,a+w,b,r);x.closePath();if(f){x.fillStyle=f;x.fill()}if(s){x.strokeStyle=s;x.lineWidth=3;x.stroke()}}
function poster(k){
 var c=document.createElement('canvas');c.width=CW;c.height=CH;var x=c.getContext('2d'),j=S.j[S.i];
 var P=TH[document.body.getAttribute('data-th')]||TH.azul,g=x.createLinearGradient(0,0,0,CH);g.addColorStop(0,P[0]);g.addColorStop(.5,P[1]);g.addColorStop(1,P[0]);x.fillStyle=g;x.fillRect(0,0,CW,CH);
 g=x.createRadialGradient(CW/2,330,10,CW/2,330,720);g.addColorStop(0,'rgba('+P[2]+',.42)');g.addColorStop(1,'rgba('+P[2]+',0)');x.fillStyle=g;x.fillRect(0,0,CW,CH);
 x.strokeStyle='rgba(255,255,255,.07)';x.lineWidth=6;x.beginPath();x.arc(CW/2,CH-140,280,0,7);x.moveTo(0,CH-140);x.lineTo(CW,CH-140);x.stroke();
 
 x.save();x.shadowColor='rgba('+P[2]+',.8)';x.shadowBlur=30;T(x,'COPA RELÁMPAGO',CW/2,255,160,BN,P[3],980);x.restore();
 T(x,'IN MEMORIAM',CW/2,345,86,BN,'#ffffff');
 T(x,'Ricardo Noriel Martínez “Richy”',CW/2,410,38,OS,'#d6f5e2',960);
 x.fillStyle='#f5c542';x.fillRect(CW/2-120,445,240,5);
 if(k=='r'){
  T(x,'RESULTADOS · '+j.name.toUpperCase(),CW/2,560,78,BN,'#f5c542',980);
  T(x,j.date+' · '+j.place,CW/2,610,30,OS,'#cfe9d8',980);
  var n=j.m.length||1,gap=22,h=Math.min(220,(1120-(n-1)*gap)/n);
  j.m.forEach(function(m,i){var y=650+i*(h+gap),cy=y+h/2,w=m.d?(+m.hs>+m.as?1:(+m.as>+m.hs?2:0)):0;
   RR(x,50,y,980,h,24,'rgba(255,255,255,.08)',m.d?'rgba('+P[2]+',.6)':'rgba(255,255,255,.15)');
   var ls=Math.max(40,Math.min(110,h-100));
   LG(x,m.h,250,y+14+ls/2,ls);LG(x,m.a,830,y+14+ls/2,ls);
   T(x,m.h.toUpperCase()+(w==1?' ★':''),250,y+14+ls+36,38,OS,w==1?P[4]:'#ffffff',380);
   T(x,m.a.toUpperCase()+(w==2?' ★':''),830,y+14+ls+36,38,OS,w==2?P[4]:'#ffffff',380);
   T(x,(m.d?(+m.hs||0):'–')+' : '+(m.d?(+m.as||0):'–'),CW/2,cy+10,Math.min(110,h*.6),BN,'#ffffff');
   T(x,m.d?'FINALIZADO':'POR JUGAR',CW/2,cy+h/2-12,24,OS,m.d?'#f5c542':'#8fb09c')});
 }else{
  T(x,'TABLA DE POSICIONES',CW/2,560,84,BN,'#f5c542',980);
  var R=stand(),cs=[600,675,750,825,905],cn=['PJ','G','E','P','DG'];
  ['A','B'].forEach(function(gk,gi){var y0=620+gi*580;
   T(x,'GRUPO '+gk,70,y0+50,70,BN,P[3],500,'left');
   T(x,'EQUIPO',215,y0+105,26,OS,'#8fb09c',300,'left');
   cn.forEach(function(l,q){T(x,l,cs[q],y0+105,26,OS,'#8fb09c')});T(x,'PTS',985,y0+105,26,OS,'#f5c542');
   R[gk].forEach(function(t,i){var y=y0+125+i*98,dg=t.gf-t.gc;
    RR(x,50,y,980,86,18,i%2?'rgba(255,255,255,.05)':'rgba(255,255,255,.10)');
    T(x,String(i+1),90,y+58,44,BN,'#f5c542');
    LG(x,t.n,168,y+43,58);T(x,t.n.toUpperCase(),215,y+56,34,OS,'#ffffff',360,'left');
    [t.pj,t.g,t.e,t.p,(dg>0?'+':'')+dg].forEach(function(v,q){T(x,String(v),cs[q],y+56,36,OS,'#e8f6ee')});
    T(x,String(t.g*3+t.e),985,y+60,52,BN,P[4])})});
 }
 T(x,'El fútbol nos une, la memoria nos mantiene juntos',CW/2,1860,30,OS,'#8fb09c',980);
 return c}
function say(s){$('msg').textContent=s}
async function dl(k){
 try{await document.fonts.load('40px "Bebas Neue"');await document.fonts.load('600 40px Oswald')}catch(e){}
 var d=window.claude&&await claude.use('downloads');
 if(!d){prev([k]);return false}
 var c=poster(k),b=await new Promise(function(r){c.toBlob(r,'image/png')});
 try{await d.save({filename:(k=='r'?'resultados':'posiciones')+'-copa-relampago.png',data:b});return true}
 catch(e){if(e&&e.code!='declined')say('No se pudo descargar ('+((e&&e.code)||'error')+').');return false}}
function prev(ks){
 var o=document.createElement('div');
 o.style.cssText='position:fixed;inset:0;z-index:99;background:rgba(0,0,0,.88);overflow:auto;padding:16px 14px 30px;text-align:center';
 o.innerHTML='<p style="color:#fff;font-size:.95rem;margin:6px 0 14px">Haz <b>clic derecho → Guardar imagen como…</b> (en el celular, mantén presionada la imagen).</p>'+ks.map(function(k){return '<img alt="'+(k=='r'?'Resultados':'Posiciones')+'" src="'+poster(k).toDataURL('image/png')+'" style="display:block;margin:0 auto 16px;max-width:100%;max-height:82vh;border-radius:10px">'}).join('')+'<button class="btn pri" id="ovx">Cerrar</button>';
 document.body.appendChild(o);o.querySelector('#ovx').onclick=function(){o.remove()}}
async function go(k){
 try{await document.fonts.load('40px "Bebas Neue"');await document.fonts.load('600 40px Oswald')}catch(e){}
 var d0=window.claude&&await claude.use('downloads');
 if(!d0){prev(k=='b'?['r','p']:[k]);return}
 var b=$('dl');b.style.opacity='.5';b.style.pointerEvents='none';say('Preparando imagen…');
 try{var ok=k=='b'?(await dl('r')&&await dl('p')):await dl(k);
  if(ok)say('Listo ✓ Revisa tu galería o tus descargas.');else if($('msg').textContent=='Preparando imagen…')say('')}
 finally{b.style.opacity='';b.style.pointerEvents=''}}
var LS0={};try{LS0=JSON.parse(localStorage.getItem('copa-logos-v1'))||{}}catch(e){}
for(var g in G)G[g].forEach(function(t){if(LS0[t.f]){var im=new Image();im.onload=function(){t.img=im;render()};im.src=LS0[t.f]}else ld(t,0)});
setTh(function(){try{return localStorage.getItem('copa-tema')||'azul'}catch(e){return 'azul'}}());
render();
try{if(window.claude&&claude.use)claude.use('downloads').then(function(d){if(d)$('dl').hidden=false})}catch(e){}

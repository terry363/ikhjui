const snakes = [
 {name:'綠樹蟒',latin:'Morelia viridis',image:'green-python.jpg',habitat:'熱帶雨林',habit:'樹棲生活',diet:'小型哺乳類、爬蟲類',feature:'把自己變成一片綠',text:'牠會把身體盤成一圈圈，安穩地掛在樹枝上。綠色身體融入枝葉，成蛇主要在夜間活動，等待獵物靠近。',extra:'幼蛇不一定是綠色！牠們可能呈黃色或紅褐色，成長後才逐漸換上綠衣。',home:'新幾內亞、印尼東部及澳洲約克角半島的熱帶雨林。',source:'https://nationalzoo.si.edu/animals/green-tree-python'},
 {name:'玉米蛇',latin:'Pantherophis guttatus',image:'corn-snake.jpg',habitat:'林地與草地',habit:'地面探索',diet:'鼠類、鳥類等小動物',feature:'藏在落葉裡的暖色花紋',text:'橘紅色斑塊與深色邊緣，是玉米蛇鮮明的外衣。牠會在地面探索，也能攀爬，以纏繞方式制伏獵物。',extra:'翻開圖鑑看看牠的腹部：黑白相間的棋盤紋，也是牠的特色。',home:'美國東部與東南部的林地、草地、岩坡及農場周邊。',source:'https://nationalzoo.si.edu/animals/eastern-corn-snake'},
 {name:'球蟒',latin:'Python regius',image:'ball-python.jpg',habitat:'非洲草原',habit:'蜷曲防禦',diet:'小型哺乳類',feature:'把自己捲成一顆球',text:'遇到威脅時，球蟒會將身體緊緊蜷起，把頭藏在中央。「球蟒」這個名字，就來自牠獨特的防禦方式。',extra:'深淺相間的斑紋，讓牠在草叢與地面陰影中更不容易被發現。',home:'西非的草原環境。',source:'https://www.oregonzoo.org/animals/ball-python'},
 {name:'眼鏡王蛇',latin:'Ophiophagus hannah complex',image:'king-cobra.jpg',habitat:'亞洲森林',habit:'日間活動',diet:'主要為其他蛇類',feature:'森林裡的蛇類獵手',text:'眼鏡王蛇主要以其他蛇類為食。雌蛇會聚集落葉與枝條築巢，並守護蛇卵，這在蛇類中相當特別。',extra:'本圖鑑以廣義眼鏡王蛇群介紹；不同地區族群近年已有分類修訂。野外相遇時請遠距離觀察。',home:'亞洲的森林、竹林及靠近溪流的環境。',source:'https://nationalzoo.si.edu/animals/king-cobra'}
];
const grid=document.querySelector('#snake-grid');
grid.innerHTML=snakes.map((s,i)=>`<button class="snake-card" data-snake="${i}" aria-label="認識${s.name}"><div class="image-wrap"><img src="assets/${s.image}" alt="${s.name}" loading="lazy"><span class="species-no">圖鑑 ${String(i+1).padStart(2,'0')}</span></div><div class="card-info"><h3>${s.name}</h3><p>${s.latin}</p><span class="tag">${s.habitat}</span><span class="tag">${s.habit}</span><span class="card-arrow" aria-hidden="true">↗</span></div></button>`).join('');
const dialog=document.querySelector('#snake-dialog');
function openSnake(index){const s=snakes[index];document.querySelector('#dialog-content').innerHTML=`<img class="detail-image" src="assets/${s.image}" alt="${s.name}近照"><div class="detail-body"><small>蛇的圖鑑 ／ ${String(index+1).padStart(2,'0')}</small><h2 id="dialog-title">${s.name}</h2><p class="latin">${s.latin}</p><dl class="detail-facts"><div><dt>棲息環境</dt><dd>${s.habitat}</dd></div><div><dt>生活特色</dt><dd>${s.habit}</dd></div><div><dt>主要食物</dt><dd>${s.diet}</dd></div></dl><h3>${s.feature}</h3><p>${s.text}</p><h3>牠的家在哪裡？</h3><p>${s.home}</p><p>${s.extra}</p><p class="detail-note">保持距離，欣賞牠原本的生活。<br><a href="${s.source}" target="_blank" rel="noopener noreferrer">閱讀動物園的物種介紹 ↗</a></p></div>`;dialog.showModal();dialog.scrollTop=0;document.body.style.overflow='hidden';}
grid.addEventListener('click',e=>{const card=e.target.closest('[data-snake]');if(card)openSnake(Number(card.dataset.snake));});
document.querySelector('#random-snake').addEventListener('click',()=>openSnake(Math.floor(Math.random()*snakes.length)));
document.querySelectorAll('dialog').forEach(d=>{d.querySelector('.close-dialog').addEventListener('click',()=>d.close());d.addEventListener('close',()=>{document.body.style.overflow='';});d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();}});});
const habitats={forest:{title:'沿著枝葉，向上探索。',text:'雨林有豐富的垂直空間。綠樹蟒在枝頭盤繞，濃密樹冠提供遮蔽；每一層植被，都是不同動物的生活場所。',snake:0},grass:{title:'草叢之下，也有小宇宙。',text:'草原並不空曠。草叢與地面陰影提供掩護，小型哺乳類也是球蟒的食物。保留地表植被，就是保留牠們的生活空間。',snake:2},edge:{title:'森林的邊緣，生活交會。',text:'林地、草地與農場周邊交錯的地方，也能成為玉米蛇的家。多樣的地形，提供獵物與藏身之處。',snake:1}};
function selectHabitat(key){const h=habitats[key];document.querySelectorAll('[data-habitat]').forEach(b=>{const selected=b.dataset.habitat===key;b.setAttribute('aria-selected',String(selected));b.tabIndex=selected?0:-1;});const panel=document.querySelector('#habitat-panel');panel.setAttribute('aria-labelledby',`tab-${key}`);panel.innerHTML=`<h3>${h.title}</h3><p>${h.text}</p><a href="#atlas" data-meet="${h.snake}">認識這裡的居民：${snakes[h.snake].name} ↗</a>`;panel.querySelector('a').addEventListener('click',e=>{e.preventDefault();openSnake(h.snake);});}
document.querySelectorAll('[data-habitat]').forEach((b,i)=>{b.addEventListener('click',()=>selectHabitat(b.dataset.habitat));b.addEventListener('keydown',e=>{const tabs=[...document.querySelectorAll('[data-habitat]')];let next;if(e.key==='ArrowRight')next=(i+1)%tabs.length;if(e.key==='ArrowLeft')next=(i+tabs.length-1)%tabs.length;if(e.key==='Home')next=0;if(e.key==='End')next=tabs.length-1;if(next!==undefined){e.preventDefault();tabs[next].focus();selectHabitat(tabs[next].dataset.habitat);}});});selectHabitat('forest');
const mascotButton=document.querySelector('#mascot-button'),bubble=document.querySelector('#mascot-bubble');mascotButton.addEventListener('click',()=>{bubble.hidden=!bubble.hidden;mascotButton.setAttribute('aria-expanded',String(!bubble.hidden));});bubble.querySelector('a').addEventListener('click',()=>{bubble.hidden=true;mascotButton.setAttribute('aria-expanded','false');});document.addEventListener('keydown',e=>{if(e.key==='Escape'){bubble.hidden=true;mascotButton.setAttribute('aria-expanded','false');}});
const motionButton=document.querySelector('.motion-toggle');motionButton.addEventListener('click',()=>{const paused=document.documentElement.classList.toggle('motion-paused');motionButton.setAttribute('aria-pressed',String(paused));motionButton.setAttribute('aria-label',paused?'播放動畫':'暫停動畫');motionButton.title=paused?'播放動畫':'暫停動畫';motionButton.innerHTML=`${paused?'▷':'Ⅱ'} <span>${paused?'播放動畫':'暫停動畫'}</span>`;});
document.querySelector('#sources-button').addEventListener('click',()=>{document.querySelector('#sources-dialog').showModal();document.body.style.overflow='hidden';});

const photoSources = [
  {
    "file": "assets/green-python.jpg",
    "species": "Morelia viridis",
    "source": "https://commons.wikimedia.org/wiki/File:A_Green_Tree_Python.jpg",
    "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/4/41/A_Green_Tree_Python.jpg",
    "photographer": "safaritravelplus",
    "license": "CC0",
    "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
    "description": "A green tree python."
  },
  {
    "file": "assets/green-python-detail.jpg",
    "species": "Morelia viridis",
    "source": "https://commons.wikimedia.org/wiki/File:Coiled_Morelia_viridis.jpg",
    "imageUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/94/Coiled_Morelia_viridis.jpg/1920px-Coiled_Morelia_viridis.jpg",
    "photographer": "Michael Bentley",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
    "description": "A coiled Morelia viridis."
  },
  {
    "file": "assets/corn-snake.jpg",
    "species": "Pantherophis guttatus",
    "source": "https://commons.wikimedia.org/wiki/File:Corn_Snake,_NPSPhoto_(9255026919).jpg",
    "imageUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6a/Corn_Snake%2C_NPSPhoto_%289255026919%29.jpg/1920px-Corn_Snake%2C_NPSPhoto_%289255026919%29.jpg",
    "photographer": "Everglades NPS from Homestead, Florida, United States",
    "license": "Public domain",
    "licenseUrl": null,
    "description": "Corn Snake, NPSPhoto"
  },
  {
    "file": "assets/ball-python.jpg",
    "species": "Python regius",
    "source": "https://commons.wikimedia.org/wiki/File:Python_regius_-_ball_python.jpg",
    "imageUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/46/Python_regius_-_ball_python.jpg/1920px-Python_regius_-_ball_python.jpg",
    "photographer": "Brian Gratwicke",
    "license": "CC BY 2.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
    "description": "Python regius - ball python"
  },
  {
    "file": "assets/king-cobra.jpg",
    "species": "Ophiophagus hannah",
    "source": "https://commons.wikimedia.org/wiki/File:King_Cobra_(6).jpg",
    "imageUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fd/King_Cobra_%286%29.jpg/1920px-King_Cobra_%286%29.jpg",
    "photographer": "RedGazelle15",
    "license": "CC BY-SA 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
    "description": "Cobra"
  },
  {
    "file": "assets/forest.jpg",
    "species": "Tropical rainforest, La Selva, Costa Rica",
    "source": "https://commons.wikimedia.org/wiki/File:Dense_rain_forest_in_the_La_Selva_region_of_Costa_Rica_(ED04-0056-062).jpg",
    "imageUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a8/Dense_rain_forest_in_the_La_Selva_region_of_Costa_Rica_%28ED04-0056-062%29.jpg/1920px-Dense_rain_forest_in_the_La_Selva_region_of_Costa_Rica_%28ED04-0056-062%29.jpg",
    "photographer": "NASA Armstrong Flight Research Center / NASA/Jim Ross",
    "license": "Public domain",
    "licenseUrl": null,
    "description": "Dense rain forest in the La Selva region of Costa Rica. AirSAR 2004 Mesoamerica is a three-week expedition by an international team of scientists that uses an all-weather imaging tool, called the Airborne Synthetic Aperture Radar (AirSAR) which is located onboard NASA's DC-8 airborne laboratory. Scientists from many parts of the world including NASA's Jet Propulsion Laboratory are combining ground research done in several areas in Central America with NASA's AirSAR technology to improve and expand on the quality of research they are able to conduct. The radar, developed by NASA's Jet Propulsion Laboratory, can penetrate clouds and also collect data at night. Its high-resolution sensors operate at multiple wavelengths and modes, allowing AirSAR to see beneath treetops, through thin sand, and dry snow pack. AirSAR's 2004 campaign is a collaboration of many U.S. and Central American institutions and scientists, including NASA; the National Science Foundation; the Smithsonian Institution; National Geographic; Conservation International; the Organization of Tropical Studies; the Central American Commission for Environment and Development; and the Inter-American Development Bank."
  },
  {
    "file": "assets/forest-interior.jpg",
    "species": "Rainforest path",
    "source": "https://commons.wikimedia.org/wiki/File:Path_in_the_rainforest.jpg",
    "imageUrl": "https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2b/Path_in_the_rainforest.jpg/1920px-Path_in_the_rainforest.jpg",
    "photographer": "Havardtl",
    "license": "CC BY 4.0",
    "licenseUrl": "https://creativecommons.org/licenses/by/4.0",
    "description": "A walking path is lit up by the evening light the rain forest near Rurrenabaque, Bolivia"
  }
]
;
document.querySelector('#source-list').innerHTML = '<h3>照片</h3><ul>' + photoSources.map(s => '<li><a href=' + JSON.stringify(s.source) + ' target=_blank rel=noopener>' + s.file.split('/').pop() + '</a><br>' + s.photographer + ' — ' + (s.licenseUrl ? '<a href=' + JSON.stringify(s.licenseUrl) + ' target=_blank rel=noopener>' + s.license + '</a>' : s.license) + '<br>顯示時裁切與調整尺寸。</li>').join('') + '</ul><h3>生態知識</h3><ul>' + snakes.map(s => '<li><a href=' + JSON.stringify(s.source) + ' target=_blank rel=noopener>' + s.name + ' · 動物園物種介紹</a></li>').join('') + '</ul>';
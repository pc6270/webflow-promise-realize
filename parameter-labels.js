(() => {
  const sections = {
    sec1:'區塊 1｜安心實踐主標',s1:'區塊 1｜安心實踐主標',
    s2p1:'區塊 2・Part 1｜協助驗屋介紹',
    s2p2:'區塊 2・Part 2｜兩張檢驗照片',
    s2p34:'區塊 2・Part 3–4｜驗屋收尾',
    sec4:'區塊 4｜驗屋項目卡片',s4:'區塊 4｜驗屋項目卡片',
    sec5:'區塊 5｜責任銷售',s5:'區塊 5｜責任銷售',
    sec6:'區塊 6｜手電筒與進度線',s6:'區塊 6｜手電筒與進度線',
    sec7:'區塊 7｜服務泡泡與推球小人',s7:'區塊 7｜服務泡泡與推球小人',
    sec8:'區塊 8｜透明資訊',s8:'區塊 8｜透明資訊'
  };
  const properties={x:'左右位置',y:'上下位置',mt:'上方間距',mb:'下方間距',w:'寬度調整',size:'字級',scale:'縮放倍率',sx:'水平縮放',sy:'垂直縮放',rot:'旋轉角度',skew:'傾斜角度',op:'透明度',start:'起點座標',end:'終點座標'};
  const special={
    '--animation-entry-mobile-percent':['全站｜動畫觸發','手機／平板','下一區露出多少視窗百分比開始','無單位；預設 10，數字越小越早觸發，仍等上一區動畫完成。'],
    '--animation-entry-desktop-percent':['全站｜動畫觸發','桌面','下一區露出多少視窗百分比開始','無單位；預設 15，數字越小越早觸發。'],
    '--s4-card-opacity':[sections.s4,'共用','收合卡片・圖片透明度','0 是透明，1 是完全顯示；預設由 0.3 增加至 0.5，三種裝置共用。'],
    '--s4-card-look':[sections.s4,'共用','卡片外觀版本','0：圖片透明度 0.5、原標題色；1：圖片透明度 1、收合標題白色。也可以由頂部選單切換。'],
    '--s1-tab-desc-y':[sections.s1,'平板','第一段說明文字・上下位置','單位 px；0 為基準位置，正值往下、負值往上。'],
    '--quote-line-width':['全站｜引文直線','桌面／平板','引文直線・共用粗細','單位 px；只調整引文旁直線，不影響流程線。'],
    '--quote-line-mb-width':['全站｜引文直線','手機','引文直線・共用粗細','單位 px；只調整手機引文旁直線。'],
    '--label-quote-gap':['全站｜中英文小標','平板','中英文小標組 → 引文組・間距','單位 px；小標是中英文一組，引文是大字與左側直線一組。控制兩組外框的垂直間距。'],
    '--label-pair-gap':['全站｜中英文小標','共用','小標組內・中英文垂直間距','單位 px；控制中英文小標頂緣的距離，數值越大間距越大，預設 24px。'],
    '--brand-line-color':['全站｜線條','共用','線條顏色','填入色碼，例如 #675D54。'],
    '--brand-line-width':['全站｜線條','桌面／平板','線條粗細','單位 px；值越大，線越粗。'],
    '--brand-line-mb-width':['全站｜線條','手機','線條粗細','單位 px；只影響手機線條。'],
    '--brand-line-flood':['全站｜線條','共用','鉛筆紋理底色','填入 CSS 色碼或 rgba()；最後一個值是透明度。'],
    '--s4-noise-freq':[sections.s4,'共用','背景大圓・雜訊頻率','無單位；控制紋理的細密程度。'],
    '--s4-noise-opacity':[sections.s4,'共用','背景大圓・雜訊透明度','0 是透明，1 是不透明。'],
    '--sec8-mb-scale':[sections.s8,'手機','整區縮放倍率','無單位；1 是原大小，0.92 是 92%。']
  };
  window.fpParameterLabel = name => {
    if(window.FP_PEOPLE_LABELS?.[name])return window.FP_PEOPLE_LABELS[name];
    const tabletText=name.match(/^--s6-tab-(num|title)-(x|y|size)$/);
    if(tabletText){const [,target,key]=tabletText;return {name,section:sections.s6,device:'平板',title:({num:'階段數字',title:'階段標題'})[target]+'・'+({x:'左右位置',y:'上下位置',size:'字級'})[key],help:'單位 px；位置基於目前階段的對齊位置加減。'};}
    if(/^--s7-tab-text-group-[xy]$/.test(name))return {name,section:sections.s7,device:'平板',title:'標題＋段落整組・'+(name.endsWith('-x')?'左右位移':'上下位移'),help:'單位 px；標題和內文一起移動。'};

    if(name==='--s8-desc-w'||name==='--s8-mb-desc-w')return {name,section:sections.s8,device:name.includes('-mb-')?'手機':'桌面',title:'說明內文・寬度增減',help:'單位 px；這是增減量，0 為原寬度，100 加寬 100，-100 縮窄 100（會隨畫布縮放）。'};
    if(name==='--s6-mb-light-x'||name==='--s6-mb-light-y')return {name,section:sections.s6,device:'手機',title:'小人＋手電筒整組・'+(name.endsWith('-x')?'左右位置':'上下位置'),help:'單位 px；小人、手電筒、光束起點及座位橫線同步連動。'};
    const s6Text=name.match(/^--s6-mb-(num|title|desc|lamp)-(x|y|w|size)$/);
    if(s6Text){const [,target,key]=s6Text;return {name,section:sections.s6,device:'手機',title:({num:'階段數字',title:'階段標題',desc:'下方段落',lamp:'手電筒本體（對齊小人手部）'})[target]+'・'+({x:'左右位置',y:'上下位置',w:'寬度',size:'字級'})[key],help:key==='w'&&target==='desc'?'單位 px；0 自動避開弧線，其他正數指定實際寬度。':'單位 px；位置以目前基準加減，手電筒可獨立位移，光束起點保持固定。'};}
    if(name==='--s2p1-quote-line-width'||name==='--s2p1-mb-quote-line-width')return {name,section:sections.s2p1,device:name.includes('-mb-')?'手機':'桌面',title:'引文旁直線・獨立粗細',help:'單位 px；與流程線粗細分開調整。'};
    const ballControl=name.match(/^--s7-(mb-)?(balls-group|ball([1-5]))-([xy])$/);
    if(ballControl){
      const [,mobile,target,index,axis]=ballControl;
      const names=['購屋流程','貸款規劃','設備挑選','法律諮詢','裝潢細節'];
      return {name,section:sections.s7,device:mobile?'手機':'桌面',title:(target==='balls-group'?'五顆球整組':'球 '+index+'｜'+names[+index-1])+'・'+(axis==='x'?'左右位置':'上下位置'),help:'單位 px；正值'+(axis==='x'?'向右':'向下')+'，負值'+(axis==='x'?'向左':'向上')+'。球與圈內文字一起移動；整組與單顆位移可疊加。'};
    }
    const tabletCircle=name.match(/^--s8-tab-circle([123])-text-([xy])$/);if(tabletCircle){const [,index,axis]=tabletCircle;return {name,section:sections.s8,device:'平板',title:'圓圈 '+index+' 文字｜'+['完整配備資料','周邊實價登錄','真誠對話'][+index-1]+'・'+(axis==='x'?'左右位置':'上下位置'),help:'單位 px；只移動圈內文字，正值向右或向下。'};}
    const textControl=name.match(/^--s([78])-(mb-)?(text-group|circle([123])-text)-([xy])$/);
    if(textControl){
      const [,section,mobile,target,circle,axis]=textControl;
      const words=['完整配備資料','周邊實價登錄','真誠對話'];
      return {name,section:sections['s'+section],device:mobile?'手機':'桌面',title:(target==='text-group'?'文字區整組（標題＋段落）':'圓圈 '+circle+' 文字｜'+words[+circle-1])+'・'+(axis==='x'?'左右位置':'上下位置'),help:'單位 px；正值'+(axis==='x'?'向右':'向下')+'，負值'+(axis==='x'?'向左':'向上')+'。'+(target==='text-group'?'整組移動，可疊加原有個別文字參數。':'只移動圈內文字，圓圈位置保持不變。')};
    }

    if(name==='--s7-visual-scale'||name==='--s8-visual-scale')return {name,section:name.includes('s7')?sections.sec7:sections.sec8,device:'桌面',title:'圖形與版面縮放（保留文字大小）',help:'無單位；以區塊六的共同畫布比例為基準，預設 0.92。'};
    if(name==='--s6-anchor-inset')return {name,section:sections.s6,device:'桌面',title:'圓圈左緣至對齊位置',help:'單位 px；預設 128，線段尾端、圓點中心、標題與內文共同跟隨圓圈。'};
    const derived={'--s7-arc1-x':'S6 進度線終點與 S7 第一段橫線終點','--s7-arc1-y':'S6 進度線高度與 S7 第一段橫線高度','--s6-step1-x':'第 1 圓圈左緣 + 對齊距離','--s6-step2-x':'第 2 圓圈左緣 + 對齊距離','--s6-step3-x':'第 3 圓圈左緣 + 對齊距離','--s6-h1-start':'視窗左側邊緣（自動計算）','--s5-h2-start':'視窗左側邊緣（自動計算）','--s6-h1-end':'第 1 階段對齊錨點','--s6-h2-start':'第 1 階段對齊錨點','--s6-h2-end':'第 2 階段對齊錨點','--s6-h3-start':'第 2 階段對齊錨點','--s6-h3-end':'第 3 階段對齊錨點','--s6-h4-start':'第 3 階段對齊錨點'};
    if(special[name]){const [section,device,title,help]=special[name];return {section,device,title,help,name};}
    let parts=name.slice(2).split('-');const prefix=parts.shift();const section=sections[prefix]||'其他設定';
    let device='桌面';
    if(parts[0]==='tab'){device='平板';parts.shift();}
    else if(parts[0]==='mb' && parts.length>1){device='手機';parts.shift();}
    if(parts[0]==='shadow'){
      parts.shift();device=parts.shift()==='m'?'手機':'桌面';
      const key=parts.pop();return {name,section,device,title:'推球小人陰影・'+(properties[key]||key),help:hint(key)};
    }
    const property=parts.pop();let target=parts.join('-');
    const names={'':'整個區塊','title-cn':'中文主標','title-en':'英文主標',desc:'說明內文',sub:'英文小標',cat:'中文分類標題',line:'標題旁直線',title:'主要引言'};
    if(/^arc\d+$/.test(target))target='第 '+target.slice(3)+' 段弧線';
    else if(/^h\d+$/.test(target))target='第 '+target.slice(1)+' 段橫線';
    else if(target==='h')target='進度橫線';
    else if(/^v\d+$/.test(target))target='第 '+target.slice(1)+' 段直線';
    else if(/^step\d+$/.test(target))target='第 '+target.slice(4)+' 階段對齊錨點';
    else target=names[target]||target;
    let title=target+'・'+(properties[property]||property);
    if(property==='start'||property==='end')title=target+'・'+(property==='start'?'起點':'終點')+(parts[0]?.startsWith('v')?' Y':' X');
    let help=hint(property);
    if(/^step/.test(parts[0]||''))help='單位 px；同步控制該階段標題文字左侧、圓點中心與下方內文左側。';
    if(prefix==='s2p2'&&target==='整個區塊'&&property==='y')help+=' 以接續 Part 1 的位置為基準，調整值的差額。';
    if(derived[name])help='自動連動：請調整「'+derived[name]+'」，此欄位不單獨修改。';
    if(name==='--s6-h1-start'||name==='--s5-h2-start')help='自動延伸至視窗左側，無須輸入固定起點。';
    return {name,section,device,title,help,readOnly:!!derived[name]};
  };
  function hint(key){
    return ({x:'單位 px；正值向右，負值向左。',y:'單位 px；正值向下，負值向上。',mt:'單位 px；增加區塊上方間距，會影響後面的區塊。',mb:'單位 px；增加區塊下方間距，會影響後面的區塊。',w:'單位 px；調整現有內文寬度，0 表示沿用原設定。',size:'單位 px；控制文字大小。',scale:'無單位；1 是原大小，0.8 是 80%。',sx:'無單位；1 是原水平比例。',sy:'無單位；負值會上下翻轉陰影。',rot:'單位 deg；控制旋轉角度。',skew:'單位 deg；控制陰影傾斜。',op:'0 是透明，1 是不透明。',start:'單位 px；以所屬畫布座標定位，不代表畫線順序。',end:'單位 px；以所屬畫布座標定位，不代表畫線順序。'})[key]||'沿用原參數的單位與格式。';
  }
})();

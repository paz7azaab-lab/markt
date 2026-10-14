(() => {
"use strict";
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const labels={mobile:"موبایل",pc:"کامپیوتر",console:"کنسول"};
const samples=[
{id:"g1",title:"اکانت رقابتی با اسکین‌های ویژه",game:"PUBG Mobile",category:"mobile",price:"۲٬۴۰۰٬۰۰۰ تومان",rank:"سطح ۷۰ · آیتم‌های ویژه",city:"نمونه",description:"نمونه نمایشی برای آزمایش صفحه آگهی؛ مالکیت و امکان انتقال تأیید نشده است.",emoji:"🎯",glow:"#a28bff",badge:"نمونه"},
{id:"g2",title:"اکانت با رتبه بالا و آیتم‌های کمیاب",game:"Free Fire",category:"mobile",price:"۱٬۲۰۰٬۰۰۰ تومان",rank:"رتبه بالا · چند اسکین",city:"نمونه",description:"این آگهی ساختگی است و فروشنده واقعی ندارد. قبل از معامله قوانین بازی را بررسی کن.",emoji:"🔥",glow:"#ff9cba",badge:"نمونه"},
{id:"g3",title:"اکانت پیشرفت‌کرده با آیتم‌های بازشده",game:"Call of Duty",category:"pc",price:"۳٬۸۰۰٬۰۰۰ تومان",rank:"لول بالا · آیتم‌های مختلف",city:"نمونه",description:"نمونه نمایشی؛ اطلاعات ورود، ایمیل یا کد بازیابی را در آگهی عمومی قرار نده.",emoji:"⚔️",glow:"#84dfc7",badge:"نمونه"},
{id:"g4",title:"اکانت ماجراجویی با شخصیت‌های بازشده",game:"Genshin Impact",category:"pc",price:"۲٬۹۰۰٬۰۰۰ تومان",rank:"پیشرفت داستانی · چند شخصیت",city:"نمونه",description:"صرفاً جهت نمایش رابط کاربری است؛ خریدوفروش ممکن است طبق قوانین بازی ممنوع باشد.",emoji:"✨",glow:"#f0c17c",badge:"نمونه"},
{id:"g5",title:"اکانت ورزشی با تیم ساخته‌شده",game:"EA SPORTS FC",category:"console",price:"۱٬۷۰۰٬۰۰۰ تومان",rank:"تیم آماده · آیتم‌های متنوع",city:"نمونه",description:"هیچ معامله واقعی انجام نمی‌شود. سازگاری پلتفرم و قوانین انتقال را بررسی کن.",emoji:"🏆",glow:"#82a9ff",badge:"نمونه"},
{id:"g6",title:"اکانت چندنفره با پیشرفت قابل‌توجه",game:"Minecraft",category:"pc",price:"۸۵۰٬۰۰۰ تومان",rank:"پیشرفت بالا · پروفایل شخصی",city:"نمونه",description:"آگهی نمونه است و تأیید مالکیت یا مجازبودن انتقال در آن انجام نشده است.",emoji:"🧱",glow:"#8de4b4",badge:"نمونه"}
];
let listings=[...samples], filter="all", term="", saved=load("gmarkt-saved",[]), savedOnly=false, toastTimer;
function load(k,f){try{return JSON.parse(localStorage.getItem(k))??f}catch{return f}}
function store(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch{}}
function esc(v){return String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function toast(s){const el=$("#toast");el.textContent=s;el.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove("show"),2600)}
function render(){const shown=listings.filter(x=>(filter==="all"||x.category===filter)&&(!term||[x.title,x.game,x.rank,x.price,x.description].join(" ").toLocaleLowerCase("fa").includes(term.toLocaleLowerCase("fa")))&&(!savedOnly||saved.includes(x.id)));
$("#listingGrid").innerHTML=shown.map(x=>`<article class="listing-card"><div class="listing-art" style="--glow:${esc(x.glow||"#8b78ff")}"><span class="badge">${esc(x.badge||"آگهی آزمایشی")}</span><button class="save ${saved.includes(x.id)?"saved":""}" data-save="${esc(x.id)}" aria-label="ذخیره آگهی">${saved.includes(x.id)?"♥":"♡"}</button><span class="emoji">${esc(x.emoji||"🎮")}</span></div><div class="listing-content"><div class="meta"><span>${esc(x.game)}</span><span>${esc(labels[x.category]||"بازی")}</span></div><h3>${esc(x.title)}</h3><p class="description">${esc(x.description)}</p><span class="rank">${esc(x.rank||"مشخصات ثبت نشده")}</span><div class="listing-bottom"><span class="price">${esc(x.price)}<small>قیمت اعلامی · تأیید نشده</small></span><button class="detail-btn" data-detail="${esc(x.id)}" aria-label="جزئیات آگهی">←</button></div></div></article>`).join("");
$("#emptyState").hidden=shown.length>0;$("#listingGrid").hidden=shown.length===0;$("#listingTitle").textContent=savedOnly?"آگهی‌های ذخیره‌شده":term?"نتایج جست‌وجو":"آگهی‌های نمونه";$("#savedCount").textContent=saved.length;$$(".filter").forEach(b=>b.classList.toggle("active",b.dataset.filter===filter));}
function open(id){const d=$(id);if(d&&!d.open)d.showModal()}
function close(b){b.closest("dialog")?.close()}
function detail(id){const x=listings.find(v=>v.id===id);if(!x)return;$("#detailContent").innerHTML=`<div class="detail-content"><span class="kicker">${esc(labels[x.category]||"بازی")} · ${esc(x.game)}</span><div class="detail-icon">${esc(x.emoji||"🎮")}</div><h2>${esc(x.title)}</h2><p>${esc(x.price)} · ${esc(x.rank||"مشخصات ثبت نشده")}</p><p>${esc(x.description)}</p><div class="warning">⚠️ این آگهی نمایشی است. سایت هنوز فروشنده را تأیید نمی‌کند، پول نگه نمی‌دارد و معامله واقعی را پشتیبانی نمی‌کند. پیش از هر انتقال، قوانین رسمی بازی را بخوان.</div><button class="btn btn-primary submit" data-detail-save="${esc(x.id)}">${saved.includes(x.id)?"♥ حذف از ذخیره‌ها":"♡ ذخیره آگهی"}</button></div>`;open("#detailDialog")}
function reset(){filter="all";term="";savedOnly=false;$("#searchInput").value="";$("#categoryFilter").value="all";render()}
$("#searchForm").addEventListener("submit",e=>{e.preventDefault();term=$("#searchInput").value.trim();filter=$("#categoryFilter").value;savedOnly=false;render();$("#market").scrollIntoView({behavior:"smooth"})});
$("#searchInput").addEventListener("input",()=>{if(!$("#searchInput").value.trim()){term="";render()}});
$("#categoryFilter").addEventListener("change",()=>{filter=$("#categoryFilter").value;savedOnly=false;render()});
$$(".filter").forEach(b=>b.addEventListener("click",()=>{filter=b.dataset.filter;$("#categoryFilter").value=filter;savedOnly=false;render()}));
$("#listingGrid").addEventListener("click",e=>{const s=e.target.closest("[data-save]"),d=e.target.closest("[data-detail]");if(s){const id=s.dataset.save;saved=saved.includes(id)?saved.filter(v=>v!==id):[...saved,id];store("gmarkt-saved",saved);render();toast(saved.includes(id)?"به ذخیره‌ها اضافه شد.":"از ذخیره‌ها حذف شد.")}else if(d)detail(d.dataset.detail)});
$("#detailContent").addEventListener("click",e=>{const b=e.target.closest("[data-detail-save]");if(!b)return;const id=b.dataset.detailSave;saved=saved.includes(id)?saved.filter(v=>v!==id):[...saved,id];store("gmarkt-saved",saved);detail(id);render();toast(saved.includes(id)?"به ذخیره‌ها اضافه شد.":"از ذخیره‌ها حذف شد.")});
$("#savedToggle").addEventListener("click",()=>{savedOnly=!savedOnly;filter="all";term="";$("#searchInput").value="";$("#categoryFilter").value="all";render();$("#market").scrollIntoView({behavior:"smooth"})});
$("#resetSearch").addEventListener("click",reset);
$("#openListing").addEventListener("click",()=>open("#listingDialog"));
$("#listingForm").addEventListener("submit",e=>{e.preventDefault();const d=new FormData(e.currentTarget),title=String(d.get("title")||"").trim(),game=String(d.get("game")||"").trim();if(!title||!game)return;const cat=String(d.get("category")||"mobile");listings.unshift({id:"local-"+Date.now(),title,game,category:cat,price:String(d.get("price")||"قیمت توافقی").trim(),rank:String(d.get("rank")||"مشخصات ثبت نشده").trim(),description:String(d.get("description")||"آگهی آزمایشی ثبت‌شده در این مرورگر.").trim(),emoji:({mobile:"📱",pc:"🖥️",console:"🎮"})[cat],glow:"#8b78ff",badge:"آگهی آزمایشی"});e.currentTarget.reset();$("#listingDialog").close();reset();$("#market").scrollIntoView({behavior:"smooth"});toast("پیش‌نمایش ساخته شد؛ آگهی آنلاین منتشر نشده است.")});
$$("[data-close]").forEach(b=>b.addEventListener("click",()=>close(b)));
$$("dialog").forEach(d=>d.addEventListener("click",e=>{if(e.target===d)d.close()}));
render();
})();
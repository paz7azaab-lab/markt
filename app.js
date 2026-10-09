(() => {
  "use strict";
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const sampleListings = [
    {id:"s1",title:"دانه قهوه تازه‌برشت",category:"wholesale",categoryLabel:"عمده‌فروشی",price:"توافقی",unit:"سفارش عمده",city:"تهران",description:"مناسب کافه‌ها و فروشگاه‌ها؛ امکان هماهنگی برای حجم‌های مختلف.",emoji:"☕",color:"#e6d3c2",badge:"پیشنهاد ویژه"},
    {id:"s2",title:"طراحی سایت فروشگاهی",category:"digital",categoryLabel:"خدمات دیجیتال",price:"از ۸ میلیون",unit:"پروژه‌ای",city:"آنلاین",description:"طراحی فروشگاه واکنش‌گرا با تمرکز بر تجربه خرید و سرعت.",emoji:"💻",color:"#d9d5ff",badge:"خدمت"},
    {id:"s3",title:"محصولات دست‌ساز سفالی",category:"goods",categoryLabel:"کالا",price:"از ۳۵۰ هزار",unit:"هر محصول",city:"اصفهان",description:"ظروف دکوراتیو دست‌ساز برای خانه، هدیه و فروشگاه‌های خاص.",emoji:"🏺",color:"#f9d8c7",badge:"ساخت دست"},
    {id:"s4",title:"تأمین جعبه و بسته‌بندی",category:"business",categoryLabel:"تأمین کسب‌وکار",price:"قیمت همکاری",unit:"سفارش سازمانی",city:"کرج",description:"راهکارهای بسته‌بندی برای کسب‌وکارهای کوچک و سفارش‌های پرتعداد.",emoji:"📦",color:"#d1f0e4",badge:"B2B"},
    {id:"s5",title:"عکاسی محصول برای فروشگاه",category:"digital",categoryLabel:"خدمات دیجیتال",price:"از ۱٫۲ میلیون",unit:"هر جلسه",city:"تهران",description:"تصاویر تمیز و آماده استفاده در فروشگاه آنلاین و شبکه‌های اجتماعی.",emoji:"📸",color:"#ffe2c9",badge:"خدمت"},
    {id:"s6",title:"لوازم اداری برای شرکت‌ها",category:"wholesale",categoryLabel:"عمده‌فروشی",price:"استعلام قیمت",unit:"خرید تعداد بالا",city:"مشهد",description:"مجموعه‌ای از اقلام پرمصرف اداری برای سفارش‌های سازمانی.",emoji:"📚",color:"#dce9ff",badge:"عمده"},
    {id:"s7",title:"تعمیر و نصب تجهیزات خانه",category:"local",categoryLabel:"خدمات محلی",price:"پس از بررسی",unit:"بسته به خدمت",city:"شیراز",description:"هماهنگی برای خدمات نصب و تعمیرات سبک خانگی.",emoji:"🛠️",color:"#ffedbd",badge:"محلی"},
    {id:"s8",title:"تولید محصولات چرمی",category:"goods",categoryLabel:"کالا",price:"از ۷۰۰ هزار",unit:"هر محصول",city:"تبریز",description:"محصولات چرمی برای استفاده روزمره و سفارش هدیه.",emoji:"👜",color:"#ead8c9",badge:"محصول"}
  ];
  const categoryLabels = {goods:"کالا",wholesale:"عمده‌فروشی",digital:"خدمات دیجیتال",local:"خدمات محلی",business:"تأمین کسب‌وکار"};
  const categoryEmojis = {goods:"🛍️",wholesale:"📦",digital:"💻",local:"🧰",business:"🏢"};
  let listings = [...sampleListings];
  let activeFilter = "all";
  let searchTerm = "";
  let saved = readStore("markt-saved", []);
  let showSavedOnly = false;
  let toastTimer;
  function readStore(key, fallback) { try { const value = JSON.parse(localStorage.getItem(key)); return value ?? fallback; } catch { return fallback; } }
  function writeStore(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch {} }
  function escapeHTML(value) { return String(value ?? "").replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char])); }
  function showToast(message) { const toast = $("#toast"); toast.textContent = message; toast.classList.add("show"); clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove("show"), 2800); }
  function updateSavedCount() { $("#savedCount").textContent = saved.length; }
  function matchesListing(item) {
    const matchesCategory = activeFilter === "all" || item.category === activeFilter;
    const haystack = [item.title,item.categoryLabel,item.price,item.city,item.description].join(" ").toLocaleLowerCase("fa");
    const matchesSearch = !searchTerm || haystack.includes(searchTerm.toLocaleLowerCase("fa"));
    const matchesSaved = !showSavedOnly || saved.includes(item.id);
    return matchesCategory && matchesSearch && matchesSaved;
  }
  function renderListings() {
    const filtered = listings.filter(matchesListing);
    $("#listingGrid").innerHTML = filtered.map(item => `
      <article class="listing-card">
        <div class="listing-image" style="background:${escapeHTML(item.color)}">
          <span class="listing-badge">${escapeHTML(item.badge || item.categoryLabel)}</span>
          <button class="save-button ${saved.includes(item.id) ? "saved" : ""}" data-save="${escapeHTML(item.id)}" aria-label="${saved.includes(item.id) ? "حذف از ذخیره‌ها" : "ذخیره آگهی"}">${saved.includes(item.id) ? "♥" : "♡"}</button>
          <span class="listing-emoji" aria-hidden="true">${escapeHTML(item.emoji || categoryEmojis[item.category] || "✦")}</span>
        </div>
        <div class="listing-content"><div class="listing-meta"><span>${escapeHTML(item.categoryLabel || categoryLabels[item.category])}</span><span>⌖ ${escapeHTML(item.city || "آنلاین")}</span></div>
          <h3>${escapeHTML(item.title)}</h3><p class="listing-description">${escapeHTML(item.description || "برای دریافت اطلاعات بیشتر، جزئیات این آگهی را ببینید.")}</p>
          <div class="listing-bottom"><span class="listing-price">${escapeHTML(item.price || "توافقی")}<small>${escapeHTML(item.unit || "قیمت نمایشی")}</small></span><button class="listing-action" data-detail="${escapeHTML(item.id)}" aria-label="جزئیات آگهی">←</button></div>
        </div>
      </article>`).join("");
    $("#emptyState").hidden = filtered.length !== 0;
    $("#listingGrid").hidden = filtered.length === 0;
    $("#listingTitle").textContent = showSavedOnly ? "آگهی‌های ذخیره‌شده" : searchTerm ? "نتایج جست‌وجو" : "فرصت‌های منتخب";
    $("#showAll").textContent = showSavedOnly ? "بازگشت به همه آگهی‌ها ←" : "نمایش همه نمونه‌ها ←";
    $$(".filter-chip").forEach(button => button.classList.toggle("active", button.dataset.filter === activeFilter));
    updateSavedCount();
  }
  function openDialog(id) { const dialog = $(id); if (dialog && !dialog.open) dialog.showModal(); }
  function closeDialog(button) { const dialog = button.closest("dialog"); if (dialog) dialog.close(); }
  function addListing(form, isRequest = false) {
    const data = new FormData(form);
    const category = String(data.get("category") || "goods");
    const title = String(data.get("title") || "").trim();
    if (!title) { showToast("لطفاً عنوان را وارد کن."); return; }
    const id = "local-" + Date.now();
    const entry = {id,title,category,categoryLabel:categoryLabels[category] || "کالا",price:isRequest ? "درخواست خرید" : (String(data.get("price") || "").trim() || "توافقی"),unit:isRequest ? "منتظر تأمین‌کننده" : "آگهی آزمایشی",city:String(data.get("city") || "").trim() || "ثبت نشده",description:String(data.get("description") || "").trim() || (isRequest ? "درخواست آزمایشی ثبت‌شده در مرورگر." : "آگهی آزمایشی ثبت‌شده در مرورگر."),emoji:isRequest ? "📝" : (categoryEmojis[category] || "✨"),color:({goods:"#f5d9c8",wholesale:"#d1f0e4",digital:"#d9d5ff",local:"#dce9ff",business:"#ffedbd"})[category] || "#eeeaff",badge:isRequest ? "درخواست آزمایشی" : "آگهی شما"};
    listings = [entry,...listings];
    form.reset();
    form.closest("dialog").close();
    showSavedOnly = false; searchTerm = ""; activeFilter = "all"; $("#searchInput").value = ""; $("#categoryFilter").value = "all";
    renderListings();
    $("#listings").scrollIntoView({behavior:"smooth",block:"start"});
    showToast(isRequest ? "درخواست آزمایشی ذخیره شد؛ فقط در همین مرورگر." : "آگهی آزمایشی ساخته شد؛ هنوز آنلاین منتشر نشده.");
  }
  function showDetail(id) {
    const item = listings.find(entry => entry.id === id);
    if (!item) return;
    $("#detailContent").innerHTML = `<span class="section-kicker">${escapeHTML(item.categoryLabel || categoryLabels[item.category])}</span><div class="detail-symbol">${escapeHTML(item.emoji || categoryEmojis[item.category])}</div><h2>${escapeHTML(item.title)}</h2><p>⌖ ${escapeHTML(item.city || "آنلاین")} · ${escapeHTML(item.price || "توافقی")}</p><p>${escapeHTML(item.description || "توضیحی ثبت نشده است.")}</p><p class="modal-note">این مورد بخشی از نسخه آزمایشی مارکت است. ارتباط با فروشنده و انجام معامله هنوز فعال نیست.</p><button class="btn btn-primary btn-submit" data-detail-save="${escapeHTML(item.id)}">${saved.includes(item.id) ? "♥ حذف از ذخیره‌ها" : "♡ ذخیره این آگهی"}</button>`;
    openDialog("#detailDialog");
  }
  $("#searchForm").addEventListener("submit", event => { event.preventDefault(); searchTerm = $("#searchInput").value.trim(); activeFilter = $("#categoryFilter").value; showSavedOnly = false; renderListings(); $("#listings").scrollIntoView({behavior:"smooth",block:"start"}); });
  $("#searchInput").addEventListener("input", () => { if ($("#searchInput").value.trim() === "") { searchTerm = ""; renderListings(); } });
  $("#categoryFilter").addEventListener("change", () => { activeFilter = $("#categoryFilter").value; showSavedOnly = false; renderListings(); });
  $$(".category-card").forEach(button => button.addEventListener("click", () => { activeFilter = button.dataset.category; showSavedOnly = false; $("#categoryFilter").value = activeFilter; searchTerm = ""; $("#searchInput").value = ""; renderListings(); $("#listings").scrollIntoView({behavior:"smooth",block:"start"}); }));
  $$(".filter-chip").forEach(button => button.addEventListener("click", () => { activeFilter = button.dataset.filter; showSavedOnly = false; renderListings(); }));
  $("#listingGrid").addEventListener("click", event => {
    const saveButton = event.target.closest("[data-save]");
    const detailButton = event.target.closest("[data-detail]");
    if (saveButton) { const id = saveButton.dataset.save; saved = saved.includes(id) ? saved.filter(value => value !== id) : [...saved,id]; writeStore("markt-saved",saved); renderListings(); showToast(saved.includes(id) ? "به ذخیره‌ها اضافه شد." : "از ذخیره‌ها حذف شد."); }
    else if (detailButton) showDetail(detailButton.dataset.detail);
  });
  $("#detailContent").addEventListener("click", event => { const button = event.target.closest("[data-detail-save]"); if (!button) return; const id = button.dataset.detailSave; saved = saved.includes(id) ? saved.filter(value => value !== id) : [...saved,id]; writeStore("markt-saved",saved); updateSavedCount(); showDetail(id); showToast(saved.includes(id) ? "به ذخیره‌ها اضافه شد." : "از ذخیره‌ها حذف شد."); });
  $("#savedToggle").addEventListener("click", () => { showSavedOnly = !showSavedOnly; activeFilter = "all"; searchTerm = ""; $("#searchInput").value = ""; $("#categoryFilter").value = "all"; renderListings(); $("#listings").scrollIntoView({behavior:"smooth",block:"start"}); });
  $("#showAll").addEventListener("click", () => { if (showSavedOnly) { showSavedOnly = false; activeFilter = "all"; searchTerm = ""; renderListings(); } else { activeFilter = "all"; searchTerm = ""; showSavedOnly = false; $("#searchInput").value = ""; $("#categoryFilter").value = "all"; renderListings(); showToast("همه نمونه‌های موجود نمایش داده شدند."); } });
  $("#resetSearch").addEventListener("click", () => { searchTerm = ""; activeFilter = "all"; showSavedOnly = false; $("#searchInput").value = ""; $("#categoryFilter").value = "all"; renderListings(); });
  $("#openListing").addEventListener("click", () => openDialog("#listingDialog"));
  $("#openRequest").addEventListener("click", () => openDialog("#requestDialog"));
  $("#listingForm").addEventListener("submit", event => { event.preventDefault(); addListing(event.currentTarget,false); });
  $("#requestForm").addEventListener("submit", event => { event.preventDefault(); addListing(event.currentTarget,true); });
  $$("[data-close]").forEach(button => button.addEventListener("click", () => closeDialog(button)));
  $$("dialog").forEach(dialog => dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); }));
  renderListings();
})();
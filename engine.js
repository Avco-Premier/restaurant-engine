async function loadConfig() {
    const res = await fetch("./site.json", { cache: "no-store" });
    if (!res.ok) throw new Error(`Failed to load site.json: ${res.status}`);
    return res.json();
  }
  
  function setText(id, value) {
    const el = document.getElementById(id);
    if (el) el.textContent = value ?? "";
  }
  
  function setHref(id, value) {
    const el = document.getElementById(id);
    if (el && value) el.setAttribute("href", value);
  }
  
  loadConfig()
    .then(cfg => {
      document.title = `${cfg.name} | Order Online`;
      document.documentElement.style.setProperty("--avco-blue", cfg.accent || "#304873");
  
      if (cfg.hero) {
        document.documentElement.style.setProperty("--hero-image", `url("${cfg.hero}")`);
      }
  
      setText("name", cfg.name);
      setText("taglineHeadline", cfg.taglineHeadline);
      setText("taglineSub", cfg.taglineSub);
      setText("phoneDisplay", cfg.phoneDisplay);
      setText("address", cfg.address);
  
      setHref("orderBtnTop", cfg.orderUrl);
      setHref("orderBtnHero", cfg.orderUrl);
  
      const phone = document.getElementById("phoneLink");
      if (phone && cfg.phoneRaw) phone.setAttribute("href", `tel:${cfg.phoneRaw}`);
    })
    .catch(err => {
      console.error(err);
      const banner = document.getElementById("error");
      if (banner) banner.textContent = err.message;
    });
  
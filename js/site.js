"use strict";

/**
 * Hành vi dùng chung cho mọi trang của cổng thông tin R.E.S.D.
 * Thứ tự nạp: config.js -> site.js -> (main.js | test-dinh-huong.js)
 */
(function () {
  const CFG = window.RESD_CONFIG || {};
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* --- Bộ nhớ cục bộ an toàn ------------------------------------------- */
  const store = {
    read(key, fallback) {
      try {
        const raw = localStorage.getItem(key);
        return raw === null ? fallback : JSON.parse(raw);
      } catch (err) {
        return fallback;
      }
    },
    write(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch (err) {
        return false;
      }
    },
    remove(key) {
      try { localStorage.removeItem(key); } catch (err) { /* bỏ qua */ }
    },
  };
  window.RESD_STORE = store;

  /* --- Thông báo ngắn --------------------------------------------------- */
  let toastEl;
  let toastTimer;
  function toast(message) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "toast-note";
      toastEl.setAttribute("role", "status");
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = message;
    toastEl.classList.add("is-on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("is-on"), 2600);
  }
  window.RESD_TOAST = toast;

  /* --- Điều hướng ------------------------------------------------------- */
  const menu = document.querySelector("#main-nav");
  const menuToggle = document.querySelector(".navbar-toggler");

  if (menu && menuToggle && window.bootstrap) {
    const collapse = bootstrap.Collapse.getOrCreateInstance(menu, { toggle: false });
    menu.addEventListener("click", (event) => {
      const link = event.target.closest("a[href]");
      if (link && !link.classList.contains("dropdown-toggle") && menu.classList.contains("show")) {
        collapse.hide();
      }
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menu.classList.contains("show")) {
        collapse.hide();
        menuToggle.focus();
      }
    });
    menu.addEventListener("shown.bs.collapse", () => menuToggle.setAttribute("aria-label", "Đóng menu điều hướng"));
    menu.addEventListener("hidden.bs.collapse", () => menuToggle.setAttribute("aria-label", "Mở menu điều hướng"));
  }

  /* Menu cấp 3: Bootstrap chỉ hỗ trợ hai cấp nên phần này tự xử lý. */
  document.querySelectorAll(".nav-l3 > .dropdown-item").forEach((trigger) => {
    const parent = trigger.parentElement;
    trigger.setAttribute("aria-expanded", "false");
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const open = parent.classList.toggle("is-open");
      trigger.setAttribute("aria-expanded", String(open));
      parent.parentElement.querySelectorAll(".nav-l3").forEach((other) => {
        if (other !== parent) {
          other.classList.remove("is-open");
          other.querySelector(".dropdown-item")?.setAttribute("aria-expanded", "false");
        }
      });
    });
  });

  document.querySelectorAll(".dropdown").forEach((drop) => {
    drop.addEventListener("hidden.bs.dropdown", () => {
      drop.querySelectorAll(".nav-l3.is-open").forEach((item) => {
        item.classList.remove("is-open");
        item.querySelector(".dropdown-item")?.setAttribute("aria-expanded", "false");
      });
    });
  });

  /* --- Liên kết ngoài lấy từ config ------------------------------------ */
  document.querySelectorAll("[data-config-link]").forEach((el) => {
    const key = el.dataset.configLink;
    const url = CFG[key];
    if (url) {
      el.setAttribute("href", url);
      el.removeAttribute("aria-disabled");
      if (key !== "contactEmail") {
        el.setAttribute("target", "_blank");
        el.setAttribute("rel", "noopener");
      }
    } else {
      el.setAttribute("href", "#");
      el.setAttribute("aria-disabled", "true");
      el.addEventListener("click", (event) => {
        event.preventDefault();
        toast("Liên kết đang chờ cập nhật từ Ban chuyên môn.");
      });
    }
  });

  /* --- Thanh tiến độ đọc ------------------------------------------------ */
  const readBar = document.querySelector(".read-bar");
  const toTop = document.querySelector(".to-top");

  function onScroll() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = max > 0 ? window.scrollY / max : 0;
    if (readBar) readBar.style.width = (ratio * 100).toFixed(2) + "%";
    if (toTop) toTop.classList.toggle("is-on", window.scrollY > 700);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  toTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  });

  /* --- Hiện nội dung khi cuộn tới -------------------------------------- */
  const revealables = document.querySelectorAll(".reveal");
  if (revealables.length && "IntersectionObserver" in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    revealables.forEach((el) => io.observe(el));
  } else {
    revealables.forEach((el) => el.classList.add("is-in"));
  }

  /* --- Đếm ngược -------------------------------------------------------- */
  const clock = document.querySelector("[data-countdown]");
  if (clock && CFG.event?.date) {
    const target = new Date(CFG.event.date).getTime();
    const cells = {
      d: clock.querySelector('[data-unit="d"]'),
      h: clock.querySelector('[data-unit="h"]'),
      m: clock.querySelector('[data-unit="m"]'),
      s: clock.querySelector('[data-unit="s"]'),
    };
    const done = clock.querySelector("[data-countdown-done]");

    const pad = (n) => String(n).padStart(2, "0");
    function tick() {
      const left = target - Date.now();
      if (left <= 0) {
        clock.hidden = true;
        if (done) done.hidden = false;
        clearInterval(timer);
        return;
      }
      const s = Math.floor(left / 1000);
      if (cells.d) cells.d.textContent = String(Math.floor(s / 86400));
      if (cells.h) cells.h.textContent = pad(Math.floor(s / 3600) % 24);
      if (cells.m) cells.m.textContent = pad(Math.floor(s / 60) % 60);
      if (cells.s) cells.s.textContent = pad(s % 60);
    }
    tick();
    const timer = setInterval(tick, 1000);
  }

  /* --- Hộ chiếu vũ trụ --------------------------------------------------
     Mỗi trang gắn data-stamp; khi ghé thăm sẽ đóng một con dấu vào hộ chiếu
     lưu trong trình duyệt của chính người dùng. Không gửi đi đâu cả.        */
  const STAMP_KEY = "resd.passport.v1";
  const STAMP_LIST = [
    { id: "home", label: "Trạm điều phối" },
    { id: "gioi-thieu", label: "Bản đồ R.E.S.D" },
    { id: "tcxd", label: "Sapphire" },
    { id: "pttn", label: "Diamond" },
    { id: "tt", label: "Ruby" },
    { id: "htnckh", label: "Emerald" },
    { id: "test", label: "Định vị toạ độ" },
    { id: "lien-he", label: "Kênh liên lạc" },
  ];

  const currentStamp = document.body.dataset.stamp;
  let stamps = store.read(STAMP_KEY, []);
  if (!Array.isArray(stamps)) stamps = [];
  if (currentStamp && !stamps.includes(currentStamp)) {
    stamps.push(currentStamp);
    store.write(STAMP_KEY, stamps);
  }

  function renderPassport() {
    const wrap = document.querySelector("[data-passport]");
    if (!wrap) return;
    const saved = store.read(STAMP_KEY, []);
    const got = Array.isArray(saved) ? saved : [];
    const total = STAMP_LIST.length;
    const count = STAMP_LIST.filter((s) => got.includes(s.id)).length;

    const list = wrap.querySelector("[data-passport-stamps]");
    if (list) {
      list.innerHTML = STAMP_LIST.map((s) => {
        const done = got.includes(s.id);
        return `<li class="${done ? "is-done" : ""}">${done ? "✦ " : "○ "}${s.label}</li>`;
      }).join("");
    }

    const num = wrap.querySelector("[data-passport-count]");
    if (num) num.textContent = count + "/" + total;

    const bar = wrap.querySelector(".passport-ring .bar");
    if (bar) {
      const r = Number(bar.getAttribute("r"));
      const c = 2 * Math.PI * r;
      bar.setAttribute("stroke-dasharray", c.toFixed(1));
      bar.setAttribute("stroke-dashoffset", (c * (1 - count / total)).toFixed(1));
    }

    const note = wrap.querySelector("[data-passport-note]");
    if (note) {
      note.textContent = count >= total
        ? "Đủ dấu. Bạn đã đi hết vũ trụ R.E.S.D, giờ là lúc chọn viên đá phù hợp với mình."
        : "Còn " + (total - count) + " trạm chưa ghé. Mỗi trang bạn mở sẽ được tự đóng dấu.";
    }
  }
  renderPassport();

  document.querySelector("[data-passport-reset]")?.addEventListener("click", () => {
    store.remove(STAMP_KEY);
    if (currentStamp) store.write(STAMP_KEY, [currentStamp]);
    renderPassport();
    toast("Đã xoá hộ chiếu trên trình duyệt này.");
  });

  /* --- Tìm kiếm nhanh --------------------------------------------------- */
  const INDEX = [
    { t: "Trang chủ", s: "Trạm điều phối chương trình R.E.S.D", u: "index.html" },
    { t: "R.E.S.D là gì", s: "Hành trình, giá trị nhận được, lộ trình tham gia", u: "gioi-thieu.html" },
    { t: "So sánh bốn ban", s: "Bảng đối chiếu nhịp việc, kỹ năng, sản phẩm", u: "gioi-thieu.html#so-sanh" },
    { t: "Test định hướng", s: "Bài kiểm tra 24 câu, bốn trục, gợi ý ban phù hợp", u: "test-dinh-huong.html" },
    { t: "Liên hệ", s: "Fanpage, email, câu hỏi thường gặp", u: "lien-he.html" },

    { t: "Ban Tổ chức - Xây dựng", s: "Sapphire · TC-XD · Nhân sự, Đối ngoại, Kỹ thuật", u: "ban-to-chuc-xay-dung.html" },
    { t: "Mảng Nhân sự (NS)", s: "TC-XD · Con người, văn hoá, gắn kết đội ngũ", u: "ban-to-chuc-xay-dung-ns.html", random: true },
    { t: "Mảng Đối ngoại (ĐN)", s: "TC-XD · Tài trợ, đối tác, hồ sơ hợp tác", u: "ban-to-chuc-xay-dung-dn.html", random: true },
    { t: "Mảng Kỹ thuật (KT)", s: "TC-XD · Sản phẩm số, website, kỹ thuật chương trình", u: "ban-to-chuc-xay-dung-kt.html", random: true },

    { t: "Ban Phong trào - Tình nguyện", s: "Diamond · PT-TN · Ban thống nhất, không chia mảng", u: "ban-phong-trao-tinh-nguyen.html", random: true },

    { t: "Ban Truyền thông", s: "Ruby · TT · IDEA, DEP", u: "ban-truyen-thong.html" },
    { t: "Mảng IDEA", s: "TT · Bài viết, kịch bản, giọng nói thương hiệu", u: "ban-truyen-thong-content.html", random: true },
    { t: "Mảng DEP", s: "TT · Thiết kế, ảnh, video, ấn phẩm", u: "ban-truyen-thong-dep.html", random: true },

    { t: "Ban Học tập - NCKH", s: "Emerald · HT-NCKH · Học tập, Nghiên cứu khoa học", u: "ban-hoc-tap-nckh.html" },
    { t: "Mảng Học tập (HT)", s: "HT-NCKH · Workshop, tài liệu, học thuật", u: "ban-hoc-tap-nckh-ht.html", random: true },
    { t: "Mảng NCKH", s: "HT-NCKH · Đề tài, cuộc thi nghiên cứu, cố vấn", u: "ban-hoc-tap-nckh-nckh.html", random: true },
  ];

  const palette = document.querySelector("[data-palette]");
  if (palette) {
    const input = palette.querySelector("input");
    const results = palette.querySelector(".palette-results");
    const empty = palette.querySelector(".palette-empty");
    let cursor = 0;
    let shown = [];
    let lastFocus = null;

    const strip = (s) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/gi, "d").toLowerCase();

    function draw(query) {
      const q = strip(query.trim());
      shown = q ? INDEX.filter((item) => strip(item.t + " " + item.s).includes(q)) : INDEX.slice(0, 8);
      cursor = 0;
      results.innerHTML = shown
        .map((item, i) => `<li class="${i === 0 ? "is-active" : ""}"><a href="${item.u}"><span class="t">${item.t}</span><span class="s">${item.s}</span></a></li>`)
        .join("");
      empty.hidden = shown.length > 0;
      results.hidden = shown.length === 0;
    }

    function move(step) {
      if (!shown.length) return;
      cursor = (cursor + step + shown.length) % shown.length;
      results.querySelectorAll("li").forEach((li, i) => li.classList.toggle("is-active", i === cursor));
      results.querySelectorAll("li")[cursor]?.scrollIntoView({ block: "nearest" });
    }

    function open() {
      lastFocus = document.activeElement;
      palette.hidden = false;
      input.value = "";
      draw("");
      input.focus();
    }

    function close() {
      palette.hidden = true;
      lastFocus?.focus?.();
    }

    document.querySelectorAll("[data-palette-open]").forEach((btn) => btn.addEventListener("click", open));
    palette.addEventListener("click", (event) => { if (event.target === palette) close(); });
    input.addEventListener("input", () => draw(input.value));

    palette.addEventListener("keydown", (event) => {
      if (event.key === "Escape") { event.preventDefault(); close(); }
      else if (event.key === "ArrowDown") { event.preventDefault(); move(1); }
      else if (event.key === "ArrowUp") { event.preventDefault(); move(-1); }
      else if (event.key === "Enter") {
        const link = results.querySelectorAll("li")[cursor]?.querySelector("a");
        if (link) { event.preventDefault(); window.location.href = link.getAttribute("href"); }
      }
    });

    document.addEventListener("keydown", (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        palette.hidden ? open() : close();
      }
    });
  }

  /* --- Bốc ngẫu nhiên một lựa chọn --------------------------------------
     Dùng lại chính bảng INDEX ở trên (7 mảng + Ban PT-TN). Chức năng tĩnh
     thuần client-side, dành cho người chưa biết bắt đầu đọc từ đâu. */
  document.querySelectorAll("[data-random-mang]").forEach((btn) => {
    const options = INDEX.filter((item) => item.random);
    btn.addEventListener("click", () => {
      if (!options.length) return;
      const pick = options[Math.floor(Math.random() * options.length)];
      toast("Đưa bạn tới " + pick.t + "…");
      setTimeout(() => { window.location.href = pick.u; }, 420);
    });
  });
})();

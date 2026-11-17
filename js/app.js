/* Avenida Burguer — lógica do site (sem dependências, sem rastreadores).
   - O carrinho guarda apenas { id: quantidade } no localStorage (nenhum dado pessoal).
   - Preços vêm SEMPRE de MENU (menu-data.js); o localStorage nunca define preço.
   - Nome/endereço do cliente só existem em memória para montar a mensagem do WhatsApp. */
(function () {
  "use strict";

  const MENU = window.MENU;
  const STORAGE_KEY = "avenida-burguer-cart-v1";
  const $ = (s, el = document) => el.querySelector(s);

  const ITEMS = new Map();
  MENU.categories.forEach(c => c.items.forEach(i => ITEMS.set(i.id, i)));

  const brl = cents => (cents / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  /* ---------- Carrinho ---------- */
  let cart = loadCart();

  function loadCart() {
    try {
      const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      const clean = {};
      Object.keys(raw).forEach(id => {
        const q = Number(raw[id]);
        if (ITEMS.has(id) && Number.isInteger(q) && q > 0) clean[id] = Math.min(q, 99);
      });
      return clean;
    } catch (_) { return {}; }
  }
  function saveCart() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); } catch (_) { /* modo privado */ }
  }
  const count = () => Object.values(cart).reduce((a, b) => a + b, 0);
  const total = () => Object.entries(cart).reduce((s, [id, q]) => s + ITEMS.get(id).price * q, 0);

  function setQty(id, q) {
    if (!ITEMS.has(id)) return;
    if (q <= 0) delete cart[id]; else cart[id] = Math.min(q, 99);
    saveCart();
    renderCart();
  }

  /* ---------- Ícones decorativos dos cards (sem fotos de terceiros) ---------- */
  function icon(kind) {
    const ns = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", "0 0 64 64");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    const paths = {
      burger: '<path d="M10 28c0-10 10-18 22-18s22 8 22 18z" fill="#f26a1b"/><rect x="8" y="31" width="48" height="5" rx="2.5" fill="#4caf50"/><rect x="10" y="37" width="44" height="7" rx="3.5" fill="#5b3524"/><path d="M10 46h44c0 6-5 8-10 8H20c-5 0-10-2-10-8z" fill="#f2a33a"/><g fill="#fff"><ellipse cx="24" cy="20" rx="2" ry="1.2"/><ellipse cx="34" cy="16" rx="2" ry="1.2"/><ellipse cx="43" cy="21" rx="2" ry="1.2"/></g>',
      hotdog: '<rect x="6" y="26" width="52" height="16" rx="8" fill="#f2a33a"/><rect x="4" y="29" width="56" height="8" rx="4" fill="#c4452c"/><path d="M10 32q6-5 12 0t12 0 12 0 8 0" stroke="#ffd23f" stroke-width="3" fill="none" stroke-linecap="round"/>',
      fries: '<path d="M14 26 20 8h4l-2 18zm10 0 4-18h4l-2 18zm10 0 4-18h4l-2 18zm10 0 4-14h4l-4 14z" fill="#ffd23f"/><path d="M12 26h40l-5 30H17z" fill="#f26a1b"/>',
      drink: '<path d="M18 12h28l-4 44H22z" fill="#2b2b2b"/><path d="M20 22h24l-.9 10H20.9z" fill="#f26a1b" opacity=".35"/><rect x="16" y="8" width="32" height="6" rx="3" fill="#f26a1b"/>'
    };
    svg.innerHTML = paths[kind] || paths.burger; // conteúdo estático, sem dados do usuário
    return svg;
  }

  /* ---------- Cardápio ---------- */
  const tabsEl = $("#tabs");
  const panel = $("#menu-panel");
  let activeCat = MENU.categories[0].id;

  function renderTabs() {
    tabsEl.replaceChildren();
    MENU.categories.forEach(cat => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "tab";
      b.setAttribute("role", "tab");
      b.id = "tab-" + cat.id;
      b.setAttribute("aria-selected", String(cat.id === activeCat));
      b.setAttribute("aria-controls", "menu-panel");
      b.tabIndex = cat.id === activeCat ? 0 : -1;
      b.textContent = cat.name;
      b.addEventListener("click", () => selectCat(cat.id));
      b.addEventListener("keydown", e => {
        const ids = MENU.categories.map(c => c.id);
        let i = ids.indexOf(cat.id);
        if (e.key === "ArrowRight") i = (i + 1) % ids.length;
        else if (e.key === "ArrowLeft") i = (i - 1 + ids.length) % ids.length;
        else return;
        e.preventDefault();
        selectCat(ids[i], true);
      });
      tabsEl.appendChild(b);
    });
    panel.setAttribute("aria-labelledby", "tab-" + activeCat);
  }

  function selectCat(id, focus) {
    activeCat = id;
    renderTabs();
    renderMenu();
    if (focus) $("#tab-" + id).focus();
  }

  function renderMenu() {
    const cat = MENU.categories.find(c => c.id === activeCat);
    panel.replaceChildren();
    cat.items.forEach(item => {
      const card = document.createElement("article");
      card.className = "card";

      const art = document.createElement("div");
      art.className = "card-art";
      art.appendChild(icon(cat.icon));
      if (item.tag) {
        const t = document.createElement("span");
        t.className = "tag";
        t.textContent = item.tag;
        art.appendChild(t);
      }

      const h = document.createElement("h3");
      h.textContent = item.name;
      const p = document.createElement("p");
      p.className = "card-desc";
      p.textContent = item.desc;

      const foot = document.createElement("div");
      foot.className = "card-foot";
      const price = document.createElement("span");
      price.className = "price";
      price.textContent = brl(item.price);
      const add = document.createElement("button");
      add.type = "button";
      add.className = "btn btn-primary btn-sm";
      add.textContent = "Adicionar";
      add.setAttribute("aria-label", "Adicionar " + item.name + " ao pedido");
      add.addEventListener("click", () => {
        setQty(item.id, (cart[item.id] || 0) + 1);
        toast(item.name + " adicionado ao pedido");
      });
      foot.append(price, add);

      card.append(art, h, p, foot);
      panel.appendChild(card);
    });
  }

  /* ---------- Renderização do pedido ---------- */
  const listEl = $("#cart-list");

  function renderCart() {
    const n = count();
    $("#cart-count").textContent = n;
    $("#cart-count").hidden = n === 0;
    $("#open-cart").setAttribute("aria-label", "Abrir pedido. Itens: " + n);

    listEl.replaceChildren();
    Object.entries(cart).forEach(([id, q]) => {
      const item = ITEMS.get(id);
      const li = document.createElement("li");
      li.className = "cart-item";

      const info = document.createElement("div");
      info.className = "cart-info";
      const name = document.createElement("strong");
      name.textContent = item.name;
      const sub = document.createElement("span");
      sub.textContent = brl(item.price * q);
      info.append(name, sub);

      const ctr = document.createElement("div");
      ctr.className = "qty";
      const minus = qtyBtn("−", "Diminuir quantidade de " + item.name, () => setQty(id, q - 1));
      const val = document.createElement("span");
      val.className = "qty-val";
      val.textContent = q;
      val.setAttribute("aria-label", q + (q === 1 ? " unidade" : " unidades"));
      const plus = qtyBtn("+", "Aumentar quantidade de " + item.name, () => setQty(id, q + 1));
      const rm = qtyBtn("✕", "Remover " + item.name + " do pedido", () => setQty(id, 0));
      rm.classList.add("rm");
      ctr.append(minus, val, plus, rm);

      li.append(info, ctr);
      listEl.appendChild(li);
    });

    const empty = n === 0;
    $("#cart-empty").hidden = !empty;
    $("#order-form").hidden = empty;
    $("#total-row").hidden = empty;
    $("#total-note").hidden = empty;
    $("#cart-total").textContent = brl(total());
  }

  function qtyBtn(label, aria, fn) {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "qty-btn";
    b.textContent = label;
    b.setAttribute("aria-label", aria);
    b.addEventListener("click", fn);
    return b;
  }

  /* ---------- Drawer ---------- */
  const drawer = $("#drawer");
  const overlay = $("#overlay");
  let lastFocus = null;

  function openDrawer() {
    lastFocus = document.activeElement;
    drawer.hidden = false;
    overlay.hidden = false;
    document.body.classList.add("no-scroll");
    $("#close-cart").focus();
  }
  function closeDrawer() {
    drawer.hidden = true;
    overlay.hidden = true;
    document.body.classList.remove("no-scroll");
    if (lastFocus) lastFocus.focus();
  }
  $("#open-cart").addEventListener("click", openDrawer);
  $("#close-cart").addEventListener("click", closeDrawer);
  overlay.addEventListener("click", closeDrawer);
  document.addEventListener("keydown", e => {
    if (drawer.hidden) return;
    if (e.key === "Escape") { closeDrawer(); return; }
    if (e.key === "Tab") { // mantém o foco dentro do diálogo
      const f = [...drawer.querySelectorAll("button, input, select, textarea, a[href]")].filter(x => !x.closest("[hidden]") && !x.disabled);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* ---------- Formulário e WhatsApp ---------- */
  const form = $("#order-form");
  const addressField = $("#address-field");

  form.addEventListener("change", e => {
    if (e.target.name === "mode") {
      const delivery = form.mode.value === "Entrega";
      addressField.hidden = !delivery;
      if (!delivery) setError("address", "");
    }
  });

  function clean(str, max) {
    // remove caracteres de controle e limita o tamanho
    return String(str).replace(/[\u0000-\u001F\u007F]/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
  }
  function setError(field, msg) {
    const input = $("#f-" + field);
    const err = $("#e-" + field);
    err.textContent = msg;
    if (msg) input.setAttribute("aria-invalid", "true"); else input.removeAttribute("aria-invalid");
  }

  form.addEventListener("submit", e => {
    e.preventDefault();
    if (count() === 0) { toast("Adicione itens ao pedido primeiro."); return; }

    const name = clean(form.name.value, 60);
    const mode = form.mode.value === "Retirada" ? "Retirada" : "Entrega";
    const address = clean(form.address.value, 160);
    const pay = ["Pix", "Dinheiro", "Cartão"].includes(form.pay.value) ? form.pay.value : "Pix";
    const notes = clean(form.notes.value, 300);

    let ok = true;
    setError("name", ""); setError("address", "");
    if (name.length < 2) { setError("name", "Informe seu nome (mínimo 2 letras)."); ok = false; }
    if (mode === "Entrega" && address.length < 8) { setError("address", "Informe rua, número e bairro para a entrega."); ok = false; }
    if (!ok) { (form.querySelector("[aria-invalid='true']") || form.name).focus(); return; }

    const lines = ["*Novo pedido — Avenida Burguer*", "", "Nome: " + name, "Tipo: " + mode];
    if (mode === "Entrega") lines.push("Endereço: " + address);
    lines.push("", "*Itens:*");
    Object.entries(cart).forEach(([id, q]) => {
      const it = ITEMS.get(id);
      lines.push(q + "x " + it.name + " — " + brl(it.price * q));
    });
    lines.push("", "Subtotal: " + brl(total()), "(Taxa de entrega, se houver, a confirmar)", "Pagamento: " + pay);
    if (notes) lines.push("Observações: " + notes);

    const url = "https://wa.me/" + MENU.whatsapp + "?text=" + encodeURIComponent(lines.join("\n"));
    const w = window.open(url, "_blank", "noopener");
    if (!w) window.location.href = url; // pop-up bloqueado
    toast("Abrindo o WhatsApp… envie a mensagem lá para concluir.");
  });

  $("#clear-cart").addEventListener("click", () => {
    cart = {}; saveCart(); renderCart(); toast("Pedido limpo.");
  });

  /* ---------- Navegação mobile ---------- */
  const toggle = $("#menu-toggle");
  const nav = $("#main-nav");
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fechar menu de navegação" : "Abrir menu de navegação");
  });
  nav.addEventListener("click", e => {
    if (e.target.tagName === "A") { nav.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); }
  });

  /* ---------- Toast ---------- */
  let toastTimer;
  function toast(msg) {
    const t = $("#toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove("show"), 2600);
  }

  /* ---------- Init ---------- */
  $("#year").textContent = new Date().getFullYear();
  renderTabs();
  renderMenu();
  renderCart();
})();

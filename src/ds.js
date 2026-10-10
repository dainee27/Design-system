/**
 * Design System — 최소한의 인터랙션 스크립트 (의존성 없음)
 *
 *  - Tabs:   [data-ds-tabs] 내부의 role="tab" / role="tabpanel" 연결, 방향키 지원
 *  - Modal:  [data-ds-open="dialogId"] 클릭 시 <dialog> 열기, [data-ds-close] 로 닫기
 *  - Toast:  DS.toast("메시지")
 *  - Theme:  DS.setTheme("light" | "dark" | "system")
 */
(function () {
  "use strict";

  function initTabs(root) {
    const tabs = Array.from(root.querySelectorAll('[role="tab"]'));
    const select = (tab, focus) => {
      tabs.forEach((t) => {
        const selected = t === tab;
        t.setAttribute("aria-selected", String(selected));
        t.tabIndex = selected ? 0 : -1;
        const panel = document.getElementById(t.getAttribute("aria-controls"));
        if (panel) panel.hidden = !selected;
      });
      if (focus) tab.focus();
    };
    tabs.forEach((tab, i) => {
      tab.addEventListener("click", () => select(tab));
      tab.addEventListener("keydown", (e) => {
        const step = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
        if (step) {
          e.preventDefault();
          select(tabs[(i + step + tabs.length) % tabs.length], true);
        } else if (e.key === "Home") {
          e.preventDefault();
          select(tabs[0], true);
        } else if (e.key === "End") {
          e.preventDefault();
          select(tabs[tabs.length - 1], true);
        }
      });
    });
    select(tabs.find((t) => t.getAttribute("aria-selected") === "true") || tabs[0]);
  }

  function initModals() {
    document.addEventListener("click", (e) => {
      const opener = e.target.closest("[data-ds-open]");
      if (opener) {
        const dialog = document.getElementById(opener.dataset.dsOpen);
        if (dialog && typeof dialog.showModal === "function") dialog.showModal();
        return;
      }
      const closer = e.target.closest("[data-ds-close]");
      if (closer) {
        closer.closest("dialog")?.close(closer.dataset.dsClose || "");
        return;
      }
      // backdrop click
      if (e.target instanceof HTMLDialogElement && e.target.classList.contains("ds-modal")) {
        const r = e.target.getBoundingClientRect();
        const inside =
          e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
        if (!inside) e.target.close();
      }
    });
  }

  function toast(message, { duration = 3200 } = {}) {
    let region = document.querySelector(".ds-toast-region");
    if (!region) {
      region = document.createElement("div");
      region.className = "ds-toast-region";
      region.setAttribute("role", "status");
      region.setAttribute("aria-live", "polite");
      document.body.appendChild(region);
    }
    const el = document.createElement("div");
    el.className = "ds-toast";
    el.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg><span></span>';
    el.querySelector("span").textContent = message;
    region.appendChild(el);
    setTimeout(() => {
      el.setAttribute("data-leaving", "");
      el.addEventListener("animationend", () => el.remove(), { once: true });
      setTimeout(() => el.remove(), 400);
    }, duration);
  }

  function setTheme(mode) {
    const root = document.documentElement;
    if (mode === "light" || mode === "dark") root.dataset.theme = mode;
    else delete root.dataset.theme;
    try {
      localStorage.setItem("ds-theme", mode);
    } catch (_) {}
  }

  function getTheme() {
    try {
      return localStorage.getItem("ds-theme") || "system";
    } catch (_) {
      return "system";
    }
  }

  function init() {
    document.querySelectorAll("[data-ds-tabs]").forEach(initTabs);
    initModals();
  }

  window.DS = { toast, setTheme, getTheme, init };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();

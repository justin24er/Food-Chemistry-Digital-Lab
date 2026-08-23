/* ============================================================
   NAVIGATION
   ============================================================ */
export function initNavigation(){
  const nav = document.querySelector(".main-nav");
  const toggle = document.querySelector(".nav-toggle");
  if (toggle && nav){
    toggle.addEventListener("click", ()=>{
      nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", nav.classList.contains("is-open"));
    });
    nav.querySelectorAll("a").forEach(a=>a.addEventListener("click", ()=>nav.classList.remove("is-open")));
  }

  const links = document.querySelectorAll(".main-nav a[href^='#']");
  const sections = Array.from(links).map(l => document.querySelector(l.getAttribute("href"))).filter(Boolean);
  if (!sections.length) return;
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      const id = "#" + entry.target.id;
      const link = document.querySelector(`.main-nav a[href="${id}"]`);
      if (!link) return;
      if (entry.isIntersecting) links.forEach(l=>l.classList.remove("is-active")), link.classList.add("is-active");
    });
  }, { rootMargin: "-40% 0px -50% 0px" });
  sections.forEach(s=>io.observe(s));
}

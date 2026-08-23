/* ============================================================
   ACCESSIBILITY
   ============================================================ */
export function initReveal(){
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const items = document.querySelectorAll(".reveal");
  if (reduced || !("IntersectionObserver" in window)){
    items.forEach(i=>i.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if (e.isIntersecting){ e.target.classList.add("is-visible"); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  items.forEach(i=>io.observe(i));
}

export function initSkipLink(){
  const link = document.querySelector(".skip-link");
  const main = document.getElementById("main");
  if (link && main){
    link.addEventListener("click", (e)=>{
      e.preventDefault();
      main.setAttribute("tabindex","-1");
      main.focus();
    });
  }
}

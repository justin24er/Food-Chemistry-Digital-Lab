/* ============================================================
   MAIN — application entry point
   ============================================================ */
import { PRACTICALS } from "./data/practicals-data.js";
import { ORIENTATION, SAFETY_RULES } from "./data/manual-core.js";
import * as State from "./state.js";
import { el } from "./instrument-widgets.js";
import { initPracticalEngine, openPractical } from "./practical-engine.js";
import { buildOrientation } from "./orientation-engine.js";
import { mountHeroScene } from "./webgl-scene.js";
import { initNavigation } from "./navigation.js";
import { initReveal, initSkipLink } from "./accessibility.js";

document.addEventListener("DOMContentLoaded", () => {
  initSkipLink();
  initNavigation();
  initPracticalEngine();
  renderPracticalGrid();
  renderSafetyAccordion();
  buildOrientation(document.getElementById("orientation-mount"));
  mountHeroScene(document.getElementById("hero-stage"));
  wireOrientationCTA();
  initReveal();
  renderYear();
});

function statusDots(id, steps){
  const states = State.stageProgress(id, steps);
  const order = ["safety","preparation","procedure","measurement","calculation","result","report"];
  return order.map(key => el("span", { class:"status-dot", "data-state": states[key] === "locked" ? "" : states[key] }));
}

function renderPracticalGrid(){
  const grid = document.getElementById("practical-grid");
  if (!grid) return;
  grid.innerHTML = "";

  const orientationCard = el("button", { class: "practical-card reveal", type: "button", onclick: ()=>{ document.getElementById("orientation").scrollIntoView({ behavior:"smooth" }); } }, [
    el("div", { class: "card-top" }, [ el("span", { class:"p-num" }, "Practical 1"), el("span", { class:"card-arrow" }, "\u2197") ]),
    el("h3", {}, "Laboratory Orientation"),
    el("p", {}, "Safety equipment, laboratory conduct and emergency procedures — start here before any practical."),
    el("div", { class: "status-row" }, [ el("span", { class:"status-dot", "data-state": State.getOrientationVisited().length ? "active" : "" }) ])
  ]);
  grid.appendChild(orientationCard);

  PRACTICALS.forEach(pr => {
    const card = el("button", { class: "practical-card reveal", type: "button", onclick: ()=>openPractical(pr.id) }, [
      el("div", { class: "card-top" }, [ el("span", { class:"p-num" }, "Practical " + pr.number), el("span", { class:"card-arrow" }, "\u2197") ]),
      el("h3", {}, pr.shortTitle),
      el("p", {}, pr.objective),
      el("div", { class: "status-row" }, statusDots(pr.id, pr.procedure.length))
    ]);
    grid.appendChild(card);
  });
}

function renderSafetyAccordion(){
  const wrap = document.getElementById("safety-accordion");
  if (!wrap) return;
  wrap.innerHTML = "";
  SAFETY_RULES.forEach((group, i) => {
    const item = el("div", { class: "accordion-item" + (i===0 ? " is-open" : "") });
    const trigger = el("button", { class: "accordion-trigger" }, [
      el("span", {}, `${group.group}. ${group.title}`),
      el("span", { class: "plus" }, i===0 ? "\u2212" : "+")
    ]);
    const panel = el("div", { class: "accordion-panel" });
    const ul = el("ul", { class: "bullet-list" });
    group.points.forEach(pt => ul.appendChild(el("li", {}, pt)));
    panel.appendChild(ul);
    trigger.addEventListener("click", ()=>{
      const open = item.classList.toggle("is-open");
      trigger.querySelector(".plus").textContent = open ? "\u2212" : "+";
    });
    item.appendChild(trigger); item.appendChild(panel);
    wrap.appendChild(item);
  });
}

function wireOrientationCTA(){
  const btn = document.getElementById("enter-lab-cta");
  if (btn) btn.addEventListener("click", ()=> document.getElementById("practicals").scrollIntoView({ behavior:"smooth" }));
}

function renderYear(){
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
}

window.addEventListener("practical:closed", renderPracticalGrid);

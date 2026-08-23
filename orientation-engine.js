/* ============================================================
   ORIENTATION ENGINE — Practical 1: Laboratory Orientation
   Interactive floor-plan hotspots for the manual's Health and
   Safety Equipment list (section 1.1).
   ============================================================ */
import { el } from "./instrument-widgets.js";
import { ORIENTATION } from "./data/manual-core.js";
import * as State from "./state.js";

export function buildOrientation(container){
  container.innerHTML = "";

  const wrap = el("div", { class: "two-col" });
  const planCol = el("div", {});
  const floor = el("div", { class: "floorplan", role:"group", "aria-label":"Laboratory floor plan" });
  floor.appendChild(el("div", { class: "floor-bench", style:"left:38%;top:36%;width:24%;height:18%;" }));

  const detail = el("div", { class: "orientation-detail" }, [
    el("div", { class: "eyebrow" }, "Select an item"),
    el("p", {}, "Click any marker on the floor plan to learn its purpose, correct use, and the manual's safety instruction.")
  ]);

  ORIENTATION.equipment.forEach(item=>{
    const visited = State.getOrientationVisited().includes(item.id);
    const btn = el("button", {
      class: "hotspot", style: `left:${item.x}%; top:${item.y}%;`,
      "data-visited": visited ? "true" : "false",
      "aria-label": item.label,
      type: "button"
    }, [el("span", { "aria-hidden":"true" }, iconFor(item.id))]);
    btn.appendChild(el("span", { class: "hotspot-label" }, item.label));
    btn.addEventListener("click", ()=>{
      State.markOrientationVisited(item.id);
      btn.dataset.visited = "true";
      renderDetail(item);
      updateProgress();
    });
    floor.appendChild(btn);
  });
  planCol.appendChild(floor);

  const progressLine = el("p", { class: "mono", style:"font-size:.78rem;margin-top:1rem;" }, "");
  planCol.appendChild(progressLine);

  function updateProgress(){
    const visited = State.getOrientationVisited().length;
    const total = ORIENTATION.equipment.length;
    progressLine.textContent = `${visited} / ${total} safety items reviewed`;
  }
  updateProgress();

  function renderDetail(item){
    detail.innerHTML = "";
    detail.appendChild(el("div", { class: "tag chip chip-accent" }, item.label));
    detail.appendChild(el("h4", {}, "Purpose"));
    detail.appendChild(el("p", {}, item.purpose));
    detail.appendChild(el("h4", {}, "Correct use"));
    detail.appendChild(el("p", {}, item.usage));
  }

  wrap.appendChild(planCol);
  wrap.appendChild(detail);
  container.appendChild(wrap);
}

function iconFor(id){
  const map = {
    exit: "\u2192\u25A1", phone: "\u260E", alarm: "\u26A0", extinguisher: "\u{1F9EF}",
    shower: "\u2614", eyewash: "\u{1F441}", firstaid: "+", bench: "\u2261"
  };
  return map[id] || "\u25CF";
}

/* ============================================================
   INSTRUMENT WIDGETS
   Small, functional simulated-instrument builders shared across
   practicals. Each returns a DOM node plus a control API.
   ============================================================ */

export function el(tag, attrs = {}, children = []){
  const node = document.createElement(tag);
  for (const [k,v] of Object.entries(attrs)){
    if (v === undefined || v === false || v === null) continue;
    if (k === "class") node.className = v;
    else if (k === "html") node.innerHTML = v;
    else if (k.startsWith("on") && typeof v === "function") node.addEventListener(k.slice(2), v);
    else if (v === true) node.setAttribute(k, "");
    else node.setAttribute(k, v);
  }
  (Array.isArray(children) ? children : [children]).forEach(c=>{
    if (c === null || c === undefined) return;
    node.appendChild(c instanceof Node ? c : document.createTextNode(String(c)));
  });
  return node;
}

/* ---------- analytical balance ---------- */
export function buildBalance({ label = "Sample mass" } = {}){
  const display = el("div", { class: "balance-plate" }, "0.000");
  const wrap = el("div", {}, [
    el("div", { class: "eyebrow" }, label),
    display
  ]);
  return {
    node: wrap,
    setValue(v){ display.textContent = (Number(v)||0).toFixed(3); }
  };
}

/* ---------- burette / titration flask ---------- */
export function buildBurette({ capacity = 25 } = {}){
  const fill = el("div", { class: "fill", style: "height:0%" });
  const burette = el("div", { class: "burette" }, [fill]);
  for (let i=1;i<5;i++){
    burette.appendChild(el("div", { class:"tick", style:`bottom:${(i/5)*100}%` }));
  }
  const liquidPath = document.createElementNS("http://www.w3.org/2000/svg","path");
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS,"svg");
  svg.setAttribute("viewBox","0 0 100 100");
  const flaskOutline = document.createElementNS(svgNS,"path");
  flaskOutline.setAttribute("d","M40,10 L40,35 L15,85 Q15,95 30,95 L70,95 Q85,95 85,85 L60,35 L60,10 Z");
  flaskOutline.setAttribute("fill","none");
  flaskOutline.setAttribute("stroke","var(--ink)");
  flaskOutline.setAttribute("stroke-width","2.2");
  const liquid = document.createElementNS(svgNS,"path");
  liquid.setAttribute("class","liquid");
  liquid.setAttribute("d","M22,88 Q22,93 30,93 L70,93 Q78,93 78,88 L68,60 L32,60 Z");
  liquid.setAttribute("fill","#f4e7c8");
  svg.appendChild(liquid);
  svg.appendChild(flaskOutline);
  const flaskWrap = el("div", { class: "titration-flask" }, [svg]);
  const node = el("div", { class: "burette-wrap" }, [burette, flaskWrap]);
  return {
    node,
    setVolume(vol){
      const pct = Math.max(0, Math.min(100, (vol/capacity)*100));
      fill.style.height = pct + "%";
    },
    setLiquidColor(hex){ liquid.setAttribute("fill", hex); }
  };
}

/* ---------- pH meter ---------- */
export function buildPhMeter(){
  const big = el("div", { class: "big mono" }, "7.00");
  const marker = el("div", { class: "marker", style: "left:50%" });
  const scale = el("div", { class: "ph-scale" }, [marker]);
  const node = el("div", { class: "ph-dial" }, [
    el("div", { class: "eyebrow" }, "pH"),
    big, scale
  ]);
  return {
    node,
    setPh(v){
      big.textContent = Number(v).toFixed(2);
      marker.style.left = Math.max(0, Math.min(100, (v/14)*100)) + "%";
    }
  };
}

/* ---------- refractometer eyepiece ---------- */
export function buildRefractometer(){
  const split = el("div", { class: "split", style: "top:50%; bottom:0;" });
  const view = el("div", { class: "refractometer-view" }, [
    split, el("div", { class: "crosshair" })
  ]);
  const node = el("div", {}, [view]);
  return {
    node,
    setBrix(brix, maxBrix = 32){
      const pct = Math.max(4, Math.min(96, 100 - (brix/maxBrix)*100));
      split.style.top = pct + "%";
    }
  };
}

/* ---------- furnace temperature gauge ---------- */
export function buildFurnaceGauge(){
  const fill = el("div", { class: "fill", style: "width:0%" });
  const bar = el("div", { class: "furnace-bar" }, [fill]);
  const label = el("span", { class: "mono" }, "20 \u00B0C");
  const node = el("div", { class: "furnace-gauge" }, [bar, label]);
  return {
    node,
    setTemp(t, max=600){
      fill.style.width = Math.max(0,Math.min(100,(t/max)*100)) + "%";
      label.textContent = Math.round(t) + " \u00B0C";
    }
  };
}

/* ---------- HPLC chromatogram ---------- */
export function buildChromatogram(sugars){
  const canvas = el("canvas", { width: 900, height: 440 });
  const legend = el("div", { class: "peak-legend" }, sugars.map(s => el("span", {}, [
    el("span", { class: "peak-swatch", style: `background:${s.color}` }), s.label + " (" + s.retention.toFixed(1) + " min)"
  ])));
  const node = el("div", { class: "chromatogram-card" }, [canvas, legend]);

  function draw(activeId, peakHeightNorm){
    const ctx = canvas.getContext("2d");
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0,0,w,h);
    ctx.fillStyle = "#FBFAF5";
    ctx.fillRect(0,0,w,h);
    // axes
    ctx.strokeStyle = "#BEBAA6";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(40, h-30); ctx.lineTo(w-20, h-30); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(40, 20); ctx.lineTo(40, h-30); ctx.stroke();
    ctx.fillStyle = "#868475";
    ctx.font = "12px monospace";
    ctx.fillText("Retention time (min) \u2192", w/2-70, h-8);
    ctx.save();
    ctx.translate(14, h/2+40); ctx.rotate(-Math.PI/2);
    ctx.fillText("Detector response", 0, 0);
    ctx.restore();

    const maxRt = Math.max(...sugars.map(s=>s.retention)) + 1.5;
    const baseline = h-30;
    const usableW = w-70;
    sugars.forEach(s => {
      const isActive = s.id === activeId;
      const peakH = (isActive ? peakHeightNorm : 0.28) * (h-90);
      const cx = 40 + (s.retention/maxRt)*usableW;
      ctx.beginPath();
      ctx.moveTo(cx-26, baseline);
      ctx.bezierCurveTo(cx-10, baseline, cx-6, baseline-peakH, cx, baseline-peakH);
      ctx.bezierCurveTo(cx+6, baseline-peakH, cx+10, baseline, cx+26, baseline);
      ctx.strokeStyle = isActive ? s.color : "#D8D4C4";
      ctx.lineWidth = isActive ? 2.4 : 1.4;
      ctx.stroke();
      ctx.fillStyle = "#4B4A40";
      ctx.font = "11px monospace";
      ctx.fillText(s.label, cx-16, baseline+16);
    });
  }
  return { node, draw };
}

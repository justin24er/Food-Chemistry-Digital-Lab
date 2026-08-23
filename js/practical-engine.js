/* ============================================================
   PRACTICAL ENGINE
   Renders the interactive workspace (safety -> apparatus ->
   procedure -> measurement -> calculation -> acceptance ->
   report) for any practical defined in practicals-data.js.
   ============================================================ */
import { getPractical } from "./data/practicals-data.js";
import { REPORT_GUIDELINES } from "./data/manual-core.js";
import * as State from "./state.js";
import { CALCULATORS, checkDuplicatePct, checkRange, round } from "./calculation-engine.js";
import { el, buildBalance, buildBurette, buildPhMeter, buildRefractometer, buildFurnaceGauge, buildChromatogram } from "./instrument-widgets.js";
import { feedbackFor } from "./feedback-engine.js";
import { buildReportPanel } from "./report-engine.js";

let activePractical = null;
let scrimNode, modalNode, panelNode;

export function initPracticalEngine(){
  scrimNode = document.getElementById("modal-scrim");
  modalNode = document.getElementById("lab-modal");
  panelNode = document.getElementById("lab-panel");
  scrimNode.addEventListener("click", closePractical);
  document.addEventListener("keydown", (e)=>{ if (e.key === "Escape") closePractical(); });
}

export function openPractical(id){
  const data = getPractical(id);
  if (!data) return;
  activePractical = data;
  panelNode.innerHTML = "";
  panelNode.appendChild(renderWorkspace(data));
  modalNode.classList.add("is-open");
  scrimNode.classList.add("is-open");
  document.body.style.overflow = "hidden";
  panelNode.scrollTop = 0;
  const closeBtn = panelNode.querySelector(".lab-close");
  if (closeBtn) closeBtn.focus();
}

export function closePractical(){
  modalNode.classList.remove("is-open");
  scrimNode.classList.remove("is-open");
  document.body.style.overflow = "";
  window.dispatchEvent(new CustomEvent("practical:closed"));
}

function tag(text, kind){
  return el("span", { class: "chip" + (kind ? " chip-"+kind : "") }, text);
}

function renderWorkspace(data){
  const pState = State.getPracticalState(data.id);
  const root = el("div", {});

  /* ---- header ---- */
  const head = el("div", { class: "lab-panel-head" }, [
    el("div", {}, [
      el("div", { class: "eyebrow" }, `Practical ${data.number}`),
      el("h2", {}, data.title)
    ]),
    el("button", { class: "lab-close", "aria-label": "Close practical", onclick: closePractical }, "\u2715")
  ]);
  root.appendChild(head);

  const body = el("div", { class: "lab-panel-body" });
  root.appendChild(body);

  /* ---- progress tracker ---- */
  const progress = el("div", { class: "progress-track" });
  const stageLabels = [["safety","Safety"],["preparation","Apparatus"],["procedure","Procedure"],["measurement","Measurement"],["calculation","Calculation"],["result","Result"],["report","Report"]];
  const states = State.stageProgress(data.id, data.procedure.length);
  stageLabels.forEach(([key,label])=>{
    progress.appendChild(el("div", { class:"progress-step", "data-state": states[key] }, [
      el("span", { class: "mark" }, states[key] === "done" ? "\u2713" : states[key] === "active" ? "\u25CF" : "\u25CB"),
      label
    ]));
  });
  body.appendChild(progress);

  /* ---- mode toggle ---- */
  const modeToggle = el("div", { class: "mode-toggle", style:"margin-bottom:1.2rem;" }, [
    el("button", { class: State.getMode()==="learning"?"is-active":"", onclick: ()=>{ State.setMode("learning"); openPractical(data.id); } }, "Learning mode"),
    el("button", { class: State.getMode()==="assessment"?"is-active":"", onclick: ()=>{ State.setMode("assessment"); openPractical(data.id); } }, "Assessment mode")
  ]);
  body.appendChild(modeToggle);

  /* ---- tabs ---- */
  const tabsBar = el("div", { class: "lab-tabs", role:"tablist" });
  const tabPanelsWrap = el("div", {});
  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "materials", label: "Materials & Apparatus" },
    { id: "safety", label: "Safety" },
    { id: "procedure", label: "Procedure" },
    { id: "measure", label: "Measure & Calculate" },
    { id: "results", label: "Results" },
    { id: "report", label: "Report" }
  ];
  tabs.forEach((t,i)=>{
    const btn = el("button", { class: "lab-tab" + (i===0?" is-active":""), role:"tab", onclick: ()=>switchTab(t.id) }, t.label);
    btn.dataset.tab = t.id;
    tabsBar.appendChild(btn);
  });
  body.appendChild(tabsBar);
  body.appendChild(tabPanelsWrap);

  function switchTab(id){
    tabsBar.querySelectorAll(".lab-tab").forEach(b => b.classList.toggle("is-active", b.dataset.tab === id));
    tabPanelsWrap.querySelectorAll(".lab-tabpanel").forEach(p => p.classList.toggle("is-active", p.dataset.tab === id));
  }

  tabPanelsWrap.appendChild(buildOverviewTab(data));
  tabPanelsWrap.appendChild(buildMaterialsTab(data));
  tabPanelsWrap.appendChild(buildSafetyTab(data, pState, ()=>refreshProgress()));
  tabPanelsWrap.appendChild(buildProcedureTab(data, pState, ()=>refreshProgress()));
  tabPanelsWrap.appendChild(buildMeasureTab(data, pState, ()=>refreshProgress()));
  tabPanelsWrap.appendChild(buildResultsTab(data, pState));
  tabPanelsWrap.appendChild(buildReportPanel(data, pState, REPORT_GUIDELINES, ()=>refreshProgress()));

  tabPanelsWrap.querySelectorAll(".lab-tabpanel").forEach((p,i)=>{ if (i>0) p.classList.remove("is-active"); });

  function refreshProgress(){
    const s = State.stageProgress(data.id, data.procedure.length);
    const steps = progress.querySelectorAll(".progress-step");
    stageLabels.forEach(([key], i)=>{
      steps[i].dataset.state = s[key];
      steps[i].querySelector(".mark").textContent = s[key]==="done"?"\u2713":s[key]==="active"?"\u25CF":"\u25CB";
    });
  }

  return root;
}

/* -------------------------------------------------------------- */
function buildOverviewTab(data){
  const p = el("div", { class: "lab-tabpanel is-active", "data-tab": "overview" });
  p.appendChild(el("p", {}, data.objective));
  if (data.definition){
    p.appendChild(el("div", { class: "divider-label" }, "Definition"));
    p.appendChild(el("p", {}, data.definition));
  }
  p.appendChild(el("div", { class: "divider-label" }, "Principle"));
  p.appendChild(el("p", {}, data.principle));
  if (data.hplcConditions){
    p.appendChild(el("div", { class: "divider-label" }, "Instrument conditions"));
    const ul = el("ul", { class: "spec-list" });
    Object.entries(data.hplcConditions).forEach(([k,v])=>{
      ul.appendChild(el("li", {}, [el("b", {}, k.replace(/([A-Z])/g,' $1')), el("span", {}, v)]));
    });
    p.appendChild(ul);
  }
  if (data.limitations){
    p.appendChild(el("div", { class: "divider-label" }, "Manual's supplementary notes"));
    const ul = el("ul", { class: "bullet-list" });
    data.limitations.forEach(l=>ul.appendChild(el("li", {}, l)));
    p.appendChild(ul);
  }
  if (data.warning){
    p.appendChild(el("div", { class: "safety-banner" }, [ tag("Note","accent"), el("p", {}, data.warning) ]));
  }
  p.appendChild(el("div", { class: "divider-label" }, "References (manual)"));
  const ul = el("ul", { class: "link-list" });
  data.references.forEach(r=>ul.appendChild(el("li", {}, r)));
  p.appendChild(ul);
  return p;
}

function buildMaterialsTab(data){
  const p = el("div", { class: "lab-tabpanel", "data-tab": "materials" });
  const cols = el("div", { class: "two-col" });
  const matCol = el("div", {}, [ el("div", { class: "divider-label" }, "Materials & Reagents") ]);
  const ul1 = el("ul", { class: "bullet-list" });
  data.materials.forEach(m=>ul1.appendChild(el("li", {}, m)));
  matCol.appendChild(ul1);

  const appCol = el("div", {}, [ el("div", { class: "divider-label" }, "Apparatus & Equipment") ]);
  const ul2 = el("ul", { class: "bullet-list" });
  data.apparatus.forEach(m=>ul2.appendChild(el("li", {}, m)));
  appCol.appendChild(ul2);

  cols.appendChild(matCol); cols.appendChild(appCol);
  p.appendChild(cols);
  if (data.sampleContext){
    p.appendChild(el("div", { class: "divider-label" }, "Sample used in this practical"));
    p.appendChild(el("p", {}, data.sampleContext));
  }
  return p;
}

function buildSafetyTab(data, pState, onChange){
  const p = el("div", { class: "lab-tabpanel", "data-tab": "safety" });
  const levelWord = { high:"High hazard", medium:"Moderate hazard", low:"Standard precautions" }[data.hazardLevel] || "Standard precautions";
  p.appendChild(el("div", { class: "safety-banner" }, [
    tag(levelWord, data.hazardLevel === "high" ? "accent" : ""),
    el("p", {}, "This is a digital educational simulation. Review the cautions below before proceeding — real laboratory work with these hazards must always be carried out under qualified supervision.")
  ]));
  const ul = el("ul", { class: "bullet-list" });
  data.hazards.forEach(h=>ul.appendChild(el("li", {}, h)));
  p.appendChild(ul);

  const ackWrap = el("label", { class: "apparatus-chip", "data-selected": pState.safety ? "true" : "false" }, [
    el("input", { type: "checkbox", checked: pState.safety || undefined }),
    "I have reviewed the cautions and hazards for this practical"
  ]);
  ackWrap.querySelector("input").addEventListener("change", (e)=>{
    State.updatePracticalState(data.id, { safety: e.target.checked });
    ackWrap.dataset.selected = e.target.checked ? "true":"false";
    onChange();
  });
  p.appendChild(ackWrap);
  return p;
}

function buildProcedureTab(data, pState, onChange){
  const p = el("div", { class: "lab-tabpanel", "data-tab": "procedure" });
  if (!pState.apparatus) pState.apparatus = [];
  p.appendChild(el("div", { class: "divider-label" }, "Select the apparatus you will use"));
  const chipsWrap = el("div", {});
  data.apparatus.slice(0,8).forEach(a=>{
    const selected = pState.apparatus.includes(a);
    const chip = el("label", { class: "apparatus-chip", "data-selected": selected ? "true":"false" }, [
      el("input", { type: "checkbox", checked: selected || undefined }), a
    ]);
    chip.querySelector("input").addEventListener("change", (e)=>{
      const arr = new Set(pState.apparatus);
      if (e.target.checked) arr.add(a); else arr.delete(a);
      pState.apparatus = Array.from(arr);
      State.updatePracticalState(data.id, { apparatus: pState.apparatus });
      chip.dataset.selected = e.target.checked ? "true":"false";
      onChange();
    });
    chipsWrap.appendChild(chip);
  });
  p.appendChild(chipsWrap);

  p.appendChild(el("div", { class: "divider-label" }, "Procedure"));
  const list = el("ol", { class: "procedure-list" });
  if (!pState.procedureDone) pState.procedureDone = [];
  data.procedure.forEach((step, i)=>{
    const done = pState.procedureDone.includes(i);
    const locked = !pState.safety || (i>0 && !pState.procedureDone.includes(i-1) && !done);
    const state = done ? "done" : (locked ? "locked" : "active");
    const item = el("li", { class: "procedure-item", "data-state": state }, [
      el("h4", {}, step.title),
      el("p", {}, step.detail)
    ]);
    if (!locked){
      const actions = el("div", { class: "procedure-actions" });
      const btn = el("button", { class: "btn btn-ghost" }, done ? "Completed \u2713" : "Mark step complete");
      btn.addEventListener("click", ()=>{
        const set = new Set(pState.procedureDone);
        if (done) set.delete(i); else set.add(i);
        pState.procedureDone = Array.from(set);
        State.updatePracticalState(data.id, { procedureDone: pState.procedureDone });
        openPractical(data.id);
      });
      actions.appendChild(btn);
      item.appendChild(actions);
    } else if (!pState.safety){
      item.appendChild(el("p", { class:"feedback", "data-kind":"incorrect" }, "Acknowledge the safety cautions in the Safety tab before starting the procedure."));
    }
    list.appendChild(item);
  });
  p.appendChild(list);
  return p;
}

/* -------------------------------------------------------------- */
function buildMeasureTab(data, pState, onChange){
  const p = el("div", { class: "lab-tabpanel", "data-tab": "measure" });
  const learning = State.getMode() === "learning";

  if (learning){
    p.appendChild(el("div", { class: "hint-box" }, [ el("b", {}, "Learning mode: "), "inputs are pre-filled with a plausible example so you can see how the manual's formula behaves. Switch to Assessment mode to enter your own duplicate measurements from scratch." ]));
  }

  const instrument = el("div", { class: "instrument" });
  instrument.appendChild(el("div", { class: "instrument-head" }, [
    data.instrument.toUpperCase().replace(/-/g," "), el("span", { class: "live" }, "Live")
  ]));

  const fieldsWrap = el("div", { class: "control-row" });
  const values = {};
  const inputEls = {};

  data.calculation.inputs.forEach(inputDef=>{
    const stored = pState.measurements[inputDef.id];
    const initial = stored !== undefined ? stored : (learning ? inputDef.default : (inputDef.type === "select" ? inputDef.default : ""));
    values[inputDef.id] = initial;
    const field = el("div", { class: "field" }, [
      el("label", {}, inputDef.label + (inputDef.unit ? ` (${inputDef.unit})` : "")),
    ]);
    let control;
    if (inputDef.type === "select"){
      control = el("select", {}, inputDef.options.map(o=>el("option", { value:o.value, selected: o.value===initial||undefined }, o.label)));
    } else {
      control = el("input", { type: "number", step: inputDef.step || "any", min: inputDef.min !== undefined ? inputDef.min : "", value: initial });
    }
    control.addEventListener("input", ()=>{
      const v = inputDef.type === "select" ? control.value : parseFloat(control.value);
      values[inputDef.id] = v;
      recompute();
    });
    field.appendChild(control);
    if (inputDef.note) field.appendChild(el("p", { style:"font-size:.72rem;color:var(--ink-mute);margin:.3rem 0 0;" }, inputDef.note));
    fieldsWrap.appendChild(field);
    inputEls[inputDef.id] = control;
  });
  instrument.appendChild(fieldsWrap);

  const widgetSlot = el("div", {});
  instrument.appendChild(widgetSlot);
  buildSpecificWidget(data, widgetSlot, values);

  const calcSteps = el("div", { class: "calc-steps" });
  instrument.appendChild(calcSteps);

  const runFeedback = el("div", {});
  instrument.appendChild(runFeedback);

  const btnRow = el("div", { class: "btn-row" });
  const recordBtn = el("button", { class: "btn btn-primary" }, pState.duplicate.a === null ? "Record Run A" : "Record Run B (duplicate)");
  btnRow.appendChild(recordBtn);
  const resetRun = el("button", { class: "btn btn-ghost" }, "Reset runs");
  resetRun.addEventListener("click", ()=>{
    pState.duplicate = { a: null, b: null };
    State.updatePracticalState(data.id, { duplicate: pState.duplicate, result: null, acceptance: null, measurements: {} });
    openPractical(data.id);
  });
  btnRow.appendChild(resetRun);
  instrument.appendChild(btnRow);

  p.appendChild(instrument);

  const dupBox = el("div", { class: "readout-grid" }, [
    el("div", { class: "readout" }, [ el("label", {}, "Run A"), el("div", { class:"value" }, pState.duplicate.a !== null ? round(pState.duplicate.a, data.calculation.precisionDp) : "\u2014") ]),
    el("div", { class: "readout" }, [ el("label", {}, "Run B"), el("div", { class:"value" }, pState.duplicate.b !== null ? round(pState.duplicate.b, data.calculation.precisionDp) : "\u2014") ])
  ]);
  p.appendChild(dupBox);

  function calcNow(){
    const fn = CALCULATORS[data.instrument] || CALCULATORS[data.id];
    if (data.id === "ph-acidity"){
      const eqWt = data.calculation.inputs[0].options.find(o=>o.value===values.sampleType).eqWt;
      return fn(values, eqWt);
    }
    return fn(values);
  }

  function recompute(){
    let out;
    try{ out = calcNow(); }catch(e){ out = { result: NaN, substitution: "Enter valid numeric measurements to calculate." }; }
    calcSteps.innerHTML = "";
    calcSteps.appendChild(el("div", { class: "calc-step" }, [ el("span", { class:"label" }, "Formula"), data.calculation.steps[0].formula ]));
    calcSteps.appendChild(el("div", { class: "calc-step" }, [ el("span", { class:"label" }, "Substitution"), out.substitution ]));
    if (out.substitution2) calcSteps.appendChild(el("div", { class: "calc-step" }, [ el("span", { class:"label" }, "Conversion" ), out.substitution2 ]));
    if (isFinite(out.result)){
      calcSteps.appendChild(el("div", { class: "calc-step", style:"border-color:var(--ink)" }, [ el("span", { class:"label" }, "Result"), `${round(out.result, data.calculation.precisionDp)} ${data.calculation.resultUnit}` ]));
    }
    updateWidget(data, widgetSlot, values, out);
    return out;
  }

  recordBtn.addEventListener("click", ()=>{
    const out = recompute();
    if (!isFinite(out.result)){
      runFeedback.innerHTML = "";
      runFeedback.appendChild(el("div", { class:"feedback", "data-kind":"incorrect" }, feedbackFor("invalid-measurement")));
      return;
    }
    pState.measurements = { ...values };
    if (pState.duplicate.a === null){
      pState.duplicate.a = out.result;
      recordBtn.textContent = "Record Run B (duplicate)";
      runFeedback.innerHTML = "";
      runFeedback.appendChild(el("div", { class:"feedback", "data-kind":"correct" }, feedbackFor("run-recorded", { run: "A" })));
    } else if (pState.duplicate.b === null){
      pState.duplicate.b = out.result;
      recordBtn.textContent = "Record Run A";
      const mean = (pState.duplicate.a + pState.duplicate.b) / 2;
      pState.result = mean;
      let acceptanceState = null;
      const rule = data.acceptance.rules.find(r=>r.type==="duplicate-pct");
      if (rule){
        const chk = checkDuplicatePct(pState.duplicate.a, pState.duplicate.b, rule.limitPct);
        acceptanceState = { type:"duplicate-pct", pass: chk.pass, diffPct: chk.diffPct, limitPct: rule.limitPct };
      } else {
        const rangeRule = data.acceptance.rules.find(r=>r.type==="range");
        if (rangeRule){
          const chk = checkRange(values[rangeRule.field], rangeRule.min, rangeRule.max);
          acceptanceState = { type:"range", pass: chk.pass, min: rangeRule.min, max: rangeRule.max, value: values[rangeRule.field] };
        } else {
          acceptanceState = { type:"note", pass: null };
        }
      }
      pState.acceptance = acceptanceState;
      State.updatePracticalState(data.id, { duplicate: pState.duplicate, result: pState.result, acceptance: pState.acceptance, measurements: pState.measurements });
      onChange();
      openPractical(data.id);
      const resultsTabBtn = panelNode.querySelector('.lab-tab[data-tab="results"]');
      if (resultsTabBtn) resultsTabBtn.click();
      return;
    } else {
      pState.duplicate = { a: out.result, b: null };
      pState.result = null; pState.acceptance = null;
      recordBtn.textContent = "Record Run B (duplicate)";
    }
    State.updatePracticalState(data.id, { duplicate: pState.duplicate, result: pState.result, acceptance: pState.acceptance, measurements: pState.measurements });
    dupBox.children[0].querySelector(".value").textContent = pState.duplicate.a !== null ? round(pState.duplicate.a, data.calculation.precisionDp) : "\u2014";
    dupBox.children[1].querySelector(".value").textContent = pState.duplicate.b !== null ? round(pState.duplicate.b, data.calculation.precisionDp) : "\u2014";
  });

  recompute();
  return p;
}

function buildSpecificWidget(data, slot, values){
  slot.innerHTML = "";
  if (["kjeldahl","total-fat","ash"].includes(data.instrument)){
    const balance = buildBalance({ label: "Analytical balance readout" });
    slot.appendChild(balance.node);
    slot._widget = balance;
    const wKey = data.instrument === "kjeldahl" ? "sampleWeight" : "w1";
    balance.setValue(values[wKey] || 0);
  }
  if (["kjeldahl","ph-acidity","vitamin-c"].includes(data.instrument)){
    const burette = buildBurette({ capacity: data.instrument === "kjeldahl" ? 25 : (data.instrument === "vitamin-c" ? 1 : 25) });
    slot.appendChild(burette.node);
    slot._burette = burette;
  }
  if (data.instrument === "ph-acidity"){
    const meter = buildPhMeter();
    slot.appendChild(meter.node);
    slot._ph = meter;
  }
  if (data.instrument === "soluble-solids"){
    const refracto = buildRefractometer();
    slot.appendChild(refracto.node);
    slot._refracto = refracto;
    refracto.setBrix(values.brixReading || 0);
  }
  if (data.instrument === "ash"){
    const gauge = buildFurnaceGauge();
    slot.appendChild(gauge.node);
    slot._gauge = gauge;
    gauge.setTemp(525);
  }
  if (data.instrument === "hplc"){
    const chrom = buildChromatogram(data.sugars);
    slot.appendChild(chrom.node);
    slot._chrom = chrom;
    chrom.draw(data.sugars[0].id, 0.75);
  }
}

function updateWidget(data, slot, values, out){
  if (slot._widget){
    const wKey = data.instrument === "kjeldahl" ? "sampleWeight" : "w1";
    slot._widget.setValue(values[wKey] || 0);
  }
  if (slot._burette){
    const volKey = data.instrument === "kjeldahl" ? "titrantSample" : (data.instrument === "vitamin-c" ? "sampleTitre" : "titrantVol");
    slot._burette.setVolume(values[volKey] || 0);
  }
  if (slot._ph){
    const vol = values.titrantVol || 0;
    const ph = Math.min(12, 3.4 + vol*0.6);
    slot._ph.setPh(ph);
  }
  if (slot._refracto){ slot._refracto.setBrix(values.brixReading || 0); }
  if (slot._chrom){
    const heightNorm = Math.max(0.1, Math.min(0.9, (values.aSample||0)/((values.aStandard||1)*1.3)));
    slot._chrom.draw(data.sugars[0].id, heightNorm);
  }
}

/* -------------------------------------------------------------- */
function buildResultsTab(data, pState){
  const p = el("div", { class: "lab-tabpanel", "data-tab": "results" });
  if (pState.result === null){
    p.appendChild(el("div", { class: "feedback", "data-kind":"info" }, "Record duplicate runs in the Measure & Calculate tab to see the result and acceptance check here."));
    return p;
  }
  p.appendChild(el("div", { class: "acceptance-box" }, [
    el("div", {}, [
      el("div", { class: "eyebrow" }, data.calculation.resultLabel),
      el("div", { class: "result-value" }, `${round(pState.result, data.calculation.precisionDp)} ${data.calculation.resultUnit}`)
    ]),
    renderAcceptancePill(pState.acceptance)
  ]));
  p.appendChild(el("div", { class: "divider-label" }, "Acceptance of test results (manual)"));
  p.appendChild(el("p", {}, data.acceptance.text));
  const ul = el("ul", { class: "bullet-list" });
  data.acceptance.rules.forEach(r=>ul.appendChild(el("li", {}, r.label)));
  p.appendChild(ul);

  if (pState.acceptance && pState.acceptance.type === "duplicate-pct"){
    p.appendChild(el("p", { class:"mono", style:"font-size:.85rem;" }, `Run A = ${round(pState.duplicate.a,3)} | Run B = ${round(pState.duplicate.b,3)} | difference = ${round(pState.acceptance.diffPct,2)}% (limit ${pState.acceptance.limitPct}%)`));
  }
  if (pState.acceptance && pState.acceptance.type === "range"){
    p.appendChild(el("p", { class:"mono", style:"font-size:.85rem;" }, `Value = ${pState.acceptance.value} (accepted range ${pState.acceptance.min}\u2013${pState.acceptance.max})`));
  }

  p.appendChild(el("div", { class: "divider-label" }, "Interpretation"));
  p.appendChild(el("p", {}, feedbackFor("interpretation", { data, result: pState.result, acceptance: pState.acceptance })));
  return p;
}

function renderAcceptancePill(acceptance){
  if (!acceptance || acceptance.pass === null){
    return el("span", { class: "acceptance-pill", "data-state":"pending" }, "See acceptance notes");
  }
  return el("span", { class: "acceptance-pill", "data-state": acceptance.pass ? "pass" : "check" }, acceptance.pass ? "PASS" : "CHECK");
}

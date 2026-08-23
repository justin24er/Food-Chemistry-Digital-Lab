/* ============================================================
   REPORT ENGINE
   Builds an editable practical report from the manual's report
   guidelines, using only values the learner actually produced.
   ============================================================ */
import { el } from "./instrument-widgets.js";
import { MARKING_SCHEME } from "./data/manual-core.js";
import * as State from "./state.js";
import { round } from "./calculation-engine.js";

export function buildReportPanel(data, pState, guidelines, onChange){
  const p = el("div", { class: "lab-tabpanel", "data-tab": "report" });

  if (pState.result === null){
    p.appendChild(el("div", { class: "feedback", "data-kind":"info" }, "Complete duplicate measurements and obtain a result before drafting the report — the report builder uses your actual recorded values, not placeholder data."));
    return p;
  }

  if (!pState.reportDraft) pState.reportDraft = {};
  const draft = pState.reportDraft;

  p.appendChild(el("p", { style:"max-width:60ch;" }, guidelines.format));

  const doc = el("div", { class: "report-doc" });
  doc.appendChild(el("div", { class: "report-meta" }, `${data.number} \u2014 ${data.title} \u00B7 draft report`));

  guidelines.sections.forEach(section=>{
    const wrap = el("div", {});
    wrap.appendChild(el("h3", {}, section.label));
    wrap.appendChild(el("p", { style:"font-size:.78rem;color:var(--ink-mute);font-family:var(--font-mono);" }, section.guidance));
    let seed = draft[section.id];
    if (seed === undefined){
      seed = section.id === "results" ? autoResults(data, pState) : "";
      if (section.id === "title") seed = `The determination of ${data.calculation.resultLabel.toLowerCase()} in a food sample by the ${data.shortTitle} method`;
    }
    const ta = el("textarea", { placeholder: "Write this section\u2026" }, seed);
    ta.value = seed;
    ta.addEventListener("input", ()=>{
      draft[section.id] = ta.value;
      State.updatePracticalState(data.id, { reportDraft: draft });
      onChange();
    });
    wrap.appendChild(ta);
    doc.appendChild(wrap);
  });

  p.appendChild(doc);

  const btnRow = el("div", { class: "btn-row", style:"margin-top:1.2rem;" });
  const downloadBtn = el("button", { class: "btn btn-primary" }, "Download report (.md)");
  downloadBtn.addEventListener("click", ()=>downloadReport(data, guidelines, draft));
  const printBtn = el("button", { class: "btn btn-ghost" }, "Print / Save as PDF");
  printBtn.addEventListener("click", ()=>window.print());
  btnRow.appendChild(downloadBtn); btnRow.appendChild(printBtn);
  p.appendChild(btnRow);

  p.appendChild(el("div", { class: "divider-label" }, "Report quality checker (manual marking scheme)"));
  const checklistWrap = el("div", {});
  const relevant = MARKING_SCHEME;
  const checkedKey = "checklist";
  if (!draft[checkedKey]) draft[checkedKey] = {};
  relevant.forEach(section=>{
    checklistWrap.appendChild(el("div", { style:"margin:1rem 0 .3rem;font-family:var(--font-mono);font-size:.72rem;text-transform:uppercase;letter-spacing:.05em;color:var(--ink-mute);" }, section.section));
    section.items.forEach((item,i)=>{
      const key = section.section + "-" + i;
      const row = el("label", { class: "marking-row" }, [
        item,
        el("input", { type: "checkbox", checked: draft[checkedKey][key] ? true : undefined })
      ]);
      row.querySelector("input").addEventListener("change",(e)=>{
        draft[checkedKey][key] = e.target.checked;
        State.updatePracticalState(data.id, { reportDraft: draft });
      });
      checklistWrap.appendChild(row);
    });
  });
  p.appendChild(checklistWrap);

  return p;
}

function autoResults(data, pState){
  const a = round(pState.duplicate.a, data.calculation.precisionDp);
  const b = round(pState.duplicate.b, data.calculation.precisionDp);
  const mean = round(pState.result, data.calculation.precisionDp);
  const acc = pState.acceptance;
  let accLine = "";
  if (acc && acc.type === "duplicate-pct"){
    accLine = `Duplicate difference was ${round(acc.diffPct,2)}% (acceptance limit ${acc.limitPct}%), which ${acc.pass ? "satisfied" : "did not satisfy"} the practical's acceptance criterion.`;
  } else if (acc && acc.type === "range"){
    accLine = `The titre value fell ${acc.pass ? "within" : "outside"} the manual's accepted range of ${acc.min}\u2013${acc.max} mL.`;
  }
  return `Duplicate determinations gave ${a} and ${b} ${data.calculation.resultUnit}, with a mean of ${mean} ${data.calculation.resultUnit} (n = 2). ${accLine}`;
}

function downloadReport(data, guidelines, draft){
  let text = `# ${draft.title || data.title}\n\n`;
  guidelines.sections.forEach(s=>{
    text += `## ${s.label}\n\n${draft[s.id] || ""}\n\n`;
  });
  const blob = new Blob([text], { type: "text/markdown" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${data.id}-practical-report.md`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

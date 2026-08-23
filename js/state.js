/* ============================================================
   STATE MANAGEMENT
   Tracks per-practical progress: safety ack, procedure steps,
   measurements, calculation, result, acceptance, report.
   Persists to localStorage so a learner's session survives reload.
   ============================================================ */

const STORAGE_KEY = "fcdl_state_v1";

function loadState(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  }catch(e){ /* storage unavailable — continue with in-memory state */ }
  return { practicals: {}, mode: "learning", orientationVisited: [] };
}

let state = loadState();

function persist(){
  try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
  catch(e){ /* ignore quota / privacy-mode errors */ }
}

export function getMode(){ return state.mode || "learning"; }
export function setMode(mode){ state.mode = mode; persist(); }

export function getPracticalState(id){
  if (!state.practicals[id]){
    state.practicals[id] = {
      safety: false,
      apparatus: [],
      procedureIndex: 0,
      procedureDone: [],
      measurements: {},
      duplicate: { a: null, b: null },
      result: null,
      acceptance: null,
      reportDraft: {}
    };
  }
  return state.practicals[id];
}

export function updatePracticalState(id, patch){
  const p = getPracticalState(id);
  Object.assign(p, patch);
  persist();
  return p;
}

export function resetPracticalState(id){
  delete state.practicals[id];
  persist();
  return getPracticalState(id);
}

export function completionStage(id){
  const p = getPracticalState(id);
  if (!p.safety) return "safety";
  if (p.procedureIndex === 0) return "preparation";
  if (p.result === null) return "measurement";
  if (!p.acceptance) return "calculation";
  return "result";
}

export function stageProgress(id, totalStages){
  const order = ["safety","preparation","procedure","measurement","calculation","result","report"];
  const p = getPracticalState(id);
  const states = {};
  states.safety = p.safety ? "done" : "active";
  states.preparation = !p.safety ? "locked" : (p.apparatus.length ? "done" : "active");
  states.procedure = !p.safety ? "locked" : (p.procedureDone.length >= totalStages ? "done" : (p.apparatus.length ? "active" : "locked"));
  states.measurement = p.procedureDone.length < totalStages ? "locked" : (Object.keys(p.measurements).length ? "done" : "active");
  states.calculation = Object.keys(p.measurements).length === 0 ? "locked" : (p.result !== null ? "done" : "active");
  states.result = p.result === null ? "locked" : (p.acceptance ? "done" : "active");
  states.report = !p.acceptance ? "locked" : (p.reportDraft && p.reportDraft.title ? "done" : "active");
  return states;
}

export function markOrientationVisited(id){
  if (!state.orientationVisited.includes(id)){
    state.orientationVisited.push(id);
    persist();
  }
  return state.orientationVisited;
}
export function getOrientationVisited(){ return state.orientationVisited || []; }

export function exportAllResults(){
  return state.practicals;
}

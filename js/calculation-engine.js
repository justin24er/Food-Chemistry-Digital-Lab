/* ============================================================
   CALCULATION ENGINE
   Implements the manual-defined formulas only. Every calculation
   is exposed as inputs -> formula -> substitution -> result so
   the practical UI can render full transparency.
   ============================================================ */

export function round(value, dp){
  if (!isFinite(value)) return NaN;
  const f = Math.pow(10, dp);
  return Math.round(value * f) / f;
}

/* Practical 2.1 — Kjeldahl */
export function calcKjeldahl(v){
  const n = ((v.titrantSample - v.titrantBlank) * 0.0014 * v.hclNormality * 100) / v.sampleWeight;
  const protein = n * v.conversionFactor;
  return {
    nitrogenPct: n,
    result: protein,
    substitution: `N = [(${v.titrantSample} − ${v.titrantBlank}) × 0.0014 × ${v.hclNormality} × 100] / ${v.sampleWeight} = ${round(n,3)} g%`,
    substitution2: `Protein = ${round(n,3)} × ${v.conversionFactor} = ${round(protein,2)} g/100 g`
  };
}

/* Practical 2.2 — Total fat */
export function calcTotalFat(v){
  const result = ((v.w3 - v.w2) * 100) / v.w1;
  return {
    result,
    substitution: `Total Fat = [(${v.w3} − ${v.w2}) × 100] / ${v.w1} = ${round(result,3)} g/100 g`
  };
}

/* Practical 2.3 — Starch */
export function calcStarch(v){
  const result = v.totalSugar * 0.9;
  return {
    result,
    substitution: `Starch = ${v.totalSugar} × 0.9 = ${round(result,3)} g/100 g`
  };
}

/* Practical 2.4 — HPLC sugars */
export function calcSugar(v){
  const result = (v.aSample / v.aStandard) * v.cStandard * (v.volume / v.weight);
  return {
    result,
    substitution: `Sugar = (${v.aSample} / ${v.aStandard}) × ${v.cStandard} × (${v.volume} / ${v.weight}) = ${round(result,3)} g/100 g`
  };
}

/* Practical 2.5 — Ash */
export function calcAsh(v){
  const result = ((v.w3 - v.w1) * 100) / (v.w2 - v.w1);
  return {
    result,
    substitution: `Ash = [(${v.w3} − ${v.w1}) × 100] / (${v.w2} − ${v.w1}) = ${round(result,3)} g/100 g`
  };
}

/* Practical 3.1 — Titratable acidity */
export function calcTitratableAcidity(v, eqWt){
  const result = (v.titrantVol * v.naohNormality * eqWt) / (v.sampleVol * 10);
  return {
    result,
    substitution: `%Acid = (${v.titrantVol} × ${v.naohNormality} × ${eqWt}) / (${v.sampleVol} × 10) = ${round(result,4)} %`
  };
}

/* Practical 3.2 — Vitamin C */
export function calcVitaminC(v){
  const result = (0.5 / v.v1) * (v.madeUpVol / v.aliquot) * (100 / v.sampleWeight) * v.sampleTitre;
  return {
    result,
    substitution: `mg/100g = (0.5/${v.v1}) × (${v.madeUpVol}/${v.aliquot}) × (100/${v.sampleWeight}) × ${v.sampleTitre} = ${round(result,2)} mg/100 g`
  };
}

/* Practical 3.3 — Total soluble solids: direct read */
export function calcSolubleSolids(v){
  return { result: v.brixReading, substitution: `TSS = ${v.brixReading} °Brix (direct scale reading)` };
}

export const CALCULATORS = {
  kjeldahl: calcKjeldahl,
  "total-fat": calcTotalFat,
  starch: calcStarch,
  "hplc-sugars": calcSugar,
  ash: calcAsh,
  "ph-acidity": calcTitratableAcidity,
  "vitamin-c": calcVitaminC,
  "soluble-solids": calcSolubleSolids
};

/* -------------------------------------------------------------
   ACCEPTANCE CRITERIA ENGINE
   ------------------------------------------------------------- */
export function checkDuplicatePct(a, b, limitPct){
  const mean = (a + b) / 2;
  if (mean === 0) return { pass: false, diffPct: NaN, mean };
  const diffPct = Math.abs(a - b) / mean * 100;
  return { pass: diffPct <= limitPct, diffPct, mean };
}

export function checkRange(value, min, max){
  return { pass: value >= min && value <= max };
}

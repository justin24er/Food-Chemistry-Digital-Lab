# Manual Mapping

This document maps every major feature of the Food Chemistry Digital Laboratory to
the corresponding section of the supplied **Practical Manual — Food Chemistry
(AS6201)**, Department of Applied Sciences, Mbeya University of Science and
Technology. Its purpose is to let anyone verify that the digital laboratory has
not drifted from the manual.

| Website module | Manual section | Practical | Scientific purpose | Procedure represented | Calculation represented |
|---|---|---|---|---|---|
| Laboratory Safety and Health Rules accordion (`#safety`) | "Laboratory Safety and Health Rules", groups A–I | General (applies to all practicals) | Laboratory conduct, chemical handling, emergencies, biological safety, broken glass, cleaning | N/A — reference content | N/A |
| Laboratory Orientation floor plan (`#orientation`) | Practical 1, §1.1 "Health and Safety Equipment" | Practical 1 | Locating and understanding emergency exit, phone, fire alarm, extinguisher, safety shower, eyewash, first-aid kit and the group bench | Interactive hotspot inspection | N/A |
| Practical dashboard (`#practicals`) | Practicals 2 and 3 table of contents | 2.1–2.5, 3.1–3.3 | Index of the manual's quantitative-analysis and chemical-property practicals | N/A | N/A |
| Kjeldahl workspace (`kjeldahl`) | §2.1 "Determination of Crude Protein by Kjeldahl Method" | 2.1 | Total nitrogen → crude protein determination | Digestion → distillation → titration steps, transcribed from the manual | `N (g%) = [(titre_sample − titre_blank) × 0.0014 × N_HCl × 100] / weight`; `Protein = N × conversion factor` |
| Total Fat workspace (`total-fat`) | §2.2 "Determination of Total Fat by Manual Extraction" | 2.2 | Acid hydrolysis + solvent extraction fat determination | Hydrolysis → extraction → evaporation → drying steps | `Fat (g/100g) = [(W3 − W2) × 100] / W1` |
| Starch workspace (`starch`) | §2.3 "Determination of Starch by Acid Hydrolysis Method" | 2.3 | Acid-hydrolysis starch determination from total sugar | Reflux hydrolysis → neutralization → filtration → Lane–Eynon sugar step | `Starch (g/100g) = %Total sugar × 0.9` |
| HPLC Sugars workspace (`hplc-sugars`) | §2.4 "Determination of Individual Sugars by HPLC" | 2.4 | Chromatographic separation and quantitation of glucose, fructose, sucrose, maltose, lactose | Sample prep → standard prep → injection → peak measurement | `Sugar (g/100g) = (A_sample / A_standard) × C_standard × (V / W)` |
| Ash workspace (`ash`) | §2.5 "Determination of Ash by Gravimetric Method" | 2.5 | Mineral-residue (ash) determination by incineration | Pre-ashing → charring → furnace incineration → re-weighing | `Ash (g/100g) = [(W3 − W1) × 100] / (W2 − W1)` |
| pH & Titratable Acidity workspace (`ph-acidity`) | §3.1 "Determination of pH and Titratable Acidity" | 3.1 | Titratable acidity of soda and apple juice, with pH-tracked titration | Titration of unboiled/boiled soda and apple juice, pH-vs-volume curve | `%Acid = (mL NaOH × N_NaOH × Eq.Wt.) / (sample vol mL × 10)` |
| Vitamin C workspace (`vitamin-c`) | §3.2 "Determination of Ascorbic Acid or Vitamin C" | 3.2 | DCPIP redox titration of ascorbic acid | Extraction → DCPIP titration → standardization | `mg/100g = (0.5/V1) × (V2/aliquot) × (100/weight) × T.V.` |
| Total Soluble Solids workspace (`soluble-solids`) | §3.3 "Determination of Total Soluble Solids" | 3.3 | Refractometric °Brix reading of fruit juice | Prism cleaning → distilled-water zero → sample reading | Direct scale reading, no further calculation (per manual) |
| Acceptance / PASS-CHECK logic (`checkDuplicatePct`, `checkRange`) | Each practical's "Acceptance of test results" subsection | 2.1–3.3 | Enforces the manual's own duplicate-difference and titre-range thresholds | N/A | 5% (protein, fat, ash), 10% (starch, sugars), titre range 0.1–1.0 mL (vitamin C) |
| Report builder (`report-engine.js`) | "Practical Report Guidelines" and "Report Marking Scheme" | All | Guided drafting of a research-article-style report from the learner's own recorded results | N/A | Uses only values the learner actually recorded — never fabricated |
| References list on each practical's Overview tab | Each practical's own reference list, plus the manual's overall reference list | 2.1–3.3 | Attribution of the method to its original literature source | N/A | N/A |

## Content the manual did not fully specify

Two places required a user-entered value because the manual referenced information
that was not included in the supplied document:

- **Kjeldahl nitrogen→protein conversion factor** — the manual states "multiplying
  the nitrogen content with a conversion factor specific to [the food] (see
  Appendix)", but the Appendix table was not present in the supplied manual file.
  The simulation therefore leaves this as a user-entered field (default 6.25, the
  generally used food factor) rather than inventing a food-specific table.
- **pH/Titratable-acidity numeric acceptance threshold** — the manual describes the
  titration and pH-curve procedure in full but does not state a numeric
  duplicate-difference limit for this specific practical (unlike 2.1, 2.2, 2.3, 2.4
  and 2.5, which each carry an explicit "should not differ by more than X%" line).
  The Results tab reflects this honestly rather than inventing a percentage.

No experiments, reactions or topics outside the above list (e.g. Maillard reaction,
caramelization, enzymatic browning, emulsion stability, fermentation, osmosis) were
introduced, per the content-scope lock in the project brief.

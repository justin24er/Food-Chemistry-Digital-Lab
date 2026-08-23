/* ============================================================
   PRACTICALS DATA — transcribed from Practical Manual, Food
   Chemistry (AS6201), Practicals 2 and 3.
   Level-1 source of truth. Each practical carries:
     objective, definition, principle, materials, apparatus,
     hazards, procedure steps, calculation spec, acceptance
     criteria and references — exactly as stated in the manual.
   ============================================================ */

export const PRACTICALS = [
  /* ---------------------------------------------------------- */
  {
    id: "kjeldahl",
    number: "2.1",
    group: "Practical 2 — Quantitative Analysis of Food Components",
    title: "Crude Protein by Kjeldahl Method",
    shortTitle: "Kjeldahl Crude Protein",
    objective: "The quantitative determination of crude protein in all types of foods.",
    definition: "Crude protein is total nitrogen multiplied by a protein conversion factor, expressed in g per 100 g sample. Total nitrogen includes nitrogen mainly from proteins and, to a lesser extent, from organic non-protein nitrogen substances, which for practical purposes is assumed to be of little significance.",
    principle: "The sample is digested with sulfuric acid in the presence of a catalyst, converting nitrogen to ammonium salt. Excess concentrated sodium hydroxide liberates ammonia gas, which is distilled into a boric acid solution to form an ammonium-borate complex. The liberated ammonia is titrated with standardized hydrochloric acid; the nitrogen content is calculated from the acid used, then converted to crude protein with a food-specific conversion factor.",
    materials: [
      "Sulfuric acid, concentrated, A.R. grade",
      "Catalysts: potassium sulfate and/or copper sulfate (mercury-containing catalysts not used, for environmental and health reasons)",
      "Sodium hydroxide solution, 50% (500 g NaOH made up to 1 L with water — exothermic; cool in ice water while dissolving)",
      "Boiling chips",
      "Ammonium sulfate, A.R.",
      "Hydrochloric acid, 0.1 N standardized solution",
      "Methyl red / bromcresol green indicator solution",
      "Boric acid solution, 4%, with indicator"
    ],
    apparatus: [
      "Kjeldahl digestion unit", "Distillation unit", "Titration unit", "Digestion tubes",
      "Erlenmeyer flask, 250 mL / 500 mL", "Magnetic stirrer and magnetic bar",
      "Drying oven (100–120 °C)", "Analytical balance, 200 g capacity, 0.1 mg sensitivity"
    ],
    hazards: [
      "Always wear a face mask, goggles and gloves when handling toxic and corrosive chemicals.",
      "Understand the toxicity and safety of the reagents before starting the method.",
      "Use pipette aids in handling acids.",
      "Digest the sample under a hood to reduce inhalation of acid fumes.",
      "Analysis should be done in an ammonia-free environment."
    ],
    hazardLevel: "high",
    sampleContext: "generic food sample (2–10 g, ground/blended until homogeneous)",
    procedure: [
      { title: "Prepare the sample", detail: "Grind or blend the sample until homogeneous. If it cannot be analyzed the same day, store in a screw-cap bottle in a freezer." },
      { title: "Set up blanks", detail: "Include two reagent blanks (all reagents except sample) in every batch, to subtract reagent nitrogen from sample nitrogen." },
      { title: "Weigh the sample", detail: "Weigh, in duplicate, 2–10 g sample (depending on expected nitrogen content) into the digestion tube." },
      { title: "Add catalyst and acid", detail: "Add 5–7 g catalyst, one glass bead, and 10–20 mL sulfuric acid." },
      { title: "Digest", detail: "Digest at low temperature initially to prevent frothing, then boil briskly until the solution is clear and free of carbon." },
      { title: "Complete digestion", detail: "Heat for another hour once clear, to complete breakdown of organic matter." },
      { title: "Set up the receiver", detail: "Place a 250–500 mL Erlenmeyer flask with 50 mL of 4% boric acid (with indicator) as receiver on the distillation unit; the condenser tip should sit below the acid surface." },
      { title: "Liberate ammonia and distil", detail: "Add 100 mL water and 70 mL of 50% NaOH to the digest and start distillation until all ammonia is released (approx. >150 mL distillate)." },
      { title: "Finish distillation", detail: "Lower the receiver so the delivery tube is above the liquid, continue 1–2 minutes, then rinse the delivery tube into the flask." },
      { title: "Titrate", detail: "Titrate the distillate with standardized 0.1 N HCl until the first appearance of pink colour. Record the volume used to the nearest 0.05 mL." }
    ],
    calculation: {
      description: "Nitrogen content, then crude protein via a food-specific conversion factor.",
      steps: [
        { label: "Nitrogen, N (g%)", formula: "N (g%) = [(mL 0.1N HCl sample − mL 0.1N HCl blank) × 0.0014 × N(HCl) × 100] / Weight of sample" },
        { label: "Crude protein", formula: "Protein (g/100 g) = % total nitrogen × nitrogen conversion factor" }
      ],
      inputs: [
        { id: "sampleWeight", label: "Sample weight", unit: "g", default: 2.0, min: 0.1, step: 0.01, source: "user" },
        { id: "titrantSample", label: "0.1N HCl — sample titre", unit: "mL", default: 12.4, min: 0, step: 0.05, source: "user" },
        { id: "titrantBlank", label: "0.1N HCl — blank titre", unit: "mL", default: 0.3, min: 0, step: 0.05, source: "user" },
        { id: "hclNormality", label: "HCl normality", unit: "N", default: 0.1, min: 0.01, step: 0.001, source: "user" },
        { id: "conversionFactor", label: "Nitrogen → protein factor", unit: "×", default: 6.25, min: 1, step: 0.01, source: "user", note: "The manual references an appendix conversion factor specific to the food matrix; the appendix table was not included with this manual, so the factor is user-entered (6.25 is the commonly used general food factor) rather than assumed by the simulation." }
      ],
      resultLabel: "Crude protein",
      resultUnit: "g/100 g",
      precisionDp: 1
    },
    acceptance: {
      text: "Accept test results if one or more of the following are satisfied.",
      rules: [
        { type: "duplicate-pct", label: "Duplicate results should not differ by more than 5% of the mean.", limitPct: 5 },
        { type: "note", label: "Mean of duplicate results of an in-house food reference material should be within ±2 SD on the control chart, based on established acceptance criteria." }
      ]
    },
    references: [
      "Horwitz W (2000) (editor). Official Method of Analysis of AOAC International. 17th Edition. AOAC International, Maryland, USA.",
      "WHO (1973). Report of a Joint FAO/WHO Ad Hoc Expert Committee on Energy and Protein Requirements, WHO Technical Report Series No. 522, WHO, Geneva.",
      "Greenfield H and Southgate DAT (1992). Food Composition Data: Production, Management and Use. Elsevier Applied Science, UK.",
      "Kirk RS and Sawyer R (1991). Pearson's Composition and Chemical Analysis of Foods, 9th Edition. Longman Scientific & Technical, Essex, England."
    ],
    instrument: "kjeldahl"
  },

  /* ---------------------------------------------------------- */
  {
    id: "total-fat",
    number: "2.2",
    group: "Practical 2 — Quantitative Analysis of Food Components",
    title: "Total Fat by Manual Extraction",
    shortTitle: "Total Fat — Manual Extraction",
    objective: "The quantitative determination of total fat in foods using manual extraction.",
    definition: "Fat includes fatty acids, triglycerides, esters, long-chain alcohols, hydrocarbons, other glycol esters and sterols determined by this method. Expressed as g fat per 100 g sample.",
    principle: "The sample is hydrolyzed by hydrochloric acid at 70–80 °C. Protein, if present, dissolves in the acid; crude fat is then manually extracted with diethyl ether and petroleum ether. The solvent is removed by evaporation and the oil residue is dried and weighed.",
    materials: [
      "Petroleum ether (b.p. 35–60 °C)", "Ethyl alcohol, 95%", "4 N hydrochloric acid",
      "Diethyl ether, free from evaporation residue"
    ],
    apparatus: [
      "Round flat-bottom flask or beaker", "Thimble", "Cotton wool", "Condenser",
      "Extraction glassware (separating funnel / Rohring / Majonnie tubes)", "Glass funnel",
      "Hot air oven", "Cylinder", "Water bath", "Desiccator", "Analytical balance",
      "Filter paper (Whatman No. 541)"
    ],
    hazards: [
      "Petroleum ether is toxic (b.p. 35–60 °C) and flammable — handle with care."
    ],
    hazardLevel: "high",
    sampleContext: "2 g dried food sample",
    procedure: [
      { title: "Weigh and moisten sample", detail: "Place 2 g dried sample (W1) in a 250 mL Erlenmeyer flask or extraction tube, add 2 mL alcohol and stir to moisten all particles." },
      { title: "Hydrolyze", detail: "Add 10 mL of diluted 4N HCl, mix, and reflux 30 min on a heater (or hold in a 70–80 °C water bath, stirring, 30–40 min) until fully hydrolyzed." },
      { title: "Cool", detail: "Add 10 mL alcohol and cool." },
      { title: "Transfer to extraction glassware", detail: "Transfer the digested mixture, rinsing the flask with 25 mL diethyl ether in three portions." },
      { title: "Shake with solvents", detail: "Close the tube and shake vigorously for 1 min. Add 25 mL petroleum ether and shake vigorously again for 1 min. Let stand until the upper layer is clear." },
      { title: "Filter into pre-weighed flask", detail: "Transfer the ether-fat solution into a pre-weighed, oven-dried 125 mL flask (W2) by filtering through a cotton plug." },
      { title: "Repeat extraction", detail: "Repeat extraction of the remaining liquid twice with the same solvents, combining through the same funnel into the same flask; rinse the funnel." },
      { title: "Evaporate solvent", detail: "Evaporate solvents completely on a water bath at 70–80 °C." },
      { title: "Dry and weigh", detail: "Dry the fat in an oven at 100±5 °C to constant weight, cool in a desiccator and weigh (W3)." }
    ],
    calculation: {
      description: "Total fat from the weight gained by the extraction flask.",
      steps: [
        { label: "Total fat", formula: "Total Fat (g/100 g) = [(W3 − W2) × 100] / W1" }
      ],
      inputs: [
        { id: "w1", label: "W1 — sample weight", unit: "g", default: 2.0, min: 0.01, step: 0.001, source: "user" },
        { id: "w2", label: "W2 — dried flask before extraction", unit: "g", default: 62.415, min: 0, step: 0.001, source: "user" },
        { id: "w3", label: "W3 — dried flask after extraction", unit: "g", default: 62.842, min: 0, step: 0.001, source: "user" }
      ],
      resultLabel: "Total fat",
      resultUnit: "g/100 g",
      precisionDp: 1
    },
    acceptance: {
      text: "Accept test results if the following are satisfied.",
      rules: [
        { type: "duplicate-pct", label: "Duplicate results should not differ by more than 5% of the mean.", limitPct: 5 },
        { type: "note", label: "Mean of duplicate results of the reference material should be within ±2 SD on the control chart, based on established acceptance criteria." }
      ]
    },
    references: [
      "Horwitz W (2000) (editor). Official Method of Analysis of AOAC International. 17th Edition. AOAC International, Maryland, USA, 920.39, p 33."
    ],
    instrument: "total-fat"
  },

  /* ---------------------------------------------------------- */
  {
    id: "starch",
    number: "2.3",
    group: "Practical 2 — Quantitative Analysis of Food Components",
    title: "Starch by Acid Hydrolysis Method",
    shortTitle: "Starch — Acid Hydrolysis",
    objective: "The quantitative determination of starch in foods.",
    definition: "Starch constitutes the major component of the polysaccharides in most foods and consists mainly of amylose and amylopectin.",
    principle: "The sample is dispersed in water and heated in acidic solution to hydrolyze starch, releasing sugars, which are then determined by titration with Fehling solution using the Lane–Eynon method.",
    materials: [
      "Hydrochloric acid (HCl), 35%", "Sodium hydroxide pellets", "50% sodium hydroxide solution",
      "Reagents for sugar determination by the Lane–Eynon method"
    ],
    apparatus: [
      "Round bottom flask, 250 mL", "Reflux condenser", "Glass beads",
      "Volumetric flask, 250 and 500 mL", "Filter paper No. 541", "Litmus paper", "Hotplate",
      "Apparatus for the Lane–Eynon method"
    ],
    hazards: [
      "Understand the toxicity and safety of the reagents before starting the method.",
      "Use tongs or gloves when handling hot containers."
    ],
    hazardLevel: "medium",
    sampleContext: "~3 g homogenized food sample",
    procedure: [
      { title: "Prepare the sample", detail: "Grind or blend the sample until homogeneous; store in a screw-cap bottle in a freezer if not analyzed the same day." },
      { title: "Weigh and disperse", detail: "Weigh about 3 g (accuracy 0.01 g) into a 250 mL round bottom flask, add 200 mL distilled water, 20 mL concentrated HCl and 3–4 glass beads." },
      { title: "Reflux hydrolysis", detail: "Fit a reflux condenser and heat until boiling and a clear solution is obtained, then cool to room temperature." },
      { title: "Neutralize and filter", detail: "Neutralize with 50% NaOH (checked with litmus paper), filter through Whatman No. 541 into a 250 mL volumetric flask, and dilute to the mark with distilled water." },
      { title: "Determine sugars", detail: "Follow the Lane–Eynon method (Fehling titration) to determine total sugar." }
    ],
    calculation: {
      description: "Starch is derived from total sugar (obtained by the Lane–Eynon method).",
      steps: [
        { label: "Starch", formula: "Starch (g/100 g) = % Total sugar × 0.9" }
      ],
      inputs: [
        { id: "totalSugar", label: "Total sugar (Lane–Eynon)", unit: "g/100 g", default: 8.2, min: 0, step: 0.01, source: "user" }
      ],
      resultLabel: "Starch",
      resultUnit: "g/100 g",
      precisionDp: 1
    },
    acceptance: {
      text: "Accept test results if the following are satisfied.",
      rules: [
        { type: "duplicate-pct", label: "Duplicate results should not differ by more than 10% of the mean.", limitPct: 10 },
        { type: "note", label: "Mean of duplicate results of a quality control sample or certified reference material should be within ±2 SD on the control chart, based on established acceptance criteria." }
      ]
    },
    limitations: [
      "Acid-hydrolysis methods also measure non-starch polysaccharide (NSP), limiting their use to situations where low accuracy is acceptable or NSP is known to be small.",
      "Preferred methods use enzymatic hydrolysis coupled with a specific glucose assay of the hydrolysate.",
      "AOAC also contains enzymatic methods for starch in cereal products (32.2.05, 32.2.05A) and condensed/dry milk products (4.7.03)."
    ],
    references: [
      "Horwitz W (2000) (editor). Starch in baking powders, 25.1.11, Official Method of Analysis of AOAC International. 17th Edition. AOAC International, Maryland, USA.",
      "Greenfield H and Southgate DAT (1992). Food Composition Data: Production, Management and Use. Elsevier Applied Science, UK.",
      "Kirk RS and Sawyer R (1991). Pearson's Composition and Chemical Analysis of Foods, 9th Edition. Longman Scientific & Technical, Essex, England."
    ],
    instrument: "starch"
  },

  /* ---------------------------------------------------------- */
  {
    id: "hplc-sugars",
    number: "2.4",
    group: "Practical 2 — Quantitative Analysis of Food Components",
    title: "Individual Sugars by HPLC",
    shortTitle: "Sugars — HPLC",
    objective: "The quantitative determination of individual sugars in beverages (malt beer, soft drink, lemonade, table wine, orange juice), honey, marmalade, and other food products.",
    definition: "Sugars determined by this method consist of mono-, di- and tri-saccharides.",
    principle: "Beverages/honey are diluted with water and filtered, then chromatographed on an HPLC column to separate individual sugars. Foods are extracted with aqueous ethanol; after evaporation, the sugars remaining in aqueous solution are separated by HPLC. High-fat samples are defatted with petroleum ether first; high-protein samples have protein precipitated with potassium hexacyanoferrate and zinc sulfate first.",
    materials: [
      "Calcium carbonate, AR", "Ethanol, 85% (v/v)", "Standard sugars: glucose, fructose, sucrose, maltose, lactose",
      "Ultra-pure distilled water", "EDTA disodium-calcium salt", "Petroleum ether, AR",
      "Acetonitrile, HPLC grade", "Ethanol, HPLC grade", "Potassium hexacyanoferrate, 15% (v/v)", "Zinc sulfate, 30% (v/v)"
    ],
    apparatus: [
      "HPLC system", "Hypersil (APS2) NH2, 5 µm column with guard column, 250 × 4.6 mm (id), or equivalent",
      "Analytical balance", "Whatman filter paper No. 41 and 42", "Funnels", "Flat-bottom flask, 250 mL",
      "Ultra-filtering equipment (0.45 µm membrane, 47 mm)", "Sample clarification kit (0.45 µm, 13 mm)",
      "Rotary evaporator", "Sample vials"
    ],
    hazards: [
      "Understand the toxicity and safety of solvents before starting the method.",
      "Acetonitrile is carcinogenic — wear gloves to reduce skin contact."
    ],
    hazardLevel: "high",
    hplcConditions: {
      column: "Hypersil (APS2) NH2, 5 µm, 250 × 4.6 mm (id) with guard column",
      mobilePhase: "Acetonitrile : distilled water : ethanol = 82 : 17.5 : 0.5",
      detector: "RI detector",
      flowRate: "1.5 mL/min",
      injectionVolume: "20 µL",
      columnTemp: "25–30 °C",
      detectorTemp: "25–30 °C"
    },
    sugars: [
      { id: "glucose", label: "Glucose", retention: 3.1, color: "#2E86C1" },
      { id: "fructose", label: "Fructose", retention: 3.9, color: "#A3311B" },
      { id: "sucrose", label: "Sucrose", retention: 5.6, color: "#3F6B2E" },
      { id: "maltose", label: "Maltose", retention: 7.2, color: "#92600B" },
      { id: "lactose", label: "Lactose", retention: 8.6, color: "#6C3483" }
    ],
    sampleContext: "beverage, honey, marmalade or extracted food solution (sample-type dependent preparation)",
    procedure: [
      { title: "Prepare the sample", detail: "Filter beverages through 0.45 µm membrane; dissolve honey/marmalade in hot water and filter; or extract foods with aqueous ethanol according to their fat/protein content." },
      { title: "Prepare standards", detail: "Prepare 2% solutions of each individual sugar for retention-time identification, and a 2% sugar-mixture standard for quantitation." },
      { title: "Set HPLC conditions", detail: "Set the column, mobile phase, flow rate, injection volume and temperatures as specified for the method." },
      { title: "Inject standards and sample", detail: "Inject sugar standards and sample solution (10–20 µL) under the specified conditions." },
      { title: "Measure peaks", detail: "Measure the area or peak height of each sugar peak in both sample and standard chromatograms." }
    ],
    calculation: {
      description: "Each sugar is quantified against its standard peak, scaled by dilution and sample weight.",
      steps: [
        { label: "Sugar amount", formula: "Amount of sugar (g/100 g) = (A_sample / A_standard) × C_standard × (V / W)" }
      ],
      inputs: [
        { id: "aSample", label: "Peak area/height — sample", unit: "au", default: 41200, min: 0, step: 1, source: "user" },
        { id: "aStandard", label: "Peak area/height — standard", unit: "au", default: 38650, min: 1, step: 1, source: "user" },
        { id: "cStandard", label: "Standard concentration", unit: "g/100 mL", default: 2.0, min: 0, step: 0.01, source: "user" },
        { id: "volume", label: "Total prepared sample volume, V", unit: "mL", default: 10, min: 0, step: 0.1, source: "user" },
        { id: "weight", label: "Sample weight, W", unit: "g", default: 5.0, min: 0.01, step: 0.01, source: "user" }
      ],
      resultLabel: "Sugar amount",
      resultUnit: "g/100 g",
      precisionDp: 1
    },
    acceptance: {
      text: "Accept test results if the following are satisfied.",
      rules: [
        { type: "duplicate-pct", label: "Duplicate results should not differ by more than 10% of the mean.", limitPct: 10 },
        { type: "note", label: "Mean of duplicate results of a quality control sample or certified reference material should be within ±2 SD on the control chart, based on established acceptance criteria." }
      ]
    },
    references: [
      "AOAC International (1993). Methods of Analysis for Nutrition Labelling. Chapter 33. Sugars (Mono & Di) — Liquid Chromatographic Methods (982.14, 977.20).",
      "Will RBH and Greenfield H (1984). Laboratory instruction manual for food composition studies. University of New South Wales, p 59.",
      "Waters (1987). Choosing the Right Column Chemistry for Carbohydrate Analysis. Waters Chromatography Division, Millipore Corporation, 2:4-6."
    ],
    instrument: "hplc"
  },

  /* ---------------------------------------------------------- */
  {
    id: "ash",
    number: "2.5",
    group: "Practical 2 — Quantitative Analysis of Food Components",
    title: "Ash by Gravimetric Method",
    shortTitle: "Ash — Gravimetric Method",
    objective: "The quantitative determination of ash in raw, cooked and processed foods.",
    definition: "Ash content refers to the total mineral residue left after incineration of organic matter. It has no nutritional significance per se, but is a useful check on the proximate composition of food and an indicator of mineral content. Expressed as g ash per 100 g sample.",
    principle: "The method oxidizes all organic matter by incineration in a furnace at a specified temperature (<550 °C). Ashing above 650 °C volatilizes inorganic salts (e.g. alkali chlorides) and may fuse a portion of the ash, enclosing carbon and preventing ignition. The residue after incineration is the ash content.",
    materials: ["Nitric acid or dilute HCl (1:2.5)"],
    apparatus: [
      "Furnace, controllable 100–600 °C", "Air oven", "Hotplate / Bunsen burner / electric coil",
      "Analytical balance, 200 g capacity, 0.1 mg sensitivity", "Desiccator with activated desiccant (e.g. silica gel)",
      "Boiling water bath with removable rings", "Tongs", "Porcelain crucible or silica dish", "Spatula"
    ],
    hazards: [
      "Always use tongs and gloves when handling crucibles.",
      "Wear face/eye protection when opening a hot furnace."
    ],
    hazardLevel: "high",
    sampleContext: "2–4 g dry sample or 10 g wet sample",
    procedure: [
      { title: "Pre-heat the crucible", detail: "Heat the marked crucible in a furnace at 500–550 °C for 2–3 h." },
      { title: "Cool and weigh empty crucible", detail: "Lower the furnace to 180 °C, transfer the crucible to a desiccator, cool 30 min and weigh (W1)." },
      { title: "Weigh the sample", detail: "Weigh, in duplicate, into the pre-weighed crucible (W2): 2–4 g for dry samples, 10 g for wet samples." },
      { title: "Char the sample", detail: "For dry samples, char over a hotplate at low temperature initially, increasing until smoking ceases. For wet/liquid samples, pre-dry over a boiling water bath first, then char." },
      { title: "Incinerate", detail: "Incinerate the charred sample in a furnace at 500–550 °C until the residue is uniformly white or nearly white." },
      { title: "Re-ash if needed", detail: "If not completely white, moisten the ash with a few drops of water or dilute acid, evaporate on a water bath, and repeat furnace heating for 30–60 min until constant weight." },
      { title: "Cool and weigh final ash", detail: "Lower the furnace to 180 °C, transfer to a desiccator, cool 30 min and weigh (W3)." }
    ],
    calculation: {
      description: "Ash content from the residual mineral weight relative to sample weight.",
      steps: [
        { label: "Ash", formula: "Ash (g/100 g) = [(W3 − W1) × 100] / (W2 − W1)" }
      ],
      inputs: [
        { id: "w1", label: "W1 — crucible weight", unit: "g", default: 24.812, min: 0, step: 0.001, source: "user" },
        { id: "w2", label: "W2 — crucible + sample", unit: "g", default: 27.815, min: 0, step: 0.001, source: "user" },
        { id: "w3", label: "W3 — crucible + ash", unit: "g", default: 24.951, min: 0, step: 0.001, source: "user" }
      ],
      resultLabel: "Ash",
      resultUnit: "g/100 g",
      precisionDp: 1
    },
    acceptance: {
      text: "Accept test results if the following are satisfied.",
      rules: [
        { type: "duplicate-pct", label: "Duplicate results should not differ by more than 5% of the mean.", limitPct: 5 }
      ]
    },
    warning: "If ash samples are to be used for mineral analysis, furnace temperature should not exceed 450 °C — too high a temperature may volatilize elements such as Fe, K, Na, S, Cl and P, and may cause the mineral matter to fuse and melt.",
    references: [
      "Horwitz W (2000) (editor). Official Method of Analysis of AOAC International. 17th Edition. AOAC International, Maryland, USA.",
      "Greenfield H and Southgate DAT (1992). Food Composition Data: Production, Management and Use. Elsevier Applied Science, UK.",
      "Kirk RS and Sawyer R (1991). Pearson's Composition and Chemical Analysis of Foods, 9th Edition. Longman Scientific & Technical, Essex, England."
    ],
    instrument: "ash"
  },

  /* ---------------------------------------------------------- */
  {
    id: "ph-acidity",
    number: "3.1",
    group: "Practical 3 — Chemical Properties of Foods",
    title: "pH and Titratable Acidity",
    shortTitle: "pH & Titratable Acidity",
    objective: "Determine the titratable acidity and pH of food samples (soda and apple juice).",
    principle: "The volume of a standard base used to titrate the organic acids in a food to a phenolphthalein endpoint is used to determine titratable acidity.",
    materials: [
      "Apple juice, 60 mL", "3 beakers, 250 mL", "2 burettes, 25 or 50 mL", "4 Erlenmeyer flasks, 250 mL",
      "Small funnel to fit the burette", "Graduated cylinder, 50 mL", "Clear soda, 80 mL",
      "2 volumetric pipettes, 10 or 20 mL", "Standardized NaOH, ca. 0.1 N", "1% phenolphthalein indicator"
    ],
    apparatus: ["Hot plate", "pH meter"],
    hazards: [
      "Adhere to normal laboratory safety procedures.",
      "Wear safety glasses at all times.",
      "Waste may be rinsed down the drain with water, but follow your institution's environmental health and safety protocols."
    ],
    hazardLevel: "low",
    sampleContext: "soda (unboiled and boiled) and apple juice",
    procedure: [
      { title: "Prepare soda samples", detail: "Open soda well before use to allow CO₂ to escape so the sample can be pipetted. Prepare duplicate unboiled and boiled soda samples." },
      { title: "Titrate unboiled soda", detail: "Pipette 20 mL soda into a 250 mL Erlenmeyer flask, add ca. 50 mL CO₂-free water, add 3 drops of 1% phenolphthalein, and titrate with standardized NaOH to a faint pink endpoint." },
      { title: "Titrate boiled soda", detail: "Pipette 20 mL soda, boil 30–60 s on a hotplate (swirling), cool to room temperature, add ca. 50 mL CO₂-free water and phenolphthalein, then titrate as above." },
      { title: "Prepare apple juice beakers", detail: "Into each of three 250 mL beakers (A, B, C), pipette 20 mL apple juice and add ca. 50 mL CO₂-free water. Add 3 drops phenolphthalein to beaker C only." },
      { title: "Titrate apple juice with pH tracking", detail: "Using two burettes with standardized NaOH, titrate samples B and C, following the pH of sample C with a pH meter. Record pH at ca. 1.0 mL NaOH intervals until pH 9.0 is reached." },
      { title: "Locate the endpoint", detail: "Plot pH versus mL NaOH added for sample C and interpolate to find the volume of titrant at pH 8.2 (the phenolphthalein endpoint)." }
    ],
    calculation: {
      description: "Titratable acidity (%) as citric acid (soda) or malic acid (apple juice), from the volume of standardized NaOH used.",
      steps: [
        { label: "% Acid", formula: "% Acid = (mL base titrant × N of base × Eq. Wt. of acid) / (sample volume, mL × 10)" }
      ],
      inputs: [
        { id: "sampleType", label: "Sample", type: "select", options: [
          { value: "soda", label: "Soda (citric acid, Eq. Wt. 64.04)", eqWt: 64.04 },
          { value: "apple", label: "Apple juice (malic acid, Eq. Wt. 67.04)", eqWt: 67.04 }
        ], default: "soda", source: "user" },
        { id: "titrantVol", label: "Volume of NaOH used", unit: "mL", default: 7.0, min: 0, step: 0.05, source: "user" },
        { id: "naohNormality", label: "NaOH normality", unit: "N", default: 0.1019, min: 0.001, step: 0.0001, source: "user" },
        { id: "sampleVol", label: "Sample volume", unit: "mL", default: 20, min: 0.1, step: 0.1, source: "user" }
      ],
      resultLabel: "Titratable acidity",
      resultUnit: "% acid",
      precisionDp: 3
    },
    worked_example: "N NaOH = 0.1019 N, mL base = 7 mL, Eq. wt. citric acid = 64.04, sample volume = 20 mL → %Acid = (7 × 0.1019 × 64.04) / (20 × 10) = 0.276% citric acid.",
    acceptance: {
      text: "The manual does not state a numeric acceptance threshold for this practical; duplicate titrations should be compared for consistency and the pH-vs-volume curve used to confirm the phenolphthalein endpoint at pH 8.2.",
      rules: [ { type: "note", label: "Compare duplicate titre volumes for consistency; confirm the endpoint against the pH curve at pH 8.2." } ]
    },
    references: [
      "Nielsen SS (editor). Food Analysis (see Chapter 13 for the titratable acidity equation referenced by the manual)."
    ],
    instrument: "ph-acidity"
  },

  /* ---------------------------------------------------------- */
  {
    id: "vitamin-c",
    number: "3.2",
    group: "Practical 3 — Chemical Properties of Foods",
    title: "Ascorbic Acid (Vitamin C)",
    shortTitle: "Vitamin C — DCPIP Titration",
    objective: "To determine the amount of Vitamin C (ascorbic acid) in a food sample.",
    definition: "Ascorbic acid is an enediol isomer of 2-keto-l-gluconolactone. Its oxidation gives dehydro-ascorbic acid; both forms are physiologically active.",
    principle: "Titrimetric estimation using 2,6-dichlorophenol indophenol (DCPIP) dye, which is blue in alkaline solution and red in acidic solution. Ascorbic acid reduces the dye to a colourless form; the reaction is quantitative and specific for ascorbic acid at pH 1.0–3.5.",
    materials: [
      "4% oxalic acid (40 g in 100 mL water)",
      "DCPIP dye solution (0.250 g sodium salt of 2,6-dichlorophenol indophenol in ~500 mL water with 0.210 g NaHCO₃, diluted to 1 L; stored refrigerated and standardized before use)",
      "Standard ascorbic acid: 0.01% ascorbic acid dissolved in oxalic acid"
    ],
    apparatus: ["Burette", "Conical flask", "Pipettes"],
    hazards: [
      "Adhere to normal laboratory safety procedures when handling oxalic acid and DCPIP dye."
    ],
    hazardLevel: "low",
    sampleContext: "5 g fruit sample (filtered juice), made up to 100 mL with 4% oxalic acid",
    procedure: [
      { title: "Prepare the sample extract", detail: "Take 5 g of fruit sample (filtered juice) and make up to 100 mL with 4% oxalic acid." },
      { title: "Titrate the sample", detail: "Take 5 mL of the extract, add 10 mL 4% oxalic acid, and titrate against DCPIP dye until a pink colour appears and persists for at least 15 seconds — this is the endpoint." },
      { title: "Standardize the dye", detail: "Simultaneously, take 5 mL of standard ascorbic acid solution, add 10 mL 4% oxalic acid, mix, and titrate against DCPIP to standardize the dye." },
      { title: "Record the titre", detail: "Note the titre value (TV); it should fall within 0.1–1.0 mL." }
    ],
    calculation: {
      description: "Ascorbic acid content from the DCPIP titre, standardized against the known ascorbic acid solution.",
      steps: [
        { label: "Vitamin C", formula: "mg/100 g = [0.5 mg / V1 (mL, standard titre)] × [V2 (mL, made-up volume) / aliquot (mL)] × [100 / sample weight (g)] × T.V. (sample titre, mL)" }
      ],
      inputs: [
        { id: "v1", label: "V1 — standard titre (dye vs. 0.5 mg standard)", unit: "mL", default: 0.42, min: 0.01, step: 0.01, source: "user" },
        { id: "sampleTitre", label: "Sample titre, T.V.", unit: "mL", default: 0.55, min: 0, step: 0.01, source: "user" },
        { id: "madeUpVol", label: "Made-up extract volume, V2", unit: "mL", default: 100, min: 1, step: 1, source: "user" },
        { id: "aliquot", label: "Aliquot titrated", unit: "mL", default: 5, min: 0.1, step: 0.1, source: "user" },
        { id: "sampleWeight", label: "Sample weight", unit: "g", default: 5, min: 0.1, step: 0.1, source: "user" }
      ],
      resultLabel: "Ascorbic acid (Vitamin C)",
      resultUnit: "mg/100 g",
      precisionDp: 1
    },
    acceptance: {
      text: "The manual specifies the titre value (TV) should fall between 0.1 and 1.0 mL; titrations outside that range should be repeated with an adjusted aliquot.",
      rules: [ { type: "range", label: "Titre value (T.V.) should be between 0.1 and 1.0 mL.", min: 0.1, max: 1.0, field: "sampleTitre" } ]
    },
    references: [
      "Rashida Rajuva TA & Joy PP (2014). A Food Technology Lab Manual. Pineapple Research Station (Kerala Agricultural University), Vazhakulam, Muvattupuzha, Ernakulam, Kerala."
    ],
    instrument: "vitamin-c"
  },

  /* ---------------------------------------------------------- */
  {
    id: "soluble-solids",
    number: "3.3",
    group: "Practical 3 — Chemical Properties of Foods",
    title: "Total Soluble Solids",
    shortTitle: "Total Soluble Solids (°Brix)",
    objective: "To determine the amount of sugar present in a fruit juice sample.",
    definition: "Total soluble solids (TSS) represent the various chemical substances present in a fruit juice in soluble form, and indicate the sugar content. TSS is a commonly used index of fruit maturity.",
    principle: "TSS is determined quickly with a refractometer, which works on the principle of refractive index and reports the result as °Brix.",
    materials: ["A hand refractometer", "Dropper or glass rod", "Blotting paper", "Absorbent cotton", "Rectified spirit", "Distilled water"],
    apparatus: ["Hand refractometer"],
    hazards: ["Adhere to normal laboratory safety procedures."],
    hazardLevel: "low",
    sampleContext: "clear fruit juice sample",
    procedure: [
      { title: "Open and clean the prism", detail: "Unfold the lid covering the prism plate. Wash the lid and prism plate with a jet of clean water to remove any stains." },
      { title: "Blot dry", detail: "Wipe off adhered water with blotting paper or absorbent cotton, then clean the lid and prism with cotton soaked in rectified spirit." },
      { title: "Zero with distilled water", detail: "Place a drop of distilled water on the prism plate, fold the lid over it, and hold together firmly." },
      { title: "Check the scale", detail: "Point the refractometer toward light and look through the eyepiece. Adjust the focusing knob for a clear scale image; the shaded/unshaded boundary should sit at zero for distilled water — adjust the calibration screw if not." },
      { title: "Dry the prism", detail: "Fold back the lid, blot off the distilled water and air-dry for a few minutes." },
      { title: "Place the sample", detail: "Place a drop of the clear fruit juice sample on the prism plate with a dropper or glass rod." },
      { title: "Read °Brix", detail: "Read the position of the shaded/unshaded boundary against the scale to obtain the TSS in °Brix." }
    ],
    calculation: {
      description: "TSS is read directly from the refractometer scale as °Brix — no further calculation is applied.",
      steps: [
        { label: "TSS", formula: "TSS (°Brix) = refractometer scale reading at the shade boundary" }
      ],
      inputs: [
        { id: "brixReading", label: "Refractometer reading", unit: "°Brix", default: 11.4, min: 0, step: 0.1, source: "user" }
      ],
      resultLabel: "Total soluble solids",
      resultUnit: "°Brix",
      precisionDp: 1
    },
    acceptance: {
      text: "The manual does not specify a numeric duplicate-difference threshold for this practical; re-zero against distilled water between readings and take duplicate readings for consistency.",
      rules: [ { type: "note", label: "Re-zero against distilled water between samples; compare duplicate readings for consistency." } ]
    },
    references: [
      "Rashida Rajuva TA & Joy PP (2014). A Food Technology Lab Manual. Pineapple Research Station (Kerala Agricultural University), Vazhakulam, Muvattupuzha, Ernakulam, Kerala."
    ],
    instrument: "soluble-solids"
  }
];

export function getPractical(id){
  return PRACTICALS.find(p => p.id === id);
}

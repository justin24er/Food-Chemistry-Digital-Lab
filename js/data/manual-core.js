/* ============================================================
   MANUAL CORE DATA
   Transcribed directly from:
   "Practical Manual — Food Chemistry" (AS6201),
   Mbeya University of Science and Technology, Department of Applied Sciences.
   This file is Level-1 source-of-truth content — do not add topics
   that are not present in the supplied manual.
   ============================================================ */

export const INSTITUTION = {
  name: "Mbeya University of Science and Technology",
  department: "Department of Applied Sciences",
  manualTitle: "Practical Manual — Food Chemistry",
  code: "AS6201"
};

/* -------------------------------------------------------------
   LABORATORY SAFETY AND HEALTH RULES
   (condensed to their operative points, grouped exactly as the
   manual groups them: A–I)
   ------------------------------------------------------------- */
export const SAFETY_RULES = [
  {
    group: "A", title: "General",
    points: [
      "Follow all instructions from the lecturer or technician promptly — shortcuts can be dangerous.",
      "Open shoes, sandals, shorts, ties, excessive clothing and untied long hair are not allowed. Long hair must be tied up.",
      "Walking around the building barefoot is prohibited.",
      "Protective clothing (clean white coats), safety glasses and equipment are compulsory when prescribed.",
      "No smoking, eating or drinking in laboratories. Never store food in a refrigerator used for chemicals.",
      "Do not sit or lie on laboratory work surfaces.",
      "Work intelligently and independently of other students as far as possible.",
      "Keep your work area and the laboratory clean and tidy.",
      "Bunsen burners must always be placed on asbestos slabs when in use.",
      "Playing or horsing about in the laboratory is strictly prohibited.",
      "Ask for clarification if anything is unclear.",
      "Handle apparatus professionally; ask if unsure how it works. Use balances carefully, clean after use and close the windows.",
      "Report all broken apparatus immediately to the supervisor or technician.",
      "Report any maintenance problems to the laboratory in charge.",
      "Remember to fill out logbooks of apparatus.",
      "Do not slam or kick doors of incubators, ovens, freezers or fridges."
    ]
  },
  {
    group: "B", title: "Handling Chemicals",
    points: [
      "All chemical solutions must be marked with: type of chemical, concentration, date prepared, and student's name.",
      "Never put chemicals in unmarked containers.",
      "Never sniff chemicals directly.",
      "Never pipette liquids by mouth — always use a pipette filler.",
      "Report contact or accidental inhalation of dangerous substances to the supervisor immediately.",
      "Rinse skin splashes immediately with plenty of cold water; use polyethylene glycol for lipophilic substances, never organic solvents.",
      "For corrosive substances in the eye: rinse thoroughly with gentle water flow or eyewash equipment, holding eyelids open, then seek an eye specialist immediately, stating the chemical involved.",
      "Remove any clothing contaminated with a corrosive substance immediately.",
      "Seek medical advice after any accident or if you feel unwell.",
      "Plan experiments carefully, especially with flammable, poisonous or explosive substances.",
      "Do not experiment with or taste chemicals.",
      "Use fume cupboards, especially when vapours or gases present are unknown.",
      "Wear eye protection and gloves when opening bottles of dangerous substances.",
      "Do not carry chemical bottles by the lid — use a carrying basket.",
      "Do not pour reagents back into bottles — this causes contamination.",
      "Wipe spills immediately; do not leave teardrops on bottles or switch pipettes between bottles.",
      "Wash all glassware thoroughly with soap and water; ask the supervisor if it will not come clean.",
      "Leave all apparatus clean and wash your hands thoroughly after handling dangerous chemicals."
    ]
  },
  {
    group: "C", title: "Chemical Warning Labels",
    points: [
      "Before using chemicals, read the label and check for warnings. Familiarize yourself with hazard symbols on the laboratory poster.",
      "When ordering new chemicals, obtain the Material Safety Data Sheet (MSDS) from the supplier."
    ]
  },
  {
    group: "D", title: "Accidents and Injuries",
    points: [
      "Remain calm.",
      "If an acid or alkaline substance is spilled on you, wash the area under the tap or emergency shower.",
      "For a cut or other wound, call the supervisor and/or first-aid person.",
      "Know where the nearest basin, emergency shower, eyewash bottle and first-aid box are located."
    ]
  },
  {
    group: "E", title: "Fire",
    points: [
      "Follow the same rules as for gas flames.",
      "Ensure gas burner taps are closed properly after use.",
      "Know the location of the closest fire extinguisher and how to use it.",
      "If possible, close the main gas valve (marked yellow), close windows and the door when everyone has left the laboratory."
    ]
  },
  {
    group: "F", title: "Emergency Conditions",
    points: [
      "Call the supervisor and emergency helpers.",
      "Know where the closest telephone is and phone the university protection unit to report the incident.",
      "Give basic details so emergency services can be properly informed.",
      "Familiarize yourself with the building's emergency plan, evacuation procedures and meeting place."
    ]
  },
  {
    group: "G", title: "Biological Safety",
    points: [
      "All biological materials must be autoclaved — red bins are provided for petri dishes.",
      "All tips (yellow and blue) must be autoclaved and never placed in regular waste bins; special sharps containers are provided.",
      "Glassware used for sludge or bacterial growth must be autoclaved before washing.",
      "White coats, gloves, masks and goggles are compulsory when working with sludge, pathogenic bacteria or hazardous chemicals.",
      "Work in fume cupboards when handling sludge, effluent or hazardous chemicals."
    ]
  },
  {
    group: "H", title: "Broken Glass",
    points: [
      "Never put broken glass in the regular bin — use the green or blue bins provided.",
      "Clean glassware directly after use; residue can harden and become difficult to remove."
    ]
  },
  {
    group: "I", title: "Cleaning of Laboratories",
    points: [
      "Cleaners are responsible for floors and garbage bins; students are responsible for cleaning work surfaces and everything they used."
    ]
  }
];

/* -------------------------------------------------------------
   PRACTICAL 1 — LABORATORY ORIENTATION
   1.1 Health and Safety Equipment
   ------------------------------------------------------------- */
export const ORIENTATION = {
  number: "1",
  title: "Laboratory Orientation",
  objectives: [
    "Discussion of laboratory safety rules",
    "A brief introduction to working in the laboratory",
    "Practical grouping of students",
    "Equip group cupboards with the necessary glassware and apparatus needed for practical"
  ],
  equipment: [
    {
      id: "exit", label: "Emergency Exit", x: 8, y: 50,
      purpose: "The closest route out of the laboratory in an emergency.",
      usage: "Know the location of the closest emergency exit before starting any practical. Move to it calmly, without running, if an evacuation is called."
    },
    {
      id: "phone", label: "Emergency Phone", x: 92, y: 15,
      purpose: "The closest emergency phone and emergency phone numbers.",
      usage: "Know where the closest telephone is and phone the university protection unit to report an incident, giving basic details so emergency services can be informed properly."
    },
    {
      id: "alarm", label: "Fire Alarm", x: 50, y: 6,
      purpose: "Closest fire alarm call point.",
      usage: "Activate on discovering a fire, then evacuate to the designated meeting place following the building's emergency plan."
    },
    {
      id: "extinguisher", label: "Fire Extinguisher", x: 20, y: 20,
      purpose: "Fire extinguisher for small, containable fires.",
      usage: "Know the location of the closest fire extinguisher and how to use it. Ensure gas burner taps and, if possible, the main gas valve (marked yellow) are closed before attempting to fight a fire."
    },
    {
      id: "shower", label: "Safety Shower", x: 65, y: 78,
      purpose: "Safety showers for large chemical splashes on skin or clothing.",
      usage: "If an acid or alkaline substance is spilled on you, wash the affected area under the emergency shower immediately. Remove any contaminated clothing."
    },
    {
      id: "eyewash", label: "Eye Wash", x: 78, y: 60,
      purpose: "Eye wash facilities for corrosive substances in the eye.",
      usage: "Rinse thoroughly with a gentle flow of water, holding the eyelids wide open and moving the eyes in all directions. Consult an eye specialist immediately, stating the chemical involved."
    },
    {
      id: "firstaid", label: "First Aid Kit", x: 35, y: 68,
      purpose: "First aid kit for cuts and other minor injuries.",
      usage: "For a cut or other wound, call the supervisor and/or the trained first-aid person to help."
    },
    {
      id: "bench", label: "Group Bench & Cupboard", x: 50, y: 45,
      purpose: "Practical group bench, equipped with the glassware and apparatus needed for the day's practical.",
      usage: "Keep the bench and the rest of the laboratory clean and tidy. Report any broken apparatus immediately and log apparatus use in the logbook."
    }
  ]
};

/* -------------------------------------------------------------
   PRACTICAL REPORT GUIDELINES (structure only — the manual
   describes each section's purpose in prose; summarised here
   for the interactive report builder)
   ------------------------------------------------------------- */
export const REPORT_GUIDELINES = {
  format: "All practical reports should be written in the format of a research article, as prescribed by the International Journal of Food Science and Technology.",
  sections: [
    {
      id: "title", label: "Title",
      guidance: "Concise and descriptive — not just the analyte name. E.g. \"The determination of the moisture content of apples, maize and barley\", not \"Moisture content\"."
    },
    {
      id: "abstract", label: "Abstract",
      guidance: "No more than 200 words, written in the past tense, with no literature references. Cover: scope of the experiment, objectives, methodology used, summary of important results, and main conclusions — aim for 1–2 sentences per element."
    },
    {
      id: "introduction", label: "Introduction",
      guidance: "Provide background so the reader can understand the results without other references: the nature of the problem, review of relevant literature, a clear statement of the hypothesis, and the aim of the study. Move from general to specific."
    },
    {
      id: "methods", label: "Materials and Methods",
      guidance: "Enough detail for a reader to repeat the experiment, written as descriptive paragraphs (not a copy of the manual protocol). Include quantities, units, number of replicates and any software used. No results or discussion here."
    },
    {
      id: "results", label: "Results",
      guidance: "Present results logically, with averages and standard deviation (± x) where replicates were used — do not give raw data. Number and caption all tables/figures, with correct units on headings and axes."
    },
    {
      id: "discussion", label: "Discussion",
      guidance: "Interpret trends and possible causes, compare with literature, discuss theoretical and practical applications, and reference literature correctly."
    },
    {
      id: "conclusion", label: "Conclusion",
      guidance: "A concise statement of the major findings and any recommendations."
    },
    {
      id: "references", label: "References",
      guidance: "Correctly formatted, with every in-text citation listed."
    }
  ]
};

/* -------------------------------------------------------------
   REPORT MARKING SCHEME — transcribed section headings and
   descriptors from the manual's marking table (Total: 100)
   ------------------------------------------------------------- */
export const MARKING_SCHEME = [
  { section: "Title", items: ["Brief, descriptive title of the experiment"] },
  { section: "Abstract", items: ["Purpose of report stated", "General experimental procedure stated", "Basic findings stated"] },
  { section: "Introduction", items: ["Relevance of background literature", "Summary of pertinent facts", "Objectives and hypothesis clearly stated", "Literature correctly referenced"] },
  { section: "Materials and Methods", items: ["Sufficient information to enable reproduction of the experiment", "Correct units of quantities consistently used", "Number of replicates performed stated"] },
  { section: "Results", items: ["Tables/figures have numbered, sufficiently descriptive captions", "Graph axes and/or table headings labelled with correct units", "Tables/figures presented in the correct format", "Reasonable level of accuracy and precision shown", "Good, concise description of results"] },
  { section: "Discussion", items: ["Good interpretation of results (trends, possible causes)", "Good comparison of experimental data to literature with reasonable explanations", "Discussion of theoretical and practical applications", "Literature correctly referenced"] },
  { section: "Conclusion", items: ["Concise statement of major findings", "Recommendations"] },
  { section: "References", items: ["Correct referencing style used", "All in-text references listed"] },
  { section: "General", items: ["Report follows a logical flow in all sections", "Consistent, clear scientific writing style", "Good spelling and grammar"] }
];

export const SCIENTIFIC_SOURCES = [
  "Horwitz W (2000) (editor). Official Method of Analysis of AOAC International. 17th Edition. AOAC International, Maryland, USA.",
  "WHO (1973). Report of a Joint FAO/WHO Ad Hoc Expert Committee on Energy and Protein Requirements, WHO Technical Report Series No. 522, WHO, Geneva.",
  "Greenfield H and Southgate DAT (1992). Food Composition Data: Production, Management and Use. Elsevier Applied Science, UK.",
  "Kirk RS and Sawyer R (1991). Pearson's Composition and Chemical Analysis of Foods, 9th Edition. Longman Scientific & Technical, Essex, England.",
  "AOAC International (1993). Methods of Analysis for Nutrition Labelling. Chapter 33.",
  "Will RBH and Greenfield H (1984). Laboratory instruction manual for food composition studies. Department of Food Science and Technology, University of New South Wales, p 59.",
  "Waters (1987). Choosing the Right Column Chemistry for Carbohydrate Analysis. Notes Food & Beverage, Waters Chromatography Division, Millipore Corporation, 2:4-6.",
  "Rashida Rajuva TA & Joy PP. (2014). A Food Technology Lab Manual. Pineapple Research Station (Kerala Agricultural University), Vazhakulam, Muvattupuzha, Ernakulam, Kerala."
];

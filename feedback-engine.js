/* ============================================================
   FEEDBACK ENGINE
   Produces short, manual-tied scientific feedback messages.
   ============================================================ */
export function feedbackFor(kind, ctx = {}){
  switch(kind){
    case "run-recorded":
      return ctx.run === "A"
        ? "Run A recorded. Record a duplicate (Run B) to check the manual's acceptance criterion."
        : "Run B recorded. Duplicate result and acceptance check are now available in the Results tab.";
    case "invalid-measurement":
      return "Check the required measurement values for this step — the calculation needs valid numeric entries before a result can be recorded.";
    case "endpoint-reached":
      return "Endpoint detected. Record the burette reading.";
    case "interpretation": {
      const { data, result, acceptance } = ctx;
      const base = `The ${data.calculation.resultLabel.toLowerCase()} for this sample was determined as ${result.toFixed(data.calculation.precisionDp)} ${data.calculation.resultUnit}.`;
      if (acceptance && acceptance.pass === true){
        return base + " The duplicate measurements satisfy the practical's stated acceptance criterion, so this result can be reported with confidence.";
      }
      if (acceptance && acceptance.pass === false){
        return base + " The duplicate results exceed the acceptance difference specified by the practical — repeat the determination before reporting this value.";
      }
      return base + " Compare this value against the manual's acceptance notes for this practical before reporting it.";
    }
    default:
      return "";
  }
}

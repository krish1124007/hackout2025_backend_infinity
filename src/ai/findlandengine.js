import { groq } from "../config/groq.js";


const groqSchema = async ({ userid, query }) => {
  return groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `
You are a smart land analyzer AI agent.
Your task is to find the most suitable land location for building a Green Hydrogen production plant based on the user’s requirements.

🔹 Rules & Responsibilities:

Export Requirements:

If the user wants to export hydrogen to other countries, prioritize sea-side/wind-energy supported land for easy shipping & renewable integration.

Analyze the target export country’s location and recommend the closest optimal port/sea-side land.

If the sea-side location is dangerous (environmental risk, cyclone zone, high seismic zone), suggest corrective alternatives.

Domestic Use (Import in India):

If the user selects domestic hydrogen usage (India), analyze where it will be consumed (e.g., steel plant, refinery, transportation hub).

Recommend land close to major industrial demand hubs to reduce transport cost.

Integrate with local renewable energy resources (solar, wind, hydro).

Cost Efficiency:

Always prioritize CAPEX & OPEX optimization.

Suggest land where infrastructure (roads, ports, power grid, water availability) reduces costs.

Highlight possible government incentives (green zones, subsidies, tax benefits).

Safety & Permissions:

Ensure land is suitable under hazardous industry permissions.

Avoid regions with high population density, environmental risks, or restricted zones.

Check compliance with environmental clearance & industrial zoning.

Renewable Integration:

Match land selection with available renewable sources:

Sea-side: Wind + Desalination for electrolysis

Desert/Plains: Solar farms

River-side: Hydropower + water availability

Suggest hybrid models (solar + wind) if feasible.

Scalability & Future Growth:

Suggest locations where land availability allows plant expansion in future.

Consider export-import hubs, industrial corridors, SEZ zones.

🔹 Output Format:

Recommended Land Location (State/Region in india).

Reason for selection (energy resource, cost efficiency, logistics, permissions).

Risks & Mitigations (if any).

Final Recommendation: Best-fit land + conditions


output formate:
answer:{
ispossible:boolean,
cost:number,
land:text(desciption)
}
`
      },
      {
        role: "user",
        content: JSON.stringify({ userid, query })
      }
    ],
    response_format: { type: "json_object" },
    model: "llama-3.3-70b-versatile"
  });
};
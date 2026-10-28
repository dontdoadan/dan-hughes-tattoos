// Daniel Hughes Tattoos: anonymous, rate-limited, private enquiry intake.
// This endpoint is deliberately separate from all INKSIGHTS CRM workflows.
const SUPABASE_URL = Deno.env.get("SUPABASE_URL") || "";
function serviceKey(): string {
  const configured = Deno.env.get("SUPABASE_SECRET_KEYS");
  if (configured) {
    try {
      const keys = JSON.parse(configured) as Record<string,string>;
      const active = keys.default || Object.values(keys)[0];
      if (active) return active;
    } catch { /* Fall back to legacy key. */ }
  }
  return Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
}
const SERVICE_KEY = serviceKey();
const ALLOWED_ORIGINS = new Set([
  "https://danhughestattoos.co.uk",
  "https://www.danhughestattoos.co.uk",
  "https://dan-hughes-tattoos.vercel.app",
  "https://dan-hughes-tattoos-inksights.vercel.app",
  "http://localhost:3000",
  "http://127.0.0.1:3000"
]);
const projectTypes = new Set(["full-sleeve","half-sleeve","leg-sleeve","back-piece","chest-piece","other-large-scale","smaller-piece","unsure"]);
const sessionTypes = new Set(["single","multiple","unsure"]);
const contactTypes = new Set(["email","phone","instagram"]);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const text = (v: unknown, max: number) => typeof v === "string" ? v.trim().slice(0, max) : "";
const validOrigin = (value: string | null) => !value || ALLOWED_ORIGINS.has(value) || /^https:\/\/dan-hughes-tattoos-[a-z0-9-]+\.vercel\.app$/.test(value);
function headers(origin: string | null) {
  return { "Content-Type":"application/json; charset=utf-8", "Cache-Control":"no-store",
    "Vary":"Origin", "Access-Control-Allow-Origin": origin && validOrigin(origin) ? origin : "https://danhughestattoos.co.uk",
    "Access-Control-Allow-Methods":"POST, OPTIONS", "Access-Control-Allow-Headers":"content-type, apikey, authorization, x-client-info" };
}
const respond = (origin: string | null, body: Record<string,unknown>, status=200) =>
  new Response(JSON.stringify(body), { status, headers:headers(origin) });
async function db(path: string, init: RequestInit) {
  return fetch(SUPABASE_URL + "/rest/v1/" + path, {
    ...init,
    headers: { "apikey":SERVICE_KEY, ...(SERVICE_KEY.startsWith("sb_secret_") ? {} : {"Authorization":"Bearer " + SERVICE_KEY}),
      "Content-Type":"application/json", "Prefer":"return=minimal", ...(init.headers || {}) }
  });
}
Deno.serve(async (req: Request) => {
  const origin = req.headers.get("origin");
  if (req.method === "OPTIONS") return validOrigin(origin)
    ? new Response(null, {status:204,headers:headers(origin)}) : respond(origin,{error:"Origin not allowed"},403);
  if (req.method !== "POST") return respond(origin,{error:"Method not allowed"},405);
  if (!validOrigin(origin)) return respond(origin,{error:"Origin not allowed"},403);
  if (!(req.headers.get("content-type") || "").includes("application/json")) return respond(origin,{error:"JSON required"},415);
  if (Number(req.headers.get("content-length") || 0) > 14000) return respond(origin,{error:"Request too large"},413);
  if (!SUPABASE_URL || !SERVICE_KEY) return respond(origin,{error:"Service unavailable"},503);
  let payload: Record<string, unknown>;
  try {
    const body = await req.text();
    if (body.length > 14000) return respond(origin,{error:"Request too large"},413);
    payload = JSON.parse(body);
    if (!payload || typeof payload !== "object" || Array.isArray(payload)) throw Error("Invalid object");
  } catch { return respond(origin,{error:"Invalid JSON"},400); }
  // Invisible trap: bots that fill every field receive no actionable error.
  if (payload.website) return respond(origin,{ok:true});
  const full_name = text(payload.fullName,120);
  const email = text(payload.email,254).toLowerCase();
  const phone = text(payload.phone,45);
  const instagram_handle = text(payload.instagram,100);
  const preferred_contact = text(payload.preferredContact,24);
  const project_type = text(payload.projectType,40);
  const placement = text(payload.placement,120);
  const sessions = text(payload.sessions,20);
  const description = text(payload.description,3000);
  const reference_links = text(payload.referenceLinks,1000);
  const budget_range = text(payload.budgetRange,80);
  const timeframe = text(payload.timeframe,100);
  const request_id = text(payload.requestId,36);
  if (!uuidPattern.test(request_id) || full_name.length < 2 || !emailPattern.test(email)
    || !projectTypes.has(project_type) || placement.length < 2
    || !sessionTypes.has(sessions) || description.length < 15
    || !contactTypes.has(preferred_contact)
    || (preferred_contact === "phone" && !phone)
    || (preferred_contact === "instagram" && !instagram_handle)
    || payload.ageConfirmed !== true || payload.privacyAccepted !== true)
    return respond(origin,{error:"Please complete all required fields."},422);
  const utm = payload.utm && typeof payload.utm === "object" && !Array.isArray(payload.utm)
    ? payload.utm as Record<string,unknown> : {};
  // Store only a salted, pseudonymous network fingerprint, not the original IP.
  const ip = (req.headers.get("x-forwarded-for") || req.headers.get("cf-connecting-ip") || "unavailable").split(",")[0].trim();
  const source = new TextEncoder().encode(ip + "|" + (req.headers.get("user-agent") || "").slice(0,160) + "|" + SERVICE_KEY);
  const fingerprint = Array.from(new Uint8Array(await crypto.subtle.digest("SHA-256",source)))
    .map(x=>x.toString(16).padStart(2,"0")).join("");
  try {
    const windowStart = new Date(Date.now() - 15*60*1000).toISOString();
    const countReq = await db("tattoo_enquiry_attempts?select=id&fingerprint=eq." + fingerprint
      + "&created_at=gte." + encodeURIComponent(windowStart) + "&limit=5", {method:"GET"});
    if (!countReq.ok) throw Error("Rate limit query failed");
    const recent = await countReq.json();
    if (Array.isArray(recent) && recent.length >= 5) return respond(origin,{error:"Too many enquiries. Please try again later."},429);
    const attempt = await db("tattoo_enquiry_attempts", {method:"POST",body:JSON.stringify({fingerprint})});
    if (!attempt.ok) throw Error("Rate limit write failed");
    const result = await db("tattoo_enquiries", {method:"POST",body:JSON.stringify({
      request_id,full_name,email,phone:phone||null,instagram_handle:instagram_handle||null,
      preferred_contact,project_type,placement,sessions,description,
      reference_links:reference_links||null,budget_range:budget_range||null,
      timeframe:timeframe||null,age_confirmed:true,privacy_accepted:true,
      marketing_consent:payload.marketingConsent === true,
      source_page:text(payload.sourcePage,200)||"/enquire.html",
      utm_source:text(utm.source,120)||null,utm_medium:text(utm.medium,120)||null,
      utm_campaign:text(utm.campaign,120)||null
    })});
    if (result.status === 409) return respond(origin,{ok:true}); // Safe idempotent retry.
    if (!result.ok) { console.error("Tattoo intake storage failed:",result.status); throw Error("Insert failed"); }
    return respond(origin,{ok:true},201);
  } catch (err) {
    console.error("Tattoo intake error:",err instanceof Error ? err.message : "unknown");
    return respond(origin,{error:"Your enquiry could not be submitted. Please retry or contact the studio by email."},503);
  }
});

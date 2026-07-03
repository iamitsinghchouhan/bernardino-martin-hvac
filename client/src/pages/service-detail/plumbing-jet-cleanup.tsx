import { ServiceDetailTemplate } from "./template";

export default function PlumbingJetCleanup() {
  return (
    <ServiceDetailTemplate
      serviceName="SMART JET CLEANUP System"
      slug="plumbing-jet-cleanup"
      category="Plumbing"
      categoryColor="cyan"
      heroVideo="/videos/svc-plumbing.mp4"
      heroImage="/images/real-pipe-repair.webp"
      tagline="High-pressure hydro-jet drain cleaning for blockages that snaking simply cannot clear"
      overview={[
        "Standard drain snaking breaks through soft clogs but leaves behind the root intrusions, grease buildup, and mineral scale that caused the blockage in the first place. Hydro-jetting uses high-pressure water — typically 3,000–4,000 PSI — to scour the inside walls of your pipes completely clean, restoring full diameter flow and removing everything that creates recurring blockages.",
        "Our SMART JET CLEANUP system pairs high-pressure water jetting with a real-time camera inspection before and after the service. Before we jet, the camera shows exactly what type of blockage is present and where — roots from nearby trees are treated differently than grease accumulation or calcified scale. After jetting, the camera confirms the pipe is fully clear and identifies any structural damage that may need repair.",
        "Hydro-jetting is safe for all types of residential pipes in good condition, including cast iron, PVC, ABS, and copper. The process is environmentally clean — no chemicals, no residue — and a single hydro-jet treatment typically keeps drains clear for 1–3 years depending on the usage and root intrusion level. It's particularly effective for kitchen sinks with years of grease accumulation and main sewer lines with root infiltration.",
      ]}
      keyBenefits={[
        "3,000–4,000 PSI water pressure removes roots, grease, and mineral scale",
        "Camera inspection before and after to confirm complete blockage removal",
        "Safe for all residential pipe materials in good condition",
        "No harsh chemicals — environmentally clean process",
        "Clears blockages standard snaking leaves behind",
        "Results typically last 1–3 years vs weeks for chemical drain cleaners",
      ]}
      whatWeInclude={[
        "Pre-jetting camera inspection to identify blockage type and location",
        "Jetter setup with appropriate nozzle for blockage type",
        "High-pressure hydro-jet cleaning of affected drain line",
        "Root cutting nozzle used where tree root intrusion is present",
        "Degreasing nozzle used for kitchen grease buildup",
        "Post-jetting camera inspection to verify clear pipe",
        "Flow rate test",
        "Blockage cause report and prevention recommendations",
        "Structural damage assessment if visible in camera footage",
      ]}
      duration="2-4 hours"
      startingPrice="Starting at $199"
      relatedServices={[
        { name: "Sewer Line Replacement", slug: "plumbing-sewer" },
        { name: "General Plumbing Services", slug: "plumbing-general" },
        { name: "SMART SHUTOFF VALVE", slug: "plumbing-shutoff" },
      ]}
      cityLinks={[]}
      faqs={[
        {
          question: "What is the difference between hydro-jetting and drain snaking?",
          answer: "A snake (auger) punches a hole through a clog and hooks debris out, but it doesn't clean the pipe walls. Hydro-jetting uses high-pressure water to completely scour the interior surface of the pipe, removing all buildup including grease coating, root tendrils, and mineral scale. Snaking is faster and less expensive for simple soft clogs; jetting is necessary for recurring problems or heavy buildup.",
        },
        {
          question: "How often should I hydro-jet my drains?",
          answer: "For kitchen drains in active households, every 1–2 years prevents major grease accumulation. For main sewer lines with tree root intrusion, annual jetting keeps roots from re-establishing. After a single severe blockage is cleared, follow-up jetting every 18–24 months is typical maintenance. We'll advise based on what the camera shows during your service.",
        },
        {
          question: "Will high-pressure jetting damage my pipes?",
          answer: "No — if your pipes are in structurally sound condition. We assess pipe condition with the camera before jetting and adjust water pressure to the appropriate level for your pipe material and age. Very old cast iron with significant corrosion, or clay pipes with cracks, may not be suitable candidates for jetting — we'll tell you this before starting and recommend the appropriate next step.",
        },
        {
          question: "Can hydro-jetting remove tree roots from my sewer line?",
          answer: "Yes. We use a root-cutting spinning nozzle that shreds and flushes root intrusions out of the line. This clears the blockage and buys time, but it doesn't kill the root system — roots will grow back over 12–24 months. Repeated annual jetting is a long-term management strategy; full sewer line replacement eliminates the problem permanently.",
        },
        {
          question: "What blockages cannot be cleared with hydro-jetting?",
          answer: "Foreign objects (toys, wipes, or items flushed accidentally) that are lodged in the line cannot be jetted out — they need to be retrieved with a camera-guided retrieval tool or by opening the pipe. Collapsed or severely offset pipe sections also cannot be cleared by jetting alone; they require pipe repair or replacement.",
        },
      ]}
    />
  );
}

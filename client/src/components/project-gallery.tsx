import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from "@/components/ui/button";

const PROJECTS = [
  {
    id: 1,
    title: "Commercial Rooftop HVAC",
    category: "Commercial HVAC",
    image: "/images/real-rooftop-hvac.webp",
    description: "Complete installation of high-efficiency package units for a commercial complex in Downtown LA. This project involved crane lifting and custom ductwork integration.",
    location: "Downtown Los Angeles"
  },
  {
    id: 2,
    title: "Residential Solar System",
    category: "Solar",
    image: "/images/real-solar-install.webp",
    description: "20-panel solar array installation with inverter system for a family home. Optimized for maximum sun exposure and energy savings.",
    location: "Pasadena, CA"
  },
  {
    id: 3,
    title: "Precision AC Diagnostics",
    category: "Repair",
    image: "/images/real-diagnostics.webp",
    description: "Advanced diagnostic troubleshooting to identify and fix cooling efficiency issues using digital manifold gauges.",
    location: "Sherman Oaks, CA"
  },
  {
    id: 4,
    title: "Underground Pipe Trenching",
    category: "Plumbing",
    image: "/images/real-trenching.webp",
    description: "Excavation and trenching for new underground main water line installation. Replaced old galvanized pipes with durable copper.",
    location: "Van Nuys, CA"
  },
  {
    id: 5,
    title: "Copper Main Line Welding",
    category: "Plumbing",
    image: "/images/real-copper-welding.webp",
    description: "Expert copper pipe welding for a durable and leak-free main water supply line. Precision craftsmanship ensures longevity.",
    location: "Burbank, CA"
  },
  {
    id: 6,
    title: "Custom Ductwork Fabrication",
    category: "HVAC",
    image: "/images/real-ductwork.webp",
    description: "Installation of custom-fabricated insulated ductwork for optimal airflow and energy efficiency in a residential attic.",
    location: "Glendale, CA"
  },
  {
    id: 7,
    title: "Heavy Equipment Lifting",
    category: "Commercial",
    image: "/images/real-crane-lift.webp",
    description: "Crane lift operation for safe positioning of large commercial HVAC units. Safety and precision are our top priorities.",
    location: "North Hollywood, CA"
  },
  {
    id: 8,
    title: "Solar Electrical Testing",
    category: "Solar",
    image: "/images/real-solar-test.webp",
    description: "Comprehensive electrical testing and commissioning of a new solar energy system to ensure it meets all performance standards.",
    location: "Santa Monica, CA"
  }
];

export function ProjectGallery() {
  return (
    <section className="py-20 bg-slate-50" id="gallery">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 border-primary/20 text-primary bg-primary/5">
            Our Portfolio
          </Badge>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-4">
            Recent Projects Gallery
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Take a look at our real work across Los Angeles. From complex commercial installations to residential repairs, we deliver quality you can see.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[250px]">
          {PROJECTS.map((project, index) => (
            <Dialog key={project.id}>
              <DialogTrigger asChild>
                <div 
                  role="button"
                  aria-label={`View project: ${project.title}`}
                  tabIndex={0}
                  className={`group relative overflow-hidden rounded-xl cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 bg-slate-200 ${
                    index === 0 || index === 7 ? "md:col-span-2 md:row-span-2 h-[516px]" : ""
                  }`}
                >
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    loading="lazy"
                    width={800}
                    height={600}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <Badge className="self-start mb-2 bg-primary/90 hover:bg-primary border-0 text-xs">
                        {project.category}
                        </Badge>
                        <h3 className="text-white font-bold text-lg md:text-xl leading-tight">
                        {project.title}
                        </h3>
                        <p className="text-slate-300 text-sm mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                            {project.location}
                        </p>
                    </div>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-4xl p-0 overflow-hidden bg-white border-none rounded-2xl shadow-2xl" aria-describedby={undefined}>
                <VisuallyHidden><DialogTitle>{project.title}</DialogTitle></VisuallyHidden>
                <div className="flex flex-col md:flex-row h-full">
                    <div className="w-full md:w-2/3 bg-black flex items-center justify-center relative overflow-hidden">
                         <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px] z-0"></div>
                        <img 
                            src={project.image} 
                            alt={project.title} 
                            loading="lazy"
                            width={800}
                            height={600}
                            className="max-h-[60vh] md:max-h-[80vh] w-full object-contain relative z-10"
                        />
                    </div>
                    <div className="w-full md:w-1/3 p-8 flex flex-col justify-center bg-white">
                        <div className="mb-6">
                            <Badge variant="secondary" className="mb-2 bg-primary/5 text-primary hover:bg-primary/10">
                                {project.category}
                            </Badge>
                            <h3 className="text-2xl md:text-3xl font-heading font-bold text-slate-900 mb-2 leading-tight">
                                {project.title}
                            </h3>
                            <p className="text-sm font-medium text-slate-500 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                {project.location}
                            </p>
                        </div>
                        
                        <div className="prose prose-sm text-slate-600 mb-8">
                            <p className="leading-relaxed text-base">{project.description}</p>
                        </div>
                        
                        <div className="mt-auto pt-6 border-t border-slate-100">
                            <div className="text-xs text-slate-400 font-mono mb-2 uppercase tracking-wider">Project ID: #{project.id}0024</div>
                            <Button className="w-full" asChild>
                                <a href="/contact">Inquire About This Project</a>
                            </Button>
                        </div>
                    </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
}

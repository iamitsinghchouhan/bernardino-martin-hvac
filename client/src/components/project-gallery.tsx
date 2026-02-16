import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const PROJECTS = [
  {
    id: 1,
    title: "Commercial Rooftop HVAC Installation",
    category: "Commercial HVAC",
    image: "/images/real-rooftop-hvac.png",
    description: "Complete installation of high-efficiency package units for a commercial complex in Downtown LA."
  },
  {
    id: 2,
    title: "Residential Solar System",
    category: "Solar",
    image: "/images/real-solar-install.png",
    description: "20-panel solar array installation with inverter system for a family home in Pasadena."
  },
  {
    id: 3,
    title: "Precision AC Diagnostics",
    category: "Repair",
    image: "/images/real-diagnostics.png",
    description: "Advanced diagnostic troubleshooting to identify and fix cooling efficiency issues."
  },
  {
    id: 4,
    title: "Underground Pipe Trenching",
    category: "Plumbing",
    image: "/images/real-trenching.png",
    description: "Excavation and trenching for new underground main water line installation."
  },
  {
    id: 5,
    title: "Copper Main Line Welding",
    category: "Plumbing",
    image: "/images/real-copper-welding.png",
    description: "Expert copper pipe welding for a durable and leak-free main water supply line."
  },
  {
    id: 6,
    title: "Custom Ductwork Fabrication",
    category: "HVAC",
    image: "/images/real-ductwork.png",
    description: "Installation of custom-fabricated insulated ductwork for optimal airflow."
  },
  {
    id: 7,
    title: "Heavy Equipment Lifting",
    category: "Commercial",
    image: "/images/real-crane-lift.png",
    description: "Crane lift operation for safe positioning of large commercial HVAC units."
  },
  {
    id: 8,
    title: "Solar Electrical Testing",
    category: "Solar",
    image: "/images/real-solar-test.png",
    description: "Comprehensive electrical testing and commissioning of a new solar energy system."
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
                  className={`group relative overflow-hidden rounded-xl cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 ${
                    index === 0 || index === 7 ? "md:col-span-2 md:row-span-2 h-[516px]" : ""
                  }`}
                >
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-90 transition-opacity duration-300 flex flex-col justify-end p-6">
                    <Badge className="self-start mb-2 bg-primary/90 hover:bg-primary border-0">
                      {project.category}
                    </Badge>
                    <h3 className="text-white font-bold text-lg md:text-xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      {project.title}
                    </h3>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-4xl p-0 overflow-hidden bg-black/95 border-slate-800">
                <div className="relative aspect-video w-full bg-black flex items-center justify-center">
                    <img 
                        src={project.image} 
                        alt={project.title} 
                        className="max-h-[80vh] w-auto object-contain"
                    />
                </div>
                <div className="p-6 bg-white">
                    <div className="flex items-center gap-3 mb-2">
                        <Badge variant="secondary">{project.category}</Badge>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">{project.title}</h2>
                    <p className="text-slate-600">{project.description}</p>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
}

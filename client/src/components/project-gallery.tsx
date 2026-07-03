import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Button } from "@/components/ui/button";
import { PROJECTS } from "@/data/projects";

export function ProjectGallery() {
  return (
    <section className="py-20 bg-white" id="gallery">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-primary">Our Portfolio</p>
          <h2 className="text-display text-4xl md:text-6xl text-slate-950 mb-4">
            Recent Projects
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
                  className={`watermark group relative overflow-hidden cursor-pointer transition-all duration-300 bg-slate-200 ${
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
                        <p className="self-start mb-2 text-xs font-bold uppercase tracking-[0.2em] text-white/70">
                        {project.category}
                        </p>
                        <h3 className="text-display text-white text-xl md:text-2xl leading-tight">
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
                    <div className="watermark w-full md:w-2/3 bg-black flex items-center justify-center relative overflow-hidden">
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

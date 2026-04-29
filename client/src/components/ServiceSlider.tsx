import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SERVICES } from '@/data/services';
import { Link } from 'wouter';

export default function ServiceSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);
  const autoplayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-advance every 10 seconds
  useEffect(() => {
    if (!isAutoplay) return;

    autoplayTimerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SERVICES.length);
    }, 10000); // 10 seconds

    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [isAutoplay]);

  // Reset autoplay timer when manually navigating
  const resetAutoplayTimer = () => {
    if (autoplayTimerRef.current) {
      clearInterval(autoplayTimerRef.current);
    }
    setIsAutoplay(true);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + SERVICES.length) % SERVICES.length);
    resetAutoplayTimer();
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % SERVICES.length);
    resetAutoplayTimer();
  };

  const goToService = (index: number) => {
    setCurrentIndex(index);
    resetAutoplayTimer();
  };

  // Handle swipe on mobile
  const touchStartX = useRef<number>(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEnd;

    if (Math.abs(diff) > 50) { // Swipe threshold
      if (diff > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }
  };

  const currentService = SERVICES[currentIndex];

  return (
    <section className="bg-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 mb-2 text-center">
          Our Services
        </h2>
        <p className="text-lg text-gray-600 text-center mb-12">
          Professional solutions for all your needs
        </p>

        {/* Main Slider */}
        <div
          ref={sliderRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative"
        >
          {/* Service Card */}
          <div className="bg-gradient-to-r from-blue-50 to-gray-50 rounded-lg overflow-hidden shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8 md:p-12">
              {/* Video Side */}
              <div className="flex items-center justify-center">
                <div className="w-full bg-gray-900 rounded-lg overflow-hidden">
                  <video
                    key={currentService.videoFile}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                    style={{ aspectRatio: '16/9' }}
                  >
                    <source
                      src={`/videos/${currentService.videoFile}`}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>

              {/* Content Side */}
              <div className="flex flex-col justify-center">
                <div className="text-5xl mb-4">{currentService.icon}</div>
                
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  {currentService.name}
                </h3>
                
                <h4 className="text-xl text-blue-600 font-semibold mb-4">
                  {currentService.title}
                </h4>
                
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {currentService.description}
                </p>

                {/* Benefits */}
                <div className="mb-6 space-y-2">
                  {currentService.benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="text-green-500 text-xl">✓</span>
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Link href={`/booking?service=${currentService.id}`}>
                  <a className="inline-block bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-3 rounded-lg font-bold transition w-fit">
                    Book {currentService.name}
                  </a>
                </Link>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 md:-translate-x-16 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition"
            aria-label="Previous service"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 md:translate-x-16 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition"
            aria-label="Next service"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Service Indicator Dots & Service List */}
        <div className="mt-12 space-y-6">
          {/* Progress Bar showing auto-advance */}
          <div className="w-full bg-gray-200 h-1 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-1000 ease-linear"
              style={{
                width: `${((currentIndex + 1) / SERVICES.length) * 100}%`,
              }}
            />
          </div>

          {/* Service Navigation Dots */}
          <div className="flex justify-center gap-2 flex-wrap">
            {SERVICES.map((service, index) => (
              <button
                key={service.id}
                onClick={() => goToService(index)}
                className={`px-4 py-2 rounded-full font-semibold transition ${
                  index === currentIndex
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                title={service.name}
              >
                <span className="text-lg mr-2">{service.icon}</span>
                <span className="hidden sm:inline">{service.name}</span>
                <span className="sm:hidden">{service.id}</span>
              </button>
            ))}
          </div>

          {/* Service Counter */}
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              Service {currentIndex + 1} of {SERVICES.length}
              <span className="mx-2">•</span>
              Auto-advances in 10 seconds
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
import { useEffect, useRef } from "react";

export function EasterEggs({ container }: { container: "nav" | "hero" }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const eggs: HTMLDivElement[] = [];
    const colors = [
      ["#f87171", "#fca5a5"],
      ["#fb923c", "#fdba74"],
      ["#facc15", "#fde68a"],
      ["#4ade80", "#86efac"],
      ["#60a5fa", "#93c5fd"],
      ["#c084fc", "#e9d5ff"],
      ["#f472b6", "#fbcfe8"],
      ["#34d399", "#a7f3d0"],
    ];
    const count = container === "hero" ? 12 : 6;

    for (let i = 0; i < count; i++) {
      const egg = document.createElement("div");
      const [bg, border] = colors[Math.floor(Math.random() * colors.length)];
      const size = 10 + Math.random() * 14;
      const duration = 2.5 + Math.random() * 3;
      const delay = Math.random() * 4;
      egg.style.cssText = `
        position:absolute;
        width:${size}px;
        height:${size * 1.3}px;
        background:${bg};
        border:2px solid ${border};
        border-radius:50% 50% 50% 50% / 60% 60% 40% 40%;
        left:${Math.random() * 95}%;
        top:-20px;
        pointer-events:none;
        z-index:5;
        animation:easterFall ${duration}s ${delay}s linear infinite;
      `;
      el.appendChild(egg);
      eggs.push(egg);
    }

    if (container === "hero") {
      for (let i = 0; i < 6; i++) {
        const sparkle = document.createElement("div");
        const sparkColors = ["#facc15", "#f472b6", "#60a5fa", "#4ade80", "#c084fc"];
        sparkle.style.cssText = `
          position:absolute;
          width:6px;
          height:6px;
          border-radius:50%;
          background:${sparkColors[Math.floor(Math.random() * sparkColors.length)]};
          left:${Math.random() * 95}%;
          top:${20 + Math.random() * 60}%;
          pointer-events:none;
          z-index:5;
          animation:easterSparkle ${1.5 + Math.random()}s ${Math.random() * 2}s ease-in-out infinite;
        `;
        el.appendChild(sparkle);
        eggs.push(sparkle as HTMLDivElement);
      }
    }

    return () => eggs.forEach((e) => e.remove());
  }, [container]);

  return (
    <div
      ref={ref}
      style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 5 }}
    />
  );
}

export function EasterBunny() {
  const bunnyRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 30, dir: 1 });
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const animate = () => {
      const el = bunnyRef.current;
      if (!el) return;
      const parent = el.parentElement;
      if (!parent) return;
      const maxX = parent.offsetWidth - 50;
      posRef.current.x += posRef.current.dir * 1.5;
      if (posRef.current.x >= maxX) posRef.current.dir = -1;
      if (posRef.current.x <= 10) posRef.current.dir = 1;
      el.style.left = `${posRef.current.x}px`;
      el.style.transform = `scaleX(${posRef.current.dir === -1 ? -1 : 1})`;
      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <div
      ref={bunnyRef}
      style={{
        position: "absolute",
        bottom: "8px",
        left: "30px",
        fontSize: "28px",
        pointerEvents: "none",
        zIndex: 20,
        animation: "easterHop 0.6s ease-in-out infinite",
        lineHeight: 1,
      }}
    >
      🐰
    </div>
  );
}

export function EasterStyles() {
  return (
    <style>{`
      @keyframes easterFall {
        0% { transform: translateY(-40px) rotate(0deg); opacity: 1; }
        100% { transform: translateY(120%) rotate(360deg); opacity: 0.2; }
      }
      @keyframes easterSparkle {
        0%, 100% { opacity: 0; transform: scale(0); }
        50% { opacity: 1; transform: scale(1); }
      }
      @keyframes easterHop {
        0%, 100% { bottom: 8px; }
        50% { bottom: 22px; }
      }
    `}</style>
  );
}

export function EasterBanner() {
  const messages = [
    "🐣 Easter Special — Use code EASTER25 for 15% OFF any service this weekend!",
    "🌸 Spring Savings — Free AC tune-up with any installation this Easter season",
    "🥚 Easter Offer — Book today and get priority same-day scheduling",
  ];
  const indexRef = useRef(0);
  const elRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const el = elRef.current;
      if (!el) return;
      el.style.opacity = "0";
      setTimeout(() => {
        indexRef.current = (indexRef.current + 1) % messages.length;
        el.textContent = messages[indexRef.current];
        el.style.opacity = "1";
        el.style.transition = "opacity 0.5s";
      }, 300);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        background: "linear-gradient(90deg, #7c3aed, #db2777, #d97706, #059669)",
        padding: "7px 16px",
        textAlign: "center",
        fontSize: "13px",
        fontWeight: 600,
        color: "white",
        letterSpacing: "0.02em",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <span ref={elRef}>{messages[0]}</span>
    </div>
  );
}

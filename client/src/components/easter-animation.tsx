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
      if (container === "hero") {
        egg.className = "easter-hero-egg";
      } else {
        egg.className = "easter-nav-egg";
      }
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
        opacity:${container === "nav" ? "0.98" : "1"};
        box-shadow:${container === "nav" ? "0 10px 18px rgba(15, 23, 42, 0.18), 0 0 0 1px rgba(255,255,255,0.18) inset" : "none"};
        animation:${container === "nav" ? "easterFallLong" : "easterFall"} ${duration}s ${delay}s linear infinite;
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

      for (let i = 0; i < 3; i++) {
        const glow = document.createElement("div");
        const glowColors = [
          "rgba(250, 204, 21, 0.18)",
          "rgba(96, 165, 250, 0.18)",
          "rgba(244, 114, 182, 0.16)",
        ];
        const size = 120 + Math.random() * 70;
        glow.style.cssText = `
          position:absolute;
          width:${size}px;
          height:${size}px;
          border-radius:9999px;
          background:${glowColors[i % glowColors.length]};
          filter:blur(18px);
          left:${8 + Math.random() * 75}%;
          top:${12 + Math.random() * 58}%;
          pointer-events:none;
          z-index:4;
          animation:easterFloat ${5 + Math.random() * 2}s ${Math.random() * 1.5}s ease-in-out infinite;
        `;
        el.appendChild(glow);
        eggs.push(glow as HTMLDivElement);
      }
    }

    return () => eggs.forEach((e) => e.remove());
  }, [container]);

  return (
    <div
      ref={ref}
      style={
        container === "nav"
          ? {
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              height: "62vh",
              overflow: "visible",
              pointerEvents: "none",
              zIndex: 6,
            }
          : {
              position: "absolute",
              inset: 0,
              overflow: "hidden",
              pointerEvents: "auto",
              zIndex: 5,
            }
      }
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
      style={{
        position: "absolute",
        bottom: "44px",
        left: "30px",
        pointerEvents: "none",
        zIndex: 30,
        animation: "easterHop 0.6s ease-in-out infinite",
        lineHeight: 1,
      }}
    >
      <div ref={bunnyRef} style={{ fontSize: "28px" }}>
        🐰
      </div>
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
      @keyframes easterFallLong {
        0% { transform: translateY(-40px) rotate(0deg) scale(1); opacity: 1; }
        70% { opacity: 1; }
        100% { transform: translateY(62vh) rotate(420deg) scale(1.04); opacity: 0.75; }
      }
      @keyframes easterSparkle {
        0%, 100% { opacity: 0; transform: scale(0); }
        50% { opacity: 1; transform: scale(1); }
      }
      @keyframes easterHop {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-14px); }
      }
      @keyframes easterFloat {
        0%, 100% { transform: translate3d(0, 0, 0) scale(1); opacity: 0.6; }
        50% { transform: translate3d(0, -18px, 0) scale(1.06); opacity: 1; }
      }
      @media (hover: hover) and (pointer: fine) {
        .easter-nav-egg {
          filter: saturate(1.12) brightness(1.05);
        }
        .easter-hero-egg {
          pointer-events: auto;
          transition: transform 0.25s ease, box-shadow 0.25s ease, filter 0.25s ease;
        }
        .easter-hero-egg:hover {
          animation-play-state: paused;
          transform: translateY(-3px) rotate(-10deg) scale(1.15);
          box-shadow: 0 8px 16px rgba(255, 255, 255, 0.2);
          filter: saturate(1.08);
        }
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

"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Car from "./Car";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
}

const HEADLINE = "WELCOME ITZ FIZZ";

const STATS = [
  { value: 58, text: "Increase in pick up point use", color: "#ff3d81" },
  { value: 23, text: "Decreased in customer phone calls", color: "#28e7ff" },
  { value: 27, text: "Increase in pick up point use", color: "#ffd23f" },
  { value: 40, text: "Decreased in customer phone calls", color: "#9dff4d" },
];

function Letters() {
  return HEADLINE.split("").map((ch, i) => (
    <span key={i} className="letter inline-block">
      {ch === " " ? "\u00A0" : ch}
    </span>
  ));
}

export default function Hero() {
  const root = useRef(null);
  const car = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* ---------- 1. INTRO: plays once on page load ---------- */
      const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
      intro
        .from(".letter", {
          yPercent: 90,
          opacity: 0,
          duration: 1.1,
          // same delay for the matching letter in the base + fill layers
          stagger: (i) => (i % HEADLINE.length) * 0.05,
        })
        .from(".car-intro", { x: -160, opacity: 0, duration: 1.4 }, 0.2)
        .from(".stat", { y: 50, opacity: 0, scale: 0.92, duration: 0.9, stagger: 0.18 }, 0.9);

      // count-up numbers, one by one
      gsap.utils.toArray(".stat-num").forEach((el, i) => {
        const o = { n: 0 };
        gsap.to(o, {
          n: STATS[i].value,
          duration: 1.5,
          delay: 1.0 + i * 0.18,
          ease: "power2.out",
          onUpdate: () => (el.textContent = Math.round(o.n)),
        });
      });

      /* ---------- 2. SCROLL: tied to scroll progress ---------- */
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=2400", // scroll distance while the hero is pinned
            pin: true,
            scrub: 1.2, // interpolates toward the scroll position = fluid motion
            invalidateOnRefresh: true,
          },
        });

        // car drives from left edge to right edge
        tl.to(
          ".car-scroll",
          { x: () => root.current.clientWidth - car.current.offsetWidth - 32, duration: 1 },
          0
        )
          // headline lights up as the car passes it
          .to(".headline-fill", { clipPath: "inset(0 0% 0 0)", duration: 0.84 }, 0.08)
          // road markings stream past
          .to(".road-lines", { x: -720, duration: 1 }, 0)
          // each stat card lights up when the car reaches its column
          .to(".stat-glow", { opacity: 1, duration: 0.08, stagger: 0.22 }, 0.1)
          .to(".stat-card", { y: -10, scale: 1.04, duration: 0.08, stagger: 0.22 }, 0.1)
          // background parallax
          .to(".blob-a", { x: 260, y: 40, duration: 1 }, 0)
          .to(".blob-b", { x: -220, y: -30, duration: 1 }, 0)
          .to(".blob-c", { x: 160, scale: 1.4, duration: 1 }, 0);
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={root}
      className="relative h-svh w-full overflow-hidden text-white"
      style={{ background: "linear-gradient(160deg,#12063a 0%,#3b0f7a 50%,#a3126b 100%)" }}
    >
      {/* vibrant background blobs */}
      <div className="blob-a pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full bg-[#ff3d81] opacity-40 blur-3xl" />
      <div className="blob-b pointer-events-none absolute right-0 top-1/4 h-96 w-96 rounded-full bg-[#28e7ff] opacity-25 blur-3xl" />
      <div className="blob-c pointer-events-none absolute bottom-20 left-1/3 h-72 w-72 rounded-full bg-[#ffd23f] opacity-25 blur-3xl" />

      <div className="relative z-10 flex h-full flex-col">
        {/* ---------- headline ---------- */}
        <div className="px-4 pt-[9svh] text-center">
          <h1 className="relative inline-block text-[clamp(1.05rem,4.6vw,4.6rem)]" aria-label={HEADLINE}>
            <span aria-hidden="true" className="headline-text headline-base block">
              <Letters />
            </span>
            <span aria-hidden="true" className="headline-text headline-fill absolute inset-0 block">
              <Letters />
            </span>
          </h1>
        </div>

        {/* ---------- stats ---------- */}
        <div className="mx-auto mt-[4svh] grid w-full max-w-6xl grid-cols-2 gap-3 px-4 md:grid-cols-4 md:gap-5">
          {STATS.map((s, i) => (
            <div key={i} className="stat">
              <div
                className="stat-card relative overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm md:p-6"
                style={{ "--c": s.color }}
              >
                <div className="stat-glow pointer-events-none absolute inset-0 rounded-2xl" />
                <div
                  className="relative font-display text-4xl font-extrabold md:text-6xl"
                  style={{ color: s.color }}
                >
                  <span className="stat-num">0</span>%
                </div>
                <p className="relative mt-2 text-xs text-white/80 md:text-sm">{s.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ---------- road + car ---------- */}
        <div className="relative mt-auto h-[26svh] min-h-[130px] border-y-4 border-[#28e7ff]/70 bg-[#0c0722] shadow-[0_-10px_50px_rgba(40,231,255,0.35)]">
          <div className="absolute inset-x-0 top-1/2 h-[4px] -translate-y-1/2 overflow-hidden">
            <div
              className="road-lines h-full w-[400%]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg,#ffd23f 0 70px,transparent 70px 140px)",
              }}
            />
          </div>

          <div className="absolute inset-y-0 left-4 flex items-center">
            <div ref={car} className="car-scroll w-[clamp(170px,28vw,380px)] will-change-transform">
              <div className="car-intro">
                <Car className="h-auto w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

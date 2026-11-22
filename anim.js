/* Interlinkz Variant 6 animation layer.
   Desktop only. Everything is animated FROM a hidden or offset state TO the
   resting state, so with no GSAP the page is complete and settled.
   Every ScrollTrigger gsap.from sets immediateRender: false, so nothing
   is pre-hidden: each element sits fully visible in its final state
   until its animation moment arrives, then plays and settles. */
(function () {
  if (!window.matchMedia || !window.matchMedia("(min-width: 1024px)").matches) return;
  if (!window.gsap) return;
  gsap.registerPlugin(ScrollTrigger);

  /* D6 frame sequence: the outline Z draws itself, then the fill fades in */
  document.querySelectorAll(".seq-z").forEach(function (svg) {
    var path = svg.querySelector(".zpath");
    var fill = svg.querySelector(".zfill");
    if (!path) return;
    var len = path.getTotalLength();
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
    var tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    tl.to(path, { strokeDashoffset: 0, duration: 1.5 }, 0.15);
    if (fill) tl.fromTo(fill, { opacity: 0 }, { opacity: 0.14, duration: 0.7 }, 1.25);
  });

  /* watermark outline Z draws on scroll into view */
  document.querySelectorAll(".z-wm-path").forEach(function (path) {
    var len = path.getTotalLength();
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
    gsap.to(path, {
      strokeDashoffset: 0, duration: 1.6, ease: "power2.out",
      scrollTrigger: { trigger: path.closest("svg"), start: "top 90%" }
    });
  });

  /* services zigzag: lines draw, nodes pop in sequence */
  document.querySelectorAll(".zig-lines path").forEach(function (p, i) {
    var len = p.getTotalLength();
    gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
    gsap.to(p, { strokeDashoffset: 0, duration: 0.9, delay: 0.15 + i * 0.13, ease: "power2.out" });
  });
  gsap.from(".zig-nodes circle", { scale: 0, transformOrigin: "center", duration: 0.45, stagger: 0.13, delay: 0.3, ease: "back.out(2.2)" });

  /* joined groups: children arrive in sequence */
  document.querySelectorAll("[data-joins]").forEach(function (group) {
    gsap.from(group.children, {
      y: 22, opacity: 0, duration: 0.55, stagger: 0.12, ease: "power2.out", immediateRender: false,
      scrollTrigger: { trigger: group, start: "top 88%" }
    });
  });

  /* node diagrams: nodes scale in, then a soft travelling pulse */
  document.querySelectorAll("[data-nodes]").forEach(function (group) {
    var nodes = group.querySelectorAll(".pnode");
    if (!nodes.length) return;
    gsap.from(nodes, {
      scale: 0, transformOrigin: "center", duration: 0.45, stagger: 0.12, ease: "back.out(2)", immediateRender: false,
      scrollTrigger: { trigger: group, start: "top 88%" }
    });
    gsap.to(nodes, {
      scale: 1.22, duration: 0.55, ease: "sine.inOut", yoyo: true, repeat: -1,
      stagger: { each: 0.4, repeat: -1 }, delay: 1.4, transformOrigin: "center"
    });
  });
})();





function init() {
    gsap.registerPlugin(ScrollTrigger);

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".page1"),
        smooth: true
    });

    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the ".page1" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy(".page1", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
    });

    // Use gsap.to instead of gsap.timeline


    gsap.to(".main h2", {
        x: 100,
        duration: 1,
        scrollTrigger: {
            trigger: ".main h2",
            scroller: ".page1",
            start: "top 30%",
            end: "top 0",
            scrub: 2
        }
    });

    gsap.to(".main iframe", {
        width: "90%",
        scrollTrigger: {
            trigger: ".main iframe",
            scroller: ".page1",
            start: "top 30%",
            end: "top 0",
            scrub: 2
        }
    });

    // each time the window updates, refresh ScrollTrigger and update LocomotiveScroll.
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
}

init();

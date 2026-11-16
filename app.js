/* ==========================================
   OUTSIDE COMMERCIAL FRAMEWORK V1
   Metro Loyalty Proposal
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeRevealAnimations();
    initializeProgressBar();
    initializeEndButton();
    initializeParallaxEffects();

});

/* ==========================================
   REVEAL ANIMATIONS
   ========================================== */

function initializeRevealAnimations() {

    const elements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                }

            });

        },

        {
            threshold: 0.20
        }

    );

    elements.forEach((element) => {

        observer.observe(element);

    });

}

/* ==========================================
   PROGRESS BAR
   ========================================== */

function initializeProgressBar() {

    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");

    if (!slides.length || !dots.length) return;

    const slideObserver = new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) return;

                const index = [...slides].indexOf(entry.target);

                dots.forEach((dot) =>
                    dot.classList.remove("active")
                );

                if (dots[index]) {

                    dots[index].classList.add("active");

                }

            });

        },

        {
            threshold: 0.55
        }

    );

    slides.forEach((slide) => {

        slideObserver.observe(slide);

    });

}

/* ==========================================
   END BUTTON
   ========================================== */

function initializeEndButton() {

    const button = document.getElementById("endButton");

    if (!button) return;

    button.addEventListener("click", () => {

        const closingSlide =
            document.getElementById("closing");

        if (!closingSlide) return;

        closingSlide.scrollIntoView({

            behavior: "smooth",
            block: "start"

        });

    });

}

/* ==========================================
   PARALLAX
   ========================================== */

function initializeParallaxEffects() {

    const heroTitle =
        document.querySelector(".hero h1");

    const heroSecondary =
        document.querySelector(".hero .secondary");

    if (!heroTitle || !heroSecondary) return;

    window.addEventListener("scroll", () => {

        const scroll = window.scrollY;

        if (scroll > 800) return;

        heroTitle.style.transform =
            `translateY(${scroll * 0.08}px)`;

        heroSecondary.style.transform =
            `translateY(${scroll * 0.12}px)`;

        heroTitle.style.opacity =
            1 - scroll / 1200;

        heroSecondary.style.opacity =
            1 - scroll / 1000;

    });

}

/* ==========================================
   HOVER LIFT CARDS
   ========================================== */

const cards = document.querySelectorAll(
    ".card, .benchmark, .team-grid div"
);

cards.forEach((card) => {

    card.addEventListener("mouseenter", () => {

        card.style.transform =
            "translateY(-10px)";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform =
            "translateY(0px)";

    });

});

/* ==========================================
   ECOSYSTEM FLOATING MOTION
   ========================================== */

const nodes = document.querySelectorAll(".node");

nodes.forEach((node, index) => {

    let direction = 1;

    setInterval(() => {

        direction *= -1;

        node.animate(
            [
                {
                    transform:
                        `translateY(0px)`
                },
                {
                    transform:
                        `translateY(${direction * 8}px)`
                }
            ],
            {
                duration:
                    3500 + (index * 300),
                fill: "forwards",
                easing:
                    "ease-in-out"
            }
        );

    }, 3500 + (index * 300));

});

/* ==========================================
   FRAMEWORK STAGGER
   ========================================== */

function staggerFramework() {

    const items =
        document.querySelectorAll(
            ".framework div"
        );

    const observer =
        new IntersectionObserver(

            (entries) => {

                entries.forEach((entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        items.forEach(
                            (item, index) => {

                                setTimeout(() => {

                                    item.style.opacity = 1;

                                    item.style.transform =
                                        "translateY(0px)";

                                }, index * 200);

                            }
                        );

                    }

                });

            },

            {
                threshold: 0.3
            }

        );

    const framework =
        document.querySelector(
            ".framework"
        );

    if (framework) {

        items.forEach((item) => {

            item.style.opacity = 0;

            item.style.transform =
                "translateY(40px)";

            item.style.transition =
                "all .8s cubic-bezier(.22,1,.36,1)";

        });

        observer.observe(framework);

    }

}

staggerFramework();

/* ==========================================
   ROADMAP ANIMATION
   ========================================== */

function animateRoadmap() {

    const roadmap =
        document.querySelector(".roadmap");

    if (!roadmap) return;

    const phases =
        roadmap.querySelectorAll("div");

    const observer =
        new IntersectionObserver(

            (entries) => {

                entries.forEach((entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        phases.forEach(
                            (phase, index) => {

                                setTimeout(() => {

                                    phase.style.opacity = 1;

                                    phase.style.transform =
                                        "translateY(0px)";

                                }, index * 250);

                            }
                        );

                    }

                });

            },

            {
                threshold: 0.25
            }

        );

    phases.forEach((phase) => {

        phase.style.opacity = 0;

        phase.style.transform =
            "translateY(30px)";

        phase.style.transition =
            "all .8s cubic-bezier(.22,1,.36,1)";

    });

    observer.observe(roadmap);

}

animateRoadmap();

/* ==========================================
   KEYBOARD NAVIGATION
   ========================================== */

const slides =
    document.querySelectorAll(".slide");

let currentSlide = 0;

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "ArrowDown"
        ) {

            currentSlide =
                Math.min(
                    currentSlide + 1,
                    slides.length - 1
                );

            slides[currentSlide]
                .scrollIntoView({

                    behavior: "smooth"

                });

        }

        if (
            event.key === "ArrowUp"
        ) {

            currentSlide =
                Math.max(
                    currentSlide - 1,
                    0
                );

            slides[currentSlide]
                .scrollIntoView({

                    behavior: "smooth"

                });

        }

    }
);

/* ==========================================
   PERFORMANCE LOG
   ========================================== */

console.log(
    "%cOutside Commercial Framework V1 Loaded",
    "font-size:14px;color:#0F62FE;font-weight:bold;"
);

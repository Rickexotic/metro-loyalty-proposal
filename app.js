/* ==================================================
   OUTSIDE COMMERCIAL FRAMEWORK V2
   Navigation + Theme + Motion
   ================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const slides = [...document.querySelectorAll(".slide")];
    const revealItems = document.querySelectorAll(".reveal");

    const pageWindow = document.getElementById("pageWindow");

    const ellipsisTop =
        document.getElementById("pageEllipsisTop");

    const ellipsisBottom =
        document.getElementById("pageEllipsisBottom");

    const topButton =
        document.getElementById("topButton");

    const endButton =
        document.getElementById("endButton");

    const themeToggle =
        document.getElementById("themeToggle");

    let currentSlide = 0;

    /* ==================================================
       REVEAL ANIMATIONS
       ================================================== */

    const revealObserver =
        new IntersectionObserver(

            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                    }

                });

            },

            {
                threshold: 0.15
            }

        );

    revealItems.forEach((item) => {

        revealObserver.observe(item);

    });

    /* ==================================================
       ACTIVE SLIDE DETECTION
       ================================================== */

    const slideObserver =
        new IntersectionObserver(

            (entries) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) return;

                    currentSlide =
                        slides.indexOf(entry.target);

                    renderSidebar();

                });

            },

            {
                threshold: 0.55
            }

        );

    slides.forEach((slide) => {

        slideObserver.observe(slide);

    });

    /* ==================================================
       SIDEBAR PAGINATION
       ================================================== */

    function renderSidebar() {

        pageWindow.innerHTML = "";

        const totalSlides =
            slides.length;

        let start =
            Math.max(
                0,
                currentSlide - 2
            );

        let end =
            Math.min(
                totalSlides,
                start + 5
            );

        if (
            end - start < 5 &&
            totalSlides > 5
        ) {

            start =
                Math.max(
                    0,
                    end - 5
                );

        }

        if (start > 0) {

            ellipsisTop.classList.remove(
                "hidden"
            );

        } else {

            ellipsisTop.classList.add(
                "hidden"
            );

        }

        if (
            end < totalSlides
        ) {

            ellipsisBottom.classList.remove(
                "hidden"
            );

        } else {

            ellipsisBottom.classList.add(
                "hidden"
            );

        }

        for (
            let i = start;
            i < end;
            i++
        ) {

            const page =
                document.createElement("div");

            page.className =
                "page-number";

            page.textContent =
                String(i + 1)
                    .padStart(2, "0");

            if (
                i === currentSlide
            ) {

                page.classList.add(
                    "active"
                );

            }

            page.addEventListener(
                "click",
                () => {

                    slides[i]
                        .scrollIntoView({

                            behavior:
                                "smooth",

                            block:
                                "start"

                        });

                }
            );

            pageWindow.appendChild(
                page
            );

        }

    }

    renderSidebar();

    /* ==================================================
       TOP BUTTON
       ================================================== */

    topButton.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior:
                    "smooth"

            });

        }
    );

    /* ==================================================
       END BUTTON
       ================================================== */

    endButton.addEventListener(
        "click",
        () => {

            slides[
                slides.length - 1
            ].scrollIntoView({

                behavior:
                    "smooth"

            });

        }
    );

    /* ==================================================
       LIGHT / DARK THEME
       ================================================== */

    const savedTheme =
        localStorage.getItem(
            "outsideTheme"
        );

    if (savedTheme) {

        document.body.classList.remove(
            "theme-light",
            "theme-dark"
        );

        document.body.classList.add(
            savedTheme
        );

    }

    themeToggle.addEventListener(
        "click",
        () => {

            const darkActive =
                document.body.classList.contains(
                    "theme-dark"
                );

            document.body.classList.toggle(
                "theme-dark"
            );

            document.body.classList.toggle(
                "theme-light"
            );

            localStorage.setItem(

                "outsideTheme",

                darkActive
                    ? "theme-light"
                    : "theme-dark"
            );

        }
    );

    /* ==================================================
       KEYBOARD NAVIGATION
       ================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key ===
                "ArrowDown"
            ) {

                const next =
                    Math.min(
                        currentSlide + 1,
                        slides.length - 1
                    );

                slides[next]
                    .scrollIntoView({

                        behavior:
                            "smooth"

                    });

            }

            if (
                event.key ===
                "ArrowUp"
            ) {

                const prev =
                    Math.max(
                        currentSlide - 1,
                        0
                    );

                slides[prev]
                    .scrollIntoView({

                        behavior:
                            "smooth"

                    });

            }

            if (
                event.key.toLowerCase()
                === "home"
            ) {

                window.scrollTo({

                    top: 0,

                    behavior:
                        "smooth"

                });

            }

            if (
                event.key.toLowerCase()
                === "end"
            ) {

                slides[
                    slides.length - 1
                ].scrollIntoView({

                    behavior:
                        "smooth"

                });

            }

        }
    );

    /* ==================================================
       PARALLAX HERO
       ================================================== */

    const heroTitles =
        document.querySelectorAll(
            ".hero h1"
        );

    window.addEventListener(
        "scroll",
        () => {

            const scroll =
                window.scrollY;

            if (
                scroll > 1200
            ) return;

            heroTitles.forEach(
                (title, index) => {

                    const speed =
                        (index + 1) * 0.04;

                    title.style.transform =
                        `translateY(${scroll * speed}px)`;

                }
            );

        }
    );

    /* ==================================================
       ECOSYSTEM FLOAT
       ================================================== */

    const nodes =
        document.querySelectorAll(
            ".ecosystem-node"
        );

    nodes.forEach(

        (node, index) => {

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
                            3000 +
                            (index * 250),

                        fill:
                            "forwards",

                        easing:
                            "ease-in-out"

                    }

                );

            },

            3000 +
            (index * 250)

            );

        }

    );

    /* ==================================================
       SMOOTH INITIAL LOAD
       ================================================== */

    requestAnimationFrame(
        () => {

            document.body.classList.add(
                "loaded"
            );

        }
    );

    /* ==================================================
       DEBUG
       ================================================== */

    console.log(
        "%cOutside Commercial Framework V2",
        "color:#BFB2EA;font-size:14px;font-weight:bold;"
    );

});

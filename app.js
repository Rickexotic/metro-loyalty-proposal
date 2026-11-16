/* ==================================================
   OUTSIDE COMMERCIAL FRAMEWORK V2.1
   ================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const slides = [
        ...document.querySelectorAll(".slide")
    ];

    const revealElements =
        document.querySelectorAll(".reveal");

    const pageWindow =
        document.getElementById("pageWindow");

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
       REVEAL
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

    revealElements.forEach((element) => {

        revealObserver.observe(element);

    });

    /* ==================================================
       SIDEBAR PAGINATION
       ================================================== */

    function renderSidebar() {

        pageWindow.innerHTML = "";

        const total =
            slides.length;

        let start =
            Math.max(
                0,
                currentSlide - 2
            );

        let end =
            Math.min(
                total,
                start + 5
            );

        if (
            total > 5 &&
            end - start < 5
        ) {

            start =
                Math.max(
                    0,
                    end - 5
                );

        }

        ellipsisTop.classList.toggle(

            "hidden",

            start === 0

        );

        ellipsisBottom.classList.toggle(

            "hidden",

            end >= total

        );

        for (
            let i = start;
            i < end;
            i++
        ) {

            const page =
                document.createElement("div");

            page.className =
                "page-number";

            if (
                i === currentSlide
            ) {

                page.classList.add(
                    "active"
                );

            }

            page.textContent =
                String(i + 1)
                .padStart(2, "0");

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

    /* ==================================================
       ACTIVE SLIDE
       ================================================== */

    const slideObserver =
        new IntersectionObserver(

            (entries) => {

                entries.forEach((entry) => {

                    if (
                        !entry.isIntersecting
                    ) return;

                    currentSlide =
                        slides.indexOf(
                            entry.target
                        );

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
       THEME
       ================================================== */

    function updateThemeIcon() {

        const darkMode =

            document.body.classList.contains(
                "theme-dark"
            );

        themeToggle.textContent =
            darkMode
            ? "☀"
            : "☾";

    }

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

    updateThemeIcon();

    themeToggle.addEventListener(

        "click",

        () => {

            const darkMode =

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

                darkMode
                ? "theme-light"
                : "theme-dark"

            );

            updateThemeIcon();

        }

    );

    /* ==================================================
       KEYBOARD
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
                event.key === "Home"
            ) {

                window.scrollTo({

                    top: 0,

                    behavior:
                        "smooth"

                });

            }

            if (
                event.key === "End"
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
       HERO PARALLAX
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
                        0.03 +
                        (index * 0.02);

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

            const duration =
                3500 +
                (index * 250);

            let dir = 1;

            setInterval(() => {

                dir *= -1;

                node.animate(

                    [

                        {
                            transform:
                                "translateY(0px)"
                        },

                        {
                            transform:
                                `translateY(${dir * 8}px)`
                        }

                    ],

                    {

                        duration,

                        easing:
                            "ease-in-out",

                        fill:
                            "forwards"

                    }

                );

            },

            duration

            );

        }

    );

    /* ==================================================
       INITIAL LOAD
       ================================================== */

    requestAnimationFrame(() => {

        document.body.classList.add(
            "loaded"
        );

    });

    /* ==================================================
       DEBUG
       ================================================== */

    console.log(

        "%cOUTSIDE COMMERCIAL FRAMEWORK V2.1",

        "color:#BFB2EA;font-weight:bold;font-size:13px;"

    );

});

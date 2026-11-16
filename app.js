/* ==================================================
   OUTSIDE COMMERCIAL FRAMEWORK V2.2
   ================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==================================================
       ELEMENTS
       ================================================== */

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

    const audioToggle =
        document.getElementById("audioToggle");

    const openingSequence =
        document.getElementById("openingSequence");

    const typedText =
        document.getElementById("typedText");

    const logoReveal =
        document.getElementById("logoReveal");

    const typingAudio =
        document.getElementById("typingAudio");

    let currentSlide = 0;

    let soundEnabled = false;

    /* ==================================================
       AUDIO
       ================================================== */

    function updateAudioIcon() {

        audioToggle.textContent =
            soundEnabled
                ? "🔊"
                : "🔇";

    }

    updateAudioIcon();

    audioToggle.addEventListener(
        "click",
        () => {

            soundEnabled =
                !soundEnabled;

            updateAudioIcon();

        }
    );

    /* ==================================================
       THEME
       ================================================== */

    function updateThemeIcon() {

        const isDark =
            document.body.classList.contains(
                "theme-dark"
            );

        themeToggle.textContent =
            isDark
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

            const isDark =
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
                isDark
                    ? "theme-light"
                    : "theme-dark"
            );

            updateThemeIcon();

        }
    );

    /* ==================================================
       OPENING SEQUENCE
       ================================================== */

    async function runOpeningSequence() {

        document.body.style.overflow =
            "hidden";

        typedText.textContent = "";

        const text =
            "Outside Co.";

        if (soundEnabled) {

            try {

                typingAudio.currentTime =
                    0;

                await typingAudio.play();

            } catch (error) {}

        }

        for (
            let i = 0;
            i < text.length;
            i++
        ) {

            typedText.textContent +=
                text[i];

            await delay(120);

        }

        await delay(600);

        document.querySelector(
            ".search-container"
        ).style.opacity = 0;

        document.querySelector(
            ".search-container"
        ).style.transform =
            "scale(.9)";

        await delay(900);

        logoReveal.classList.add(
            "visible"
        );

        await delay(2200);

        openingSequence.classList.add(
            "hidden"
        );

        document.body.style.overflow =
            "";

    }

    function delay(ms) {

        return new Promise(
            resolve =>
                setTimeout(
                    resolve,
                    ms
                )
        );

    }

    setTimeout(() => {

        runOpeningSequence();

    }, 400);

    /* ==================================================
       REVEAL
       ================================================== */

    const revealObserver =
        new IntersectionObserver(

            (entries) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                        }

                    }
                );

            },

            {
                threshold: 0.15
            }

        );

    revealElements.forEach(

        element => {

            revealObserver.observe(
                element
            );

        }

    );

    /* ==================================================
       SIDEBAR
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
            (end - start) < 5
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
                document.createElement(
                    "div"
                );

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
                            "smooth"

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

                entries.forEach(
                    (entry) => {

                        if (
                            !entry.isIntersecting
                        ) return;

                        currentSlide =
                            slides.indexOf(
                                entry.target
                            );

                        renderSidebar();

                    }
                );

            },

            {
                threshold: 0.55
            }

        );

    slides.forEach(

        slide => {

            slideObserver.observe(
                slide
            );

        }

    );

    renderSidebar();

    /* ==================================================
       TOP
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
       END
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
       KEYBOARD
       ================================================== */

    document.addEventListener(

        "keydown",

        event => {

            if (
                event.key ===
                "ArrowDown"
            ) {

                slides[
                    Math.min(
                        currentSlide + 1,
                        slides.length - 1
                    )
                ].scrollIntoView({

                    behavior:
                        "smooth"

                });

            }

            if (
                event.key ===
                "ArrowUp"
            ) {

                slides[
                    Math.max(
                        currentSlide - 1,
                        0
                    )
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
                        0.04 +
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

            let direction = 1;

            setInterval(() => {

                direction *= -1;

                node.animate(

                    [
                        {
                            transform:
                                "translateY(0)"
                        },
                        {
                            transform:
                                `translateY(${direction * 8}px)`
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

            }, duration);

        }
    );

    console.log(
        "%cOUTSIDE COMMERCIAL FRAMEWORK V2.2",
        "color:#BFB2EA;font-weight:bold;"
    );

});

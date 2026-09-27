document.addEventListener("DOMContentLoaded", () => {

    /* ==================================================
       INTRO SCREEN
    ================================================== */

    const introScreen = document.getElementById("introScreen");
    const enterButton = document.getElementById("enterButton");
    const site = document.getElementById("site");

    const music = document.getElementById("birthdayMusic");
    const musicButton = document.getElementById("musicButton");

    let musicPlaying = false


    /* ==================================================
        HOME INTRO
    ================================================== */

    if (introScreen && enterButton && site) {

        document.body.classList.add("locked");

        enterButton.addEventListener("click", () => {

            /* ------------------------------------------
                START MUSIC
            ------------------------------------------ */

            if (music) {

                music.volume = 0.65;

                music.play()
                    .then(() => {

                        musicPlaying = true;

                        if (musicButton) {
                            musicButton.textContent = "♫";
                            musicButton.style.color = "#f38aaa";
                        }

                    })
                    .catch(error => {

                        console.log(
                            "Music could not start:",
                            error
                        );

                    });

            }


            /* ------------------------------------------
                SHOW WEBSITE
            ------------------------------------------ */

            introScreen.classList.add("hide");

            site.classList.add("show");

            document.body.classList.remove("locked");


            setTimeout(() => {

                introScreen.style.display = "none";

            }, 1100);

        });

    } else {

        /* Inner pages */

        document.body.classList.remove("locked");

    }


    /* ==================================================
        MUSIC BUTTON
    ================================================== */

    if (musicButton && music) {

        musicButton.addEventListener("click", () => {

            if (!musicPlaying) {

                music.volume = 0.65;

                music.play()
                    .then(() => {

                        musicPlaying = true;

                        musicButton.textContent = "♫";

                        musicButton.style.color = "#f38aaa";

                    })
                    .catch(error => {

                        console.log(
                            "Browser blocked audio:",
                            error
                        );

                    });

            } else {

                music.pause();

                musicPlaying = false;

                musicButton.textContent = "♫";

                musicButton.style.color = "";

            }

        });

    }


    /* ==================================================
        MOBILE MENU
    ================================================== */

    const menuButton =
        document.getElementById("mobileMenuButton");

    const mobileMenu =
        document.getElementById("mobileMenu");

    if (menuButton && mobileMenu) {

        menuButton.addEventListener("click", () => {

            menuButton.classList.toggle("open");

            mobileMenu.classList.toggle("open");

            document.body.classList.toggle("locked");

        });


        mobileMenu
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener("click", () => {

                    menuButton.classList.remove("open");

                    mobileMenu.classList.remove("open");

                    document.body.classList.remove("locked");

                });

            });

    }


    /* ==================================================
        SCROLL REVEAL
    ================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");

    if (revealElements.length) {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                            revealObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.15
                }
            );


        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    }


    /* ==================================================
        HERO PARALLAX
    ================================================== */

    const heroImage =
        document.querySelector(".hero-image");

    if (heroImage) {

        window.addEventListener(
            "scroll",
            () => {

                const scroll =
                    window.scrollY;

                if (
                    scroll <
                    window.innerHeight
                ) {

                    heroImage.style.transform =
                        `scale(1.02)
                         translateY(${scroll * 0.15}px)`;

                }

            },
            {
                passive: true
            }
        );

    }


    /* ==================================================
        START AT TOP
    ================================================== */

    window.scrollTo(0, 0);


    console.log(
        "%c✦ Birthday Universe",
        "color:#f38aaa;font-size:20px;font-weight:bold;"
    );

});
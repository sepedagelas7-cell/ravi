
document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // 1. ELEMENTS
    // =====================================

    const startBtn = document.getElementById("startBtn");
    const toast = document.getElementById("toast");
    const bgMusic = document.getElementById("bgMusic");

    const musicBtn = document.getElementById("musicBtn");
    const musicDisc = document.getElementById("musicDisc");

    const yearElement = document.getElementById("year");

    // =====================================
    // 2. COPYRIGHT YEAR
    // =====================================

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // =====================================
    // 3. TOAST NOTIFICATION
    // =====================================

    let toastTimeout;

    function showToast(message) {
        if (!toast) return;

        toast.textContent = message;
        toast.classList.add("show");

        clearTimeout(toastTimeout);

        toastTimeout = setTimeout(() => {
            toast.classList.remove("show");
        }, 3000);
    }

    // =====================================
    // 4. MUSIC PLAYER
    // =====================================

    if (bgMusic) {

        bgMusic.volume = 0.7;
        bgMusic.loop = true;
        bgMusic.preload = "auto";

        // Update tampilan tombol dan vinyl
        function updateMusicUI(isPlaying) {

            if (musicDisc) {
                musicDisc.classList.toggle("playing", isPlaying);
            }

            if (musicBtn) {
                musicBtn.setAttribute(
                    "aria-label",
                    isPlaying ? "Pause music" : "Play music"
                );

                musicBtn.setAttribute(
                    "title",
                    isPlaying ? "Pause music" : "Play music"
                );

                musicBtn.classList.toggle("is-playing", isPlaying);
            }
        }

        // Fungsi memutar musik
        async function playMusic() {

            try {
                await bgMusic.play();
                updateMusicUI(true);

                console.log("♫ Music is playing!");

                return true;

            } catch (error) {

                updateMusicUI(false);

                console.warn(
                    "Autoplay diblokir browser. Klik tombol musik untuk memutar.",
                    error
                );

                return false;
            }
        }

        // Fungsi pause musik
        function pauseMusic() {
            bgMusic.pause();
            updateMusicUI(false);
        }

        // Coba autoplay ketika halaman dibuka
        playMusic();

        // Tombol music player
        if (musicBtn) {

            musicBtn.addEventListener("click", async () => {

                if (bgMusic.paused) {
                    await playMusic();
                } else {
                    pauseMusic();
                }

            });
        }

        // Sinkronisasi status audio
        bgMusic.addEventListener("play", () => {
            updateMusicUI(true);
        });

        bgMusic.addEventListener("pause", () => {
            updateMusicUI(false);
        });

        bgMusic.addEventListener("ended", () => {
            updateMusicUI(false);
        });

        // Cek apakah file musik berhasil dimuat
        bgMusic.addEventListener("canplay", () => {
            console.log("✓ Music file loaded successfully!");
        });

        bgMusic.addEventListener("error", () => {
            console.error(
                "✗ Music file tidak ditemukan. Periksa lokasi music.mp3!"
            );

            showToast("MUSIC FILE NOT FOUND");
        });

        // Jika autoplay diblokir, interaksi pertama
        // pada halaman dapat memulai musik.
        // Klik tombol musik sendiri tidak diproses di sini
        // karena sudah ditangani oleh event tombol.

        function unlockMusic(event) {

            if (
                musicBtn &&
                musicBtn.contains(event.target)
            ) {
                return;
            }

            if (bgMusic.paused) {
                playMusic();
            }

            document.removeEventListener("click", unlockMusic);
        }

        document.addEventListener("click", unlockMusic);

        // Sinkronisasi tampilan awal
        updateMusicUI(!bgMusic.paused);
    }

    // =====================================
    // 5. CELEBRATION BUTTON
    // =====================================

    if (startBtn) {

        startBtn.addEventListener("click", () => {

            const letter = document.getElementById("letter");

            if (letter) {
                letter.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }

            startBtn.innerHTML = "ENJOY YOUR DAY ✓";
            startBtn.disabled = true;

            showToast("✦ LET THE GOOD TIMES BEGIN.");

        });
    }

    // =====================================
    // 6. SCROLL REVEAL ANIMATION
    // =====================================

    const revealElements = document.querySelectorAll(
        ".highlight, .letter-section, .ending"
    );

    revealElements.forEach(element => {
        element.classList.add("reveal");
    });

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            (entries, observerInstance) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observerInstance.unobserve(entry.target);
                    }

                });

            },
            {
                threshold: 0.15
            }
        );

        revealElements.forEach(element => {
            observer.observe(element);
        });

    } else {

        // Fallback untuk browser lama
        revealElements.forEach(element => {
            element.classList.add("visible");
        });

    }

    // =====================================
    // 7. CONSOLE MESSAGE
    // =====================================

    console.log(
        "%c HAPPY BIRTHDAY, BRO! ",
        "background:#668cff;color:white;padding:12px;font-size:16px;font-weight:bold;"
    );

    console.log("Website Birthday Edition is ready!");

});

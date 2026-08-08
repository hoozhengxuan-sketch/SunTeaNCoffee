    // ========== Mobile menu toggle ==========
        const toggle = document.getElementById('menuToggle');
        const nav = document.getElementById('navLinks');

        toggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            const icon = toggle.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('active');
                const icon = toggle.querySelector('i');
                icon.className = 'fas fa-bars';
            });
        });

    // ========== Dark Mode ==========
        const themeToggle = document.getElementById("themeToggle");

        if (themeToggle) {
            if (localStorage.getItem("theme") === "dark") {
                document.body.classList.add("dark");
                themeToggle.textContent = "☀️";
            } else {
                themeToggle.textContent = "🌙";
            }

            themeToggle.addEventListener("click", () => {
                document.body.classList.toggle("dark");
                if (document.body.classList.contains("dark")) {
                    localStorage.setItem("theme", "dark");
                    themeToggle.textContent = "☀️";
                } else {
                    localStorage.setItem("theme", "light");
                    themeToggle.textContent = "🌙";
                }
            });
        }

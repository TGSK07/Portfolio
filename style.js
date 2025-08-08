// Theme toggle logic
        const themeToggleBtn = document.getElementById('theme-toggle');
        const themeToggleMobileBtn = document.getElementById('theme-toggle-mobile');
        const sunIcon = `<i class="fas fa-sun"></i>`;
        const moonIcon = `<i class="fas fa-moon"></i>`;

        const applyTheme = (theme) => {
            if (theme === 'dark') {
                document.documentElement.classList.add('dark');
                themeToggleBtn.innerHTML = sunIcon;
                themeToggleMobileBtn.innerHTML = sunIcon;
            } else {
                document.documentElement.classList.remove('dark');
                themeToggleBtn.innerHTML = moonIcon;
                themeToggleMobileBtn.innerHTML = moonIcon;
            }
        };

        const toggleTheme = () => {
            const currentTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            localStorage.setItem('theme', newTheme);
            applyTheme(newTheme);
        };

        themeToggleBtn.addEventListener('click', toggleTheme);
        themeToggleMobileBtn.addEventListener('click', toggleTheme);
        
        // Apply theme on initial load
        const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        applyTheme(savedTheme);


        // Mobile menu toggle
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');

        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        
        const mobileMenuLinks = mobileMenu.getElementsByTagName('a');
        for (const link of mobileMenuLinks) {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        }

        // Project filter logic
        const filterContainer = document.querySelector('#project-filters');
        const projectCards = document.querySelectorAll('#project-grid .card');

        filterContainer.addEventListener('click', (e) => {
            if (e.target.tagName !== 'BUTTON') return;

            // Update active button
            const activeBtn = filterContainer.querySelector('.active');
            activeBtn.classList.remove('active');
            e.target.classList.add('active');

            const filter = e.target.dataset.filter;

            projectCards.forEach(card => {
                const categories = card.dataset.category.split(' ');
                const shouldShow = filter === 'all' || categories.includes(filter);
                
                if (shouldShow) {
                    card.style.display = 'flex';
                    setTimeout(() => card.style.opacity = 1, 10);
                } else {
                    card.style.opacity = 0;
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
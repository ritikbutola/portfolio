document.addEventListener('DOMContentLoaded', function() {
    // Get all category buttons and project cards
    const categoryButtons = document.querySelectorAll('.category-btn');
    const projectCards = document.querySelectorAll('.project-card');

    // Set animation order for project cards
    projectCards.forEach((card, index) => {
        card.style.setProperty('--animation-order', index);
    });

    // Function to filter projects
    function filterProjects(category) {
        projectCards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
                // Trigger reflow for animation
                void card.offsetWidth;
                card.style.animation = 'fadeIn 0.5s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Add click event listeners to category buttons
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            // Filter projects
            filterProjects(this.dataset.category);
        });
    });

    // Initialize with all projects visible
    filterProjects('all');
}); 
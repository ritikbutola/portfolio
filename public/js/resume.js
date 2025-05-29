document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links and sections
    const navLinks = document.querySelectorAll('.resume-nav a');
    const sections = document.querySelectorAll('.resume-section');
    const skillBars = document.querySelectorAll('.skill-bar-fill');

    // Function to show a section
    function showSection(sectionId) {
        // Hide all sections
        sections.forEach(section => {
            section.style.display = 'none';
        });

        // Show the selected section
        const selectedSection = document.getElementById(sectionId);
        if (selectedSection) {
            selectedSection.style.display = 'block';
        }

        // Update active state in navigation
        navLinks.forEach(link => {
            if (link.getAttribute('data-section') === sectionId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Animate skill bars if in skills section
        if (sectionId === 'skills') {
            skillBars.forEach(bar => {
                const percentage = bar.getAttribute('data-percentage');
                bar.style.width = percentage + '%';
            });
        }
    }

    // Add click event listeners to navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('data-section');
            showSection(sectionId);
        });
    });

    // Show education section by default
    showSection('education');
}); 
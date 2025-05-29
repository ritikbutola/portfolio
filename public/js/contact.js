document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = contactForm.querySelector('.submit-btn');

    // Function to validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Function to show form validation message
    function showMessage(element, message, isError = true) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${isError ? 'error' : 'success'}`;
        messageDiv.textContent = message;

        // Remove any existing message
        const existingMessage = element.parentElement.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        element.parentElement.appendChild(messageDiv);

        // Remove message after 3 seconds
        setTimeout(() => {
            messageDiv.remove();
        }, 3000);
    }

    // Function to handle form submission
    async function handleSubmit(e) {
        e.preventDefault();

        // Get form values
        const name = contactForm.name.value.trim();
        const email = contactForm.email.value.trim();
        const subject = contactForm.subject.value.trim();
        const message = contactForm.message.value.trim();

        // Validate form
        if (!name || !email || !subject || !message) {
            showMessage(submitBtn, 'Please fill in all fields');
            return;
        }

        if (!isValidEmail(email)) {
            showMessage(contactForm.email, 'Please enter a valid email address');
            return;
        }

        // Disable submit button and show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        try {
            // Here you would typically send the form data to your server
            // For now, we'll simulate a successful submission
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Show success message
            showMessage(submitBtn, 'Message sent successfully!', false);
            
            // Reset form
            contactForm.reset();
        } catch (error) {
            // Show error message
            showMessage(submitBtn, 'Failed to send message. Please try again.');
        } finally {
            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
        }
    }

    // Add form submission handler
    contactForm.addEventListener('submit', handleSubmit);

    // Add input validation on blur
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                showMessage(this, 'This field is required');
            } else if (this.type === 'email' && !isValidEmail(this.value)) {
                showMessage(this, 'Please enter a valid email address');
            }
        });
    });
}); 
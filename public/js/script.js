// Add swipe functionality
document.addEventListener('touchstart', handleTouchStart, { passive: false });
document.addEventListener('touchmove', handleTouchMove, false);

let startX = null;
let currentX = null;

function handleTouchStart(event) {
    event.preventDefault();
    const touchX = event.touches[0].clientX;
    console.log('Swipe attempted at X position: ' + touchX + ', on element: ' + event.target.tagName + ', navigating pages');
    startX = touchX;
}

function handleTouchMove(event) {
    if (!startX) return;
    currentX = event.touches[0].clientX;
    const diffX = startX - currentX;
    
    if (diffX > 50) {  // Swipe left
        navigateNext();
    } else if (diffX < -50) {  // Swipe right
        navigatePrevious();
    }
}

// Corrected touchend handler
function handleTouchEnd(event) {
  startX = null;
  currentX = null;
}

document.addEventListener('touchend', function() {
    startX = null;
    currentX = null;
});

function navigateNext() {
    const links = document.querySelectorAll('a[href]');  // Target all page links
    const currentURL = window.location.href;
    const currentIndex = Array.from(links).findIndex(link => link.href === currentURL);
    if (currentIndex >= 0 && currentIndex < links.length - 1) {
        window.location.href = links[currentIndex + 1].href;
    }
}

function navigatePrevious() {
    const links = document.querySelectorAll('a[href]');  // Target all page links
    const currentURL = window.location.href;
    const currentIndex = Array.from(links).findIndex(link => link.href === currentURL);
    if (currentIndex > 0) {
        window.location.href = links[currentIndex - 1].href;
    }
}

// Add synchronization for navigation bar
document.addEventListener('DOMContentLoaded', () => {
    const currentURL = window.location.href;
    const navLinks = document.querySelectorAll('.nav-links a');  // Assuming .nav-links is the class for nav items
    navLinks.forEach(link => {
        if (link.href === currentURL) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});

// Add swipe functionality to home and learning sections
function addSwipeToSections() {
  const homeSection = document.querySelector('.home-section');
  const learningSection = document.querySelector('.learning-section');  // Assuming a .learning-section class exists or needs to be added
  
  if (homeSection) {
    const homeDiv = document.createElement('div');
    homeDiv.className = 'swipe-container';
    homeSection.appendChild(homeDiv);  // Add a new div for swipe area
    homeDiv.addEventListener('touchstart', handleTouchStart);
    homeDiv.addEventListener('touchmove', handleTouchMove);
    homeDiv.addEventListener('touchend', handleTouchEnd);  // Now using the defined function
  }
  
  if (learningSection) {
    const learningDiv = document.createElement('div');
    learningDiv.className = 'swipe-container';
    learningSection.appendChild(learningDiv);  // Add a new div for swipe area
    learningDiv.addEventListener('touchstart', handleTouchStart);
    learningDiv.addEventListener('touchmove', handleTouchMove);
    learningDiv.addEventListener('touchend', handleTouchEnd);  // Now using the defined function
  }
}

// Function to handle selected page distinction
function distinguishSelectedPage(selectedSection) {
  const div = document.createElement('div');
  div.className = 'distinguish-div';  // This will be styled in CSS
  selectedSection.appendChild(div);
  selectedSection.classList.add('selected');
}

// Add swipe functionality to the nav bar
function addSwipeToNavBar() {
  const navLinks = document.querySelector('.nav-links');
  if (navLinks) {
    navLinks.addEventListener('touchstart', handleTouchStart);
    navLinks.addEventListener('touchmove', handleTouchMove);
    navLinks.addEventListener('touchend', handleTouchEnd);
  }
}

// Call this function after addSwipeToSections
document.addEventListener('DOMContentLoaded', () => {
  addSwipeToSections();
  addSwipeToNavBar();
}); 
// Smooth scrolling behavior
document.documentElement.style.scrollBehavior = 'smooth';


// Copy citation function
function copyCitation() {
    const citationText = document.getElementById('citationText').textContent;
    
    // Use the Clipboard API if available
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(citationText).then(function() {
            showCopySuccess();
        }).catch(function(err) {
            console.error('Could not copy text: ', err);
            fallbackCopyTextToClipboard(citationText);
        });
    } else {
        // Fallback for older browsers
        fallbackCopyTextToClipboard(citationText);
    }
}

// Fallback copy function for older browsers
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    
    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showCopySuccess();
        } else {
            console.error('Fallback: Copying text command was unsuccessful');
        }
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }
    
    document.body.removeChild(textArea);
}

// Show copy success feedback
function showCopySuccess() {
    const copyBtn = document.querySelector('.copy-btn');
    const originalText = copyBtn.textContent;
    
    copyBtn.textContent = 'Copied!';
    copyBtn.style.background = '#10b981';
    
    setTimeout(function() {
        copyBtn.textContent = originalText;
        copyBtn.style.background = '#3b82f6';
    }, 2000);
}

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide scroll to top button based on scroll position
window.addEventListener('scroll', function() {
    const scrollTopBtn = document.getElementById('scrollTop');
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollPosition > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

// Add fade-in animation for content sections
function addFadeInAnimation() {
    const sections = document.querySelectorAll('.content-section');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    sections.forEach(function(section) {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Add hover effects for interactive elements
function addInteractiveEffects() {
    // Add hover effects to result items
    const resultItems = document.querySelectorAll('.result-item');
    
    resultItems.forEach(function(item) {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
    
    // Add hover effects to images
    const images = document.querySelectorAll('.hero-image, .example-image, .diagram-image');
    
    images.forEach(function(img) {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Add table row highlighting
function addTableInteractivity() {
    const tableRows = document.querySelectorAll('table tr:not(:first-child)');
    
    tableRows.forEach(function(row) {
        row.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f0f9ff';
            this.style.transform = 'scale(1.01)';
            this.style.transition = 'all 0.2s ease';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';
            this.style.transform = 'scale(1)';
        });
    });
}

// Initialize all functionality when the page loads
document.addEventListener('DOMContentLoaded', function() {
    addFadeInAnimation();
    addInteractiveEffects();
    addTableInteractivity();
    
    // Add loading animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    // Fade in the page
    setTimeout(function() {
        document.body.style.opacity = '1';
    }, 100);
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    // Press 'Home' key to scroll to top
    if (e.key === 'Home') {
        e.preventDefault();
        scrollToTop();
    }
    
    // Press 'c' key to copy citation
    if (e.key === 'c' && e.ctrlKey) {
        const selection = window.getSelection().toString();
        if (!selection) {
            e.preventDefault();
            copyCitation();
        }
    }
});

// Add print styles
function addPrintStyles() {
    const printStyles = `
        @media print {
            .navbar, .scroll-top, .copy-btn { display: none !important; }
            .content-section { page-break-inside: avoid; }
            .main-title { page-break-after: avoid; }
            body { font-size: 12pt; line-height: 1.4; }
            .citation-container { background: white !important; }
            .citation-text { color: black !important; }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = printStyles;
    document.head.appendChild(styleSheet);
}

// Initialize print styles
addPrintStyles();
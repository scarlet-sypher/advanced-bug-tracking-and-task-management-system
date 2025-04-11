document.addEventListener('DOMContentLoaded', function() {
    // =============== SHOW MENU ===============
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');
 
    // Menu show
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.style.top = '0';
        });
    }
 
    // Menu hidden
    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.style.top = '-100%';
        });
    }
 
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Only apply to mobile view
            if (window.innerWidth < 768) {
                navMenu.style.top = '-100%';
            }
        });
    });
 
    // Add this new event listener for screen resize
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            navMenu.style.top = '0'; // Reset position when screen is desktop size
        } else {
            navMenu.style.top = '-100%'; // Hide when resizing to mobile if it's not already shown
        }
    });

    // =============== SEARCH ===============
    const search = document.getElementById('search');
    const searchBtn = document.getElementById('search-btn');
    const searchClose = document.getElementById('search-close');
    const searchForm = document.querySelector('.search-form');
    
    console.log('Search elements:', {
        search: search,
        searchBtn: searchBtn,
        searchClose: searchClose,
        searchForm: searchForm
    });
    
    // Search button click handler
    if (searchBtn) {
        searchBtn.addEventListener('click', function(event) {
            console.log("Search button clicked");
            event.preventDefault();
            event.stopPropagation();
            
            if (search) {
                search.style.opacity = '1';
                search.style.pointerEvents = 'auto';
                
                if (searchForm) {
                    searchForm.style.transform = 'translateY(0)';
                }
                
                const searchInput = document.querySelector('.search-form input');
                if (searchInput) {
                    setTimeout(() => {
                        searchInput.focus();
                    }, 300);
                }
            }
        });
    }
    
    // Search close button handler
    if (searchClose) {
        searchClose.addEventListener('click', function(event) {
            console.log("Search close clicked");
            event.preventDefault();
            event.stopPropagation();
            
            if (search) {
                search.style.opacity = '0';
                search.style.pointerEvents = 'none';
                
                if (searchForm) {
                    searchForm.style.transform = 'translateY(-16px)';
                }
            }
        });
    }
    
    // Close search when clicking on the background
    if (search) {
        search.addEventListener('click', function(event) {
            // Only close if clicking directly on the search background
            if (event.target === search) {
                console.log("Search background clicked");
                search.style.opacity = '0';
                search.style.pointerEvents = 'none';
                
                if (searchForm) {
                    searchForm.style.transform = 'translateY(-16px)';
                }
            }
        });
    }
    
    // Prevent clicks on the form from closing the search
    if (searchForm) {
        searchForm.addEventListener('click', function(event) {
            event.stopPropagation();
        });
    }
    
    // Close search with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && search && search.style.opacity === '1') {
            console.log("Escape key pressed");
            search.style.opacity = '0';
            search.style.pointerEvents = 'none';
            
            if (searchForm) {
                searchForm.style.transform = 'translateY(-16px)';
            }
        }
    });

    // =============== ADD ACTIVE STATE FOR CURRENT PAGE ===============
    function setActiveNavItem() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            // If the href matches the current path or if we're on the homepage and href is '#' or '/'
            if ((href === currentPath) || 
                (currentPath === '/' && (href === '#' || href === '/'))) {
                link.classList.add('active');
                
                // Position the hover indicator on the active link (desktop only)
                if (window.innerWidth >= 768) {
                    const indicator = document.querySelector('.nav-hover-indicator');
                    if (indicator) {
                        const li = link.parentElement;
                        const ulChildren = Array.from(li.parentElement.children);
                        const index = ulChildren.indexOf(li);
                        
                        // Set initial position based on which item is active
                        switch(index) {
                            case 0:
                                indicator.style.left = '0';
                                indicator.style.width = '64px';
                                break;
                            case 1:
                                indicator.style.left = '64px';
                                indicator.style.width = '92px';
                                break;
                            case 2:
                                indicator.style.left = '156px';
                                indicator.style.width = '88px';
                                break;
                            case 3:
                                indicator.style.left = '244px';
                                indicator.style.width = '92px';
                                break;
                            case 4:
                                indicator.style.left = '336px';
                                indicator.style.width = '80px';
                                break;
                        }
                    }
                }
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Set active nav item on page load
    setActiveNavItem();

    // =============== DROPDOWN ===============
    const dropdown = document.getElementById('dropdown');
    if (dropdown) {
        dropdown.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent event from bubbling up
            const dropdownList = dropdown.querySelector('.dropdown-list');
            
            // Toggle dropdown visibility classes
            if (dropdownList.classList.contains('opacity-0')) {
                dropdownList.classList.remove('opacity-0', 'translate-y-[-12px]', 'pointer-events-none');
                dropdownList.classList.add('opacity-100', 'translate-y-0', 'pointer-events-auto');
            } else {
                dropdownList.classList.add('opacity-0', 'translate-y-[-12px]', 'pointer-events-none');
                dropdownList.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
            }
        });
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', (event) => {
        const dropdown = document.getElementById('dropdown');
        const dropdownList = document.querySelector('.dropdown-list');
        
        if (dropdown && dropdownList && 
            !dropdown.contains(event.target) && 
            dropdownList.classList.contains('opacity-100')) {
            dropdownList.classList.add('opacity-0', 'translate-y-[-12px]', 'pointer-events-none');
            dropdownList.classList.remove('opacity-100', 'translate-y-0', 'pointer-events-auto');
        }
    });

//======================================================== Typing Animation Start ===========================================================================================

    const phrases = [
        "track bugs effortlessly.",
        "manage tasks smartly.",
        "boost team productivity.",
        "resolve issues faster.",
        "deliver projects on time."
    ];
    
    const rotatingElement = document.querySelector('.rotating-text');
    const rotatingWrapper = document.querySelector('.rotating-text-wrapper');
    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    
    // Set a fixed width based on the longest phrase
    function setFixedWidth() {
        // Find the longest phrase
        let maxWidth = 0;
        const tempSpan = document.createElement('span');
        tempSpan.style.visibility = 'hidden';
        tempSpan.style.position = 'absolute';
        tempSpan.style.fontSize = window.getComputedStyle(rotatingElement).fontSize;
        tempSpan.style.fontFamily = window.getComputedStyle(rotatingElement).fontFamily;
        tempSpan.style.fontWeight = window.getComputedStyle(rotatingElement).fontWeight;
        document.body.appendChild(tempSpan);
        
        phrases.forEach(phrase => {
            tempSpan.textContent = phrase;
            const width = tempSpan.getBoundingClientRect().width;
            if (width > maxWidth) {
                maxWidth = width;
            }
        });
        
        document.body.removeChild(tempSpan);
        rotatingWrapper.style.minWidth = `${maxWidth}px`;
    }
    
    function type() {
        const currentPhrase = phrases[currentPhraseIndex];
        
        if (isDeleting) {
            currentCharIndex--;
        } else {
            currentCharIndex++;
        }
        
        rotatingElement.textContent = currentPhrase.substring(0, currentCharIndex);
        
        let delay = isDeleting ? 40 : 100;
        
        if (!isDeleting && currentCharIndex === currentPhrase.length) {
            delay = 1500;
            isDeleting = true;
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
            delay = 500;
        }
        
        setTimeout(type, delay);
    }
    
    // Initialize the fixed width first, then start typing
    window.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            setFixedWidth();
            setTimeout(type, 800);
        }, 100);
    });
    
    // Recalculate the width if window is resized
    window.addEventListener('resize', setFixedWidth);


//======================================================== Typing Animation Ends ===========================================================================================


//======================================================== Spider Animation Start ===========================================================================================

// Initial state for responsive tracking
let wasMobile = window.innerWidth <= 767;

// Get all spider containers
const spiderContainers = document.querySelectorAll('.hanging-spider');

// Toggle paused on thread/spider image when clicked
spiderContainers.forEach((container) => {
  container.addEventListener('click', function () {
    const thread = this.querySelector('.web-thread');
    const spider = this.querySelector('.spider-image');
    thread.classList.toggle('paused');
    spider.classList.toggle('paused');
  });
});

// Hover Fall + Climb (Large Screens Only)
    const spiders = document.querySelectorAll('.hanging-spider');

    spiders.forEach((spider, index) => {
    let timeout;

    spider.addEventListener('mouseenter', () => {
        if (window.innerWidth > 1024) {
        timeout = setTimeout(() => {
            spider.classList.add('fall-hover');
            spider.classList.remove('climb-hover');
        }, index * 300);
        }
    });

    spider.addEventListener('mouseleave', () => {
        if (window.innerWidth > 1024) {
        clearTimeout(timeout);
        setTimeout(() => {
            spider.classList.remove('fall-hover');
            spider.classList.add('climb-hover');
        }, 400);
        }
    });
    });

// Random spider drop every 8s
    setInterval(() => {
    const randomIndex = Math.floor(Math.random() * spiderContainers.length);
    const randomContainer = spiderContainers[randomIndex];
    const randomSpider = randomContainer.querySelector('.spider-image');
    const randomThread = randomContainer.querySelector('.web-thread');

    if (!randomSpider.classList.contains('paused')) {
        const originalHeight = randomContainer.offsetHeight;

        randomSpider.style.animationPlayState = 'paused';
        randomThread.style.animationPlayState = 'paused';

        randomContainer.style.transition = 'height 1.5s ease-in-out';
        randomContainer.style.height = originalHeight + 40 + 'px';

        setTimeout(() => {
        randomContainer.style.height = originalHeight + 'px';
        setTimeout(() => {
            if (!randomSpider.classList.contains('paused')) {
            randomSpider.style.animationPlayState = 'running';
            randomThread.style.animationPlayState = 'running';
            }
        }, 1500);
        }, 2000);
    }
}, 8000);

// Handle screen resize behavior
function handleResize() {
  const isMobile = window.innerWidth <= 767;

  spiders.forEach((spider) => {
    // Remove existing animations
    spider.classList.remove('fall-hover', 'climb-hover', 'fall-mobile', 'climb-up');

    if (isMobile) {
      // On mobile, apply full fall
      spider.classList.add('fall-mobile');
    } else {
      // On returning to large screen
      if (wasMobile) {
        spider.classList.add('climb-up');
        setTimeout(() => {
          spider.classList.remove('climb-up');
        }, 2000);
      }

      // Reattach hover listeners (ensures reactivity)
      spider.addEventListener('mouseenter', () => {
        if (window.innerWidth > 1024) {
          spider.classList.add('fall-hover');
          spider.classList.remove('climb-hover');
        }
      });

      spider.addEventListener('mouseleave', () => {
        if (window.innerWidth > 1024) {
          setTimeout(() => {
            spider.classList.remove('fall-hover');
            spider.classList.add('climb-hover');
          }, 400);
        }
      });
    }
  });

  wasMobile = isMobile;
}

// Attach listeners
window.addEventListener('resize', handleResize);
window.addEventListener('load', handleResize);

});

//======================================================== Spider Animation Ends ===========================================================================================

//Transkate js ony single function

// document.addEventListener("scroll", () => {
//     const heroImage = document.querySelector('.hero-image');
//     if (heroImage) {
//       const scrollY = window.scrollY;
//       heroImage.style.transform = `translateY(${scrollY * 0.2}px)`;
//     }
//   });
document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.btn-effect');
  
    buttons.forEach(btn => {
      btn.addEventListener('mousemove', function (e) {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
  
        btn.style.setProperty('--x', x + 'px');
        btn.style.setProperty('--y', y + 'px');
      });
    });
  });
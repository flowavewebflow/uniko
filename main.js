gsap.registerPlugin(ScrollTrigger);

// Split text for animation
document.querySelectorAll('[data-split]').forEach((splitElement) => {
    new SplitType(splitElement, {
        types: 'lines, words, chars'
    });
});

// Automatically split and animate all elements with data-heading-animation attribute
document.querySelectorAll('[data-split-animation]').forEach((element) => {
    new SplitType(element, {
        types: 'lines, words'
    });

    let words = element.querySelectorAll('.word');
    gsap.set(element, { visibility: "visible" });
    gsap.from(words, {
        y: '120%',
        stagger: 0.02,
        duration: 1,
        delay: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: element,
            start: 'bottom bottom',
            once: true,
        }
    });
});

document.querySelectorAll('[data-split-scrub-word]').forEach((splitElement) => {
    let text = new SplitType(splitElement, {
        types: 'lines, words, chars'
    });

    gsap.fromTo(text.chars,
        { opacity: 0.1 },
        {
            opacity: 1,
            stagger: 0.05,
            scrollTrigger: {
                trigger: splitElement,
                start: 'bottom bottom',
                end: 'bottom center',
                scrub: true,
            }
        }
    );
});

document.querySelectorAll('[data-fadein]').forEach((element) => {
    gsap.set(element, { visibility: "visible" });
    gsap.fromTo(element,
        {
            opacity: 0,
            y: "10%"
        },
        {
            opacity: 1,
            y: "0%",
            duration: 1.7,
            ease: 'power2.out',
            stagger: 0.01,
            scrollTrigger: {
                trigger: element,
                start: 'top bottom',
                once: true,
            }
        }
    );
});

window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
});

// Footer Animation
const tl = gsap.timeline({
    repeat: -1,
    paused: false
});

tl.fromTo('.footer_title-slider', { x: "0%" }, { x: "-50%", duration: 35, ease: "none" });

let lastScrollY = window.scrollY;
window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    const isScrollingDown = currentScrollY > lastScrollY;

    if (isScrollingDown && tl.reversed()) {
        tl.play();
    } else if (!isScrollingDown && !tl.reversed()) {
        tl.reverse();
    }
    lastScrollY = currentScrollY;
});

tl.play();


// Transition
function internalLink(myLink) {
    return (myLink.host == window.location.host);
}
$('a').each(function () {
    if (internalLink(this) && (this).href.indexOf('#') === -1) {
        $(this).click(function (e) {
            e.preventDefault();
            var moduleURL = jQuery(this).attr("href");
            setTimeout(function () { window.location = moduleURL }, 1100);
            // Class that has page out interaction tied to click
            $('.page-transition').click();
        });
    }
});

//  Navbar color change
const blackSections = document.querySelectorAll('[section-black]');
const navComponent = document.querySelector(".nav_component");
const navMenu = document.querySelector(".nav_menu");
const navLogo = document.querySelector(".nav_logo");
const navButton = document.querySelector(".btn-secondary.cc-nav-holder");

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

function updateNavbarStyle(isBlack) {
    if (isBlack) {
        navComponent.style.backgroundColor = "#171717";
        navMenu.style.color = "#fff";
        navLogo.style.color = "#fff";
        navButton.style.opacity = "1";
        navButton.style.zIndex = "5";
    } else {
        navComponent.style.backgroundColor = "";
        navMenu.style.color = "";
        navLogo.style.color = "";
        navButton.style.opacity = "";
        navButton.style.zIndex = "";
    }
}

function checkSectionsAndUpdateNavbar() {
    let isInBlackSection = false;
    for (const section of blackSections) {
        if (isInViewport(section)) {
            isInBlackSection = true;
            break;
        }
    }
    updateNavbarStyle(isInBlackSection);
}


checkSectionsAndUpdateNavbar();
window.addEventListener('scroll', checkSectionsAndUpdateNavbar);
window.addEventListener('resize', checkSectionsAndUpdateNavbar);


// Moves navbar out of the way when scrolled down, returns it on scroll up
let lastScrollTop = 0;
window.addEventListener('scroll', function () {
    const currentScroll = window.scrollY;
    const navigation = document.getElementById('navigation');
    const whiteButton = document.querySelector('.btn-secondary.cc-nav');

    if (currentScroll > lastScrollTop) {
        navigation.style.transform = 'translateY(-101%)';
        whiteButton.style.transform = 'translateY(1rem)';
    } else {
        navigation.style.transform = 'translateY(0)';
        whiteButton.style.transform = 'translateY(-100%)';
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

// Makes nav smaller on scroll
const nav = document.querySelector('.nav_component');
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const viewportHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollPercentage = (scrollPosition / (documentHeight - viewportHeight)) * 100;

    if (scrollPercentage > 5) {
        nav.classList.add('nav-scrolled');
    } else {
        nav.classList.remove('nav-scrolled');
    }
});

// Hides nav and button when 1500px from the bottom of the page
const navHolder = document.querySelector('.nav_holder');
const btnSecondary = document.querySelector('.btn-secondary.cc-nav');

function handleScroll() {
    const distanceFromBottom = document.documentElement.scrollHeight - (window.scrollY + window.innerHeight);

    if (distanceFromBottom < 1500) {
        navHolder.classList.add('nav-hidden');
        btnSecondary.classList.add('nav-hidden');
    } else {
        navHolder.classList.remove('nav-hidden');
        btnSecondary.classList.remove('nav-hidden');
    }
}

window.addEventListener('scroll', handleScroll);


// Cookie Settings
document.getElementById('closeCookie').addEventListener('click', function () {
    document.querySelector('.cookie_component').style.visibility = 'hidden';
    localStorage.setItem('cookieClosed', 'true');
});

window.addEventListener('load', function () {
    if (localStorage.getItem('cookieClosed') === 'true') {
        document.querySelector('.cookie_component').style.visibility = 'hidden';
    } else {
        document.querySelector('.cookie_component').style.visibility = 'visible';
    }
});

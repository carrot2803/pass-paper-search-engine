let tglBtn, resourceBtn, resourcesLinks, subcatBtn, navbarItems;
const homePage = document.querySelector('.main-canvas');
const bodyElement = document.querySelector('body');
const cursor = document.querySelector('.custom-cursor');
const cursorInner = document.querySelector('.custom-cursor.inner');
const cursorOuter = document.querySelector('.custom-cursor.outer');

function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)) }

async function load(selector) {
    let trials = 0;
    while (document.querySelector(selector) === null && trials <= 10) await sleep(100), trials++;
    return document.querySelector(selector);
}

const faders = document.querySelectorAll('.fade-in'), appearOptions = { threshold: 1, rootMargin: "0px 0px -100px 0px"};

const appearOnScroll = new IntersectionObserver((entries, observer) =>
    entries.forEach(({ isIntersecting, target }) =>
        (isIntersecting && (target.classList.add('appear'), observer.unobserve(target)))), appearOptions);

faders.forEach(fader => { appearOnScroll.observe(fader); });

async function fadeIn(element, delay) {
    await sleep(delay);
    element.classList.toggle("appear");
}

const enableNavbar = async () => {
    tglBtn = await load('.toggle-btn'), resourceBtn = await load('.help-btn');
    resourcesLinks = await load('.menus'), subcatBtn = await load('.sub-menu');
    navbarItems = await load('.nav-items');

    tglBtn?.addEventListener('click', () => navbarItems?.classList.toggle('active'));
    resourceBtn?.addEventListener('click', () => resourcesLinks?.classList.toggle('active'));
    subcatBtn?.addEventListener('click', (event) => {
        event.stopPropagation();
        subcatBtn?.classList.toggle('active');
    });
};
enableNavbar();

// ew ugly horizontal cursor stuff && device
let  landscape = (screen.availWidth > screen.availHeight);
let isMobile = (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone/i));
let coarsePointer = window.matchMedia("(any-pointer:coarse)").matches;
if ( landscape || (!isMobile) || coarsePointer) { toggleCursor(true); }
window.addEventListener("touchstart", detectMobile);
function detectMobile() {  console.log("isMobile"); window.removeEventListener("touchstart", detectMobile);}
const cursorListener = (event) => { updateCursor(event); };
window.addEventListener('mousemove', cursorListener);
function detectMobile() { console.log("Mobile Device Detected"); toggleCursor(false); window.removeEventListener("touchstart", detectMobile); window.removeEventListener("mousemove", cursorListener); }
function toggleCursor(enable = true) { cursor.style.display = cursorInner.style.display = cursorOuter.style.display = (enable ? 'block' : 'none'); }
const toggleCursorHover = (event) => { const target = event.target, isLinkTag = target.tagName.toLowerCase() === 'a' || target.classList.contains('cursor-hover'), isHovered = cursorInner.classList.contains('hoveredCursor'); (isLinkTag && !isHovered) ? cursorInner.classList.add('hoveredCursor') : (!isLinkTag && isHovered) ? cursorInner.classList.remove('hoveredCursor') : null; };
const positionCursor = (event) => { cursorInner.style.left = cursorOuter.style.left = event.pageX + 'px'; cursorInner.style.top = cursorOuter.style.top = event.pageY - window.scrollY + 'px'; };
function updateCursor(event) { toggleCursorHover(event);    positionCursor(event); } 

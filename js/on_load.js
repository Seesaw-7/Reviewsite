const adjustMargin = () => {
    const element = document.querySelector('#welcome');

    if (!element) return;

    if (window.innerWidth > 900) {
        element.style.margin = '100px';
    } else if (window.innerWidth > 480) {
        element.style.margin = '50px';
    } else {
        element.style.margin = '20px';
    }
};

window.addEventListener('load', () => adjustMargin());
window.addEventListener('resize', () => adjustMargin());

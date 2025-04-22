/**
 * Adjusts the margin of the #welcome element based on window width.
 * - ≥ 901px: 100px margin
 * - 481px to 900px: 50px margin
 * - ≤ 480px: 20px margin
 */
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
  
  // Initial adjustment on page load
  window.addEventListener('load', adjustMargin);
  
  // Re-adjust on window resize
  window.addEventListener('resize', adjustMargin);
  
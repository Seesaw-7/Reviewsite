// I tried getBoundingClientRect(), but the layout wasn't shown as expected.
/**
 * Arranges `.box` elements in a responsive waterfall layout inside a container.
 *
 * @param {string} parentId - ID of the parent container (e.g., "items").
 * @param {string} boxClass - Class name of the box elements to arrange.
 */
const imgLocation = (parentId, boxClass) => {
    const container = document.querySelector(`#${parentId}`);
    const allBoxes = Array.from(document.querySelectorAll(`.${boxClass}`));
    if (allBoxes.length === 0) return;
  
    const firstBox = allBoxes[0];
    const style = window.getComputedStyle(firstBox);
    const marginLeft = parseInt(style.marginLeft, 10);
    const marginRight = parseInt(style.marginRight, 10);
    const imgWidth = firstBox.offsetWidth + marginLeft + marginRight;
  
    const numColumns = Math.floor(document.documentElement.clientWidth / imgWidth);
    const activeColumns = Math.min(numColumns, allBoxes.length);
  
    container.style.width = `${imgWidth * activeColumns}px`;
    container.style.visibility = 'visible';
  
    const columnHeights = new Array(numColumns).fill(0);
  
    allBoxes.forEach((box, i) => {
      box.style.visibility = 'visible';
      box.style.position = 'absolute';
  
      if (i < numColumns) {
        box.style.top = '0px';
        box.style.left = `${i * imgWidth}px`;
        columnHeights[i] = box.offsetHeight;
      } else {
        const minHeight = Math.min(...columnHeights);
        const minIndex = columnHeights.indexOf(minHeight);
        box.style.top = `${minHeight}px`;
        box.style.left = `${allBoxes[minIndex].offsetLeft}px`;
        columnHeights[minIndex] += box.offsetHeight;
      }
    });
  };
  
  /**
   * Reveals the "more description" content for a movie and triggers a layout reflow.
   *
   * @param {string} movieId - The unique identifier (usually slugged title) of the movie.
   */
  const loadMore = movieId => {
    const moreText = document.querySelector(`#more-${movieId}`);
    if (!moreText) return;
  
    const parentBox = moreText.closest('.box');
    if (!parentBox) {
      console.error('Parent box not found.');
      return;
    }
  
    const columnIndex = Math.floor(parentBox.offsetLeft / parentBox.offsetWidth);
  
    moreText.style.display = 'inline';
  
    const button = document.querySelector(`#more-btn-${movieId}`);
    if (button) {
      button.remove();
    }
  
    updateColumn(columnIndex, parentBox.offsetWidth);
  };
  
  /**
   * Recomputes and adjusts the vertical stacking of boxes in a specific column.
   *
   * @param {number} columnIndex - The index of the column to update.
   * @param {number} columnWidth - The width of each column in pixels.
   */
  const updateColumn = (columnIndex, columnWidth) => {
    const allBoxes = Array.from(document.querySelectorAll('.box'));
    const columnStartX = columnIndex * columnWidth;
  
    const columnBoxes = allBoxes.filter(
      box => Math.floor(box.offsetLeft) === columnStartX
    );
  
    let currentTop = 0;
  
    columnBoxes.forEach(box => {
      box.style.top = `${currentTop}px`;
      currentTop += box.offsetHeight;
    });
  };
  
  /**
   * Enables keyboard support for triggering button clicks using Enter or Space.
   */
  const enableKeyboardClickSupport = () => {
    document.querySelectorAll('button').forEach(button => {
      button.addEventListener('keypress', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          button.click();
        }
      });
    });
  };
  
  // Run after DOM is parsed — defer in HTML handles timing
  imgLocation('items', 'box');
  enableKeyboardClickSupport();
  
  window.addEventListener('resize', () => {
    imgLocation('items', 'box');
  });
  
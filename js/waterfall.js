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
  
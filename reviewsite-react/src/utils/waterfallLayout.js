export function imgLocation(parentId, className) {
    const cparent = document.getElementById(parentId);
    const allBoxes = document.getElementsByClassName(className);
    if (!allBoxes.length || !cparent) return;
  
    const firstBox = allBoxes[0];
    const style = window.getComputedStyle(firstBox);
    const marginLeft = parseInt(style.marginLeft, 10);
    const marginRight = parseInt(style.marginRight, 10);
    const imgWidth = firstBox.offsetWidth + marginLeft + marginRight;
  
    const num = Math.floor(document.documentElement.clientWidth / imgWidth);
    const actualNum = Math.min(num, allBoxes.length);
    cparent.style.width = `${imgWidth * actualNum}px`;
    cparent.style.visibility = 'visible';
  
    const BoxHeightArr = new Array(num).fill(0);
  
    for (let i = 0; i < allBoxes.length; i++) {
      allBoxes[i].style.visibility = 'visible';
      if (i < num) {
        allBoxes[i].style.position = 'absolute';
        allBoxes[i].style.top = '0px';
        allBoxes[i].style.left = `${i * imgWidth}px`;
        BoxHeightArr[i] = allBoxes[i].offsetHeight;
      } else {
        const minHeight = Math.min(...BoxHeightArr);
        const minIndex = BoxHeightArr.indexOf(minHeight);
        allBoxes[i].style.position = 'absolute';
        allBoxes[i].style.top = `${minHeight}px`;
        allBoxes[i].style.left = allBoxes[minIndex].style.left;
        BoxHeightArr[minIndex] += allBoxes[i].offsetHeight;
      }
    }
  }
  
  export function loadMore(movieId) {
    const moreText = document.getElementById("more-" + movieId);
    const parentBox = moreText?.closest('.box');
    if (!parentBox || !moreText) return;
  
    const parentColumn = Math.floor(parentBox.offsetLeft / parentBox.offsetWidth);
  
    moreText.style.display = "inline";
  
    const btn = document.getElementById("more-btn-" + movieId);
    if (btn) btn.parentNode.removeChild(btn);
  
    updateColumn(parentColumn, parentBox.offsetWidth);
  }
  
  function updateColumn(columnIndex, columnWidth) {
    const allBoxes = Array.from(document.getElementsByClassName('box'));
    const columnStartX = columnIndex * columnWidth;
  
    const columnBoxes = allBoxes.filter(
      box => Math.floor(box.offsetLeft) === columnStartX
    );
  
    let newY = 0;
    for (const box of columnBoxes) {
      box.style.top = `${newY}px`;
      newY += box.offsetHeight;
    }
  }
  
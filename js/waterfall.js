window.onload = function () {
    imgLocation('items', 'box');
    window.addEventListener('resize', function () {
        imgLocation('items', 'box');
    });
};

function imgLocation(parent, content) {
    var cparent = document.getElementById(parent);
    var allBoxes = document.getElementsByClassName(content);
    if (allBoxes.length === 0) return;

    var firstBox = allBoxes[0];
    var style = window.getComputedStyle(firstBox);
    var marginLeft = parseInt(style.marginLeft, 10);
    var marginRight = parseInt(style.marginRight, 10);
    var imgWidth = firstBox.offsetWidth + marginLeft + marginRight;

    var num = Math.floor(document.documentElement.clientWidth / imgWidth);
    console.log("num: " + num)
    var actualNum = Math.min(num, allBoxes.length);
    cparent.style.width = `${imgWidth * actualNum}px`;
    cparent.style.visibility = 'visible';

    var BoxHeightArr = new Array(num).fill(0);

    for (var i = 0; i < allBoxes.length; i++) {
        allBoxes[i].style.visibility = 'visible'; 
        if (i < num) {
            console.log("i: " + i);
            allBoxes[i].style.position = 'absolute';
            allBoxes[i].style.top = '0px';
            allBoxes[i].style.left = (i * imgWidth) + 'px';
            BoxHeightArr[i] = allBoxes[i].offsetHeight;
        } else {
            console.log("i: " + i);
            var minHeight = Math.min(...BoxHeightArr);
            console.log("minHeight: " + minHeight)
            var minIndex = BoxHeightArr.indexOf(minHeight);
            console.log("minIndex: " + minIndex)

            allBoxes[i].style.position = 'absolute';
            allBoxes[i].style.top = minHeight + 'px';
            allBoxes[i].style.left = allBoxes[minIndex].offsetLeft + 'px';
            console.log(allBoxes[i].style.left);
            BoxHeightArr[minIndex] += allBoxes[i].offsetHeight;
        }
    }
}

function loadMore(movieId) {
    var moreText = document.getElementById("more-" + movieId);
    var parentBox = moreText.closest('.box');
    if (!parentBox) {
        console.error('parentBox is null');
        return;
    }

    var parentColumn = Math.floor(parentBox.offsetLeft / parentBox.offsetWidth);

    if (moreText.style.display === "none") {
        moreText.style.display = "inline";
    }

    var btn = document.getElementById("more-btn-" + movieId);
    btn.parentNode.removeChild(btn);

    updateColumn(parentColumn, parentBox.offsetWidth);
}

function updateColumn(columnIndex, columnWidth) {
    var allBoxes = Array.from(document.getElementsByClassName('box'));
    var columnStartX = columnIndex * columnWidth;

    var columnBoxes = allBoxes.filter(box => Math.floor(box.offsetLeft) === columnStartX);
    var newY = 0;

    for (let box of columnBoxes) {
        box.style.top = newY + 'px';
        newY += box.offsetHeight;
    }
}

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            this.click();
        }
    });
});

/** @constant {HTMLFormElement} */
const form = document.querySelector('#movieForm');
/** @constant {HTMLInputElement} */
const titleInput = document.querySelector('#movieTitle');
/** @constant {HTMLInputElement} */
const fileInput = document.querySelector('#movieImage');
/** @constant {HTMLInputElement} */
const descInput = document.querySelector('#movieDesc');
/** @constant {HTMLInputElement} */
const moreDescInput = document.querySelector('#movieMoreDesc');
/** @constant {HTMLElement} */
const itemsContainer = document.querySelector('#items');

/** @constant {string} */
const STORAGE_KEY = 'user-added-movies';
/** @constant {string} */
const DELETED_KEY = 'deleted-movies';

/** @type {Array<Object>} */
let movies = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
/** @type {Array<string>} */
const deletedTitles = JSON.parse(localStorage.getItem(DELETED_KEY)) || [];

/**
 * Creates a movie card DOM element.
 * 
 * @param {Object} movie - Movie data
 * @param {string} movie.title
 * @param {string} movie.imageData - base64 or URL
 * @param {string} movie.description
 * @param {string} movie.moreDescription
 * @returns {HTMLElement} A DOM element representing the movie card
 */
const createCard = ({ title, imageData, description, moreDescription }) => {
  const box = document.createElement('div');
  box.className = 'box';

  const boxImg = document.createElement('div');
  boxImg.className = 'box-img';

  const heading = document.createElement('h2');
  heading.textContent = title;

  const img = document.createElement('img');
  img.src = imageData;
  img.alt = `Poster for ${title}`;
  img.width = 150;

  const p = document.createElement('p');
  p.textContent = description || 'No description available.';
  p.id = `first-p-${title.replace(/\s+/g, '-')}`;

  const moreDiv = document.createElement('div');
  moreDiv.id = `more-${title.replace(/\s+/g, '-')}`;
  moreDiv.style.display = 'none';

  const moreP = document.createElement('p');
  moreP.textContent = moreDescription || '';
  moreDiv.appendChild(moreP);

  const loadMoreBtn = document.createElement('button');
  loadMoreBtn.textContent = 'Load More';
  loadMoreBtn.id = `more-btn-${title.replace(/\s+/g, '-')}`;
  loadMoreBtn.addEventListener('click', () => loadMore(title.replace(/\s+/g, '-')));

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-btn';
  deleteBtn.textContent = 'X';
  deleteBtn.style.position = 'absolute';
  deleteBtn.style.top = '18px';
  deleteBtn.style.right = '6px';
  deleteBtn.addEventListener('click', () => deleteMovie(title));

  boxImg.appendChild(heading);
  boxImg.appendChild(img);
  boxImg.appendChild(p);
  boxImg.appendChild(moreDiv);
  if (moreDescription) boxImg.appendChild(loadMoreBtn);
  boxImg.appendChild(deleteBtn);
  box.appendChild(boxImg);

  return box;
};

/**
 * Renders all movie cards to the DOM.
 * The items are rendered one-by-one, so that users do not have to 
 * wait for all images to load.
 * Before rendering one-by-one, the number of columns are precomputed 
 * so that the layout won't flash serverly while rendering.
 */
const renderAll = async () => {
  itemsContainer.innerHTML = '';

  const allMovies = [...predefinedMovies, ...movies].filter(
    movie => !deletedTitles.includes(movie.title)
  );

  const sampleBox = document.createElement('div');
  sampleBox.className = 'box';
  itemsContainer.appendChild(sampleBox);
  const style = window.getComputedStyle(sampleBox);
  const marginLeft = parseInt(style.marginLeft, 10);
  const marginRight = parseInt(style.marginRight, 10);
  const imgWidth = sampleBox.offsetWidth + marginLeft + marginRight;
  sampleBox.remove();

  const numColumns = Math.floor(document.documentElement.clientWidth / imgWidth);
  const columnHeights = new Array(numColumns).fill(0);
  const containerWidth = imgWidth * numColumns;
  itemsContainer.style.width = `${containerWidth}px`;
  itemsContainer.style.position = 'relative';
  itemsContainer.style.visibility = 'visible';

  for (const movie of allMovies) {
    const card = createCard({
      title: movie.title,
      imageData: movie.imageData || movie.imageUrl || '',
      description: movie.description || 'No description available.',
      moreDescription: movie.moreDescription || ''
    });

    card.style.position = 'absolute';
    card.style.visibility = 'hidden'; // hide until positioned
    itemsContainer.appendChild(card);

    await waitForImageLoad(card.querySelector('img'));

    // find shortest column
    const minHeight = Math.min(...columnHeights);
    const colIndex = columnHeights.indexOf(minHeight);

    const top = columnHeights[colIndex];
    const left = colIndex * imgWidth;

    card.style.top = `${top}px`;
    card.style.left = `${left}px`;
    card.style.visibility = 'visible';

    columnHeights[colIndex] += card.offsetHeight;
  }
};


/**
 * Waits for an image to load (or resolves immediately if already loaded).
 * @param {HTMLImageElement} img 
 * @returns {Promise<void>}
 */
const waitForImageLoad = (img) =>
  new Promise(resolve => {
    if (!img) return resolve();
    if (img.complete) return resolve();
    img.addEventListener('load', resolve);
    img.addEventListener('error', resolve);
  });


/**
 * Handles form submission to add a new movie.
 * When a movie is added, a new card is created and rendered.
 * We do not need to render the whole page.
 */
form.addEventListener('submit', e => {
  e.preventDefault();

  const title = titleInput.value.trim();
  const file = fileInput.files[0];
  const description = descInput.value.trim();
  const moreDescription = moreDescInput.value.trim();

  if (!title || !file || !description) {
    alert('All fields are required.');
    return;
  }

  const reader = new FileReader();

  reader.onload = event => {
    const imageData = event.target.result;
    const newMovie = { title, imageData, description, moreDescription };

    movies.push(newMovie);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));

    const card = createCard(newMovie);
    itemsContainer.appendChild(card);

    if (typeof imgLocation === 'function') {
      imgLocation('items', 'box');
    }

    titleInput.value = '';
    fileInput.value = '';
    descInput.value = '';
    moreDescInput.value = '';
  };

  reader.readAsDataURL(file);
});

/**
 * Deletes a movie by title and updates the layout accordingly.
 * When deleted, only update the corresponding column to be more visually stable.
 * 
 * @param {string} title - The title of the movie to delete
 */
const deleteMovie = title => {
  const box = [...document.querySelectorAll('.box')]
    .find(b => b.querySelector('h2')?.textContent === title);

  if (!box) return;

  const columnWidth = box.offsetWidth;
  const columnIndex = Math.floor(box.offsetLeft / columnWidth);

  box.remove();

  const index = movies.findIndex(m => m.title === title);
  if (index !== -1) {
    movies.splice(index, 1);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
  } else {
    const updatedDeleted = JSON.parse(localStorage.getItem(DELETED_KEY)) || [];
    if (!updatedDeleted.includes(title)) {
      updatedDeleted.push(title);
      localStorage.setItem(DELETED_KEY, JSON.stringify(updatedDeleted));
    }
  }

  updateColumn(columnIndex, columnWidth);
};

// For the first time pages are loaded, images are not preloaded, so we use
// renderAll to render items one by one.
renderAll();

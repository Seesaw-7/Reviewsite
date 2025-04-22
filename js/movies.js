document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#movieForm');
  const titleInput = document.querySelector('#movieTitle');
  const fileInput = document.querySelector('#movieImage');
  const descInput = document.querySelector('#movieDesc');
  const moreDescInput = document.querySelector('#movieMoreDesc');
  const itemsContainer = document.querySelector('#items');

  const STORAGE_KEY = 'user-added-movies';
  let movies = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

  const createCard = ({ title, imageData, description, moreDescription }) => {
    const box = document.createElement('div');
    box.className = 'box';
  
    const boxImg = document.createElement('div');
    boxImg.className = 'box-img';
  
    const h2 = document.createElement('h2');
    h2.textContent = title;
  
    const img = document.createElement('img');
    img.src = imageData;
    img.alt = `Poster for ${title}`;
    img.width = 150;
  
    const p = document.createElement('p');
    p.textContent = description || "No description available.";
    p.id = `first-p-${title.replace(/\s+/g, '-')}`;
  
    const moreDiv = document.createElement('div');
    moreDiv.id = `more-${title.replace(/\s+/g, '-')}`;
    moreDiv.style.display = 'none';
  
    const moreP = document.createElement('p');
    moreP.textContent = moreDescription || "";
    moreDiv.appendChild(moreP);
  
    const btn = document.createElement('button');
    btn.textContent = 'Load More';
    btn.id = `more-btn-${title.replace(/\s+/g, '-')}`;
    btn.onclick = () => loadMore(title.replace(/\s+/g, '-'));
  
    boxImg.appendChild(h2);
    boxImg.appendChild(img);
    boxImg.appendChild(p);
    boxImg.appendChild(moreDiv);
    if (moreDescription) boxImg.appendChild(btn); // Add button only if moreDescription exists
    box.appendChild(boxImg);
  
    return box;
  };
  

  const renderAll = () => {
    // Do NOT clear existing HTML:
    // Just append user-added cards
    movies.forEach(movie => {
      const card = createCard({
        title: movie.title,
        imageData: movie.imageData || movie.imageUrl || '',
        description: movie.description || 'No description available.'
      });
      itemsContainer.appendChild(card);
    });
  
    if (typeof imgLocation === 'function') {
      imgLocation('items', 'box');
    }
  };
  

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = titleInput.value.trim();
    const file = fileInput.files[0];
    const description = descInput.value.trim();
    const moreDescription = moreDescInput.value.trim();

    if (!title || !file || !description) {
      alert("All fields are required.");
      return;
    }

    const reader = new FileReader();
    reader.onload = function (event) {
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

    reader.readAsDataURL(file); // This is the key fix: convert file into image data
  });

  renderAll();
});

console.log('movies.js loaded');

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#movieForm');
    const titleInput = document.querySelector('#movieTitle');
    const imageInput = document.querySelector('#movieImage');
    const itemsContainer = document.querySelector('#items');
  
    const STORAGE_KEY = 'user-added-movies';
    let movies = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  
    const createCard = ({ title, imageUrl }) => {
      const box = document.createElement('div');
      box.className = 'box';
  
      const boxImg = document.createElement('div');
      boxImg.className = 'box-img';
  
      const h2 = document.createElement('h2');
      h2.textContent = title;
  
      const img = document.createElement('img');
      img.src = imageUrl;
      img.alt = `Poster for ${title}`;
      img.width = 150;
  
      const p = document.createElement('p');
      p.textContent = "No description available.";
  
      boxImg.appendChild(h2);
      boxImg.appendChild(img);
      boxImg.appendChild(p);
      box.appendChild(boxImg);
      return box;
    };
  
    const render = () => {
      // Render only the user-added ones
      movies.forEach(movie => {
        const card = createCard(movie);
        itemsContainer.appendChild(card);
      });
    };
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const title = titleInput.value.trim();
      const imageUrl = imageInput.value.trim();
      if (!title || !imageUrl) return;
  
      const newMovie = { title, imageUrl };
      movies.push(newMovie);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(movies));
  
      const card = createCard(newMovie);
      requestAnimationFrame(() => {
        itemsContainer.appendChild(card);
      
        // Force layout refresh (needed if using waterfall.js)
        if (typeof imgLocation === 'function') {
          imgLocation('items', 'box');
        }
      });
      
  
      // Reset form
      titleInput.value = '';
      imageInput.value = '';
    });
  
    render();
  });
  
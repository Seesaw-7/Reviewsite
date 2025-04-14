import { useEffect } from 'react';
import { imgLocation, loadMore } from '../utils/waterfallLayout';
import '../styles/items.css';
import '../styles/basic.css';

const Books = () => {
  useEffect(() => {
    imgLocation('items', 'box');
    const handleResize = () => imgLocation('items', 'box');
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="page">
      <h1>Book Reviews</h1>
      <div id="items">
        <div className="box">
          <div className="box-img">
            <h2>Absalom, Absalom!</h2>
            <img src="/images/Absalom-Absalom.jpg" width="150" alt="Absalom, Absalom!" />
            <p>
              "Absalom, Absalom!" is one of William Faulkner's most important works...
            </p>
          </div>
        </div>

        <div className="box">
          <div className="box-img">
            <h2>The Garden of Forking Paths</h2>
            <img src="/images/The_garden_of_forking_paths.jpeg" width="150" alt="The Garden of Forking Paths" />
            <p>
              A collection of stories by Borges. "The Garden of Forking Paths" is a detective story that becomes a
              parable about time and infinity.
            </p>
          </div>
        </div>

        <div className="box">
          <div className="box-img">
            <h2>A Selection of Latin American Prose Poetry</h2>
            <img src="/images/Latin_American_prose_poetry.avif" width="150" alt="Latin American Prose Poetry" />
            <p>
              Poets in Latin America explored new poetic forms with the rise of free verse and modern prose poetry,
              marking a major shift in literary history.
            </p>
          </div>
        </div>

        <div className="box">
          <div className="box-img">
            <h2>Ulysses</h2>
            <img src="/images/Ulysses.png" width="150" alt="Ulysses" />
            <p>
              James Joyce’s Ulysses uses stream-of-consciousness to explore life in Dublin, layering myth, modernity,
              and everyday experience.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Books;

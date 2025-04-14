import { useEffect } from 'react';
import { Link } from 'react-router-dom';
// import '../styles/basic.css';
import '../styles/main.css';

const Home = () => {
  useEffect(() => {
    const adjustMargin = () => {
      const element = document.getElementById('welcome');
      if (!element) return;

      if (window.innerWidth > 900) {
        element.style.margin = '100px';
      } else if (window.innerWidth > 480) {
        element.style.margin = '50px';
      } else {
        element.style.margin = '20px';
      }
    };

    adjustMargin(); // on load
    window.addEventListener('resize', adjustMargin);
    return () => window.removeEventListener('resize', adjustMargin);
  }, []);

  return (
    <div className="container">
      <div id="welcome">
        <h1>Welcome</h1>
        <p>Welcome to the collections of excellent human creations.</p>
      </div>

      <div className="drops">
        <Link to="/music" className="drop drop-1" tabIndex={0}>
          <h2>Music</h2>
        </Link>
        <div className="drop drop-2" />
        <Link to="/books" className="drop drop-3" tabIndex={0}>
          <h2>Books</h2>
        </Link>
        <Link to="/films" className="drop drop-4" tabIndex={0}>
          <h2>Films</h2>
        </Link>
        <div className="drop drop-5" />
      </div>
    </div>
  );
};

export default Home;

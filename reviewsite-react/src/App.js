import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Books from './pages/Books';
import Films from './pages/Films';
import Music from './pages/Music';
import './styles/main.css'; // Adjust if needed

const App = () => (
  <Router>
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
      <Link to="/books" style={{ marginRight: '1rem' }}>Books</Link>
      <Link to="/films" style={{ marginRight: '1rem' }}>Films</Link>
      <Link to="/music">Music</Link>
    </nav>

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/books" element={<Books />} />
      <Route path="/films" element={<Films />} />
      <Route path="/music" element={<Music />} />
    </Routes>
  </Router>
);

export default App;

import { Link, Nexora, render, Route, Router } from '../../src';
import { About } from './pages/about';
import { Contact } from './pages/contact';
import { Home } from './pages/home';
import './styles/index.css';

function App() {
  return (
    <Router>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/about'>About</Link>
        <Link to='/contact'>Contact</Link>
      </nav>

      <Route path='/' component={Home} />
      <Route path='/about' component={About} />
      <Route path='/contact' component={Contact} />
    </Router>
  );
}

const app = document.getElementById('app');
if (app) render(<App />, app);

import { Nexora, reactive, render } from '../../src';
import { Counter } from './components/states-related/counter';
import { CounterTwo } from './components/states-related/counter-two';
import { Header } from './components/states-related/header';
import './index.css';

function App() {
  return (
    <div>
      <Header />
      {reactive.render(Counter)}
      {reactive.render(CounterTwo)}
    </div>
  );
}

const app = document.getElementById('app');
if (app) render(<App />, app);

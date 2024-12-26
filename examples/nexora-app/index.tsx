import { Nexora, reactive, render } from '../../src';
import { Counter } from './components/counter';
import { CounterTwo } from './components/counter-two';
import { Header } from './components/header';

function App() {
  return (
    <div>
      <Header />
      {reactive.renderComponent(Counter)}
      {reactive.renderComponent(CounterTwo)}
    </div>
  );
}

const app = document.getElementById('app');
if (app) render(<App />, app);

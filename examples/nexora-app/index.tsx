import { Nexora, reactive, render } from '../../dist';
import { Counter } from './components/counter';
import { CounterTwo } from './components/counter-two';
import { Header } from './components/header';

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

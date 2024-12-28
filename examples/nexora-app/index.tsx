import { Nexora, render } from '../../src';
import { ArrayList } from './components/dom-related/array-list';
import { OnInitSample } from './components/lifecycles-related/on-init-sample';
import { Counter } from './components/states-related/counter';
import { CounterTwo } from './components/states-related/counter-two';
import { Header } from './components/states-related/header';
import { ToggleTest } from './components/states-related/toggle-test';
import './styles/index.css';

function App() {
  return (
    <div>
      <Header />
      <OnInitSample />
      <Counter />
      <CounterTwo />
      <ToggleTest />
      <ArrayList />
    </div>
  );
}

const app = document.getElementById('app');
if (app) render(<App />, app);

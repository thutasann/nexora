import { Nexora } from '../../../src/';
import { ArrayList } from '../components/dom-related/array-list';
import { ChildrenTest } from '../components/dom-related/children';
import { OnInitSample } from '../components/lifecycles-related/on-init-sample';
import { Counter } from '../components/states-related/counter';
import { CounterTwo } from '../components/states-related/counter-two';
import { Header } from '../components/states-related/header';
import { ToggleTest } from '../components/states-related/toggle-test';

export function Home() {
  return (
    <div>
      <Header />
      <OnInitSample />
      <ChildrenTest>
        <div>this is children</div>
      </ChildrenTest>
      <Counter />
      <CounterTwo />
      <ToggleTest />
      <ArrayList />
    </div>
  );
}

import { createState, freeze, Nexora } from '../../../../src';
import ChildOne from './atom/child-one';
import ChildTwo from './atom/child-two';

const FreezedChildTwo = freeze(ChildTwo);

export const Counter = () => {
  const [getCount, setCount] = createState(0);
  console.log('Counter One --> ', getCount());

  return (
    <section className='container'>
      <h2>Counter One: Current Count: {getCount()}</h2>
      <button
        onclick={() => {
          setCount((prev) => {
            return prev + 1;
          });
        }}
      >
        Increment
      </button>
      <button
        onclick={() => {
          setCount((prev) => {
            return prev - 1;
          });
        }}
      >
        Decrement
      </button>

      <ChildOne count={getCount()} />
      <FreezedChildTwo />
    </section>
  );
};

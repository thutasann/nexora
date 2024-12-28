import { createState, Nexora } from '../../../../src';

export const CounterTwo = () => {
  const [getCount, setCount] = createState(0);
  console.log('Counter Two --> ', getCount());

  return (
    <section className='container'>
      <h2>Counter Two: Current Count: {getCount()}</h2>
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
    </section>
  );
};

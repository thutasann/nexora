import { createState, Nexora } from '../../../../src';

export const ToggleTest = () => {
  const [getToggle, setToggle] = createState(false);
  return (
    <div className='container'>
      <h2>Toggle Test</h2>
      <button onclick={() => setToggle(!getToggle())}>Toggle</button>
      <p>Toggle is {getToggle() ? 'on' : 'off'}</p>
    </div>
  );
};

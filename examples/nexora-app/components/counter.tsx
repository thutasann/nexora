import { createState, Nexora } from '../../../dist';

const Counter = () => {
	console.log('Counter');
	const [getCount, setCount] = createState(0);

	return (
		<section>
			<h2>Count: {getCount()}</h2>
			<button onclick={() => setCount(getCount() + 1)}>Increment</button>
			<button onclick={() => setCount(getCount() - 1)}>Decrement</button>
		</section>
	);
};

export default Counter;

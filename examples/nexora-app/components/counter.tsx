import { createState, Nexora } from '../../../dist';

export const Counter = () => {
	const [getCount, setCount] = createState(0);
	console.log('Counter --> ', getCount());

	return (
		<section>
			<h2>Current Count: {getCount()}</h2>
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

import { createState, Nexora, reactive, render } from '../../dist';

const Counter = () => {
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

const Header = () => {
	return <h1>Nexora App</h1>;
};

function App() {
	return (
		<div>
			<Header />
			<Counter />
		</div>
	);
}

const app = document.getElementById('app');
if (app) {
	render(reactive.renderComponent(App), app);
}

import { render, Revo } from '../../dist';

function Counter() {
	let count = 0;

	const increment = () => {
		count++;
		update();
	};

	const decrement = () => {
		count--;
		update();
	};

	const update = () => {
		render(App(), document.getElementById('app')!);
	};

	const App = () => (
		<div>
			<p>Count: {count}</p>
			<button onclick={increment}>Increment</button>
			<button onclick={decrement}>Decrement</button>
		</div>
	);

	return App();
}

const app = document.getElementById('app');
if (app) {
	render(Counter(), app);
}

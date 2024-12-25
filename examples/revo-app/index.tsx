import { render, Revo } from '../../dist';
import Hello from './components/hello';

function App() {
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

			<Hello name="Thuta Sann" />
		</div>
	);

	return App();
}

const app = document.getElementById('app');
if (app) {
	render(App(), app);
}

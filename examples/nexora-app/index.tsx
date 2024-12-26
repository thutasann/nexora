import { Nexora, reactive, render } from '../../dist';
import { Counter } from './components/counter';

function App() {
	return (
		<div>
			<h1>Nexora App</h1>
			<Counter />
		</div>
	);
}

const app = document.getElementById('app');
if (app) render(reactive.renderComponent(App), app);

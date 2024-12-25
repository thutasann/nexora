import {
	createElement,
	render,
	useState,
} from '../../dist/revo-framework.esm.js';

function Counter() {
	const [count, setCount] = useState(0);

	return createElement(
		'div',
		null,
		createElement('p', null, `Count: ${count}`),
		createElement(
			'button',
			{
				onclick: () => {
					setCount(count + 1);
				},
			},
			'Increment',
		),
	);
}

const root = document.getElementById('revo');
if (root) {
	render(createElement(Counter), root);
}

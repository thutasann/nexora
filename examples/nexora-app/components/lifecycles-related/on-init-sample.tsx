import { Nexora, onInit } from '../../../../src';
import { fetchTodos } from './fetch-data';

type Todos = any[];

export function OnInitSample() {
  const todos = onInit<Todos[]>(fetchTodos);

  return (
    <div className='container'>
      <h2>OnInit (Todos)</h2>
      <p>Todos Length: {todos ? todos.length : 'Loading...'}</p>
    </div>
  );
}

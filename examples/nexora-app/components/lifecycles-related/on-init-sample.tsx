import { Nexora, onInit } from '../../../../src';
import { fibonacci } from '../../utils';
import { fetchTodos, fetchUsers, Todos, Users } from './fetch-data';

export function OnInitSample() {
  const todos = onInit<Todos[]>(fetchTodos);
  const users = onInit<Users[]>(fetchUsers);
  const fibonacciResult = fibonacci(10);

  return (
    <div className='container'>
      <h2>OnInit</h2>
      <p>Todos Length: {todos ? todos.length : 'Loading...'}</p>
      <p>Users Length: {users ? users.length : 'Loading...'}</p>
      <p>Fibonacci Result: {fibonacciResult}</p>
    </div>
  );
}

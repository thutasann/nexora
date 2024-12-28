import { createState, Nexora } from '../../../../src';

export function ArrayList() {
  const [items, setItems] = createState(['Item 1', 'Item 2', 'Item 3']);

  const handleDelete = (item: string) => {
    setItems((prev) => prev.filter((i) => i !== item));
  };

  const handleAdd = () => {
    setItems((prev) => [...prev, 'Item ' + (prev.length + 1)]);
  };

  return (
    <div className='container'>
      <h2>Array List</h2>
      <button style='margin-bottom: 1rem;' onClick={handleAdd}>
        Add
      </button>
      {items().map((item) => {
        return (
          <div className='card'>
            {item} &nbsp;
            <button className='danger sm' onClick={() => handleDelete(item)}>
              delete
            </button>
          </div>
        );
      })}
    </div>
  );
}

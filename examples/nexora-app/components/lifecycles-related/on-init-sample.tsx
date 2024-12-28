import { Nexora, onInit } from '../../../../src';

export function OnInitSample() {
  onInit(() => {
    console.log('OnInitSample component mounted');
  });

  return (
    <div>
      <div className='container'>
        <h2>OnInitSample</h2>
      </div>
      <OnInitSample2 />
    </div>
  );
}

export function OnInitSample2() {
  onInit(async () => {
    const data = await fetch('https://jsonplaceholder.typicode.com/todos');
    const json = await data.json();
    console.log('OnInitSample2 ==> ', json);
  });

  return (
    <div className='container'>
      <h2>OnInitSample2</h2>
    </div>
  );
}

import { Nexora, onInit } from '../../../../src';

export function OnInitSample() {
  onInit(() => {
    console.log('OnInitSample component mounted');
  });

  return (
    <div className='container'>
      <h2>OnInitSample</h2>
    </div>
  );
}

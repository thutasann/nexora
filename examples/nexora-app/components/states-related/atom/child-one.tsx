import { Nexora } from '../../../../../src';

const ChildOne = ({ count }: { count: number }) => {
  console.log('Child One --> ', count);
  return <div style='margin-top: 1rem;'>Child One {count}</div>;
};

export default ChildOne;

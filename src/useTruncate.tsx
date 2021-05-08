import { useContext } from 'react';
import context from './TruncateContext';

const useTruncate = () => {
  return useContext(context);
};

export default useTruncate;

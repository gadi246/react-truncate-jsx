import { createContext } from 'react';

export interface TruncateContextInterface {
  observer: IntersectionObserver;
  truncateIndex: number | null;
  isTruncating: boolean;
  done: boolean;
}
const context = createContext({} as TruncateContextInterface);

export default context;

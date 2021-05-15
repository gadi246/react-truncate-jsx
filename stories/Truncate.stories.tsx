import React, { forwardRef, useState } from 'react';
import { Meta } from '@storybook/react';
import Truncate, {TruncateList} from '../src';

const data = ['New York', 'Double bed', 'Free Cables', 'XXX', 'Pool', 'Luxury'];
const data2 = [
  'San Jose',
  'Single bed',
  'Luxury',
  'XXX',
  'Secret-Door',
  'Fire-Place',
];

type TagProps = { children: React.ReactNode };
type TagRef = HTMLDivElement;

const Tag = forwardRef<TagRef, TagProps>(({ children, ...props }, ref) => (
  <div
    ref={ref}
    style={{
      padding: '3px 5px',
      background: '#bababa',
      flexShrink: 0,
      marginRight: 5,
    }}
    {...props}
  >
    {children}
  </div>
));
type EllipsisProps = { moreCount: number; moreChildren: [React.ReactNode] };
const Ellipsis = forwardRef<TagRef, EllipsisProps>(
  ({ moreCount, moreChildren, ...props }, ref) => {
    return (
      <div ref={ref} {...props} style={{ flexShrink: 0 }}>
        +{moreCount} tags
      </div>
    );
  }
);

export const Main: React.VFC<{}> = () => {
  const [isTruncating, setTruncate] = useState(false);
  const [tags, setTags] = useState(data);
  return (
    <div>
      <h3>JSX Ellipsis playground</h3>
      <div style={{ padding: '10px 0' }}>
        <button onClick={() => setTags((t) => t.slice(1))}>reduce tags</button>
        <button onClick={() => setTags(data2)}>Switch data</button>
        <button onClick={() => setTruncate((t) => !t)}>toggle</button>
      </div>
      <div style={{ width: 350, background: 'blue', padding: 10 }}>
        <Truncate isTruncating={isTruncating}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              background: 'lightcyan',
            }}
          >
            <TruncateList ellipsis={Ellipsis}>
              {tags.map((t) => (
                <Tag key={t}>{t}</Tag>
              ))}
            </TruncateList>
          </div>
        </Truncate>
      </div>
    </div>
  );
};

export default {
  title: 'Components/Main',
  component: Main,
} as Meta;

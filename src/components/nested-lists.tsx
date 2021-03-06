import React, { useMemo, useState } from 'react';
import { ChevronUp, ChevronDown } from 'src/components/icons';
import tw from 'twin.macro';
import IconList from './icon-list';

const classes = {
  nestedWrapper: tw`
    flex flex-col min-h-0 overflow-hidden
    transition duration-200 transition-height
  `,
};

interface ChildListsProps {
  lists: { icon: JSX.Element, text: string, link?: string }[]
}

interface NestedListsProps {
    className?: string;
    topIcon: JSX.Element;
    topText: string;
    lists: { icon: JSX.Element, text: string, link?: string }[];
};

const ChildLists = React.memo((props: ChildListsProps) => {
  return (
    <>
      {props.lists.map((list, key) => (
        <IconList
          nested={true}
          key={`nested-list-${key}`}
          icon={list.icon}
          text={list.text}
          link={list.link}
        />
      ))}
    </>
  );
});

/**
 * @param {JSX.Element} topIcon svg element
 * @param {string} topText list title
 * @param {{icon: JSX.Element, text: string, link?: string}[]} lists Nested list arrays
 * @returns {JSX.Element} Nested list elements
 */
const Component = React.memo((props: NestedListsProps) => {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  const nodeStyle = useMemo(
    () => ({
      maxHeight: open ? `${props.lists.length * 5}rem` : 0,
    }), [open]
  );

  return (
    <>
      <div className={props.className}>
        <IconList
          onClick={handleClick}
          icon={props.topIcon}
          text={props.topText}
          endIcon={open ? <ChevronUp size='small' /> : <ChevronDown size='small' />}
        />

        <div style={nodeStyle} css={classes.nestedWrapper}>
          <ChildLists lists={props.lists} />
        </div>
      </div>
    </>
  );
});

export default Component;

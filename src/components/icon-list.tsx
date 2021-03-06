import React from 'react';
import { Link } from 'gatsby';
import tw from 'twin.macro';

const classes = {
  list: tw`
    flex w-full relative box-border px-8 py-4 justify-start items-center align-middle cursor-pointer no-underline hover:bg-hover dark:hover:bg-darkhover
    transition transition-background
  `,
  nestedList: tw`
    pl-12
  `,
  listIcon: tw`
    inline-flex flex-shrink-0 mr-8
  `,
  listText: tw`
    flex-auto min-w-0 my-1
  `,
};

interface ListsProps {
  className?: string;
  icon: JSX.Element;
  text: string;
  endIcon?: JSX.Element;
  link?: string;
  nested?: boolean;
  onClick?: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void) | undefined;
}

/**
 * @param {string} className className
 * @param {JSX.Element} icon svg element
 * @param {string} text list title
 * @param {JSX.Element?} endIcon? svg element
 * @returns {JSX.Element} List element
 */
const IconList = (props: ListsProps) => {
  let wrapper;
  const { className, icon, text, endIcon, link, nested, ...other } = props;
  if (link) {
    wrapper = (
      <div className={className} {...other}>
        <Link to={link} css={[classes.list, nested ? classes.nestedList : tw``]}>
          <div css={classes.listIcon}>{icon}</div>
          <div css={classes.listText}>{text}</div>
          {endIcon && <div tw='inline-flex'>{endIcon}</div>}
        </Link>
      </div>
    );
  } else {
    wrapper = (
      <div
        className={props.className}
        css={[classes.list, nested ? classes.nestedList : tw``]}
        {...other}
      >
        <div css={classes.listIcon}>{icon}</div>
        <div css={classes.listText}>{text}</div>
        {endIcon && <div tw='inline-flex'>{endIcon}</div>}
      </div>
    );
  }

  return (
    <>{wrapper}</>
  )
};

export default IconList;

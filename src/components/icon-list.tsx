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
  icon: JSX.Element;
  text: string;
  endIcon?: JSX.Element;
  link?: string;
  nested?: boolean;
}

interface LinkWrapperProps {
  to: string;
}

/**
 * @param {JSX.Element} icon svg element
 * @param {string} text list title
 * @param {JSX.Element?} endIcon? svg element
 * @returns {JSX.Element} List element
 */
const IconList = (props: ListsProps) => {
  let wrapper;
  const { icon, text, endIcon, link, nested, ...rest } = props;
  const LinkWrapper: React.FCX<LinkWrapperProps> = (props) => {
    const { to, children, ...rest} = props;
    return <Link to={to} css={classes.list} {...rest}>{children}</Link>
  }
  const UnlinkWrapper: React.FCX = (props) => {
    return <div css={classes.list} {...props}>{props.children}</div>
  }

  if (link) {
    wrapper = (
      <div {...rest}>
        <LinkWrapper to={link} css={nested && classes.nestedList}>
          <div css={classes.listIcon}>{icon}</div>
          <div css={classes.listText}>{text}</div>
          {endIcon && <div tw='inline-flex'>{endIcon}</div>}
        </LinkWrapper>
      </div>
    );
  } else {
    wrapper = (
      <UnlinkWrapper
        css={nested && classes.nestedList}
        {...rest}
      >
        <div css={classes.listIcon}>{icon}</div>
        <div css={classes.listText}>{text}</div>
        {endIcon && <div tw='inline-flex'>{endIcon}</div>}
      </UnlinkWrapper>
    );
  }

  return (
    <>{wrapper}</>
  );
};

export default IconList;

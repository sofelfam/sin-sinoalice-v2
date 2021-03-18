import React from 'react';
import tw from 'twin.macro';

const TabButton = tw.button`block w-full h-20 flex-shrink-0 cursor-pointer opacity-70 transition ease focus:outline-none focus-visible:ring`
  
const Container: React.FCX<React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>> = (props) => {
  const { children, ...rest } = props;

  return (
    <TabButton
      {...rest}
    >
      {children}
    </TabButton>
  );
};

export default Container;

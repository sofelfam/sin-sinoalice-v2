import { useState } from 'react';
import { createContainer } from 'unstated-next';

const Component = () => {
  const [title, setTitle] = useState('SIN - SINoALICE');
  return { title, setTitle };
};

export default createContainer(Component);

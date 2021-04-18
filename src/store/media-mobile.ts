import { useMedia } from 'src/hooks';
import { createContainer } from 'unstated-next';

const Component = () => {
  const isMobile = useMedia();
  return { isMobile };
};

export default createContainer(Component);

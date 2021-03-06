import React from 'react';
import Img from 'gatsby-image';
import { useAnyImage } from 'src/hooks';

export default ({ filename }: { filename: string }): JSX.Element => {
  const fluid = useAnyImage(filename);
  if(!fluid) return <div>N/A Image</div>;

  return <Img fluid={fluid} />;
};

import React from 'react';
import Layout from 'src/layouts';
import { SwitchTitle } from 'src/store';

type ContainerProps = { element: React.ReactNode };
type Props = ContainerProps;

// you can use this component for some providers for redux, context API, etc...
const Component: React.FCX<Props> = ({ element }) => (
  <SwitchTitle.Provider>
    <Layout>{element}</Layout>
  </SwitchTitle.Provider>
);

const Container: React.FCX<ContainerProps> = (props) => <Component {...props} />;

export default Container;

import { graphql, useStaticQuery } from 'gatsby';
import { useEffect, useState } from 'react';
import { DeepReadonly } from 'utility-types';

type Props = DeepReadonly<{
  allNightmare: {
    nodes: {
      id: string,
      name: string,
      icon: string,
      cskill: string,
      cskilltxt: string,
      ready: string,
      activate: string,
    }[];
  }
}>;

export interface nightmareProps {
  id: string;
  name: string;
  icon: string;
  cskill: string;
  cskilltxt: string;
  ready: string;
  activate: string;
}

const initNightmare = {
  id: 'dummyID-qwertyuiop',
  name: '',
  icon: '',
  cskill: '',
  cskilltxt: '',
  ready: '',
  activate: ''
}

export default (): nightmareProps[] => {
  const queryData = useStaticQuery<Props>(graphql`
    {
      allNightmare {
        nodes {
          id
          name
          icon
          cskill
          cskilltxt
          ready
          activate
        }
      }
    }
  `);

  const [data, setData] = useState<nightmareProps[]>([initNightmare]);
  useEffect(() => {
    const temp: nightmareProps[] = [];
    queryData.allNightmare.nodes.map(e => {
      temp.push(e);
    });
    setData(temp);
  }, []);
  return data;
};

import { GatsbyNode } from 'gatsby';
import axios from 'axios';

// If you don't use query in gatsby-node or any other functions, you can remove these functions.

// query example
// const query = `
//    query {
//      ...
//    }
// `;

// TIPS: you can't use QraphQL query fragments to get fluid object in gatsby-node.

export const createPages: GatsbyNode['createPages'] = async ({ graphql, actions: { createPage } }) => {
  // const result = await graphql(query);
  console.log(createPage);
  console.log(graphql);
};

export const sourceNodes: GatsbyNode['sourceNodes'] = async ({ actions, createNodeId, createContentDigest }) => {
  /**
    *  Data: Nightmare
    */
  const { colsArr, rowsArrs } = await readJS('https://sinoalice.game-db.tw/package/alice_nightmares.js');
  
  rowsArrs.forEach(data => {
    if (+data[colsArr.indexOf('Rarity')] < 6) return;

    const node = {
      id: createNodeId(`nightmare-${data[colsArr.indexOf('Icon')]}`),
      name: data[colsArr.indexOf('Name')],
      icon: data[colsArr.indexOf('Icon')],
      rare: data[colsArr.indexOf('Rarity')],
      mskill: data[colsArr.indexOf('QuestSkill')],
      mskilltxt: data[colsArr.indexOf('QuestSkillDetail')],
      cskill: data[colsArr.indexOf('GvgSkill')],
      cskilltxt: data[colsArr.indexOf('GvgSkillDetail')],
      ready: data[colsArr.indexOf('GvgSkillLead')],
      activate: data[colsArr.indexOf('GvgSkillDur')],
      internal: {
        type: "Nightmare",
        contentDigest: createContentDigest(data),
      }
    }
    actions.createNode(node);
  });
};

const readJS = async ( url:string ) => {
  const colsArr: string[] = [];
  const rowsArrs: string[][] = [];
  const res = await axios.get(url);

  colsArr.push(...res.data.Cols.split('|'));
  res.data.Rows.map((row: string) => {
    const rowsArr: string[] = [];
    row.split('|').map((data: string) => {
      rowsArr.push(data);
    });
    rowsArrs.push(rowsArr);
  });
  return { colsArr, rowsArrs };
};
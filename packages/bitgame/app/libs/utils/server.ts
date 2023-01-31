import fs from 'fs-extra';

/**
 * 获取目录信息
 * @param {string} path 目录路径
 */
export const readDirInfo = path => {
  const reg = new RegExp(/\.DS_Store|node_modules$/);
  const isExist = fs.pathExistsSync(path);

  if (!isExist) {
    return [];
  }

  let dirInfo = fs.readdirSync(path);

  dirInfo = dirInfo.filter(item => {
    return !reg.test(item);
  });

  return dirInfo;
};
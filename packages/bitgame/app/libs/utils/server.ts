import fs from 'fs-extra';

/**
 * 获取目录信息
 * @param {string} path 目录路径
 */
export const readDirInfo = async (path: string): Promise<string[]> => {
  const reg = new RegExp(/\.DS_Store|node_modules$/);
  const isExist = await fs.pathExists(path);

  if (!isExist) {
    return [];
  }

  let dirInfo = await fs.readdir(path);

  dirInfo = dirInfo.filter((item: string) => {
    return !reg.test(item);
  });

  return dirInfo;
};

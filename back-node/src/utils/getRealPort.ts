import * as portfinder from 'portfinder';

/**
 * 获取没有被占用的端口
 * @returns {number} 端口号
 */
export const getRealPort = async (initialPort: number) => {
  const port = await portfinder.getPortPromise({
    port: initialPort,
  });
  let msg = '';
  if (port !== initialPort) {
    msg = `端口${initialPort}被占用，已使用端口${port}`;
  }
  return [port, msg];
};

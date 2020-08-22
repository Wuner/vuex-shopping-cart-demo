/**
 * @author Wuner
 * @date 2020/8/21 12:22
 * @description
 */
const os = require('os');
const getIPAddress = () => {
  let interfaces = os.networkInterfaces();
  let host = null;
  Object.values(interfaces).forEach(value => {
    for (let i = 0; i < value.length; i++) {
      let alias = value[i];
      if (
        alias.family === 'IPv4' &&
        alias.address !== '127.0.0.1' &&
        !alias.internal
      ) {
        host = alias.address;
      }
    }
  });
  return host;
};

module.exports = getIPAddress;

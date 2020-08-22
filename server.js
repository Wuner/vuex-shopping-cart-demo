const express = require('express');
const cors = require('cors');
const app = express();
const getIPAddress = require('./src/utils/getIPAddress');

app.use(cors());

const hostname = getIPAddress();
const port = 3000;

const _products = {
  code: 200,
  message: 'success',
  data: [
    {
      id: 1,
      title: 'Apple iPad Pro',
      desc:
        '苹果 Apple iPad Pro 11英寸平板电脑 2020年新款(256G WLAN版/全面屏/A12Z/Face ID/MXDC2CH/A) 深空灰色',
      price: 7029.9,
      thumb:
        'http://img14.360buyimg.com/n5/s54x54_jfs/t1/93232/3/15628/251953/5e723c47E54d3aff9/9d083eaea3409b83.jpg',
    },
    {
      id: 2,
      title: 'HUAWEI Mate 30 Pro 5G',
      desc:
        '华为 HUAWEI Mate 30 Pro 5G 麒麟990 OLED环幕屏双4000万徕卡电影四摄8GB+256GB丹霞橙5G全网通游戏手机',
      price: 6399.0,
      thumb:
        'http://img14.360buyimg.com/n5/s54x54_jfs/t1/90139/34/1379/180822/5dbe8875E02dc2e95/c78c80a4116ee57d.jpg',
    },
    {
      id: 3,
      title: 'Alienware m17',
      desc:
        '外星人 Alienware m17 2020版 17.3英寸轻薄游戏本电脑(十代酷睿i7 16G 1TBSSD RTX2070 8G独显 300Hz)白',
      price: 20999.0,
      thumb:
        'https://img14.360buyimg.com/n5/s54x54_jfs/t1/142119/22/4704/50705/5f2cec4eE2e06b218/e50debd5955af768.jpg',
    },
  ],
};

app.use(express.json());

app.get('/products', (req, res) => {
  res.status(200).json(_products);
});

app.post('/checkout', (req, res) => {
  res.status(200).json({
    success: Math.random() > 0.5,
  });
});

app.listen(port, hostname, () => {
  console.log(`Server is running at http://${hostname}:${port}/`);
});

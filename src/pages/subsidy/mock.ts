export const BRAND_ORDER = [
  'Apple', 'vivo', '三星', '一加', '小米', 'OPPO', '联想moto', '荣耀', '华为',
  '魅族', '中兴', '努比亚', '索尼', '传音', '谷歌', '其他',
]

// 每个品牌对应一个主题色，用于生成内联 SVG 占位图
const BRAND_COLORS: Record<string, string> = {
  Apple:    '#4a4a4a',
  vivo:     '#415fff',
  三星:     '#1428a0',
  一加:     '#f5010c',
  小米:     '#ff6900',
  OPPO:     '#1d6040',
  联想moto: '#b00000',
  荣耀:     '#bf0404',
  华为:     '#cf0a2c',
  魅族:     '#f8ac00',
  中兴:     '#0066cc',
  努比亚:   '#e8002d',
  索尼:     '#1a1a1a',
  传音:     '#00a651',
  谷歌:     '#4285f4',
  其他:     '#888888',
}

/** 生成纯色 + 品牌文字的内联 SVG data URI，无需任何外部资源 */
function ph(brand: string): string {
  const color = BRAND_COLORS[brand] ?? '#888888'
  const label = brand.length > 3 ? brand.substring(0, 3) : brand
  const svg = [
    '<svg xmlns="http://www.w3.org/2000/svg" width="360" height="360">',
    `<rect width="360" height="360" fill="${color}"/>`,
    `<text x="180" y="190" font-size="88" text-anchor="middle" dominant-baseline="middle" `,
    `fill="rgba(255,255,255,0.75)" font-family="sans-serif">${label}</text>`,
    '</svg>',
  ].join('')
  return `data:image/svg+xml,${encodeURIComponent(svg)}`
}

const brandAliasMap: Record<string, string[]> = {
  Apple:    ['iphone', 'apple', '苹果'],
  vivo:     ['vivo', 'iqoo'],
  三星:     ['三星', 'galaxy', 'samsung'],
  一加:     ['一加', 'oneplus', 'ace'],
  小米:     ['小米', 'redmi'],
  OPPO:     ['oppo', 'realme', '真我'],
  联想moto: ['联想', 'moto', 'motorola', 'lenovo'],
  荣耀:     ['荣耀', 'honor'],
  华为:     ['华为', 'huawei', 'pura', 'mate', 'nova'],
  魅族:     ['魅族', 'meizu', 'flyme'],
  中兴:     ['中兴', 'zte', 'axon', 'blade'],
  努比亚:   ['努比亚', 'nubia', 'red magic', '红魔'],
  索尼:     ['索尼', 'sony', 'xperia'],
  传音:     ['传音', 'transsion', 'tecno', 'itel', 'infinix'],
  谷歌:     ['谷歌', 'google', 'pixel'],
}

export function extractBrandFromTitle(title: string): string {
  const s = title.toLowerCase()
  for (const [brand, aliases] of Object.entries(brandAliasMap)) {
    if (aliases.some(a => s.includes(a.toLowerCase()))) return brand
  }
  return '其他'
}

export const phones = [
  // ── Apple（6条，触发滚动）──
  { id: 'a1',  title: 'Apple iPhone 16 Pro 256GB 原色钛金属',          price: 7999, isSelfRun: true,  image: ph('Apple') },
  { id: 'a2',  title: 'Apple iPhone 16 128GB 黑色',                     price: 5999, isSelfRun: true,  image: ph('Apple') },
  { id: 'a3',  title: 'Apple iPhone 15 Pro Max 256GB 黑色钛金属',       price: 7499, isSelfRun: false, image: ph('Apple') },
  { id: 'a4',  title: 'Apple iPhone 16 Plus 512GB 沙漠色',              price: 8999, isSelfRun: true,  image: ph('Apple') },
  { id: 'a5',  title: 'Apple iPhone 15 128GB 粉色',                     price: 4799, isSelfRun: false, image: ph('Apple') },
  { id: 'a6',  title: 'Apple iPhone SE 第三代 64GB 午夜色',             price: 2999, isSelfRun: true,  image: ph('Apple') },

  // ── vivo（5条）──
  { id: 'v1',  title: 'vivo iQOO Z10 Turbo+ 12GB+256GB 骁龙处理器',    price: 2499, isSelfRun: true,  image: ph('vivo') },
  { id: 'v2',  title: 'vivo X200 Pro 16GB+512GB 蔡司影像旗舰',         price: 4999, isSelfRun: true,  image: ph('vivo') },
  { id: 'v3',  title: 'vivo iQOO 13 16GB+256GB 骁龙8旗舰',             price: 3999, isSelfRun: false, image: ph('vivo') },
  { id: 'v4',  title: 'vivo S19 Pro 12GB+256GB 超薄曲面屏',            price: 3299, isSelfRun: true,  image: ph('vivo') },
  { id: 'v5',  title: 'vivo Y200 Pro 8GB+256GB 护眼大屏',              price: 1799, isSelfRun: false, image: ph('vivo') },

  // ── 三星（5条）──
  { id: 's1',  title: '三星 Galaxy S24 12GB+256GB AI 智能手机',         price: 4699, isSelfRun: false, image: ph('三星') },
  { id: 's2',  title: '三星 Galaxy S24+ 12GB+512GB 钛黑色',            price: 5999, isSelfRun: true,  image: ph('三星') },
  { id: 's3',  title: '三星 Galaxy A55 8GB+256GB 超视觉夜拍',          price: 2099, isSelfRun: false, image: ph('三星') },
  { id: 's4',  title: '三星 Galaxy Z Fold6 12GB+256GB 折叠屏',         price: 9999, isSelfRun: true,  image: ph('三星') },
  { id: 's5',  title: '三星 Galaxy Z Flip6 8GB+256GB 翻盖旗舰',        price: 5999, isSelfRun: false, image: ph('三星') },

  // ── 一加（5条）──
  { id: 'op1', title: '一加 Ace 5 16GB+512GB 电竞直屏旗舰',            price: 2999, isSelfRun: false, image: ph('一加') },
  { id: 'op2', title: 'OnePlus 13 16GB+512GB 哈苏影像',                price: 4499, isSelfRun: true,  image: ph('一加') },
  { id: 'op3', title: '一加 Ace 3 Pro 24GB+1TB 骁龙8 Gen3',            price: 3499, isSelfRun: true,  image: ph('一加') },
  { id: 'op4', title: '一加 12 16GB+256GB 骁龙8 Gen3',                 price: 3999, isSelfRun: true,  image: ph('一加') },
  { id: 'op5', title: '一加 Ace 2V 12GB+256GB 天玑9200',               price: 1999, isSelfRun: false, image: ph('一加') },

  // ── 小米（6条，触发滚动）──
  { id: 'm1',  title: '小米 REDMI Note14 12GB+256GB 全刚品质',         price: 879,  isSelfRun: true,  image: ph('小米') },
  { id: 'm2',  title: '小米14 16GB+512GB 徕卡光学镜头 超薄旗舰',      price: 3999, isSelfRun: true,  image: ph('小米') },
  { id: 'm3',  title: '小米 REDMI K80 Pro 16GB+512GB 骁龙8 Gen3',      price: 2799, isSelfRun: false, image: ph('小米') },
  { id: 'm4',  title: '小米15 Pro 16GB+512GB 超感知徕卡影像',          price: 5299, isSelfRun: true,  image: ph('小米') },
  { id: 'm5',  title: '小米 Civi 4 Pro 12GB+256GB 骁龙8s Gen3',        price: 2999, isSelfRun: false, image: ph('小米') },
  { id: 'm6',  title: '小米 REDMI Turbo4 12GB+256GB 游戏旗舰',         price: 2299, isSelfRun: true,  image: ph('小米') },

  // ── OPPO（5条）──
  { id: 'o1',  title: 'OPPO Find X8 Pro 16GB+512GB 超光影三主摄',      price: 5999, isSelfRun: true,  image: ph('OPPO') },
  { id: 'o2',  title: 'OPPO Find X8 16GB+512GB 超薄直板旗舰',         price: 4499, isSelfRun: true,  image: ph('OPPO') },
  { id: 'o3',  title: 'OPPO Reno13 Pro 12GB+256GB 美颜自拍旗舰',      price: 2999, isSelfRun: false, image: ph('OPPO') },
  { id: 'o4',  title: 'OPPO K12x 8GB+256GB 护眼大电池',               price: 1199, isSelfRun: false, image: ph('OPPO') },
  { id: 'o5',  title: 'realme 真我GT7 Pro 12GB+256GB 骁龙8 Elite',     price: 3499, isSelfRun: true,  image: ph('OPPO') },

  // ── 联想moto（4条）──
  { id: 'lm1', title: '摩托罗拉 moto X50 Ultra 12GB+256GB 超光感影像', price: 3999, isSelfRun: false, image: ph('联想moto') },
  { id: 'lm2', title: 'moto edge 50 Pro 12GB+256GB 轻薄旗舰',          price: 2499, isSelfRun: true,  image: ph('联想moto') },
  { id: 'lm3', title: '联想 Z6 Pro 8GB+128GB 全能拍照手机',            price: 1999, isSelfRun: false, image: ph('联想moto') },
  { id: 'lm4', title: 'moto razr 50 Ultra 12GB+512GB 折叠屏',          price: 5999, isSelfRun: true,  image: ph('联想moto') },

  // ── 荣耀（6条，触发滚动）──
  { id: 'h1',  title: '荣耀 Magic6 Pro 16GB+512GB 卫星通信',           price: 5199, isSelfRun: true,  image: ph('荣耀') },
  { id: 'h2',  title: '荣耀200 Pro 12GB+256GB 潜望四摄旗舰',           price: 2999, isSelfRun: true,  image: ph('荣耀') },
  { id: 'h3',  title: '荣耀 X50 GT 16GB+256GB 电竞手机',               price: 1799, isSelfRun: false, image: ph('荣耀') },
  { id: 'h4',  title: '荣耀 Magic V3 16GB+512GB 轻薄折叠旗舰',         price: 7999, isSelfRun: true,  image: ph('荣耀') },
  { id: 'h5',  title: '荣耀100 12GB+256GB 超清写真直屏',               price: 2399, isSelfRun: false, image: ph('荣耀') },
  { id: 'h6',  title: '荣耀 Play8T 8GB+128GB 大电池长续航',            price: 899,  isSelfRun: false, image: ph('荣耀') },

  // ── 华为（6条，触发滚动）──
  { id: 'hw1', title: 'HUAWEI Pura 80 Pro+ 16GB+512GB 旗舰影像',       price: 6199, isSelfRun: true,  image: ph('华为') },
  { id: 'hw2', title: 'HUAWEI Mate 70 Pro 16GB+512GB 卫星通话',        price: 6499, isSelfRun: true,  image: ph('华为') },
  { id: 'hw3', title: 'HUAWEI nova 13 Pro 12GB+256GB 前后超感知',      price: 3299, isSelfRun: false, image: ph('华为') },
  { id: 'hw4', title: 'HUAWEI Mate X5 折叠屏 16GB+512GB',              price: 9999, isSelfRun: true,  image: ph('华为') },
  { id: 'hw5', title: 'HUAWEI Pura 70 12GB+256GB 超感知影像',          price: 4299, isSelfRun: false, image: ph('华为') },
  { id: 'hw6', title: 'HUAWEI nova 12 SE 8GB+256GB 超大内存',          price: 1799, isSelfRun: false, image: ph('华为') },

  // ── 魅族（4条）──
  { id: 'mz1', title: '魅族 21 Pro 16GB+512GB 骁龙8 Gen3 旗舰',        price: 3999, isSelfRun: false, image: ph('魅族') },
  { id: 'mz2', title: '魅族 21 12GB+256GB 轻薄旗舰',                   price: 2999, isSelfRun: false, image: ph('魅族') },
  { id: 'mz3', title: '魅族 Note 21 Pro 8GB+256GB 护眼大屏',           price: 1299, isSelfRun: false, image: ph('魅族') },
  { id: 'mz4', title: '魅族 20 Pro 12GB+512GB Flyme AI',               price: 3499, isSelfRun: false, image: ph('魅族') },

  // ── 中兴（3条）──
  { id: 'zt1', title: '中兴 Axon 60 Ultra 16GB+512GB 屏下摄像',        price: 4499, isSelfRun: false, image: ph('中兴') },
  { id: 'zt2', title: '中兴 Blade V60 8GB+256GB 大电池商务机',         price: 1299, isSelfRun: false, image: ph('中兴') },
  { id: 'zt3', title: '中兴 Axon 50 Pro 12GB+256GB 超感影像',          price: 2799, isSelfRun: false, image: ph('中兴') },

  // ── 努比亚（3条）──
  { id: 'nb1', title: '努比亚 红魔10 Pro+ 24GB+1TB 骁龙8 Elite',       price: 5999, isSelfRun: false, image: ph('努比亚') },
  { id: 'nb2', title: '努比亚 Z70 Ultra 12GB+256GB 骁龙8 Elite',       price: 3999, isSelfRun: false, image: ph('努比亚') },
  { id: 'nb3', title: '努比亚 红魔9 Pro 16GB+256GB 背透游戏旗舰',      price: 3499, isSelfRun: false, image: ph('努比亚') },

  // ── 索尼（3条）──
  { id: 'sy1', title: 'Sony Xperia 1 VI 12GB+256GB 4K影像旗舰',        price: 6999, isSelfRun: false, image: ph('索尼') },
  { id: 'sy2', title: 'Sony Xperia 5 VI 8GB+256GB 专业摄影',           price: 5499, isSelfRun: false, image: ph('索尼') },
  { id: 'sy3', title: 'Sony Xperia 10 VI 6GB+128GB 轻薄长续航',        price: 2999, isSelfRun: false, image: ph('索尼') },

  // ── 传音（3条）──
  { id: 'ty1', title: 'TECNO Phantom X2 Pro 12GB+256GB 伸缩镜头',      price: 2999, isSelfRun: false, image: ph('传音') },
  { id: 'ty2', title: 'Infinix NOTE 40 Pro 12GB+256GB 大屏商务',       price: 1499, isSelfRun: false, image: ph('传音') },
  { id: 'ty3', title: 'itel A70 4GB+128GB 超长续航入门机',             price: 599,  isSelfRun: false, image: ph('传音') },

  // ── 谷歌（3条）──
  { id: 'gg1', title: 'Google Pixel 9 Pro XL 16GB+256GB AI旗舰',       price: 7999, isSelfRun: false, image: ph('谷歌') },
  { id: 'gg2', title: 'Google Pixel 9 12GB+128GB 谷歌AI手机',          price: 5499, isSelfRun: false, image: ph('谷歌') },
  { id: 'gg3', title: 'Google Pixel 8a 8GB+128GB 轻旗舰',              price: 3799, isSelfRun: false, image: ph('谷歌') },

  // ── 其他 ──
  { id: 'ot1', title: '诺基亚经典复刻版 8GB+128GB 情怀备用机',         price: 699,  isSelfRun: false, image: ph('其他') },
]

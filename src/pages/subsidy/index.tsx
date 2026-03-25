import React, { useMemo, useState, useCallback, useRef, useEffect } from 'react'
import { Image, ScrollView, Text, View } from '@tarojs/components'
import { extractBrandFromTitle, phones, BRAND_ORDER } from './mock'
import './index.less'

// ── 筛选项元数据：badge 字段控制"可叠国补"角标，置 null 则不显示 ──
const FILTER_META: Record<string, { label: string; badge: string | null }> = {
  national: { label: '国家补贴', badge: null },
  contract: { label: '京补合约', badge: null },
  tradeIn:  { label: '以旧换新', badge: '可叠国补' },
  billion:  { label: '百亿补贴', badge: null },
}

const FILTER_ORDER: string[] = ['national', 'contract', 'tradeIn', 'billion']

// 单筛选项 → 对应品牌列表（各项数量不同，体现"个数不一致"）
// 多筛选组合的品牌列表由运行时对各单项取交集动态计算，无需写死
const PRESET_BRANDS: Record<string, string[]> = {
  // 国家补贴：全部 16 个品牌
  national:
    ['Apple', 'vivo', '三星', '一加', '小米', 'OPPO', '联想moto', '荣耀', '华为',
     '魅族', '中兴', '努比亚', '索尼', '传音', '谷歌', '其他'],
  // 京补合约：11 个
  contract:
    ['Apple', 'vivo', '三星', '小米', 'OPPO', '荣耀', '华为', '魅族', '中兴', '索尼', '其他'],
  // 以旧换新：9 个
  tradeIn:
    ['Apple', 'vivo', '一加', '小米', 'OPPO', '荣耀', '华为', '努比亚', '其他'],
  // 百亿补贴：7 个（互斥，永远单选）
  billion:
    ['Apple', '小米', 'OPPO', '荣耀', '华为', '魅族', '其他'],
}

const ITEM_HEIGHT = 148
const LIST_HEIGHT = 520

function SubsidyPage() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>(['national'])
  const [selectedBrand, setSelectedBrand]     = useState<string>('Apple')
  const [scrollTop, setScrollTop]             = useState(0)

  // 左侧品牌列滚动条显隐
  const [brandScrolling, setBrandScrolling]   = useState(false)
  const brandTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // 右侧手机列表滚动条显隐
  const [phoneScrolling, setPhoneScrolling]   = useState(false)
  const phoneTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // 滚动列表的唯一 key：品牌或筛选条件变化时强制重置 DOM 滚动位置
  const listKey = useMemo(
    () => `${selectedFilters.join(',')}-${selectedBrand}`,
    [selectedFilters, selectedBrand]
  )

  // 品牌/筛选切换时同步重置虚拟列表 scrollTop
  useEffect(() => {
    setScrollTop(0)
    setPhoneScrolling(false)
  }, [listKey])

  // ── 品牌列表 ──
  // 单筛选：直接查表；多筛选：各单项列表取交集，按 BRAND_ORDER 排序
  const allowedBrands = useMemo(() => {
    if (selectedFilters.length === 0) return BRAND_ORDER.slice()
    if (selectedFilters.length === 1) {
      return PRESET_BRANDS[selectedFilters[0]] ?? BRAND_ORDER.slice()
    }
    const sets = selectedFilters.map(f => new Set(PRESET_BRANDS[f] ?? BRAND_ORDER))
    return BRAND_ORDER.filter(brand => sets.every(s => s.has(brand)))
  }, [selectedFilters])

  const activeBrand = useMemo(
    () => allowedBrands.includes(selectedBrand) ? selectedBrand : (allowedBrands[0] ?? ''),
    [allowedBrands, selectedBrand]
  )

  // ── 当前品牌下的商品 ──
  const filteredPhones = useMemo(
    () => phones.filter(p => extractBrandFromTitle(p.title) === activeBrand),
    [activeBrand]
  )

  // ── 虚拟列表 ──
  const totalHeight  = filteredPhones.length * ITEM_HEIGHT
  const startIdx     = Math.max(0, Math.floor(scrollTop / ITEM_HEIGHT) - 2)
  const endIdx       = Math.min(filteredPhones.length, startIdx + Math.ceil(LIST_HEIGHT / ITEM_HEIGHT) + 4)
  const visibleItems = filteredPhones.slice(startIdx, endIdx)
  const paddingTop   = startIdx * ITEM_HEIGHT

  // ── 激活的标签 ──
  const activeTags = useMemo(
    () => FILTER_ORDER.filter(k => selectedFilters.includes(k)),
    [selectedFilters]
  )

  // ── 右上角动态文案 ──
  const headerDesc = useMemo(() => {
    if (!activeTags.length) return ''
    return `* ${activeTags.map(k => FILTER_META[k].label).join('+')}`
  }, [activeTags])

  // ── 互斥规则 ──
  const toggleFilter = useCallback((key: string) => {
    setSelectedFilters(prev => {
      const has = prev.includes(key)
      if (key === 'billion') return has ? [] : ['billion']

      let next = prev.filter(k => k !== 'billion')
      if (has) {
        next = next.filter(k => k !== key)
      } else {
        if (key === 'contract') next = next.filter(k => k !== 'tradeIn')
        if (key === 'tradeIn')  next = next.filter(k => k !== 'contract')
        next = [...next, key]
      }
      return FILTER_ORDER.filter(k => next.includes(k))
    })
  }, [])

  const handleBrandClick = useCallback((brand: string) => setSelectedBrand(brand), [])

  // 右侧虚拟列表滚动 + 滚动条显隐
  const handlePhoneScroll = useCallback((e: any) => {
    setScrollTop(e.detail?.scrollTop ?? 0)
    setPhoneScrolling(true)
    if (phoneTimer.current) clearTimeout(phoneTimer.current)
    phoneTimer.current = setTimeout(() => setPhoneScrolling(false), 800)
  }, [])

  // 左侧品牌列滚动条显隐
  const handleBrandScroll = useCallback(() => {
    setBrandScrolling(true)
    if (brandTimer.current) clearTimeout(brandTimer.current)
    brandTimer.current = setTimeout(() => setBrandScrolling(false), 800)
  }, [])

  return (
    <View className='sz-page'>
      <View className='sz-card'>

        {/* ── 头部 ── */}
        <View className='sz-header'>
          <Text className='sz-hd-title'>补贴专区</Text>
          <Text className='sz-hd-desc'>{headerDesc}</Text>
        </View>

        {/* ── 筛选栏 ── */}
        <View className='sz-filter-row'>
          {FILTER_ORDER.map(key => {
            const active     = selectedFilters.includes(key)
            const isNational = key === 'national'
            const meta       = FILTER_META[key]

            let chipCls = 'sz-chip'
            if (active)          chipCls += isNational ? ' chip-green' : ' chip-red'
            else if (isNational) chipCls += ' chip-national-off'
            else                 chipCls += ' chip-outline'

            return (
              <View key={key} className={chipCls} onClick={() => toggleFilter(key)}>
                {meta.badge && <Text className='sz-chip-badge'>{meta.badge}</Text>}
                <Text className='sz-chip-label'>{meta.label}</Text>
              </View>
            )
          })}
        </View>

        {/* ── 主体 ── */}
        <View className='sz-body'>

          {/* 左：品牌导航 */}
          <ScrollView
            className={`sz-brands${brandScrolling ? ' is-scrolling' : ''}`}
            scrollY
            onScroll={handleBrandScroll}
          >
            {allowedBrands.map(brand => (
              <View
                key={brand}
                className={`sz-brand-item${brand === activeBrand ? ' brand-active' : ''}`}
                onClick={() => handleBrandClick(brand)}
              >
                <Text className='sz-brand-name'>{brand}</Text>
                {brand === activeBrand && <View className='sz-brand-line' />}
              </View>
            ))}
          </ScrollView>

          {/* 右：商品虚拟列表；key 变化时 DOM 重建，滚动位置归零 */}
          <ScrollView
            key={listKey}
            className={`sz-phones${phoneScrolling ? ' is-scrolling' : ''}`}
            scrollY
            onScroll={handlePhoneScroll}
          >
            <View style={{ height: `${totalHeight}px`, position: 'relative' }}>
              <View style={{ paddingTop: `${paddingTop}px` }}>
                {visibleItems.map(phone => (
                  <View className='sz-phone-card' key={phone.id}>
                    <Image
                      className='sz-phone-img'
                      src={phone.image}
                      mode='aspectFill'
                      lazyLoad
                    />
                    <View className='sz-phone-body'>
                      {/* 标题行 */}
                      <View className='sz-title-row'>
                        {phone.isSelfRun && <Text className='sz-self-tag'>自营</Text>}
                        <Text className='sz-phone-name'>{phone.title}</Text>
                      </View>

                      {/* 标签行 */}
                      {activeTags.length > 0 && (
                        <View className='sz-tags'>
                          {activeTags.map(tag => (
                            <Text
                              key={tag}
                              className={`sz-tag${tag === 'national' ? ' tag-green' : ' tag-red'}`}
                            >
                              {FILTER_META[tag].label}
                            </Text>
                          ))}
                        </View>
                      )}

                      {/* 价格行 */}
                      <View className='sz-price-bar'>
                        <View className='sz-price'>
                          <Text className='sz-yen'>¥</Text>
                          <Text className='sz-price-num'>{phone.price}</Text>
                        </View>
                        <View className='sz-buy-btn'>
                          <Text className='sz-buy-text'>抢</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>

        </View>
      </View>
    </View>
  )
}

export default SubsidyPage

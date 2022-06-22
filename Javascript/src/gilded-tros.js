const BDAWG_KEYCHAIN = 'B-DAWG Keychain'
const GOOD_WINE = 'Good Wine'
const BACKSTAGE_PASS_REFACTOR = 'Backstage passes for Re:Factor'
const BACKSTAGE_PASS_HAXX = 'Backstage passes for HAXX'

const DUPLICATE_CODE = 'Duplicate Code'
const LONG_METHODS = 'Long Methods'
const UGLY_VARIABLE_NAMES = 'Ugly Variable Names'

const BACKSTAGE_PASSES = [BACKSTAGE_PASS_REFACTOR, BACKSTAGE_PASS_HAXX]
const SMELLY_ITEMS = [DUPLICATE_CODE, LONG_METHODS, UGLY_VARIABLE_NAMES]

export class GildedTros {
  constructor(items) {
    this.items = items
  }

  updateQuality() {
    for (let item of this.items) {
      // LEGENDARY ITEMS ARE IMMUTABLE
      if (item.name === BDAWG_KEYCHAIN) {
        continue
      }

      item.sellIn = item.sellIn - 1

      // WINE QUALITY INCREASES
      if (item.name === GOOD_WINE) {
        item.quality += 1

      // BACKSTAGE PASSES QUALITY INCREASE UNTIL OVER
      } else if (BACKSTAGE_PASSES.includes(item.name)) {
        if (item.sellIn < 0) {
          item.quality = 0
        } else if (item.sellIn <= 5) {
          item.quality += 3
        } else if (item.sellIn <= 10) {
          item.quality += 2
        } else {
          item.quality += 1
        }

      // SMELLY ITEMS DECRADE TWICE THE SPEED THAN NORMAL ITEMS
      } else if (SMELLY_ITEMS.includes(item.name)) {
        item.quality -= 2

        if (item.sellIn < 0) {
          item.quality -= 2
        }
      // OTHER ITEMS QUALITY DECREASE NORMAL SPEED
      } else {
        item.quality -= 1

        if (item.sellIn < 0) {
          item.quality -= 1
        }
      }

      // CAP
      if (item.quality > 50) {
        item.quality = 50
      }

      if (item.quality < 0) {
        item.quality = 0
      }
    }
  }
}

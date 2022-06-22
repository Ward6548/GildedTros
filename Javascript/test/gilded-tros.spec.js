import { Item } from '../src/item';
import { GildedTros } from '../src/gilded-tros';

describe('Test the items', () => {
  test('At the end of each day our system lowers both values for every item', () => {
      const ring1 = new Item('Ring of Cleansening Code', 10, 20)
      const ring2 = new Item('Ring of Cleansening Code', 3, 12)
      const elixir1 = new Item('Elixir of the SOLID', 5, 7)
      const elixir2 = new Item('Elixir of the SOLID', 2, 9)

      const app = new GildedTros([ring1, ring2, elixir1, elixir2])

      // 1 days passed
      app.updateQuality()

      expect(ring1.sellIn).toEqual(9)
      expect(ring1.quality).toEqual(19)

      expect(ring2.sellIn).toEqual(2)
      expect(ring2.quality).toEqual(11)

      expect(elixir1.sellIn).toEqual(4)
      expect(elixir1.quality).toEqual(6)

      expect(elixir2.sellIn).toEqual(1)
      expect(elixir2.quality).toEqual(8)

      // 2 days passed
      app.updateQuality()

      expect(ring1.sellIn).toEqual(8)
      expect(ring1.quality).toEqual(18)

      expect(ring2.sellIn).toEqual(1)
      expect(ring2.quality).toEqual(10)

      expect(elixir1.sellIn).toEqual(3)
      expect(elixir1.quality).toEqual(5)

      expect(elixir2.sellIn).toEqual(0)
      expect(elixir2.quality).toEqual(7)
  })

  test('Once the sell by date has passed, Quality degrades twice as fast', () => {
      const ring1 = new Item('Ring of Cleansening Code', 0, 10)
      const ring2 = new Item('Ring of Cleansening Code', 0, 12)
      const elixir1 = new Item('Elixir of the SOLID', -5, 7)
      const elixir2 = new Item('Elixir of the SOLID', -2, 9)

      const app = new GildedTros([ring1, ring2, elixir1, elixir2])

      // 1 days passed
      app.updateQuality()

      expect(ring1.sellIn).toEqual(-1)
      expect(ring1.quality).toEqual(8)

      expect(ring2.sellIn).toEqual(-1)
      expect(ring2.quality).toEqual(10)

      expect(elixir1.sellIn).toEqual(-6)
      expect(elixir1.quality).toEqual(5)

      expect(elixir2.sellIn).toEqual(-3)
      expect(elixir2.quality).toEqual(7)

      // 2 days passed
      app.updateQuality()

      expect(ring1.sellIn).toEqual(-2)
      expect(ring1.quality).toEqual(6)

      expect(ring2.sellIn).toEqual(-2)
      expect(ring2.quality).toEqual(8)

      expect(elixir1.sellIn).toEqual(-7)
      expect(elixir1.quality).toEqual(3)

      expect(elixir2.sellIn).toEqual(-4)
      expect(elixir2.quality).toEqual(5)
  })

  test('The Quality of an item is never negative', () => {
    const ring1 = new Item('Ring of Cleansening Code', 0, 2)
    const ring2 = new Item('Ring of Cleansening Code', 0, 1)
    const elixir1 = new Item('Elixir of the SOLID', -5, 1)
    const elixir2 = new Item('Elixir of the SOLID', -2, 2)

    const app = new GildedTros([ring1, ring2, elixir1, elixir2])

    // 1 days passed
    app.updateQuality()

    expect(ring1.sellIn).toEqual(-1)
    expect(ring1.quality).toEqual(0)

    expect(ring2.sellIn).toEqual(-1)
    expect(ring2.quality).toEqual(0)

    expect(elixir1.sellIn).toEqual(-6)
    expect(elixir1.quality).toEqual(0)

    expect(elixir2.sellIn).toEqual(-3)
    expect(elixir2.quality).toEqual(0)

    // 2 days passed
    app.updateQuality()

    expect(ring1.sellIn).toEqual(-2)
    expect(ring1.quality).toEqual(0)

    expect(ring2.sellIn).toEqual(-2)
    expect(ring2.quality).toEqual(0)

    expect(elixir1.sellIn).toEqual(-7)
    expect(elixir1.quality).toEqual(0)

    expect(elixir2.sellIn).toEqual(-4)
    expect(elixir2.quality).toEqual(0)
  })

  
  test('"Good Wine" actually increases in Quality the older it gets', () => {
    const goodWine1 = new Item('Good Wine', 4, 20)
    const goodWine2 = new Item('Good Wine', 0, 2)

    const app = new GildedTros([goodWine1, goodWine2])

    // 1 days passed
    app.updateQuality()

    expect(goodWine1.sellIn).toEqual(3)
    expect(goodWine1.quality).toEqual(21)

    expect(goodWine2.sellIn).toEqual(-1)
    expect(goodWine2.quality).toEqual(3)
  })

  test('The Quality of an item is never more than 50', () => {
    const goodWine1 = new Item('Good Wine', 4, 50)
    const goodWine2 = new Item('Good Wine', 0, 49)

    const app = new GildedTros([goodWine1, goodWine2])

    // 1 days passed
    app.updateQuality()
    expect(goodWine1.quality).toEqual(50)
    expect(goodWine2.quality).toEqual(50)

    // 2 days passed
    app.updateQuality()
    expect(goodWine1.quality).toEqual(50)
    expect(goodWine2.quality).toEqual(50)
  })

  test('"B-DAWG Keychain", being a legendary item, never has to be sold or decreases in Quality. Legendary items always have Quality 80', () => {
    const keychain1 = new Item('B-DAWG Keychain', 10, 80)

    const app = new GildedTros([keychain1])

    // 1 days passed
    app.updateQuality()
    expect(keychain1.sellIn).toEqual(10)
    expect(keychain1.quality).toEqual(80)
    
    // 4 days passed
    app.updateQuality()
    app.updateQuality()
    app.updateQuality()

    expect(keychain1.sellIn).toEqual(10)
    expect(keychain1.quality).toEqual(80)
  })

  test(`
    "Backstage passes" for very interesting conferences increases in Quality as its SellIn value approaches;
      Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but
      Quality drops to 0 after the conference
  `, () => {
    const backStagePass1 = new Item('Backstage passes for Re:Factor', 12, 40)
    const backStagePass2 = new Item('Backstage passes for HAXX', 7, 30)
    const backStagePass3 = new Item('Backstage passes for HAXX', 4, 30)

    const app = new GildedTros([backStagePass1, backStagePass2, backStagePass3])

    // 2 days passed
    app.updateQuality()
    app.updateQuality()

    expect(backStagePass1.quality).toEqual(43)
    expect(backStagePass2.quality).toEqual(35)
    expect(backStagePass3.quality).toEqual(36)

    // 4 days passed
    app.updateQuality()
    app.updateQuality()

    expect(backStagePass1.quality).toEqual(47)
    expect(backStagePass2.quality).toEqual(41)
    expect(backStagePass3.quality).toEqual(42)
    
    // 6 days passed
    app.updateQuality()
    app.updateQuality()

    expect(backStagePass1.quality).toEqual(50)
    expect(backStagePass2.quality).toEqual(47)
    expect(backStagePass3.quality).toEqual(0)
  })
})

import { expect, test, describe } from 'vitest'
import { faker } from '@faker-js/faker'
import { MasonryMatrixFactory } from '../MasonryMatrixFactory'

describe('MasonryMatrix test', () => {
  const ITEMS_LENGTH = 100

  const widths = faker.helpers.uniqueArray(() => faker.number.int({ min: 100, max: 4000 }), ITEMS_LENGTH)
  const heights = faker.helpers.uniqueArray(() => faker.number.int({ min: 100, max: 4000 }), ITEMS_LENGTH)

  const sizes = widths.map((width, id) => ({
    id,
    width,
    height: heights[id],
    data: {
      image: faker.image.dataUri()
    }
  }))

  const matrixFactory = new MasonryMatrixFactory()

  const matrix = matrixFactory.create(sizes, { columnSize: 200, columnCount: 6 })

  test('MasonryMatrix normal length', () => {
    expect(matrix.length).toBe(ITEMS_LENGTH)
  })
})

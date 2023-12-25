import { expect, test, describe } from 'vitest'
import { faker } from '@faker-js/faker'
import { MasonryMatrixFactory } from '../MasonryMatrixFactory'

describe('MasonryMatrix test', () => {
  const widths = faker.helpers.uniqueArray(() => faker.number.int({ min: 100, max: 4000 }), 100)
  const heights = faker.helpers.uniqueArray(() => faker.number.int({ min: 100, max: 4000 }), 100)

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

  console.log(matrix.matrix[0][0].data?.data.image)
})

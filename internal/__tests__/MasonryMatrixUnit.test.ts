import { expect, test, describe } from 'vitest'
import { MasonryMatrixUnit } from '../MasonryMatrixUnit'
import { faker } from '@faker-js/faker'
import { getImageRatio } from '../../utils/get-image-ratio'
import { floor } from 'lodash-es'

describe('MasonryMatrixUnit test', () => {
  const widths = faker.helpers.uniqueArray(() => faker.number.int({ min: 100, max: 4000 }), 100)
  const heights = faker.helpers.uniqueArray(() => faker.number.int({ min: 100, max: 4000 }), 100)
  const columnSizes = faker.helpers.uniqueArray(() => faker.number.int({ min: 10, max: 500 }), 100)

  const sizes = widths.map((width, i) => ({
    width,
    height: heights[i],
    columnSize: columnSizes[i],
    realHeight: floor(getImageRatio({ width, height: heights[i] }) * columnSizes[i])
  }))

  test.each(sizes)(
    'MasonryUnit with $width and $height, and $columnSize column size, should have real height of $realHeight',
    ({ realHeight, width, height, columnSize }) => {
      const masonryUnit = new MasonryMatrixUnit(faker.number.int(), width, height, columnSize)

      expect(masonryUnit.height).toBe(realHeight)
    }
  )
})

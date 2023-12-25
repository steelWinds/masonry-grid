import { isNil } from 'lodash-es'
import { MasonryMatrixUnit, type IMasonryMatrixUnit } from './MasonryMatrixUnit'
import { MasonryMatrix, type IMasonryMatrix } from './MasonryMatrix'

type TMasonryMatrixUnits<T> = Array<Array<IMasonryMatrixUnit<T>>>

export interface IMasonryMatrixFactoryOptions {
  columnSize: number
  columnCount: number
  columnsHeights?: number[]
}

export interface IMasonryMatrixFactory {
  create: <T extends ISizeUnit>(units: T[], options: IMasonryMatrixFactoryOptions) => IMasonryMatrix<T>
}

export class MasonryMatrixFactory implements IMasonryMatrixFactory {
  #convertToMasonryUnits <T extends ISizeUnit>(units: T[], columnSize: number): Array<IMasonryMatrixUnit<T>> {
    return units.map((unit, id) => new MasonryMatrixUnit(id, unit.width, unit.height, columnSize, unit))
  }

  create <T extends ISizeUnit>(units: T[], options: IMasonryMatrixFactoryOptions): IMasonryMatrix<T> {
    if (!isNil(options.columnsHeights) && options.columnsHeights.length !== units.length) throw new Error('Invalid number of columns sizes')

    const columnsHeights = options.columnsHeights ?? Array.from({ length: options.columnCount }, () => 0)

    const matrix: TMasonryMatrixUnits<T> = Array.from({ length: options.columnCount }, () => [])

    for (const item of this.#convertToMasonryUnits(units, options.columnSize)) {
      let shortest = 0

      for (let i = 1; i < options.columnCount; ++i) {
        if (columnsHeights[i] < columnsHeights[shortest]) {
          shortest = i
        }
      }

      columnsHeights[shortest] += item.height
      matrix[shortest].push(item)
    }

    return new MasonryMatrix(matrix, { columnsHeights })
  }
}

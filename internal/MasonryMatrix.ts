import { type IMasonryMatrixUnit } from './MasonryMatrixUnit'

export interface IMasonryMatrixMeta {
  columnsHeights: number[]
}

export interface IMasonryMatrix<T> {
  meta: IMasonryMatrixMeta
  matrix: Array<Array<IMasonryMatrixUnit<T>>>
  length: number
}

export class MasonryMatrix<T> implements IMasonryMatrix<T> {
  readonly #matrix: Array<Array<IMasonryMatrixUnit<T>>>
  readonly #meta: IMasonryMatrixMeta

  constructor (matrix: Array<Array<IMasonryMatrixUnit<T>>>, meta: IMasonryMatrixMeta) {
    this.#matrix = matrix
    this.#meta = meta
  }

  get matrix (): Array<Array<IMasonryMatrixUnit<T>>> {
    return this.#matrix
  }

  get meta (): IMasonryMatrixMeta {
    return this.#meta
  }

  get length (): number {
    return this.#matrix.flat().length
  }
}

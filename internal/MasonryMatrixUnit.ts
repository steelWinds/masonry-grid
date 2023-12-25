import { floor } from 'lodash-es'
import { getImageRatio } from '../utils/get-image-ratio'

export interface IMasonryMatrixUnit<T> {
  id: number | string
  width: number
  height: number
  data?: T
}

export class MasonryMatrixUnit<T> implements IMasonryMatrixUnit<T> {
  readonly #id: number | string

  public width: number
  public height: number
  public data?: T

  constructor (id: string | number, rawWidth: number, rawHeight: number, columnSize: number, data?: T) {
    this.#id = id
    this.width = columnSize

    this.data = data

    const ratio = getImageRatio({ width: rawWidth, height: rawHeight })

    this.height = floor(ratio * columnSize)
  }

  get id (): number | string {
    return this.#id
  }
}

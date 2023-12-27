import { type IMasonryMatrix } from '../internal/MasonryMatrix'

export interface MasonryGrid<T> {
  add: () => void
  update: () => void
  matrix: IMasonryMatrix<T>
}

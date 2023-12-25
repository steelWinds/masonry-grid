import gcd from 'compute-gcd'

interface IGetImageRatioOptions {
  width: number
  height: number
}

export const getImageRatio = (options: IGetImageRatioOptions): number => {
  const { width, height } = options

  const gcdSize = gcd(width, height)

  return (height / gcdSize) / (width / gcdSize)
}

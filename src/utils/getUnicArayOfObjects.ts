/* eslint-disable no-unused-vars */
type TReturn = (array: unknown[], toUnicKey: string) => unknown[]

export const getUnicArayOfObjects: TReturn = (array,toUnicKey) => {
  return [...new Map(array.map(item => [item[toUnicKey], item])).values()]
}

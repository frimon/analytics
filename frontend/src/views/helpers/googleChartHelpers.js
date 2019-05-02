
// eslint-disable-next-line import/prefer-default-export
export const transformData = (data, axisInformation = { type: '', label: '' }, lineNames = ['']) => {
  const transformRow = ([date, value]) => [new Date(date), value]

  const dataHeader = [
    axisInformation, ...lineNames,
  ]

  return [dataHeader, ...data.map(transformRow)]
}

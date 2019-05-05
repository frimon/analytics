const actionPrefix = '@@INDEX'

function buildType(subType) {
  return `${actionPrefix}/${subType}`
}

export function increaseCount() {
  return {
    type: buildType('increaseCount'),
  }
}

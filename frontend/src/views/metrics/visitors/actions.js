const actionPrefix = '@@VISITORS'

function buildType(subType) {
  return `${actionPrefix}/${subType}`
}

export function setData(data) {
  return {
    type: buildType('setData'),
    data,
  }
}

export function setCount(count) {
  return {
    type: buildType('setCount'),
    count,
  }
}

export function fetchData(from, to, unit) {
  return async (dispatch) => {
    const response = await fetch(`/api/statistics/visitors?from=${from}&to=${to}&unit=${unit}`)

    const json = await response.json()

    dispatch(setData(json.data))
  }
}

export function fetchCount(from, to) {
  return async (dispatch) => {
    const response = await fetch(`/api/count/visitors?from=${from}&to=${to}`)

    const json = await response.json()

    dispatch(setCount(json.data))
  }
}

import { setError } from '../../actions'

const actionPrefix = '@@PAGEVIEWS'

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
    const response = await fetch(`/api/page-views/timeseries?from=${from}&to=${to}&unit=${unit}`)

    if (response.status !== 200) {
      return dispatch(setError({
        errorTitle: 'Something went wrong...',
        errorMessage: 'Unable to get data from the server. Please make sure that all services are running.',
      }))
    }

    const json = await response.json()

    return dispatch(setData(json.data))
  }
}

export function fetchCount(from, to) {
  return async (dispatch) => {
    const response = await fetch(`/api/page-views/numeric/total?from=${from}&to=${to}`)

    if (response.status !== 200) {
      return dispatch(setError({
        errorTitle: 'Something went wrong...',
        errorMessage: 'Unable to get data from the server. Please make sure that all services are running.',
      }))
    }

    const json = await response.json()

    return dispatch(setCount(json.data))
  }
}

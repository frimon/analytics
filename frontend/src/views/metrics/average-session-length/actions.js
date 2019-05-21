import { setError } from '../../actions'

const actionPrefix = '@@AVERAGE_SESSION_LENGTH'

function buildType(subType) {
  return `${actionPrefix}/${subType}`
}

export function setData(data) {
  return {
    type: buildType('setData'),
    data,
  }
}

export function setAverage(count) {
  return {
    type: buildType('setAverage'),
    count,
  }
}

export function fetchData(from, to, unit) {
  return async (dispatch) => {
    const response = await fetch(`/api/statistics/session-length?from=${from}&to=${to}&unit=${unit}`)

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
    const response = await fetch(`/api/count/session-length?from=${from}&to=${to}`)

    if (response.status !== 200) {
      return dispatch(setError({
        errorTitle: 'Something went wrong...',
        errorMessage: 'Unable to get data from the server. Please make sure that all services are running.',
      }))
    }

    const json = await response.json()

    return dispatch(setAverage(json.data))
  }
}

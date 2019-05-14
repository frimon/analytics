import { setError } from '../../actions'

const actionPrefix = '@@EVENTS'

function buildType(subType) {
  return `${actionPrefix}/${subType}`
}

export function setEventsList(events) {
  return {
    type: buildType('setEventsList'),
    data: {
      events,
    },
  }
}

export function setData(eventName, data) {
  return {
    type: buildType('setData'),
    data: {
      name: eventName,
      data,
    },
  }
}

export function fetchEventList() {
  return async (dispatch) => {
    const response = await fetch('/api/events')

    if (response.status !== 200) {
      return dispatch(setError({
        errorTitle: 'Something went wrong...',
        errorMessage: 'Unable to get data from the server. Please make sure that all services are running.',
      }))
    }

    const json = await response.json()

    return dispatch(setEventsList(json.data))
  }
}

export function fetchData(from, to, unit, eventName) {
  return async (dispatch) => {
    const response = await fetch(`/api/statistics/events/${eventName}?from=${from}&to=${to}&unit=${unit}`)

    if (response.status !== 200) {
      return dispatch(setError({
        errorTitle: 'Something went wrong...',
        errorMessage: 'Unable to get data from the server. Please make sure that all services are running.',
      }))
    }

    const json = await response.json()


    return dispatch(setData(eventName, json.data))
  }
}

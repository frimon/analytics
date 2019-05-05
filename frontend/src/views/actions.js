// import { parseResponse } from './utils/parseResponse'

const actionPrefix = '@@GLOBAL'

function buildType(subType) {
  return `${actionPrefix}/${subType}`
}

/*
export function loadConfig(setIsLoading) {
  return async (dispatch) => {
    if (setIsLoading) {
      dispatch(setLoadingState(true))
    }

    const { data: config } = await parseResponse(await fetch('/api/config'))
    dispatch(setConfig(config))

    if (setIsLoading) {
      dispatch(setLoadingState(false))
    }
  }
}
*/

export function setFromDate(fromDate) {
  return {
    type: buildType('setFromDate'),
    fromDate,
  }
}

export function setToDate(toDate) {
  return {
    type: buildType('setToDate'),
    toDate,
  }
}

export function setConfig(config) {
  return {
    type: buildType('setConfig'),
    config,
  }
}

export function setLoadingState(isLoading) {
  return {
    type: buildType('setLoadingState'),
    isLoading,
  }
}

export function setError(errorMessage) {
  return {
    type: buildType('setError'),
    errorMessage,
  }
}

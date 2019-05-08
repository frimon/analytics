import moment from 'moment'

const actionPrefix = '@@GLOBAL'

function buildType(subType) {
  return `${actionPrefix}/${subType}`
}

export function setFromDate(fromDate) {
  return {
    type: buildType('setFromDate'),
    fromDate: moment(fromDate).startOf('day').format('YYYY-MM-DD HH:mm:ss'),
  }
}

export function setToDate(toDate) {
  return {
    type: buildType('setToDate'),
    toDate: moment(toDate).endOf('day').format('YYYY-MM-DD HH:mm:ss'),
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

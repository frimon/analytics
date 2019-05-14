import Immutable from 'immutable'
import moment from 'moment'

const actionPrefix = '@@GLOBAL'
const initialState = Immutable.fromJS({
  fromDate: moment().subtract(7, 'days').startOf('day').format('YYYY-MM-DD HH:mm:ss'),
  toDate: moment().endOf('day').format('YYYY-MM-DD HH:mm:ss'),
  unit: 'day',
  errorMessage: undefined,
})

export default (state = initialState, action) => {
  if (!action.type.startsWith(actionPrefix)) {
    return state
  }

  const type = action.type.substring(actionPrefix.length + 1)

  switch (type) {
    case 'setConfig':
      return state.set('config', Immutable.fromJS(action.config))

    case 'setLoadingState':
      return state.set('isLoading', action.isLoading)

    case 'setError': {
      return state.set('error', action.error)
    }

    case 'setFromDate': {
      return state.set('fromDate', action.fromDate)
    }

    case 'setToDate': {
      return state.set('toDate', action.toDate)
    }

    case 'setUnit': {
      return state.set('unit', action.unit)
    }

    default:
      return state
  }
}

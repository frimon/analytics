import Immutable from 'immutable'
import moment from 'moment'

const actionPrefix = '@@GLOBAL'
const initialState = Immutable.fromJS({
  fromDate: moment().format('YYYY-MM-DD'),
  toDate: moment().add(30, 'days').format('YYYY-MM-DD'),
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
      return state.set('errorMessage', action.errorMessage)
    }

    case 'setFromDate': {
      return state.set('fromDate', action.fromDate)
    }

    case 'setToDate': {
      return state.set('toDate', action.toDate)
    }

    default:
      return state
  }
}

import Immutable from 'immutable'

const actionPrefix = '@@GLOBAL'
const initialState = Immutable.fromJS({})

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

    default:
      return state
  }
}

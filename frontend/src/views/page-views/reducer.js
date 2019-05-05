import Immutable from 'immutable'

const actionPrefix = '@@PAGEVIEWS'
const initialState = Immutable.fromJS({
  data: [],
})

export default (state = initialState, action) => {
  if (!action.type.startsWith(actionPrefix)) {
    return state
  }

  const type = action.type.substring(actionPrefix.length + 1)

  switch (type) {
    case 'setData': {
      return state.set('data', Immutable.fromJS(action.data))
    }

    default:
      return state
  }
}

import Immutable from 'immutable'

const actionPrefix = '@@PAGEVIEWS'
const initialState = Immutable.fromJS({
  data: [],
  count: 0,
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

    case 'setCount': {
      return state.set('count', Immutable.fromJS(action.count))
    }

    default:
      return state
  }
}

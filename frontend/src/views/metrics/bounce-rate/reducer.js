import Immutable from 'immutable'

const actionPrefix = '@@BOUNCE_RATE'
const initialState = Immutable.fromJS({
  data: [],
  average: 0,
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

    case 'setAverage': {
      return state.set('average', Immutable.fromJS(action.count))
    }

    default:
      return state
  }
}

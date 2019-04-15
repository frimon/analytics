import Immutable from 'immutable'

const actionPrefix = '@@INDEX'
const initialState = Immutable.fromJS({
  count: 0,
})

export default (state = initialState, action) => {
  if (!action.type.startsWith(actionPrefix)) {
    return state
  }

  const type = action.type.substring(actionPrefix.length + 1)

  switch (type) {
    case 'increaseCount': {
      return state.update('count', value => value + 1)
    }

    default:
      return state
  }
}

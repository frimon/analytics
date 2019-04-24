import Immutable from 'immutable'

const actionPrefix = '@@VISITORS'
const initialState = Immutable.fromJS({
  data: [
    [{ type: 'date', label: 'Day' }, 'x', 'dogs'],
    [0, 0],
  ],
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

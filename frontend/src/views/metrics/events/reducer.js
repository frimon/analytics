import Immutable from 'immutable'

const actionPrefix = '@@EVENTS'
const initialState = Immutable.fromJS({
})

export default (state = initialState, action) => {
  if (!action.type.startsWith(actionPrefix)) {
    return state
  }

  const type = action.type.substring(actionPrefix.length + 1)

  switch (type) {
    case 'setData': {
      return state.set(action.data.name, Immutable.fromJS(action.data.data))
    }

    case 'setEventsList': {
      if (action.data.events.length === 0) {
        return state
      }

      const object = {}
      action.data.events.forEach(({ name }) => { (object[name] = []) })

      return state.merge(object)
    }

    default:
      return state
  }
}

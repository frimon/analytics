const actionPrefix = '@@EVENTS'

function buildType(subType) {
  return `${actionPrefix}/${subType}`
}

export function setEventsList(events) {
  return {
    type: buildType('setEventsList'),
    data: {
      events,
    },
  }
}

export function setData(data, eventName) {
  return {
    type: buildType('setData'),
    data: {
      name: eventName,
      data,
    },
  }
}

export function fetchEventList() {
  return async (dispatch) => {
    const events = [
      'purchase',
      'newsletter_signup',
      'play',
    ] // await fetch(`/api/statistics/visitors?unique=true&from=2019-01-01%2000%3A00%3A00&to=2019-01-31%2023%3A59%3A59&unit=day&format=graph`)

    dispatch(setEventsList(events))
  }
}


export function fetchData(from, to, eventName) {
  return async (dispatch) => {
    const data = [
      ['2019-01-01', Math.floor(Math.random() * 20)],
      ['2019-01-02', Math.floor(Math.random() * 20)],
      ['2019-01-03', Math.floor(Math.random() * 20)],
      ['2019-01-04', Math.floor(Math.random() * 20)],
      ['2019-01-05', Math.floor(Math.random() * 20)],
      ['2019-01-06', Math.floor(Math.random() * 20)],
      ['2019-01-07', Math.floor(Math.random() * 20)],
      ['2019-01-08', Math.floor(Math.random() * 20)],
      ['2019-01-09', Math.floor(Math.random() * 20)],
      ['2019-01-10', Math.floor(Math.random() * 20)],
      ['2019-01-11', Math.floor(Math.random() * 20)],
      ['2019-01-12', Math.floor(Math.random() * 20)],
      ['2019-01-13', Math.floor(Math.random() * 20)],
      ['2019-01-14', Math.floor(Math.random() * 20)],
    ] // await fetch(`/api/statistics/visitors?unique=true&from=2019-01-01%2000%3A00%3A00&to=2019-01-31%2023%3A59%3A59&unit=day&format=graph`)

    dispatch(setData(data, eventName))
  }
}

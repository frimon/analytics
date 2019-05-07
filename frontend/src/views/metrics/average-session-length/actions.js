const actionPrefix = '@@AVERAGE_SESSION_LENGTH'

function buildType(subType) {
  return `${actionPrefix}/${subType}`
}

export function setData(data) {
  return {
    type: buildType('setData'),
    data,
  }
}

export function fetchData(from, to) {
  return async (dispatch) => {
    const data = [
      ['2019-01-01', 50],
      ['2019-01-02', 35],
      ['2019-01-03', 36],
      ['2019-01-04', 15],
      ['2019-01-05', 22],
      ['2019-01-06', 30],
      ['2019-01-07', 10],
      ['2019-01-08', 19],
      ['2019-01-09', 32],
      ['2019-01-10', 56],
      ['2019-01-11', 82],
      ['2019-01-12', 17],
      ['2019-01-13', 47],
      ['2019-01-14', 23],
    ] // await fetch(`/api/statistics/visitors?unique=true&from=2019-01-01%2000%3A00%3A00&to=2019-01-31%2023%3A59%3A59&unit=day&format=graph`)

    dispatch(setData(data))
  }
}

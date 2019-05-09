const actionPrefix = '@@PAGEVIEWS'

function buildType(subType) {
  return `${actionPrefix}/${subType}`
}

export function setData(data) {
  return {
    type: buildType('setData'),
    data,
  }
}

export function fetchData(from, to, unit) {
  return async (dispatch) => {
    const data = [
      ['2019-01-01', 6],
      ['2019-01-02', 5],
      ['2019-01-03', 12],
      ['2019-01-04', 20],
      ['2019-01-05', 5],
      ['2019-01-06', 8],
      ['2019-01-07', 6],
      ['2019-01-08', 5],
      ['2019-01-09', 12],
      ['2019-01-10', 10],
      ['2019-01-11', 40],
      ['2019-01-12', 8],
      ['2019-01-13', 4],
      ['2019-01-14', 32],
    ] // await fetch(`/api/statistics/visitors?unique=true&from=2019-01-01%2000%3A00%3A00&to=2019-01-31%2023%3A59%3A59&unit=day&format=graph`)

    dispatch(setData(data))
  }
}

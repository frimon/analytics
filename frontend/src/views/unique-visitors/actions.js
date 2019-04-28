const actionPrefix = '@@UNIQUE_VISITORS'

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
      ['2019-01-01', 2],
      ['2019-01-02', 1],
      ['2019-01-03', 3],
      ['2019-01-04', 4],
      ['2019-01-05', 1],
      ['2019-01-06', 2],
      ['2019-01-07', 6],
      ['2019-01-08', 3],
      ['2019-01-09', 4],
      ['2019-01-10', 5],
      ['2019-01-11', 10],
      ['2019-01-12', 5],
      ['2019-01-13', 1],
      ['2019-01-14', 12],
    ] // await fetch(`/api/statistics/visitors?unique=true&from=2019-01-01%2000%3A00%3A00&to=2019-01-31%2023%3A59%3A59&unit=day&format=graph`)

    dispatch(setData(data))
  }
}

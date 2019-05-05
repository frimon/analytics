const actionPrefix = '@@VISITORS'

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
      ['2019-01-01', 5],
      ['2019-01-02', 2],
      ['2019-01-03', 8],
      ['2019-01-04', 16],
      ['2019-01-05', 3],
      ['2019-01-06', 2],
      ['2019-01-07', 8],
      ['2019-01-08', 12],
      ['2019-01-09', 8],
      ['2019-01-10', 12],
      ['2019-01-11', 13],
      ['2019-01-12', 5],
      ['2019-01-13', 1],
      ['2019-01-14', 17],
    ] // await fetch(`/api/statistics/visitors?unique=true&from=2019-01-01%2000%3A00%3A00&to=2019-01-31%2023%3A59%3A59&unit=day&format=graph`)

    dispatch(setData(data))
  }
}

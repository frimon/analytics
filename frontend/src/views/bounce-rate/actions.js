const actionPrefix = '@@BOUNCE_RATE'

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
      ['2019-01-01', 0.12],
      ['2019-01-02', 0.22],
      ['2019-01-03', 0.35],
      ['2019-01-04', 0.12],
      ['2019-01-05', 0.19],
      ['2019-01-06', 0.27],
      ['2019-01-07', 0.46],
      ['2019-01-08', 0.34],
      ['2019-01-09', 0.33],
      ['2019-01-10', 0.13],
      ['2019-01-11', 0.25],
      ['2019-01-12', 0.27],
      ['2019-01-13', 0.31],
      ['2019-01-14', 0.32],
    ] // await fetch(`/api/statistics/visitors?unique=true&from=2019-01-01%2000%3A00%3A00&to=2019-01-31%2023%3A59%3A59&unit=day&format=graph`)

    const dataToPercent = data
      .map(([date, value]) => [date, value * 100])

    dispatch(setData(dataToPercent))
  }
}

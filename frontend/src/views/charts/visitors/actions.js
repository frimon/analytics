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
      // ['x', 'dogs'],
      [{ type: 'date', label: 'Day' }, 'dogs'],
      [new Date(2014, 0, 0), 0],
      [new Date(2014, 0, 1), 10],
      [new Date(2014, 0, 2), 23],
      [new Date(2014, 0, 3), 17],
      // [0, 0],
      // [1, 10],
      // [2, 23],
      // [3, 17],
      // [4, 18],
      // [5, 9],
      // [6, 11],
      // [7, 27],
      // [8, 33],
      // [9, 40],
      // [10, 32],
      // [11, 35],
    ] // await fetch(`/api/visitors?from=${from}&to=${to}`)

    dispatch(setData(data))
  }
}

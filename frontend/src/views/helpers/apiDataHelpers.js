
// eslint-disable-next-line import/prefer-default-export
export const sumRows = rows => rows.reduce(
  (currentSum, row) => {
    const [_date, value] = row // eslint-disable-line no-unused-vars

    return currentSum + value
  },
  0,
)

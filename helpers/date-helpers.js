const getCurrentSevenDays = () => {
  const currentSevenDates = {}
  for (let i = 0; i < 7; i++) {
    const date = new Date()
    date.setDate(date.getDate() + i)
    currentSevenDates[new Date(date).getDay()] = new Date(date).setHours(0, 0, 0, 0)
  }
  return currentSevenDates
}

const getReviewCreatedDate = review => {
  return `${review.createdAt.getFullYear()}-${review.createdAt.getMonth() + 1}-${review.createdAt.getDate()}`
}

module.exports = {
  getCurrentSevenDays,
  getReviewCreatedDate
}

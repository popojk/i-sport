interface Dates {
  [index: number]: number;
}

export function getCurrentSevenDaysAndDates(){
  const currentSevenDaysAndDates: Dates = {};
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    currentSevenDaysAndDates[new Date(date).getDay()] = new Date(date).setHours(0, 0, 0, 0);
  }
  return currentSevenDaysAndDates;
}

export function getCurrentSevenDays() {
  const currentSevenDays: number[] = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    currentSevenDays.push(new Date(date).setHours(0, 0, 0, 0));
  }
  return currentSevenDays;
}

export function getReviewCreatedDate (review: any) {
  return `${review.createdAt.getFullYear()}-${review.createdAt.getMonth() + 1}-${review.createdAt.getDate()}`;
}


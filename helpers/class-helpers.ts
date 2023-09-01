import { ClassInstance, ClassScheduleInstance } from "../interfaces/class-interface";

export function classDataHelper(classes: ClassInstance[]) {
  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
  return classes.map(element => {
    const data = {
      ...element,
      isClosed: new Date().getTime() > element!.startDateTime!.getTime()
    };
    data.date = `${element.date.getFullYear()}-${element.date.getMonth() + 1}-${element.date.getDate()}`;
    data.isReserved = data.isReserved === 1;
    data.weekDay = weekDays[data.weekDay];
    delete data.startDateTime;
    delete data.classScheduleId;
    return data;
  });
}

interface Dates {
  [index: number]: number;
}

export function getCurrentSevenDays(){
  const currentSevenDates: Dates = {};
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    currentSevenDates[new Date(date).getDay()] = new Date(date).setHours(0, 0, 0, 0);
  }
  return currentSevenDates;
}

export function buildClassData(schedule: ClassScheduleInstance, currentSevenDates: any){
  const { startTime, weekDay, storeId, id } = schedule;
  const [hh, mm] = startTime!.split(':');
  const date = currentSevenDates[weekDay!];
  const startDateTime = new Date(date).setHours(Number(hh), Number(mm), 0);
  return {
    date,
    startDateTime,
    storeId,
    classScheduleId: id
  };
}


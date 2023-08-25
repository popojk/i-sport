import { ReservationClass, ReservationInstance } from "../interfaces/user-interface";

export function reservationHelper(reservation: ReservationInstance) {
  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
  const data: ReservationClass = reservation.dataValues.Class;
  data.reservationId = reservation.dataValues.id;
  data.date = `${data.date.getFullYear()}-${data.date.getMonth() + 1}-${data.date.getDate()}`;
  data.weekDay = weekDays[data.weekDay];
  return data;
}
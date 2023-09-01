const { Reservation, UserPlan } = require('../models');
import { Request } from "express";
import { ReservationInstance } from "../interfaces/reservation-interface";
import { UserPlanInstance } from "../interfaces/user-interface";

export default class ReservationServices {
  public deleteReservation = (
    req: Request,
    cb: (err: any, data?: string) => void) => {
    return Reservation.findByPk(req.params.reservation_id)
      .then((reservation: ReservationInstance) => {
        if (!reservation) throw Error('預約不存在');
        return UserPlan.findOne({
          where: { id: reservation.userPlanId }
        })
          .then((userPlan: UserPlanInstance) => {
            reservation.destroy();
            if (userPlan.dataValues.amountLeft) {
              return userPlan.update({
                amountLeft: userPlan.dataValues.amountLeft + 1
              });
            }
          })
          .then(() => {
            return cb(null, '刪除成功');
          })
          .catch((err: any) => cb(err));
      })
      .catch((err: any) => cb(err));
  }
}

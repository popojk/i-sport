import ReservationServices from "../../services/reservation-services";
import { Request, Response, NextFunction } from "express";

export default class ReservationController {

  private reservationServices = new ReservationServices();

  public deleteReservation = (req: Request, res: Response, next: NextFunction) => {
    this.reservationServices.deleteReservation(req, (err: any, data?: string) => err ? next(err) : res.json(data));
  }
}

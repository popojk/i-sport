import { RouteBase } from "../../../bases/route.base";
import ReservationController from '../../../controllers/apis/reservation-controller';

export class ReservationRoute extends RouteBase {

  private reservationController: ReservationController;

  constructor() {
    super();
    this.reservationController = new ReservationController();
    this.registerRoute();
  }

  protected registerRoute(): void {
    this.router.delete('/:reservation_id', this.reservationController.deleteReservation);
  }

}

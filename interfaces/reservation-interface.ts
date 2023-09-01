import { Model } from "sequelize";

export interface ReservationInstance extends Model {
  id: number;
  userId: number;
  classId: number;
  userPlanId: number;
  remark: string;
}
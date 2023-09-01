import { StoreInstance } from "./store-interface";
import { Model } from "sequelize";

export interface ClassInstance {
  id: number;
  date: any;
  startDateTime?: Date;
  classScheduleId?: number;
  storeName: string;
  startTime: string;
  endTime: string;
  weekDay: any;
  isReserved: any;
}

export interface ClassScheduleInstance extends Model {
  id?: number;
  weekDay?: number;
  className?: string;
  startTime?: string;
  endTime?: string;
  headcount?: number;
  storeId?: number;
  Store?: StoreInstance;
}
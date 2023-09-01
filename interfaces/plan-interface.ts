import { Model } from "sequelize";
import { StoreInstance } from "./store-interface";

export interface PlanInstance extends Model {
  id: number;
  planName: string;
  price: number;
  planType: string;
  planAmount: number;
  Store?: StoreInstance;
}
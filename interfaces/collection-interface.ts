import { Model } from "sequelize";

export interface CollectionInstance extends Model {
  id: number;
  userId: number;
  storeId: number;
}
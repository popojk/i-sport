import { Model } from "sequelize";

export interface StoreInstance extends Model {
  id: number;
  storeName: string;
  photo: string;
  address: string;
  introduction: string;
  lat: number;
  lng: number;
  reviewCounts: number;
  rating: number;
  isLiked?: any;
}
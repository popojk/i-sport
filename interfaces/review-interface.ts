import { StoreInstance } from "./store-interface";

export interface ReviewInstance {
  id: number;
  createdAt: any;
  rating: number;
  content: string;
  avatar: string;
  nickname: string;
  Store?: StoreInstance;
}
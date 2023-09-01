import { Model } from "sequelize";

export interface UserAttributes {
  id: number;
  email: string;
  password?: string;
  avatar?: string;
  nickname?: string;
  role: string;
  storeName?: string;
}

export interface UserInstance {
  dataValues: UserAttributes;
}

export interface UserPlanInstance extends Model {
  dataValues: {
    id: string;
    amountLeft: number;
    expireDate: Date;
    planName: string;
    planType: string;
    StoreName: string;
  };
}

export interface StoreWithUserPlanInstance {
  storeId: number;
  storeName: string;
  UserPlans: UserPlanInstance[];
}

export interface CollectionInstance {
    id: number;
    userId: number;
    storeId: number;
    Store: {
      id: number;
      storeName: string;
      photo: string;
      address: string;
      introduction: string;
      reviewCounts: number;
      rating: number;
      isLiked: any;
    };
}

export interface ReservationInstance {
    id: number;
    userId: number;
    classId: number;
    userPlanId: number;
    remark: string;
    Class: ReservationClass;
}

export interface ReservationClass {
  storeId: number;
  storeName: string;
  className: string;
  startTime: string;
  endTime: string;
  weekDay: any;
  reservationId: number;
  date: any;
}

export interface SignInData {
  token: string;
  userId: number;
  avatar?: string;
  role: string;
}

export interface SignUpData {
  message: string;
  token: string;
  userId: number;
  avatar?: string;
  role: string;
}

export interface UserAccountData {
  id: number;
  email: string;
  nickname?: string;
  avatar?: string;
  storeName?: string;
}
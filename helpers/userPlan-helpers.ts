import { UserPlanInstance } from "../interfaces/user-interface";

export function userPlanDataHelper(userPlan: UserPlanInstance) {
  if (userPlan.dataValues.planType === '天數') {
    const expireDate = userPlan.dataValues.expireDate;
    const today = new Date();
    const diffInMilliseconds = Math.abs(expireDate.getTime() - today.getTime());
    const diffInDays = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24));
    userPlan.dataValues.amountLeft = diffInDays;
    return userPlan;
  }
  return userPlan;
}
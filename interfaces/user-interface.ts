

export interface UserAttributes {
  id: number;
  email: string;
  password?: string;
  avatar?: string;
  nickname ?: string;
  role: string;
  storeName ?: string;
}

export interface UserInstance {
  dataValues: UserAttributes;
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
export type User = {
  _id: string;
  email: string;
  name?:string
  image?:string
  password?:string
  createdAt: any;
  updatedAt: any;
  __v: number;
};
export type UserInfo = {
  admin: string;
  phone: number;
  email: string;
  street_address: string;
  postal_code: number;
  city: string;
  country: string;
  createdAt: any;
  updatedAt: any;
  __v: number;
};
export type UserData = {
  _id: string;
  email: string;
  name?:string
  image?:string
  password?:string
  createdAt: any;
  updatedAt: any;
  admin: string;
  phone: number;
  street_address: string;
  postal_code: number;
  city: string;
  country: string;
  __v: number;
};

export type Store = {
  _id: string;
  personal_email: string,
  display_name: string,
  business_email:string,
  finance_email: string,
  store_phone_number: string,
  createdAt: any;
  updatedAt: any;
  __v: number;
};

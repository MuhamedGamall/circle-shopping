export type User = {
  _id: string;
  email: string;
  name?: string;
  image?: string;
  password?: string;
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
  name?: string;
  image?: string;
  password?: string;
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
  personal_email: string;
  display_name: string;
  business_email: string;
  finance_email: string;
  store_phone_number: string;
  createdAt: any;
  updatedAt: any;
  __v: number;
};
export type Shipping = {
  size: number;
  size_type: string;
};
export type Product = {
  _id: string;
  is_live: boolean;
  store_id: string;
  store_personal_email: string;
  title: string;
  images: string[];
  description: string;
  department: string;
  model_number: string;
  model_name: string;
  item_pack_quantity: number;
  warranty: string;
  item_condition: string;
  colour: string;
  box_details: string;
  model_height: string;
  sizes: string[];
  specifications: string[];
  highlights: string[];
  category: {
    main_category: string;
    sub_category: string;
    brand: string;
    _id?: string;
  };
  shipping: {
    shipping_length: Shipping;
    shipping_height: Shipping;
    shipping_width_depth: Shipping;
    shipping_weight: Shipping;
  };
  price: {
    base_price: number;
    offer: {
      is_offered: boolean;
      start_date: Date;
      end_date: Date;
      discount_percentage: number;
    };
  };
  quantity_in_stock: number;
  max_purchase_quantity: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};

export type Account = {
  _id: string;
  email: string;
  name?: string;
  image?: string;
  password?: string;
  createdAt: any;
  updatedAt: any;
  __v: number;
};
export type AccountInfo = {
  admin: string;
  ban: { is_banned: boolean; reason: string };
  phone: number;
  email: string;
  street_address: string;
  postal_code: number;
  city: string;
  country: string;
  total_products_sold: number;
  total_amount_paid: number;
  createdAt: any;
  updatedAt: any;
  __v: number;
};
export interface AccountData extends AccountInfo {
  _id: string;
  email: string;
  name?: string;
  image?: string;
  password?: string;
  createdAt: any;
  updatedAt: any;
  __v: number;
}

export type Store = {
  _id: string;
  ban: {
    is_banned: boolean;
    reason: string;
  };
  personal_email: string;
  display_name: string;
  business_email: string;
  finance_email: string;
  store_phone_number: string;
  likes: number;
  sales_count: number;
  total_sales: number;
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
  is_bestseller: boolean;
  is_published: boolean;
  store_id: string;
  store_name: string;
  likes: number;
  delivery: "free" | "paid";
  store_personal_email: string;
  title: string;
  images: string[];
  sales_count: number;
  description: string;
  model_number: string;
  model_name: string;
  item_pack_quantity: number;
  warranty: string;
  item_condition: string;
  colour: string;
  colours: string[];
  box_details: string;
  model_height: string;
  sizes: string[];
  specifications: string[];
  highlights: string[];
  category: {
    main_category: string;
    sub_category: string;
    brand: string;
    _id: string;
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
      start_date: Date | string;
      end_date: Date | string;
      deal_type: string;
      discount_percentage: number;
      final_price: number;
      offer_calc: number;
    };
  };
  quantity_in_stock: number;
  max_purchase_quantity: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
};
export type Category = {
  _id: string;
  main_category: { name: string; image: string };
  sub_categories: { name: string; image: string }[];
  folder_cloudinary_images_id: string;
  createdAt: any;
  updatedAt: any;
  __v: number;
};

export type FilterItem = {
  _id: string;
  count: number;
};
export type GroupFilters = {
  categories: Category[];
  filterByCondition: FilterItem[];
  filterBySellers: FilterItem[];
  filterByBrands: FilterItem[];
  filterByColour: FilterItem[];
  filterByDeals: FilterItem[];

  maxPrice: number;
  minPrice: number;
};

type QueryItem = string | number | (string | number | null)[] | null;
export type FilterDataState = {
  sortBy: QueryItem;
  colour: QueryItem;
  brand: QueryItem;
  condition: QueryItem;
  seller: QueryItem;
  deal: QueryItem;
  minPrice: QueryItem | undefined;
  maxPrice: QueryItem | undefined;
  delivery: QueryItem;
  // mainCategory: QueryItem;
  // subCategory: QueryItem;
};

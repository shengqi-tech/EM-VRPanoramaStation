export type Member = {
  avatar: string;
  name: string;
  id: string;
};

export interface Params {
  count: number;
}

export interface ListItemDataType {
  id: string;
  owner: string;
  title: string;
  avatar: string;
  cover: string;
  status: 'normal' | 'exception' | 'active' | 'success';
  percent: number;
  logo: string;
  href: string;
  body?: any;
  updatedAt: number;
  createdAt: number;
  subDescription: string;
  description: string;
  activeUser: number;
  newUser: number;
  star: number;
  like: number;
  message: number;
  content: string;
  members: Member[];
}

declare namespace CustomerModel {
  /**
   * 客户信息
   */
  type Customer = {
    eme_customer_id?: number;
    eme_customer_name?: string;
    eme_customer_customertypes?: CustomerType[];
    eme_customer_logo?: string;
    eme_customer_state?: string;
    eme_customer_city?: string;
    eme_customer_region?: string;
    eme_customer_address?: string;
    eme_customer_createtime?: Date;
  };

  /**
   * 管理的用户信息里列表
   */
  type CustomerList = {
    list?: Customer[];
    /** 列表的内容总数 */
    total?: number;
    isFirstPage: boolean;
    isLastPage: boolean;
    pageNum: number;
    pageSize: number;
    pages: number;
  };

  /**
   * 客户类型信息
   */
  type CustomerType = {
    eme_customertype_id?: number;
    eme_customertype_name?: string;
    eme_customertype_des?: string;
  };

  /**
   * 客户类型列表
   */
  type CustomerTypeList = {
    list?: Customer[];
    /** 列表的内容总数 */
    total?: number;
    isFirstPage: boolean;
    isLastPage: boolean;
    pageNum: number;
    pageSize: number;
    pages: number;
  };
}

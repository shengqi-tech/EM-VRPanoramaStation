import { ProductModel } from "@/pages/asset/productmanage/data";
import { InstanceModel } from "@/pages/asset/instancemanage/data";

export type Member = {
  avatar: string;
  name: string;
  id: string;
};

export type CardListItemDataType = {
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
};



declare namespace DeviceModel {


  /**
   * 设备
   */
  type Device = {
    eme_device_id?: number;
    eme_device_no?: number;
    eme_device_producetime?: Date;
    eme_device_createtime?: Date;  
    eme_device_img?: String;
   
    eme_device_creatorid?: number;
    eme_device_customerid?: number;

    eme_device_lastonlinetime?: Date;
    eme_device_status?: number;

    eme_device_product?: ProductModel.Product;  
    eme_device_productid?: number;
    eme_device_version?: ProductModel.Version;
    eme_device_versionid?: number;
    eme_device_instance?: InstanceModel.Instance;
    eme_device_instanceid?: number;

    // title?: streme_scene_sceneimage?: string;ing;
    // group?: string;
    // tags?: { key?: string; label?: string }[];
    // notifyCount?: number;
    // unreadCount?: number;
    // country?: string;
    // access?: string;
    // geographic?: {
    //   province?: { label?: string; key?: string };
    //   city?: { label?: string; key?: string };
    // };
 
  
  }

  type DeviceList = {
    list?:Device[];
    /** 列表的内容总数 */
    total?: number;
    isFirstPage: boolean;
    isLastPage: boolean;
    pageNum: number;
    pageSize: number;
    pages: number;
  };
  

  
}




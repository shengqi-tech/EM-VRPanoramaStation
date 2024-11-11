import { findPanoramaByMap } from '@/services/swagger/panoramaController';
import { insertCommon, updateCommon, deleteCommon } from '@/services/swagger/commonController';
import {
  insertNavigation,
  updateNavigation,
  deleteNavigation,
} from '@/services/swagger/navigationController';
import { insertHtml, updateHtml, deleteHtml } from '@/services/swagger/htmlController';
export interface Object {
  id: number;
  type: string;
  typeId: number;
  name: string;
  panoramaId: number;
  form: any;
  bindData: any;
}
export async function queryPanoramaList(instanceId: number, levelId: number) {
  return findPanoramaByMap({
    ems_panorama_level: levelId,
    ems_panorama_instanceid: instanceId,
  });
}

export async function insertHotspot(data: Object) {
  console.log(data, 123123);

  let { panoramaId, name, typeId, form, bindData } = data;
  const { ems_common_propertyids, ems_common_deviceinstalls, jsonData } = bindData;
  form.bindJsonData = jsonData;
  return insertCommon({
    ems_common_jsondata: JSON.stringify(form),
    ems_common_tagtypeid: typeId,
    ems_common_panoramaid: panoramaId,
    ems_common_name: name,
    ems_common_propertyids,
    ems_common_deviceinstalls,
  });
}

export async function updateHotspot(data: Object) {
  let { panoramaId, name, typeId, id, form, bindData } = data;
  const { ems_common_propertyids, ems_common_deviceinstalls, jsonData } = bindData;
  form.bindJsonData = jsonData;
  return updateCommon({
    ems_common_id: id,
    ems_common_jsondata: JSON.stringify(form),
    ems_common_tagtypeid: typeId,
    ems_common_panoramaid: panoramaId,
    ems_common_name: name,
    ems_common_propertyids,
    ems_common_deviceinstalls,
  });
}

export async function deleteHotspot(data: Object) {
  let { id } = data;
  return deleteCommon({
    ems_common_id: id,
  });
}

export async function insertNav(data: Object) {
  let { panoramaId, name, typeId, form } = data;
  return insertNavigation({
    ems_navigation_jsondata: JSON.stringify(form),
    ems_navigation_tagtypeid: typeId,
    ems_navigation_topanoramaid: form.toPanoramaId,
    ems_navigation_panoramaid: panoramaId,
    ems_navigation_name: name,
  });
}

export async function updateNav(data: Object) {
  let { panoramaId, name, typeId, id, form } = data;
  return updateNavigation({
    ems_navigation_id: id,
    ems_navigation_jsondata: JSON.stringify(form),
    ems_navigation_tagtypeid: typeId,
    ems_navigation_topanoramaid: form.toPanoramaId,
    ems_navigation_panoramaid: panoramaId,
    ems_navigation_name: name,
  });
}

export async function deleteNav(data: Object) {
  let { id } = data;
  return deleteNavigation({
    ems_navigation_id: id,
  });
}

export async function insertWebPage(data: Object) {
  let { panoramaId, name, typeId, form } = data;
  return insertHtml({
    ems_html_jsondata: JSON.stringify(form),
    ems_html_tagtypeid: typeId,
    ems_html_panoramaid: panoramaId,
    ems_html_name: name,
  });
}

export async function updateWebPage(data: Object) {
  let { panoramaId, name, typeId, id, form } = data;
  return updateHtml({
    ems_html_id: id,
    ems_html_jsondata: JSON.stringify(form),
    ems_html_tagtypeid: typeId,
    ems_html_panoramaid: panoramaId,
    ems_html_name: name,
  });
}

export async function deleteWebPage(data: Object) {
  let { id } = data;
  return deleteHtml({
    ems_html_id: id,
  });
}

export async function optionObject(data: Object, optionType: string) {
  let { type } = data;
  let res: any = null;
  if (type == 'hotspot') {
    switch (optionType) {
      case 'insert':
        res = await insertHotspot(data);
        break;
      case 'update':
        res = await updateHotspot(data);
        break;
      case 'delete':
        res = await deleteHotspot(data);
        break;
      default:
        break;
    }
  } else if (type == 'navigation') {
    switch (optionType) {
      case 'insert':
        res = await insertNav(data);
        break;
      case 'update':
        res = await updateNav(data);
        break;
      case 'delete':
        res = await deleteNav(data);
        break;
      default:
        break;
    }
  } else if (type == 'iframe' || type == 'video' || type == 'image') {
    switch (optionType) {
      case 'insert':
        res = await insertWebPage(data);
        break;
      case 'update':
        res = await updateWebPage(data);
        break;
      case 'delete':
        res = await deleteWebPage(data);
        break;
      default:
        break;
    }
  }
  return res;
}

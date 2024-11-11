/*
 * @Author: hugangyong 609210276@qq.com
 * @Date: 2023-12-04 17:27:39
 * @LastEditors: hugangyong 609210276@qq.com
 * @LastEditTime: 2024-01-08 11:30:21
 * @FilePath: \em360station-backend\src\pages\InterfaceConfigureTool\models\apiConfig.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { useState } from 'react';

export default () => {
  const [restapiGroups, setRestapiGroups] = useState<API.RestapigroupVo[]>([]);
  const [selectedRestapi, setSelectedRestapi] = useState<API.ApiVo>();
  const [testResult, setTestResult] = useState<API.ApiVo>();

  const initRestapiGroups = (restapiGroups: API.RestapigroupVo[]) => {
    setRestapiGroups([...restapiGroups]);

    if (restapiGroups && restapiGroups.length > 0) {
      const restapiGroup = restapiGroups[0];
      var apivo = { ems_api_restapigroupid: restapiGroup.ems_restapigroup_id };
      if (restapiGroup.ems_restapigroup_apivos && restapiGroup.ems_restapigroup_apivos.length > 0) {
        apivo = restapiGroup.ems_restapigroup_apivos[0];
      }
      setSelectedRestapi(apivo);
    }
  };

  const addRestapi = (restapi: API.ApiVo) => {
    var addRestapiGroup = restapiGroups.find((restapiGroup: API.RestapigroupVo) => {
      return restapiGroup.ems_restapigroup_id == restapi.ems_api_restapigroupid;
    });
    addRestapiGroup?.ems_restapigroup_apivos?.push(restapi);
    setRestapiGroups([...restapiGroups]);
    setSelectedRestapi(restapi);
  };

  const selectRestApi = (restapi: API.ApiVo) => {
    let object = restapiGroups.find((item: API.RestapigroupVo) => {
      return item.ems_restapigroup_id == restapi.ems_api_restapigroupid;
    });
    let restApi = object?.ems_restapigroup_apivos?.find((item: API.ApiVo) => {
      return item.ems_api_id == restapi.ems_api_id;
    });
    setSelectedRestapi(restApi);
  };

  const updateRestApi = (restapi: API.ApiVo) => {
    let object = restapiGroups.find((item: API.RestapigroupVo) => {
      return item.ems_restapigroup_id == restapi.ems_api_restapigroupid;
    });
    // var restApi = object?.ems_restapigroup_apivos?.find((item: API.ApiVo) => {
    //   return item.ems_api_id == restapi.ems_api_id;
    // });
    if (object && object.ems_restapigroup_apivos) {
      for (var i = 0; i < object.ems_restapigroup_apivos.length; i++) {
        if (object.ems_restapigroup_apivos[i].ems_api_id == restapi.ems_api_id) {
          object.ems_restapigroup_apivos[i] = restapi;
          break;
        }
      }
    }

    setSelectedRestapi({ ...restapi });
  };

  const deleteRestApi = (restapi: API.ApiVo) => {
    var addRestapiGroup = restapiGroups.find((restapiGroup: API.RestapigroupVo) => {
      return restapiGroup.ems_restapigroup_id == restapi.ems_api_restapigroupid;
    });

    var arr2 = addRestapiGroup?.ems_restapigroup_apivos?.filter((item) => {
      return item.ems_api_id != restapi.ems_api_id;
    });
    if (addRestapiGroup) addRestapiGroup.ems_restapigroup_apivos = arr2;
    setRestapiGroups([...restapiGroups]);
  };

  return {
    initRestapiGroups,
    restapiGroups,
    selectRestApi,
    addRestapi,
    selectedRestapi,
    updateRestApi,
    deleteRestApi,
    testResult,
    setTestResult,
  };
};

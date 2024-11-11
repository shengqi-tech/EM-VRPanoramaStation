import { useState } from 'react';
import { findInstanceByMap } from '@/services/swagger/instanceController';

export default () => {
  const [hobbyList, setHobbyList] = useState<any>([]);

  const [logoImg, setLogoImg] = useState<any>();

  const [stationDes, setStationDes] = useState<any>({ desShow: true, des: '' });

  const refreshHobbyList = () => {
    findInstanceByMap({ ems_instance_ishobby: 1 }).then((res) => {
      const list = res.result?.list;
      let arr = list?.map((item: any) => {
        let conf = JSON.parse(item.ems_instance_globeconf);
        return {
          id: item.ems_instance_id,
          cover: conf.cover,
          conf: conf,
        };
      });
      setHobbyList(arr);
    });
  };

  return { hobbyList, refreshHobbyList, logoImg, setLogoImg, stationDes, setStationDes };
};

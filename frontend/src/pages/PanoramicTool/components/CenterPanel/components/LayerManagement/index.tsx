import { useEffect, useState } from 'react';
import styles from './index.less';
import { history, useModel, useParams } from 'umi';
import { findPanoramaByMap } from '@/services/swagger/panoramaController';

const LayerManagement = () => {
  const params: any = useParams();
  const { instanceId } = params;

  const url = `/msManagement/panoramicConfig/${instanceId}`;

  const [selectedFloor, setSelectedFloor] = useState<number | undefined>(0);
  const [allPanoramas, setAllPanoramas] = useState<API.PanoramaVo[]>([]);
  const { panoramaData } = useModel('PanoramicTool.panoramaData', (ret) => ({
    panoramaData: ret.panoramaData,
  }));
  const handleFloorClick = (floorName: number) => {
    setSelectedFloor(floorName);
  };
  const levels = [
    { id: 2, name: 'A' },
    { id: 1, name: 'F2' },
    { id: 0, name: 'F1' },
  ];
  useEffect(() => {
    if (panoramaData) {
      setSelectedFloor(panoramaData.ems_panorama_level);
      // 查询所有楼层全景
      findPanoramaByMap({
        ems_panorama_instanceid: panoramaData.ems_panorama_instanceid,
      }).then((res) => {
        const { result } = res;
        setAllPanoramas(result?.list);
      });
    }
  }, [panoramaData]);
  return (
    <>
      <div className={styles.floors}>
        {levels?.map((item) => {
          return (
            <div
              key={item.id}
              onClick={() => handleFloorClick(item.id)}
              className={`${styles.floor}  ${
                selectedFloor === item.id ? styles.selectedFloor : ''
              }`}
            >
              {item.name}
            </div>
          );
        })}
      </div>
      <div className={styles.layerBox}>
        {allPanoramas
          ?.filter((item) => {
            return item.ems_panorama_level == selectedFloor;
          })
          .map((item) => {
            return (
              <div
                key={item.ems_panorama_id}
                className={`${
                  item.ems_panorama_id == panoramaData?.ems_panorama_id ? styles.selectedImgBox : ''
                } ${styles.imgBox}`}
                onClick={() => {
                  history.push(`${url}/${item.ems_panorama_id}`);
                }}
              >
                <img src={`/systemfile${item?.ems_panorama_cover?.ems_sysfile_path}`} alt="" />
                <span>{item.ems_panorama_name}</span>
              </div>
            );
          })}
      </div>
    </>
  );
};
export default LayerManagement;

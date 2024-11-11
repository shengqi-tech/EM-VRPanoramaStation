import { useEffect, useState } from 'react';
import styles from './index.less';
import { useModel } from 'umi';

const LayerManagement = () => {
  const [selectedFloor, setSelectedFloor] = useState<number | undefined>(0);

  const { panoramaData, setToPanoramaId, allPanoramas } = useModel('Panorama.data', (ret) => ({
    panoramaData: ret.panoramaData,
    setToPanoramaId: ret.setToPanoramaId,
    allPanoramas: ret.allPanoramas,
  }));

  const handleFloorClick = (floorName: number) => {
    setSelectedFloor(floorName);
  };
  const levels = [
    { id: 2, name: 'A' },
    { id: 1, name: 'F2' },
    { id: 0, name: 'F1' },
  ];

  const handleToPanorama = (toPanoramaId: any) => {
    setToPanoramaId(toPanoramaId);
  };

  useEffect(() => {
    if (panoramaData) {
      setSelectedFloor(panoramaData.ems_panorama_level);
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
                  handleToPanorama(item.ems_panorama_id);
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

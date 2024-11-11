import { useModel } from 'umi';
import ModalA from './ModalA';
import ModalB from './ModalB';
import ModalC from './ModalC';
import './index.less';
import { useEffect } from 'react';
const DataModal = () => {
  const { dataModalType, setDataModalType } = useModel('Panorama.data', (ret) => ({
    dataModalType: ret.dataModalType,
    setDataModalType: ret.setDataModalType,
  }));

  useEffect(() => {}, [dataModalType]);

  return (
    <div className={`modal ${dataModalType !== 0 ? 'modalshowAnimation' : 'modalhideAnimation'}`}>
      {dataModalType === 1 && <ModalA />}
      {dataModalType === 2 && <ModalB />}
      {dataModalType === 3 && <ModalC />}
    </div>
  );
};

export default DataModal;

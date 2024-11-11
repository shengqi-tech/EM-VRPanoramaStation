import { useState } from 'react';

export default () => {
  const [commonBind, setCommonBind] = useState<any>({ type: 0, bind: [] }); // 热点 - 污染物数据/工况数据 - 绑定的数据
  const [rtdValueList, setRtdValueList] = useState<any>([]); // 实时数据列表
  const [workRtdValueList, setWorkRtdValueList] = useState<any>([]); // 实时工况数据列表

  return {
    rtdValueList,
    setRtdValueList,
    commonBind,
    setCommonBind,
    workRtdValueList,
    setWorkRtdValueList,
  };
};

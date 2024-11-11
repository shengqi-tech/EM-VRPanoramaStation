import { useEffect, useState, useRef } from 'react';
import { Space, Tabs, Select, Input, Button } from 'antd';
import { Viewer, Panorama, Common } from '@/three/xThree';
import { useModel } from 'umi';
import { set, uniqueId } from 'lodash';
import isEmpty from 'lodash/isEmpty';
import styles from './index.less';

import RequestPanelTab from './RequestPanelTab';
import DynamicInput from '../../../../../components/DynamicInput';

const { Search } = Input;
type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

let panorama: any;

const RequestPanel = () => {
  const [activeKey, setActiveKey] = useState('1');
  const [currentGroupId, setCurrentGroupId] = useState();

  const { selectedRestapi, selectRestApi } = useModel(
    'InterfaceConfigureTool.apiConfig',
    (ret) => ({
      selectedRestapi: ret.selectedRestapi,
      selectRestApi: ret.selectRestApi,
      // updateRestApi: ret.updateRestApi,
    }),
  );

  const [items, setItems] = useState([]);
  const requestPanelTabRef = useRef();
  useEffect(() => {
    if (selectedRestapi) {
      const newPane = items.find((item) => item.key == selectedRestapi.ems_api_id?.toString());
      if (!newPane) {
        const currentTab = {
          label: (
            <Space>
              <span style={{ color: 'green' }}>{selectedRestapi.ems_api_requesttype}</span>

              <DynamicInput
                size="small"
                bordered={false}
                defaultValue={selectedRestapi.ems_api_name}
                onInputChange={(value: string) => {
                  // const foundElement = items?.find(
                  //   (element) => element.key == selectedRestapi.ems_api_id?.toString(),
                  // );
                  // var updateRA = { ...selectedRestapi, ems_api_name: value };
                  // updateRestApi(updateRA);
                  requestPanelTabRef?.current?.setName(value);
                  // setItems([...initialItems]);
                }}
              ></DynamicInput>
            </Space>
          ),
          children: (
            <RequestPanelTab restapi={selectedRestapi} ref={requestPanelTabRef}></RequestPanelTab>
          ),
          key: selectedRestapi.ems_api_id?.toString(),
          pid: selectedRestapi.ems_api_restapigroupid,
          closable: true,
        };
        setItems([...items, currentTab]);
      }
      var selectKey = selectedRestapi.ems_api_id?.toString();
      setActiveKey(selectKey);

      setCurrentGroupId(selectedRestapi.ems_api_restapigroupid);
    }
  }, [selectedRestapi]);

  const newTabIndex = useRef(0);

  const onChange = (newActiveKey: string) => {
    const tabItem = items.find((item) => item.key == newActiveKey);
    const restapi = {
      ems_api_restapigroupid: tabItem.pid,
      ems_api_id: newActiveKey,
    };
    selectRestApi(restapi);
    setActiveKey(newActiveKey);
  };

  const add = () => {
    const newActiveKey = `newTab${newTabIndex.current++}`;
    const newPanes = [...items];
    const newRestapi = {
      ems_api_restapigroupid: currentGroupId,
      ems_api_id: -1,
    };
    selectRestApi(newRestapi);
    newPanes.push({
      label: (
        <Space>
          <span style={{ color: 'green' }}>GET</span>
          <DynamicInput
            size="small"
            bordered={false}
            defaultValue="新标签"
            onInputChange={(value: string) => {
              // const foundElement = items?.find(
              //   (element) => element.key == selectedRestapi.ems_api_id?.toString(),
              // );
              // setItems([...initialItems]);
              requestPanelTabRef?.current?.setName(value);
            }}
          ></DynamicInput>
        </Space>
      ),
      children: (
        <RequestPanelTab
          restapi={newRestapi}
          ref={requestPanelTabRef}
          onAdded={remove}
        ></RequestPanelTab>
      ),
      key: newActiveKey,
      pid: currentGroupId,
    });
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };

  const remove = (targetKey: TargetKey) => {
    let newActiveKey = activeKey;
    let restapi: any = null;
    let lastIndex = -1;
    items.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = items.filter((item) => item.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
        restapi = {
          ems_api_restapigroupid: newPanes[lastIndex].pid,
          ems_api_id: newActiveKey,
        };
        selectRestApi(restapi);
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };

  const onEdit = (
    targetKey: React.MouseEvent | React.KeyboardEvent | string,
    action: 'add' | 'remove',
  ) => {
    if (action === 'add') {
      add();
    } else {
      remove(targetKey);
    }
  };

  // useEffect(() => {
  //   // setItems([...initialItems]);
  // }, [update]);

  return (
    <div className={styles.threeCanvas}>
      <Tabs
        tabBarStyle={{ borderColor: 'black' }}
        size="middle"
        tabPosition="top"
        type="editable-card"
        onChange={onChange}
        activeKey={activeKey}
        onEdit={onEdit}
        items={items}
      />
    </div>
  );
};
export default RequestPanel;

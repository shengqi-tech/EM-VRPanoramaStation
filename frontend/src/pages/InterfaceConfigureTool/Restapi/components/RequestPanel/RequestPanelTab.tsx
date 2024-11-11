import React, { useEffect, useState, useRef, useImperativeHandle } from 'react';
import { Space, Tabs, Select, Input, Button } from 'antd';
import { useModel } from 'umi';
import { uniqueId } from 'lodash';
import isEmpty from 'lodash/isEmpty';

import UriBar from './UriBar/index';
import Parameters from './Parameters/index';
import Header from './Parameters/index';

import { insertApi, updateApi, callTest } from '@/services/swagger/apiController';

type RequestPanelTabProps = {
  restapi: API.ApiVo;
  onAdded: (id: number) => void;
};

const RequestPanelTab = React.forwardRef((RequestPanelTabProps: RequestPanelTabProps, ref: any) => {
  const { restapi, onAdded } = RequestPanelTabProps;
  const parameters = JSON.parse(restapi?.ems_api_parameters ? restapi?.ems_api_parameters : '{}');

  const paramatersRef = useRef<any>();
  const urlbarRef = useRef<any>();

  const { addRestapi, updateRestApi, setTestResult } = useModel(
    'InterfaceConfigureTool.apiConfig',
    (ret) => ({
      addRestapi: ret.addRestapi,
      updateRestApi: ret.updateRestApi,
      setTestResult: ret.setTestResult,
    }),
  );

  const initialItems = [
    {
      label: '请求参数',
      children: <Parameters parameters={parameters} ref={paramatersRef}></Parameters>,
      key: 'ParametersPanelKey',
      closable: false,
    },
    {
      label: '请求头部',
      // children: <Header></Header>,
      key: 'HeaderPanelKey',
      closable: false,
    },
  ];

  const [activeKey, setActiveKey] = useState(initialItems[0].key);
  const [items, setItems] = useState(initialItems);

  const onChange = (newActiveKey: string) => {
    setActiveKey(newActiveKey);
  };

  const onSave = async (uri: string, method: string) => {
    paramatersRef.current.getParameters(async (val) => {
      console.log(val);

      if (restapi && restapi?.ems_api_id > 0) {
        const updateAPi = {
          ...restapi,
          ems_api_header: '',
          ems_api_parameters: JSON.stringify(val),
          ems_api_requesttype: method,
          ems_api_sysuserid: 7,
          ems_api_url: uri,
          ems_api_name: tabName == '新标签' ? restapi.ems_api_name : tabName,
        };
        updateApi(updateAPi);
        updateRestApi(updateAPi);
      } else {
        const newAPi = {
          ...restapi,
          ems_api_header: '',
          ems_api_parameters: JSON.stringify(val),
          ems_api_requesttype: method,
          ems_api_sysuserid: 7,
          ems_api_url: uri,
          ems_api_name: tabName == '新标签' ? restapi.ems_api_name : tabName,
        };
        const result = await insertApi(newAPi);
        if (result?.code == 200) {
          onAdded(result?.result);
          addRestapi({ ...newAPi, ems_api_id: result?.result });
        }
      }
      urlbarRef?.current?.saveComplete(true);
    });
  };

  const onSearch = (uri: string, method: string) => {
    paramatersRef.current.getParameters(async (val) => {
      const testApi = {
        ems_api_header: '',
        ems_api_parameters: JSON.stringify(val),
        ems_api_requesttype: method,
        ems_api_sysuserid: 7,
        ems_api_url: uri,
        ems_api_name: tabName == '新标签' ? restapi.ems_api_name : tabName,
      };
      const result = await callTest(testApi);
      setTestResult(result);
      urlbarRef?.current?.testComplete(true);
    });
  };

  const onUriChange = (uri: string) => {
    const regex = /{([^}]+)}/g;
    const matches = uri.match(regex);

    if (matches) {
      const placeholders = matches.map((match) => match.slice(1, -1));
      if (placeholders && placeholders.length > 0) {
        paramatersRef?.current?.autoSetPathParameters(placeholders);
      }
    }
  };

  var tabName = '新标签';
  useImperativeHandle(ref, () => ({
    async setName(name: string) {
      tabName = name;
    },
  }));

  return (
    <div style={{ margin: '3px' }}>
      <UriBar
        onSave={onSave}
        onSearch={onSearch}
        onUriChange={onUriChange}
        uri={restapi?.ems_api_url}
        method={restapi?.ems_api_requesttype}
        ref={urlbarRef}
      ></UriBar>
      <Tabs
        tabBarStyle={{ borderColor: 'black' }}
        size="small"
        tabPosition="top"
        onChange={onChange}
        activeKey={activeKey}
        // onEdit={onEdit}
        items={items}
      />
    </div>
  );
});
export default RequestPanelTab;

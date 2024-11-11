/*
 * @Author: hugangyong 609210276@qq.com
 * @Date: 2023-12-07 14:30:52
 * @LastEditors: hugangyong 609210276@qq.com
 * @LastEditTime: 2023-12-21 10:36:51
 * @FilePath: \em360station-backend\src\pages\InterfaceConfigureTool\Restapi\components\RequestPanel\UriBar\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { FormEvent, useEffect, useRef, useState, useImperativeHandle } from 'react';
import styles from './index.less';
import { Space, Select, Input, Button, Flex } from 'antd';
const { Search } = Input;

type UriBarProps = {
  uri: string;
  method: string;
  onSearch: (uri: string, method: string) => void;
  onSave: (uri: string, method: string) => void;
  onUriChange:(uri: string)=>void;
};

const options = [
  {
    value: 'GET',
    label: 'GET',
  },
  {
    value: 'POST',
    label: 'POST',
  },
];

const UriBar = React.forwardRef((uriPro: UriBarProps, ref: any) => {
  // function handleSubmit(e: FormEvent) {
  //   e.preventDefault();
  //   if (uri === '') return;
  //   // handleSendButtonClick();
  // }
  const { onSave, onSearch ,onUriChange} = uriPro;
  const [searchLoading, setSearchLoading] = useState<boolean>(false);

  const [saveLloading, setSaveLoading] = useState<boolean>(false);

  const [method, setMethod] = useState<string>(uriPro.method || 'GET');
  const [uri, setUri] = useState<string>(uriPro.uri);

  const formRef = useRef<any>();

  useImperativeHandle(ref, () => ({
    async testComplete(loaded: any) {
      setSearchLoading(!loaded);
    },
    async saveComplete(loaded: any) {
      setSaveLoading(!loaded);
    },
  }));

  return (
    <div className={styles.uriBar}>
      <Space.Compact>
        <Select
          defaultValue={method}
          options={options}
          onChange={(value, option: React.ReactNode | Array<React.ReactNode>) => setMethod(value)}
          className={styles.select}
        />

        <Search
          className={styles.input}
          defaultValue={uri}
          placeholder="请输入URL"
          enterButton="测试"
          size="small"
          loading={searchLoading}
          onChange={(e) => {
            setUri(e.target.value)
            onUriChange(e.target.value);
          }}
          onSearch={(value, event) => {
            setUri(value);
            onSearch(uri, method);
          }}
        />
      </Space.Compact>

      <Button
        loading={saveLloading}
        ghost
        onClick={(event: MouseEvent) => {
          onSave(uri, method);
        }}
      >
        保存
      </Button>
    </div>
  );
});

export default UriBar;

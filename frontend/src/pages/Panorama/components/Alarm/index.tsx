import { useModel, useLocation } from 'umi';
import './index.less';
import React, { useEffect, useState, useImperativeHandle } from 'react';
import Ws from '@/utils/ws';
import { isEmpty } from 'lodash';
import { message, Space, Tag } from 'antd';
import { WarningOutlined } from '@ant-design/icons';
let myWebSocket: any;

const Alarm = React.forwardRef((props: any, ref: any) => {
  const address = useLocation();
  const [commonList, setCommonList] = useState<any>([]); // 热点列表
  const { panoramaData, isAlarmShow } = useModel('Panorama.data', (ret) => ({
    panoramaData: ret.panoramaData,
    isAlarmShow: ret.isAlarmShow,
  }));

  /**
   *
   * @param text
   * @param level
   * @returns
   */
  const getElement = (alarm) => {
    const el: any = document.querySelector(`.alarm-popup`);
    var clonedDiv = el.cloneNode(true);
    clonedDiv.classList.add(`alarm-${alarm.ems_devicealarm_levelid}`);
    clonedDiv.querySelector('.alarmLevel').innerText =
      alarm.ems_devicealarm_alarmlevel?.ems_alarmlevel_name;
    clonedDiv.querySelector('.alarmDevice').innerText = alarm.ems_devicealarm_device?.ems_device_no;
    clonedDiv.querySelector('.alarmTime').innerText = alarm.ems_devicealarm_happentime;
    clonedDiv.querySelector('.alarmDes').innerText = alarm.ems_devicealarm_log;
    return clonedDiv;
  };

  const showAlarm = (param: string) => {
    if (param) {
      const alarmList = JSON.parse(param);
      if (alarmList?.length > 0) {
        window.panorama.removeObejctByName('alarm');

        commonList.forEach((common) => {
          console.log(common?.ems_common_devices, 1111);

          common?.ems_common_devices?.forEach((device) => {
            alarmList?.forEach((alarm) => {
              if (device.ems_device_id === alarm.ems_devicealarm_deviceid) {
                const jsonData = JSON.parse(common.ems_common_jsondata);
                const { position, rotation } = jsonData;
                const element = getElement(alarm);
                const object = window.panorama.addElement({
                  name: 'alarm',
                  element,
                  position,
                  rotation,
                });
                window.panorama.addScaleAnimation(object);
              }
            });
          });
        });
      }
    }
  };

  /**
   * websocket
   */
  const open = () => {
    if (isAlarmShow) {
      message.info('报警实时连接关闭！');
      window.panorama.removeObejctByName('alarm');
      if (myWebSocket) myWebSocket.close();
    } else {
      message.info('报警实时连接开启！');
      const queryParams = new URLSearchParams(address.search);
      const no = queryParams.get('no');
      const wsParams = {
        url: `ws://${location.host}/wsUrl/deviceAlarm/list`,
        msg: {
          ems_instance_no: no,
        },
        callback: (alarmList: string) => {
          showAlarm(alarmList);
        },
      };
      myWebSocket = new Ws(wsParams);
      myWebSocket.connect();
    }
  };

  useEffect(() => {
    if (panoramaData && !isEmpty(panoramaData)) {
      const common = panoramaData.ems_panorama_commonvos;
      setCommonList(common);
    }
  }, [panoramaData]);

  useEffect(() => {
    return () => {
      if (myWebSocket) myWebSocket.close();
    };
  }, []);

  useImperativeHandle(ref, () => ({
    open,
  }));

  return (
    <div className="alarmBox">
      <div className="alarm-popup animation-fadeIn">
        <div className="alarmTitle">
          <Space>
            <WarningOutlined className="icon-warning" />
            <span className="alarmLevel">一级警报</span>
          </Space>
        </div>
        <div className="line">
          <img src={require('@/assets/images/panorama/alarm/line.png')} alt="" />
        </div>
        <Space direction="vertical">
          <Space>
            <span className="label"> 设备编号:</span>
            <div className="alarmDevice"></div>
          </Space>
          <Space>
            <span className="label"> 发生时间:</span>
            <div className="alarmTime"></div>
          </Space>
          <Space>
            <span className="label"> 报警描述:</span>
            <div className="alarmDes"></div>
          </Space>
        </Space>
      </div>
    </div>
  );
});
export default Alarm;

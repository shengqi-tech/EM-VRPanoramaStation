import { useModel } from 'umi';
import './index.less';
import React, { useEffect, useState, useImperativeHandle } from 'react';
import { isEmpty } from 'lodash';

const DataPopup = React.forwardRef((props: any, ref: any) => {
  const { rtdValueList, workRtdValueList } = useModel('Panorama.device', (ret) => ({
    rtdValueList: ret.rtdValueList,
    workRtdValueList: ret.workRtdValueList,
  }));

  const { panoramaData } = useModel('Panorama.data', (ret) => ({
    panoramaData: ret.panoramaData,
  }));

  /**
   *
   * @param text
   * @param level
   * @returns
   */
  const getElement = (values, bindJsonData) => {
    const el: any = document.querySelector(`.data-popup`);
    var clonedDiv: any = el.cloneNode(true);
    let type = 2;
    // 数据位置
    if (bindJsonData) {
      const json = JSON.parse(bindJsonData);
      const { styleForm } = json;
      if (styleForm) {
        const { fontSize, shiftX, shiftY } = styleForm;
        type = styleForm.type;
        const dataBox = clonedDiv.querySelector('.content');
        dataBox.style.fontSize = `${fontSize}px`;
        dataBox.style.left = `${shiftX}px`;
        dataBox.style.marginTop = `${shiftY}px`;
      }
    }
    if (values && values.length > 0) {
      const singleDuration = 3; // 单个元素动画时长3s
      const totalDuration = singleDuration * values.length;
      values.forEach((value, index) => {
        let text = value.name + '：' + value.rtdValue + value.unit;
        switch (type) {
          case 0:
            text = value.rtdValue + value.unit;
            break;
          case 1:
            text = value.name;
            break;
          case 2:
            text = value.name + '：' + value.rtdValue + value.unit;
            break;
          case 3:
            text = value.name + '：' + '\n' + value.rtdValue + value.unit;
            break;
          default:
            text = '';
        }
        const div = document.createElement('div');
        div.innerText = text;
        div.style.opacity = '0';
        div.style.display = 'flex';
        div.style.width = '100%';
        div.style.justifyContent = 'center';
        div.style.alignItems = 'center';
        div.style.animation = `slideShow ${totalDuration}s infinite`;
        div.style.animationDelay = `${singleDuration * index}s`;
        clonedDiv.querySelector('.showData').appendChild(div);
      });
      const styleSheet = document.createElement('style');
      styleSheet.type = 'text/css';
      styleSheet.innerText = `
      @keyframes slideShow {
        0%, 100% { opacity: 0; }
        5%, 10% { opacity: 1; } /* 快速渐变到下一个 */
        11%, 95% { opacity: 1; } /* 保持显示 */
        95%, 5% { opacity: 0; } /* 逐渐消失 */
      }
      `;
      document.head.appendChild(styleSheet);
    } else {
      const div = document.createElement('div');
      div.innerText = '离线';
      div.style.display = 'flex';
      div.style.width = '100%';
      div.style.justifyContent = 'center';
      div.style.alignItems = 'center';
      div.style.textShadow =
        ' 0 0 0.521vw #ff0000, 0 0 1.042vw #ff0000, 0 0 1.563vw #ff0000, 0 0 2.083vw #ff0000';
      clonedDiv.querySelector('.showData').appendChild(div);
    }

    return clonedDiv;
  };

  /**
   * 污染物数据
   * @param commonList
   * @param valueList
   */
  const showDeviceRtdValue = (commonList: any, valueList: any) => {
    if (commonList?.length > 0 && valueList?.length > 0) {
      window.panorama.removeObejctByName('dataPopup');
      commonList?.forEach((common) => {
        const jsonData = JSON.parse(common.ems_common_jsondata);
        const { position, rotation, bindJsonData } = jsonData;
        if (bindJsonData) {
          const json = JSON.parse(bindJsonData);
          const { dataType, composition } = json.form;
          let values: any = [];
          // 判断热点是否绑定有产品
          if (!composition) {
            return;
          }
          //  判断是工况/污染物数据
          if (dataType == 1) {
            const properties = common?.ems_common_properties;
            workRtdValueList?.forEach((item) => {
              properties.forEach((property) => {
                if (property.ems_property_code === item.polltant) {
                  item.name = property.ems_property_name;
                  item.unit = property.ems_property_unit;
                  values.push(item);
                }
              });
            });
            values = values?.map((item) => {
              item.rtdValue = item.workRtdValue;
              return item;
            });
            const element = getElement(values, bindJsonData);
            window.panorama.addElement({
              name: 'dataPopup',
              element,
              position,
              rotation,
            });
          } else {
            let arr: any = [];
            common?.ems_common_devices?.forEach((device) => {
              valueList?.forEach((value) => {
                if (device.ems_device_no === value.ems_device_no) {
                  arr.push(value);
                }
              });
            });
            const properties = common?.ems_common_properties;
            arr?.forEach((item) => {
              properties.forEach((property) => {
                if (property.ems_property_code === item.polltant) {
                  item.name = property.ems_property_name;
                  item.unit = property.ems_property_unit;
                  values.push(item);
                }
              });
            });
            const element = getElement(values, bindJsonData);
            window.panorama.addElement({
              name: 'dataPopup',
              element,
              position,
              rotation,
            });
          }
        }
      });
    }
  };

  useEffect(() => {
    if (panoramaData && !isEmpty(panoramaData)) {
      const commonList = panoramaData.ems_panorama_commonvos;
      const valueList = [...(rtdValueList || []), ...(workRtdValueList || [])];
      showDeviceRtdValue(commonList, valueList);
    }
  }, [panoramaData, rtdValueList, workRtdValueList]);

  return (
    <div className="data-popup-Box">
      <div className="data-popup animation-fadeIn">
        <div className="content">
          {/* <div className="line">
            <img src={require('@/assets/images/panorama/alarm/line.png')} alt="" />
          </div> */}
          <div className="showData"></div>
        </div>
      </div>
    </div>
  );
});
export default DataPopup;

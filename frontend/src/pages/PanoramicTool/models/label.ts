import { useState } from 'react';
import isEmpty from 'lodash/isEmpty';
export default () => {
  // panorama
  const [panorama, setPanorama] = useState<any>();

  const [labelTypeList, setLabelTypeList] = useState<API.TagtypeVo[] | []>([]);
  const [currentLabel, setCurrentLabel] = useState<API.TagtypeVo>();
  const [currentLabelPos, setCurrentLabelPos] = useState({});

  const [labels, setLabels] = useState<any>([]);

  const [currentObject, setCurrentObject] = useState<any>({});
  const [objects, setObjects] = useState<any>([]);

  /**
   * 选中对象， 给对象添加样式
   * @param object
   */
  const selectObject = (object) => {
    if (!isEmpty(object)) {
      // 选中对象
      object?.parent?.children.forEach((item) => {
        if (item.element) item.element.className = 'css3dObject';
      });
      const element = object?.element;
      if (element) element.className = 'css3dObject css3dObject-selected';
    } else {
      // 取消选中对象
      currentObject?.parent?.children.forEach((item) => {
        if (item.element) item.element.className = 'css3dObject';
      });
    }
    setCurrentObject(object);
  };

  /**
   * 触发删除对象的方法
   * @param object
   */
  const handleDeleteObject = (object) => {
    // 删除数组里当前对象
    let newObjects = objects.filter((item) => item.data.id !== object.data.id);
    let newLabels = labels.filter((item) => item.id !== object.data.id);
    setObjects([...newObjects]);
    setLabels([...newLabels]);
    // 移除threejs实体
    let group = object?.parent;
    for (var i = group.children.length - 1; i >= 0; i--) {
      if (group.children[i]?.data?.id == object?.data.id) group.remove(group.children[i]);
    }
    setCurrentObject({});
  };

  /**
   * 设置对象其他样式属性
   * @param values
   */
  const changeObjectStyle = (values: any, object = currentObject) => {
    if (object.data) {
      object.data.form = values;
      object.data.bindData = values.bindJsonData; // 绑定数据
      const {
        text,
        fontSize,
        color,
        textShow,
        style,
        placement,
        width,
        height,
        imgShow,
        shiftX,
        shiftY,
        position,
        rotation,
        iframeShow,
        videoShow,
        coverShow,
        iframeUrl,
        videoFile,
        coverFile,
      } = values;
      object.position.copy(position);
      object.rotation.set(rotation._x, rotation._y, rotation._z);
      const element = object?.element;
      const textBox = element?.querySelector('.text-box');
      const imgBox = element?.querySelector('.css3dObject-imgbox');
      const iframe = element?.querySelector('.iframe-box');
      const video = element?.querySelector('.video-box');
      const cover = element?.querySelector('.cover-box');
      if (element) {
        imgBox.style.display = imgShow ? 'block' : 'none';
        element.style.width = `${width}px`;
        element.style.height = `${height}px`;
        textBox.style.display = textShow ? 'block' : 'none';
        textBox.innerText = text;
        textBox.style.fontSize = `${fontSize}px`;
        textBox.style.color = color;
        textBox.style.marginLeft = `${shiftX}px`;
        textBox.style.marginTop = `${shiftY}px`;
        if (style?.includes('B')) {
          textBox.style.fontWeight = 'bold';
        } else {
          textBox.style.fontWeight = 'normal';
        }
        if (style?.includes('U')) {
          textBox.style.textDecoration = 'underline';
        } else {
          textBox.style.textDecoration = 'none';
        }
        if (style?.includes('I')) {
          textBox.style.fontStyle = 'italic';
        } else {
          textBox.style.fontStyle = 'normal';
        }
        textBox.className = `text-box ${placement}`;
      }
      if (iframe) {
        iframe.style.display = iframeShow ? 'block' : 'none';
        iframe.src = iframeUrl;
      }
      if (video && videoFile[0]?.url) {
        video.style.display = videoShow ? 'block' : 'none';
        video.src = videoFile[0]?.url;
        video.loop = true; // 设置循环播放
        video.muted = true; // 设置静音
        video.play();
      }
      if (cover && coverFile[0]?.url) {
        cover.style.display = coverShow ? 'block' : 'none';
        cover.src = coverFile[0]?.url;
      }
      setLabels([...labels]); // 刷新标签列表
      if (!isEmpty(currentObject)) setCurrentObject(object);
    }
  };

  /**
   * 设置数据展示样式
   * @param values
   */
  const changDataStyle = (values: any, object = currentObject) => {
    if (object.data) {
      const { text, fontSize, color, placement, shiftX, shiftY, textShow } = values;
      const element = object?.element;
      const textBox = element?.querySelector('.data-box');
      if (element) {
        textBox.innerText = text;
        textBox.style.fontSize = `${fontSize}px`;
        textBox.style.color = color;
        textBox.style.marginLeft = `${shiftX}px`;
        textBox.style.marginTop = `${shiftY}px`;
        // textBox.className = `data-box center`;
        textBox.style.display = textShow ? 'block' : 'none';
      }
      setLabels([...labels]); // 刷新标签列表
      if (!isEmpty(currentObject)) setCurrentObject(object);
    }
  };

  /**
   * 添加左侧标签
   * @param label
   */
  const addLabel = (label: any) => {
    labels.push(label);
    setLabels([...labels]);
  };

  /**
   * 添加threejs内实体
   * @param data
   * @param position
   */
  const addObject = (data: any, position: any) => {
    let object = panorama.add3dObject({ data, position });
    objects.push(object);
    setObjects([...objects]);
    return object;
  };

  /**
   * 刷新所有对象
   * @param data
   */
  const refreshObjects = (data: API.PanoramaViewVo) => {
    panorama.removeAll();
    let labels: any = [];
    let objects: any = [];
    // 热点
    data?.ems_panorama_commonvos?.forEach((item) => {
      if (item?.ems_common_jsondata) {
        let jsonData = JSON.parse(item.ems_common_jsondata);
        let data = {
          id: item.ems_common_id,
          pid: item.ems_common_tagtypepid,
          typeId: item.ems_common_tagtypeid,
          panoramaId: item.ems_common_panoramaid,
          name: item.ems_common_name,
          type: item.ems_common_tagtype,
          url: `/systemfile${item.ems_common_tagtypeiconfile?.ems_sysfile_path}`,
          imgType: item.ems_common_tagtypeiconfile?.ems_sysfile_type,
        };
        let position = jsonData.position;
        let object = addObject(data, position);
        changeObjectStyle(jsonData, object);
        labels.push(data);
        objects.push(object);
      }
    });
    // 导航
    data?.ems_panorama_navigationvos?.forEach((item) => {
      if (item?.ems_navigation_jsondata) {
        let jsonData = JSON.parse(item.ems_navigation_jsondata);
        let data = {
          id: item.ems_navigation_id,
          pid: item.ems_navigation_tagtypepid,
          typeId: item.ems_navigation_tagtypeid,
          panoramaId: item.ems_navigation_panoramaid,
          name: item.ems_navigation_name,
          type: item.ems_navigation_tagtype,
          url: `/systemfile${item.ems_navigation_tagtypeiconfile?.ems_sysfile_path}`,
          imgType: item.ems_navigation_tagtypeiconfile?.ems_sysfile_type,
        };
        let position = jsonData.position;
        let object = addObject(data, position);
        changeObjectStyle(jsonData, object);
        labels.push(data);
        objects.push(object);
      }
    });
    // 网页标签
    data?.ems_panorama_htmlvos?.forEach((item) => {
      if (item?.ems_html_jsondata) {
        let jsonData = JSON.parse(item.ems_html_jsondata);
        let data = {
          id: item.ems_html_id,
          pid: item.ems_html_tagtypepid,
          typeId: item.ems_html_tagtypeid,
          panoramaId: item.ems_html_panoramaid,
          name: item.ems_html_name,
          type: item.ems_html_tagtype,
          url: `/systemfile${item.ems_html_tagtypeiconfile?.ems_sysfile_path}`,
          imgType: item.ems_html_tagtypeiconfile?.ems_sysfile_type,
        };
        let position = jsonData.position;
        let object = addObject(data, position);
        changeObjectStyle(jsonData, object);
        labels.push(data);
        objects.push(object);
      }
    });
    setLabels(labels);
    setObjects(objects);
  };

  return {
    panorama,
    setPanorama,
    objects,
    currentObject,
    selectObject,
    changeObjectStyle,
    refreshObjects,
    currentLabelPos,
    setCurrentLabelPos,
    currentLabel,
    setCurrentLabel,
    labels,
    addObject,
    setLabels,
    addLabel,
    setObjects,
    handleDeleteObject,
    labelTypeList,
    setLabelTypeList,
    changDataStyle,
  };
};

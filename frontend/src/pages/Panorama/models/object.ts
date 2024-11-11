export default () => {
  /**
   * 设置对象其他样式属性
   * @param values
   */
  const changeObjectStyle = (values: any, object: any) => {
    if (object.data) {
      object.data.form = values;
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

      // 如果有模版可以交互增加hover效果
      if (values.bindJsonData) {
        const json = JSON.parse(values.bindJsonData);
        const { template } = json;
        if (template) {
          element.classList.add('css3dObject-hover');
        }
      }
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
        video.addEventListener('click', function () {
          video.play();
        });
        video.click();
      }
      if (cover && coverFile[0]?.url) {
        cover.style.display = coverShow ? 'block' : 'none';
        cover.src = coverFile[0]?.url;
      }
    }
  };

  /**
   * 刷新所有对象
   * @param data
   */
  const refreshObjects = (panorama: any, data: API.PanoramaViewVo) => {
    panorama.removeAll();
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
        let object = panorama.add3dObject({ data, position });
        changeObjectStyle(jsonData, object);
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
        let object = panorama.add3dObject({ data, position });
        changeObjectStyle(jsonData, object);
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
        let object = panorama.add3dObject({ data, position });
        changeObjectStyle(jsonData, object);
      }
    });
  };

  return {
    refreshObjects,
  };
};

import { useState, useRef, useEffect } from 'react';
import {
  ProCard,
  ProFormSwitch,
  ProForm,
  ProFormUploadDragger,
  ProFormSelect,
  ProFormRadio,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { useParams, useModel } from 'umi';
import html2canvas from 'html2canvas';
import {
  createFromIconfontCN,
  CheckCircleFilled,
  CloudUploadOutlined,
  AppstoreOutlined,
  ReadOutlined,
} from '@ant-design/icons';
import type { ProFormInstance } from '@ant-design/pro-components';
import { Button, Card, Row, Col, Popconfirm, message } from 'antd';
import Template from '@/assets/images/panoramicTool/template.png';
import { Common } from '@/utils/three/xThree';
import { logoOptions, startAnimationOptions, switchEffectOptions } from '../../const';
import './index.less';
import {
  uploadInstanceFile,
  setHobby,
  findInstanceByMap,
} from '@/services/swagger/instanceController';

const IconFont = createFromIconfontCN({
  scriptUrl: ['/iconfont/iconfont.js'],
});
const LayoutPanel = () => {
  const params: any = useParams();
  const { instanceId } = params;
  const formRef = useRef<ProFormInstance>();

  const [startAnimation, setStartAnimation] = useState(1);
  const [logo, setLogo] = useState(1);
  const [logoImgFile, setLogoImgFile] = useState<any>({});

  const { refreshHobbyList, setLogoImg, setStationDes } = useModel(
    'PanoramicTool.layout',
    (ret) => ({
      refreshHobbyList: ret.refreshHobbyList,
      setLogoImg: ret.setLogoImg,
      setStationDes: ret.setStationDes,
    }),
  );
  /**
   * 表单改变标签实体样式
   * @param changeValues
   * @param values
   */
  const changeValues = async (changeValues: any, values: any) => {
    setLogo(values.logoType);
    setStationDes({ des: values.des, desShow: values.desShow });
  };

  /**
   * Base64字符串转File文件
   * @param {String} dataurl Base64字符串(字符串包含Data URI scheme，例如：data:image/png;base64, )
   * @param {String} filename 文件名称
   */
  const dataURLtoFile = (dataurl, filename) => {
    let arr = dataurl.split(',');
    let mime = arr[0].match(/:(.*?);/)[1];
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {
      type: mime,
    });
  };

  const save = () => {
    let values = formRef.current?.getFieldsValue();
    values.startAnimation = startAnimation;
    values.logoImgFile = logoImgFile;
    const element: any = document.getElementById('canvasBox'); // 替换成你要截图的元素的ID
    window.viewer.renderer.render(window.viewer.scene, window.viewer.camera);
    html2canvas(element).then((canvas) => {
      const image = canvas.toDataURL(); // 获取截图的Base64数据
      let file = dataURLtoFile(image, 'cover');
      setHobby(
        {
          ems_instance_globeconf: JSON.stringify(values),
          ems_instance_id: instanceId,
          isHobby: 1,
          file,
        },
        {},
        file,
      ).then((res) => {
        refreshHobbyList();
        message.success(res.message);
      });
    });
  };

  useEffect(() => {
    findInstanceByMap({ ems_instance_id: instanceId }).then((res: any) => {
      const instanceData = res.result?.list[0];
      if (instanceData.ems_instance_globeconf) {
        const conf = JSON.parse(instanceData.ems_instance_globeconf);
        if (conf.logoImgFile?.ems_sysfile_id) {
          setLogoImg(conf.logoImgFile);
          setLogoImgFile(conf.logoImgFile);
          const fileList: any = [
            {
              uid: conf.logoImgFile?.ems_sysfile_id,
              name: conf.logoImgFile?.ems_sysfile_name,
              status: 'done',
              url: `/systemfile${conf.logoImgFile?.ems_sysfile_path}`,
              thumbUrl: `/systemfile${conf.logoImgFile?.ems_sysfile_path}`,
            },
          ];
          conf.logoImgFile = fileList;
        } else {
          conf.logoImgFile = [];
        }
        setLogo(conf.logoType);
        formRef.current?.setFieldsValue(conf);
      }
    });
  }, []);

  return (
    <div className="LayoutPanel">
      <div className="title">全局设置</div>
      <div className="content">
        <ProForm
          formRef={formRef}
          onValuesChange={changeValues}
          colon={false}
          labelAlign="left"
          labelCol={{ span: 6 }}
          layout="horizontal"
          submitter={false}
        >
          <div className={`form`}>
            <ProCard
              title={
                <div className="card-title">
                  <IconFont type="icon-gongsi" /> Logo
                </div>
              }
              ghost
            >
              <div className="card-form">
                <ProFormRadio.Group name="logoType" initialValue={1} options={logoOptions} />
                {logo === 1 && (
                  <ProFormUploadDragger
                    name="logoImgFile"
                    label=""
                    fieldProps={{
                      customRequest: async (options) => {
                        // uploadInstanceFile
                        const { onSuccess, onError, file }: any = options;
                        const { result, code }: any = await uploadInstanceFile({ file: file });
                        if (code == 200) {
                          setLogoImgFile(result);
                          setLogoImg(result);
                          onSuccess('上传成功');
                        } else {
                          message.success('上传失败');
                          onError('上传失败');
                        }
                      },
                      listType: 'picture',
                      iconRender: () => {
                        return <></>;
                      },
                      maxCount: 1,
                    }}
                  >
                    <div className="ant-upload-icon">
                      <CloudUploadOutlined />
                    </div>
                    <div className="ant-upload-text">单击或拖动文件到此区域进行上传</div>
                  </ProFormUploadDragger>
                )}
              </div>
            </ProCard>
            <ProCard
              title={
                <div className="card-title">
                  <ReadOutlined />
                  站房介绍
                </div>
              }
              ghost
              extra={
                <ProFormSwitch
                  initialValue={true}
                  name="desShow"
                  noStyle
                  checkedChildren={'显示'}
                  unCheckedChildren={'隐藏'}
                />
              }
            >
              <div className="card-form">
                <ProFormTextArea
                  labelCol={{ span: 4 }}
                  name="des"
                  label=""
                  className="inputText"
                  initialValue=""
                />
              </div>
            </ProCard>
            <ProCard
              title={
                <div className="card-title">
                  <IconFont type="icon-bim_donghua" /> 开场动画
                </div>
              }
              extra={
                <Button
                  size="small"
                  type="primary"
                  onClick={() => {
                    Common.setCamera();
                  }}
                >
                  预览
                </Button>
              }
              ghost
            >
              <div className="card-form">
                <Row gutter={24} justify="space-between">
                  {startAnimationOptions?.map((item) => {
                    return (
                      <Col span={12} key={item.value}>
                        <Card
                          onClick={() => {
                            setStartAnimation(item.value);
                          }}
                          className={item.value == startAnimation ? 'card-selected' : ''}
                          size="small"
                          hoverable
                          style={{ width: '120px' }}
                          cover={<img alt="暂无" src={Template} />}
                        >
                          {item.value == startAnimation && (
                            <CheckCircleFilled className="icon-selected" />
                          )}

                          <Card.Meta title={item.label} />
                        </Card>
                      </Col>
                    );
                  })}
                </Row>
              </div>
            </ProCard>

            <ProCard
              title={
                <div className="card-title">
                  <AppstoreOutlined /> 场景设置
                </div>
              }
              ghost
            >
              <div className="card-form">
                <ProFormSelect
                  name="effect"
                  label="切换效果"
                  initialValue={0}
                  options={switchEffectOptions}
                />
              </div>
            </ProCard>
            <ProCard
              title={
                <div className="card-title">
                  <IconFont type="icon-qita1" /> 其他
                </div>
              }
              ghost
            >
              <div className="card-form">
                <ProFormSwitch
                  labelCol={{ span: 20 }}
                  initialValue={true}
                  label="罗盘"
                  name="compassShow"
                />
              </div>
            </ProCard>
          </div>
        </ProForm>
      </div>
      <div className="bottom">
        <div className="bottom-top">
          <Popconfirm
            title="是否保存并添加到个人喜欢！"
            okText="是"
            cancelText="否"
            onConfirm={save}
          >
            <Button type="primary" ghost className="btn btn-add">
              保存
            </Button>
          </Popconfirm>
        </div>
        <Button ghost block onClick={() => {}} className="btn btn-cancel">
          取消
        </Button>
      </div>
    </div>
  );
};
export default LayoutPanel;

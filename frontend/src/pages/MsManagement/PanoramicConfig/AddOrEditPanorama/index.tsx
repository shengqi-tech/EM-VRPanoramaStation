import {
  DrawerForm,
  ProFormText,
  ProFormTextArea,
  ProForm,
  CheckCard,
} from '@ant-design/pro-components';
import styles from './index.less';
import { message, Divider, Upload, Avatar } from 'antd';
import React, { useImperativeHandle, useState, useRef } from 'react';
import { LoadingOutlined, PlusOutlined, createFromIconfontCN } from '@ant-design/icons';
import {
  insertPanorama,
  uploadCover,
  getPanoramaView,
  updatePanorama,
  batchUploadPanoramaFile,
} from '@/services/swagger/panoramaController';
import { loadImage } from '@/utils/panoramaToCubmap.js';

const { Dragger } = Upload;
const IconFont = createFromIconfontCN({
  scriptUrl: ['/iconfont/iconfont.js'],
});
type propsType = {
  refreshList: Function;
  instanceid: any;
};

const AddOrEditPanorama = React.forwardRef((props: propsType, ref: any) => {
  const formRef = useRef<any>();
  const [panorama, setPanorama] = useState<any>(null);
  const [drawerVisit, setDrawerVisit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [posterLoading, setPosterLoading] = useState(false);
  const [panoramaImgFile, setPanoramaImgFile] = useState(null);
  const [defaultFileList, setDefaultFileList] = useState<any>([]);
  const [posterFile, setPosterFile] = useState<any>({});
  const [defaultPosterFileList, setDefaultPosterFileList] = useState<any>([]);

  const onPosterChange = (info: any) => {
    setDefaultPosterFileList(info.fileList);
  };

  const onPanoramaChange = (info: any) => {
    setDefaultFileList(info.fileList);
    if (info.file.status === 'done') {
      setLoading(true);
      loadImage(info.file?.originFileObj, (fileList: any) => {
        let params = fileList;
        params.unshift(info.file.originFileObj);
        batchUploadPanoramaFile({}, params).then((res: any) => {
          if (res.code == 200) {
            setPanoramaImgFile(res.result);
            message.success(`上传成功！`);
          } else {
            message.error(`上传失败！`);
          }
          setLoading(false);
        });
      });
    }
  };
  const beforeUpload = (file: any) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('请上传图片形式文件！');
    }
    return isJpgOrPng;
  };

  // 方法编写, 例如一些提交保存等操作
  const handleConfirm = async () => {
    try {
      await formRef.current?.validateFields();
      const form = formRef?.current?.getFieldsValue();
      const formData: any = {
        ...form,
        ems_panorama_instanceid: props.instanceid,
        ems_panorama_coverfile: posterFile,
        ems_panorama_slicefiles: panoramaImgFile,
      };
      // 修改和新增
      if (panorama?.ems_panorama_id) {
        const result = await updatePanorama({
          ems_panorama_id: panorama.ems_panorama_id,
          ...formData,
        });
        if (result.code == 200) {
          message.success(result.message);
        }
      } else {
        const result = await insertPanorama(formData);
        if (result.code == 200) {
          message.success(result.message);
        }
      }
      setDefaultFileList([]);
      onVisibleChange(false);
      props.refreshList();
    } catch (error: any) {
      if (error) {
        console.log(error);
      }
    }
  };

  const onVisibleChange = (e: boolean) => {
    setDrawerVisit(e);
    setDefaultFileList([]);
    setDefaultPosterFileList([]);
  };

  useImperativeHandle(ref, () => ({
    async show(result: any) {
      setDrawerVisit(true);
      setPanorama(result);
      formRef.current?.resetFields();
      if (result)
        await getPanoramaView({ ems_panorama_id: result?.ems_panorama_id }).then((res) => {
          const { result } = res;
          if (result && result.ems_panorama_cover) {
            result.ems_panorama_cover = [
              {
                uid: result?.ems_panorama_cover?.ems_sysfile_id,
                name: result?.ems_panorama_cover?.ems_sysfile_name,
                status: 'done',
                url: `/systemfile${result?.ems_panorama_cover?.ems_sysfile_path}`,
                thumbUrl: `/systemfile${result?.ems_panorama_cover?.ems_sysfile_path}`,
              },
            ];
            setDefaultPosterFileList(result.ems_panorama_cover);
          }
          if (result && result.ems_panorama_slicefiles?.length > 0) {
            const fileList: any = [
              {
                uid: result?.ems_panorama_slicefiles[0].ems_sysfile_id,
                name: result?.ems_panorama_slicefiles[0].ems_sysfile_name,
                status: 'done',
                url: `/systemfile${result?.ems_panorama_slicefiles[0].ems_sysfile_path}`,
                thumbUrl: `/systemfile${result?.ems_panorama_slicefiles[0].ems_sysfile_path}`,
              },
            ];
            setDefaultFileList(fileList);
          }
          formRef.current?.setFieldsValue(result);
        });
    },
  }));

  return (
    <>
      <DrawerForm
        formRef={formRef}
        visible={drawerVisit}
        onVisibleChange={onVisibleChange}
        width={600}
        title={`${panorama ? '编辑' : '新增'}全景场景`}
        onFinish={handleConfirm}
        layout="horizontal"
        grid={true}
        rowProps={{
          gutter: [0, 2],
        }}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
      >
        <h4 className={styles.hTitle}>基本信息</h4>
        <ProFormText
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 19 }}
          name="ems_panorama_name"
          label="场景名称"
          placeholder="请输入场景名称"
          rules={[{ required: true, message: '请输入场景名称' }]}
        />
        <ProForm.Item
          rules={[{ required: true, message: '请选择场景位置' }]}
          style={{ width: '100%', marginBottom: 0 }}
          name="ems_panorama_level"
          label="场景位置"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          initialValue={0}
        >
          <CheckCard.Group defaultValue={0} size="small">
            <CheckCard
              style={{ width: 130 }}
              avatar={
                <Avatar
                  src={<IconFont type="icon-a-bianzu123" className={styles.icon_level_one} />}
                  size="small"
                />
              }
              title="一楼"
              value={0}
            />
            <CheckCard
              style={{ width: 130 }}
              avatar={
                <Avatar
                  src={<IconFont type="icon-dituleilouti" className={styles.icon_level_two} />}
                  size="small"
                />
              }
              title="二楼"
              value={1}
            />
            <CheckCard
              style={{ width: 130 }}
              avatar={
                <Avatar
                  src={<IconFont type="icon-hangpai1" className={styles.icon_level_air} />}
                  size="small"
                />
              }
              title="空中"
              value={2}
            />
          </CheckCard.Group>
        </ProForm.Item>
        <Divider style={{ margin: '0 0 10px' }} />
        <h4 className={styles.hTitle}>文件上传</h4>
        <ProForm.Item
          style={{ width: '100%' }}
          name="panoramaImgs"
          label="全景图片"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 19 }}
        >
          <Dragger
            listType="picture"
            maxCount={1}
            onChange={onPanoramaChange}
            fileList={defaultFileList}
            beforeUpload={beforeUpload}
            customRequest={async (options) => {
              const { onSuccess }: any = options;
              onSuccess('上传成功');
              return true;
            }}
          >
            <p className="ant-upload-drag-icon">
              {loading ? <LoadingOutlined /> : <PlusOutlined />}
            </p>
            <p className="ant-upload-text">
              {loading ? '正在上传中...' : '单击或拖动文件到此区域进行上传'}
            </p>
            <p className="ant-upload-hint"></p>
          </Dragger>
        </ProForm.Item>
        <ProForm.Item
          style={{ width: '100%' }}
          name="ems_panorama_file"
          label="封面图片"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 19 }}
        >
          <Dragger
            listType="picture"
            maxCount={1}
            onChange={onPosterChange}
            fileList={defaultPosterFileList}
            beforeUpload={beforeUpload}
            customRequest={async (options) => {
              setPosterLoading(true);
              const { onSuccess, onError, file }: any = options;
              const { result, code }: any = await uploadCover({}, file);
              if (code == 200) {
                const fileList: any = [
                  {
                    uid: result.ems_sysfile_id,
                    name: result.ems_sysfile_name,
                    status: 'done',
                    url: `/systemfile${result.ems_sysfile_path}`,
                    thumbUrl: `/systemfile${result.ems_sysfile_path}`,
                  },
                ];
                message.success('上传成功');
                setPosterLoading(false);
                setPosterFile(result);
                setDefaultPosterFileList(fileList);
                onSuccess('上传成功');
              } else {
                setPosterLoading(false);
                message.success('上传失败');
                onError('上传失败');
              }
            }}
          >
            <p className="ant-upload-drag-icon">
              {posterLoading ? <LoadingOutlined /> : <PlusOutlined />}
            </p>
            <p className="ant-upload-text">
              {posterLoading ? '正在上传中...' : '单击或拖动文件到此区域进行上传'}
            </p>
            <p className="ant-upload-hint"></p>
          </Dragger>
        </ProForm.Item>
        <div id="cubemap" style={{ display: 'none' }}>
          <b id="generating" style={{ visibility: 'hidden' }}>
            Generating...
          </b>
          <output id="faces"></output>
        </div>
        <Divider style={{ margin: '0 0 10px' }} />
        <h4 className={styles.hTitle}>更多信息</h4>
        <ProFormTextArea width="lg" label="场景描述" name="ems_panorama_des" />
      </DrawerForm>
    </>
  );
});
export default AddOrEditPanorama;

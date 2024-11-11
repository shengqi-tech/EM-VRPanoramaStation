import { Space, Drawer, Upload, message, Input } from 'antd';
import React, { useImperativeHandle, useState, useRef } from 'react';
import { DrawerForm } from '@ant-design/pro-components';
import { LoadingOutlined, PlusOutlined, createFromIconfontCN } from '@ant-design/icons';
import { loadImage } from '@/utils/panoramaToCubmap.js';
import { batchUploadPanoramaFile } from '@/services/swagger/panoramaController';
import { insertPanorama } from '@/services/swagger/panoramaController';
const { Dragger } = Upload;

const UploadPanorama = React.forwardRef((props: any, ref: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileList, setFileList] = useState<any>([]);
  const [fileListData, setFileListData] = useState<any>([]);
  const [watermark, setWaterMark] = useState('武汉生栖');
  const [loading, setLoading] = useState(false);
  const [submmitLoading, setSubmmitLoading] = useState(false);

  const onPanoramaChange = (info: any) => {
    setFileList(info.fileList);
  };

  const beforeUpload = (file: any) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const img = document.createElement('img');
        img.src = reader.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          const ctx = canvas.getContext('2d')!;
          ctx.drawImage(img, 0, 0);
          ctx.fillStyle = 'red';
          ctx.textBaseline = 'middle';
          ctx.font = '33px Arial';
          ctx.fillText(watermark, 20, 20);
          canvas.toBlob((result) => resolve(result as any));
        };
      };
    });
  };

  const handleOk = async () => {
    let list = [];
    for (var i of fileListData) {
      for (var j of fileList) {
        if (i[0].ems_sysfile_id === j.uid) {
          list.push(i);
        }
      }
    }
    setSubmmitLoading(true);
    const promises = list?.map(async (item) => {
      const formData = {
        ems_panorama_name: item[0].ems_sysfile_name,
        ems_panorama_level: props.levelId,
        ems_panorama_instanceid: props.instanceId,
        ems_panorama_coverfile: item[1],
        ems_panorama_slicefiles: item,
      };
      insertPanorama(formData);
    });
    await Promise.all(promises);
    setSubmmitLoading(false);
    setIsModalOpen(false);
    props.refreshList();
    return true;
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useImperativeHandle(ref, () => ({
    async show(result: any) {
      setIsModalOpen(true);
      setFileListData([]);
      setFileList([]);
    },
  }));
  return (
    <>
      <DrawerForm
        width={600}
        title="全景上传"
        open={isModalOpen}
        loading={submmitLoading}
        onOpenChange={setIsModalOpen}
        onFinish={handleOk}
        // okText="提交"
        // cancelText="取消"
      >
        <Space style={{ marginBottom: '10px' }}>
          <span>水印处理</span>
          <Input
            value={watermark}
            onChange={(e) => {
              setWaterMark(e.target.value);
            }}
          />
        </Space>
        <Dragger
          height={250}
          multiple={true}
          listType="picture"
          onChange={onPanoramaChange}
          fileList={fileList}
          beforeUpload={beforeUpload}
          customRequest={async (options) => {
            const { onSuccess, onError, file }: any = options;
            loadImage(file, (list: any) => {
              let params = list;
              params.unshift(file);
              batchUploadPanoramaFile({}, params).then((res: any) => {
                const { code, result } = res;
                if (code == 200) {
                  fileListData.unshift(result);
                  const newArr = fileListData?.map((item) => {
                    return {
                      uid: item[0].ems_sysfile_id,
                      name: item[0].ems_sysfile_name,
                      status: 'done',
                      url: `/systemfile${item[0].ems_sysfile_path}`,
                      thumbUrl: `/systemfile${item[0].ems_sysfile_path}`,
                    };
                  });
                  setFileList([...newArr]);
                  setFileListData([...fileListData]);
                  onSuccess('上传成功');
                } else {
                  message.success('上传失败');
                  onError('上传失败');
                }
              });
            });
          }}
        >
          <p className="ant-upload-drag-icon">{loading ? <LoadingOutlined /> : <PlusOutlined />}</p>
          <p className="ant-upload-text">
            {loading ? '正在上传中...' : '单击或拖动文件到此区域进行上传'}
          </p>
          <p className="ant-upload-hint"></p>
        </Dragger>
        <div id="cubemap" style={{ display: 'none' }}>
          <b id="generating" style={{ visibility: 'hidden' }}>
            Generating...
          </b>
          <output id="faces"></output>
        </div>
      </DrawerForm>
    </>
  );
});

export default UploadPanorama;

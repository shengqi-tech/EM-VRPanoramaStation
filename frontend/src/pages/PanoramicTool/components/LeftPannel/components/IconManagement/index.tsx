import React, { useImperativeHandle, useState, useRef, useEffect } from 'react';
import { useModel } from 'umi';
import { ProTable } from '@ant-design/pro-components';
import {
  Modal,
  Popconfirm,
  Button,
  Tooltip,
  message,
  Badge,
  Upload,
  List,
  Space,
  Image,
  Tabs,
  Card,
} from 'antd';
import { StarOutlined, DeleteOutlined, CloudUploadOutlined } from '@ant-design/icons';
import {
  uploadTagtype,
  insertTagtype,
  deleteTagtype,
  findTagtypeByMap,
} from '@/services/swagger/tagtypeController';
import './index.less';

export function IconAndText(imgUrl: string | undefined, titleName?: string) {
  return (
    <div>
      <img src={`/systemfile${imgUrl}`} className="icon-img"></img>
      <span className="icon-title">{titleName}</span>
    </div>
  );
}

const renderBadge = (count: number | undefined, active = false) => {
  return (
    <Badge
      count={count}
      style={{
        marginBlockStart: -2,
        marginInlineStart: 4,
        color: active ? '#1890FF' : '#999',
        backgroundColor: active ? '#E6F7FF' : '#eee',
      }}
    />
  );
};

const IconManagement = React.forwardRef((props, ref: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeKey, setActiveKey] = useState<React.Key | undefined>('热点');
  const { labelTypeList, setLabelTypeList } = useModel('PanoramicTool.label', (ret) => ({
    labelTypeList: ret.labelTypeList,
    setLabelTypeList: ret.setLabelTypeList,
  }));

  const beforeUpload = (file: any) => {
    console.log(file.type);
    const isJpgOrPng =
      file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
    if (!isJpgOrPng) {
      message.error('请上传图片形式文件！');
    }
    return isJpgOrPng;
  };

  const refresh = () => {
    findTagtypeByMap({}).then((res) => {
      setLabelTypeList(res?.result);
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useImperativeHandle(ref, () => ({
    showModal,
  }));

  const handleMouseEnter = (id, isDefault) => {
    if (isDefault == 1) {
      return;
    }
    const menuBtn = document.querySelector(`.menuBtn-${id}`);
    if (menuBtn) {
      menuBtn.style.display = 'block';
    }
  };

  const handleMouseLeave = (id) => {
    const menuBtn = document.querySelector(`.menuBtn-${id}`);
    if (menuBtn) {
      menuBtn.style.display = 'none';
    }
  };

  return (
    <div className="iconManagement">
      <Modal
        style={{
          backgroundColor: 'rbga(0, 0, 0, 0.3)',
        }}
        className="iconManagementModal"
        width={750}
        title="图标管理"
        open={isModalOpen}
        footer={false}
        onCancel={handleCancel}
      >
        <Tabs
          onChange={(key) => {
            setActiveKey(key);
          }}
          tabPosition="left"
          items={labelTypeList?.map((item) => {
            return {
              label: (
                <span>
                  {IconAndText(item?.ems_tagtype_iconfile?.ems_sysfile_path, item.ems_tagtype_name)}
                  {/* {renderBadge(
                    item?.ems_tagtype_tagtypes?.length,
                    activeKey === item.ems_tagtype_name,
                  )} */}
                </span>
              ),
              key: String(item.ems_tagtype_name),
              children: (
                <>
                  <div className="header">
                    <div className="title">{item.ems_tagtype_name}</div>
                    <div className="des">
                      <span className="desNum">{item?.ems_tagtype_tagtypes?.length}</span> 个图标
                    </div>
                    <div className="upload">
                      <Upload
                        showUploadList={false}
                        beforeUpload={beforeUpload}
                        customRequest={async (options) => {
                          const { onSuccess, onError, file }: any = options;
                          const { result, code }: any = await uploadTagtype(
                            { type: 'jpg/png', file },
                            {},
                            file,
                          );
                          if (code == 200) {
                            const obj = labelTypeList?.find(
                              (item) => item.ems_tagtype_name == activeKey,
                            );
                            insertTagtype({
                              ems_tagtype_iconfile: result,
                              ems_tagtype_name: '默认名称',
                              ems_tagtype_pid: obj?.ems_tagtype_id,
                              ems_tagtype_type: obj?.ems_tagtype_type,
                            }).then((res) => {
                              refresh();
                              message.success('上传成功');
                              onSuccess('上传成功');
                            });
                          } else {
                            message.success('上传失败');
                            onError('上传失败');
                          }
                        }}
                      >
                        <Button
                          ghost
                          className="btn-upload"
                          key="primary"
                          icon={<CloudUploadOutlined />}
                        >
                          上传图标
                        </Button>
                      </Upload>
                    </div>
                  </div>
                  <List
                    className="list"
                    grid={{ gutter: 10, column: 6 }}
                    dataSource={item?.ems_tagtype_tagtypes || []}
                    renderItem={(item: API.TagtypeVo) => (
                      <List.Item key={item.ems_tagtype_id}>
                        <Card
                          onMouseEnter={() =>
                            handleMouseEnter(item.ems_tagtype_id, item.ems_tagtype_isdefault)
                          }
                          onMouseLeave={() => handleMouseLeave(item.ems_tagtype_id)}
                          className="card"
                          draggable="false"
                          cover={
                            <div className="imgBox" draggable="false">
                              <img
                                alt="暂无"
                                src={`/systemfile${item?.ems_tagtype_iconfile?.ems_sysfile_path}`}
                                draggable="false"
                                className={`${
                                  item?.ems_tagtype_iconfile?.ems_sysfile_type == 'FrameAnimation'
                                    ? 'card-img-animate'
                                    : ''
                                } card-img`}
                              />
                            </div>
                          }
                        >
                          <Card.Meta description={item?.ems_tagtype_name} />
                          <div
                            className={`menuBtn-${item.ems_tagtype_id} menuBtn`}
                            style={{ display: 'none' }}
                          >
                            <div className="iconBox">
                              <StarOutlined className="icon-start" />
                            </div>

                            <div className="iconBox">
                              <Popconfirm
                                title="是否删除！"
                                okText="是"
                                cancelText="否"
                                onConfirm={(e) => {
                                  deleteTagtype({ ems_tagtype_id: item?.ems_tagtype_id }).then(
                                    (res) => {
                                      refresh();
                                      message.success(res.message);
                                    },
                                  );
                                }}
                              >
                                <DeleteOutlined className="icon-delete" />
                              </Popconfirm>
                            </div>
                          </div>
                        </Card>
                      </List.Item>
                    )}
                  />
                </>
              ),
            };
          })}
        />
      </Modal>
    </div>
  );
});
export default IconManagement;

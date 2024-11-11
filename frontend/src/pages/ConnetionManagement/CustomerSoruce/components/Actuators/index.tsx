import { ProList } from '@ant-design/pro-components';
import { Avatar, Space, Tag } from 'antd';
import { findJobGroupByMap } from '../../../../../services/swagger/jobGroupController';

export default () => (
  <ProList<API.XxlJobGroupVo>
    // toolBarRender={() => {
    //   return [
    //     <Button key="3" type="primary">
    //       新建
    //     </Button>,
    //   ];
    // }}
    search={{
      filterType: 'light',
    }}
    rowKey="id"
    headerTitle="执行器列表"
    request={async (params = {} as Record<string, any>) => {
      // 这里需要返回一个 Promise,在返回之前你可以进行数据转化
      // 如果需要转化参数可以在这里进行修改
      const response = await findJobGroupByMap({
        pageNum: params.current,
        // eme_user_customerid:customerid,
        ...params,
      });

      const jobGroup = {
        data: response.result.list,
        /** 列表的内容总数 */
        total: response.result.total,
        // success 请返回 true，
        // 不然 table 会停止解析数据，即使有数据
        success: response.code === 200 ? true : false,
      };
      return jobGroup;
    }}
    pagination={{
      pageSize: 5,
    }}
    showActions="hover"
    metas={{
      title: {
        dataIndex: 'title',
        title: '执行器名字',
      },
      avatar: {
        dataIndex: 'id',
        search: false,
        render: (_, row) => {
          return (
            <Avatar style={{ backgroundColor: '#fde3cf' }} size="small">
              {_}
            </Avatar>
          );
        },
      },
      description: {
        dataIndex: 'addressList',
        search: false,
      },
      subTitle: {
        dataIndex: 'appname',
        title: '执行器appname',
        render: (_, row) => {
          return <Tag color="blue">{_}</Tag>;
        },
      },
      content: {
        dataIndex: 'jobHandlers',
        search: false,
        render: (_, row) => (
          <div
            style={{
              minWidth: 200,

              flex: 1,
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Space>
              <Avatar
                size="small"
                src={`/systemfile${row.customerVo?.ems_customer_logofile?.ems_sysfile_path}`}
              />
              {row.customerVo?.ems_customer_name}

              <div>
                {JSON.parse(_)?.map((jobHandler) => {
                  return (
                    <Tag>
                      {jobHandler?.jobhName} - {jobHandler?.jobhDecs}
                    </Tag>
                  );
                })}
              </div>
            </Space>
          </div>
        ),
      },
      actions: {
        render: (text, row) => [
          // <a href={row.url} target="_blank" rel="noopener noreferrer" key="link">
          //   链路
          // </a>,
          // <a href={row.url} target="_blank" rel="noopener noreferrer" key="warning">
          //   报警
          // </a>,
          // <a href={row.url} target="_blank" rel="noopener noreferrer" key="view">
          //   查看
          // </a>,
        ],
        search: false,
      },
      // status: {
      //   // 自己扩展的字段，主要用于筛选，不在列表中显示
      //   title: '状态',
      //   valueType: 'select',
      //   valueEnum: {
      //     all: { text: '全部', status: 'Default' },
      //     open: {
      //       text: '未解决',
      //       status: 'Error',
      //     },
      //     closed: {
      //       text: '已解决',
      //       status: 'Success',
      //     },
      //     processing: {
      //       text: '解决中',
      //       status: 'Processing',
      //     },
      //   },
      // },
    }}
  />
);

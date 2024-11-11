import React, { useEffect, useState } from 'react';
import { Tree, Typography } from 'antd';
import type { GetProps, TreeDataNode } from 'antd';
import { findCustomerByMap } from '@/services/swagger/customerController';

type DirectoryTreeProps = GetProps<typeof Tree.DirectoryTree>;

const { DirectoryTree } = Tree;
const { Paragraph, Text } = Typography;

const treeData: TreeDataNode[] = [
  {
    title: '武汉生栖',
    key: '0-0',
    children: [
      { title: '研发', key: '0-0-0', isLeaf: true },
      { title: '财务', key: '0-0-1', isLeaf: true },
    ],
  },
];

const DepartmentTree: React.FC = () => {
  const [treeData, setTreeData] = useState<any>([]);
  const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
    console.log('Trigger Select', keys, info);
  };

  const onExpand: DirectoryTreeProps['onExpand'] = (keys, info) => {
    console.log('Trigger Expand', keys, info);
  };

  useEffect(() => {
    findCustomerByMap({}).then((res) => {
      if (res.code == 200) {
        const list = res.result?.list;
        const treeData = list?.map((item) => {
          return {
            title: (
              <span title={item.ems_customer_name}>
                {String(item.ems_customer_name).length > 12
                  ? item.ems_customer_name?.substring(0, 12) + '...'
                  : item.ems_customer_name}
              </span>
            ),
            key: `0-${item.ems_customer_id}`,
            children: [{ title: '研发', key: `0-${item.ems_customer_id}-0`, isLeaf: true }],
          };
        });
        setTreeData(treeData);
      }
    });
  }, []);

  return (
    <DirectoryTree
      multiple
      defaultExpandAll
      onSelect={onSelect}
      onExpand={onExpand}
      treeData={treeData}
    />
  );
};

export default DepartmentTree;

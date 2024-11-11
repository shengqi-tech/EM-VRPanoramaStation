import { DislikeFilled, DislikeOutlined, LikeFilled, LikeOutlined } from '@ant-design/icons';
import { Avatar, Comment, Tooltip, Space, Tabs } from 'antd';
import React, { createElement, useEffect, useState } from 'react';
import { findByStationId } from '@/services/swagger/devicealarmController';
const Notice: React.FC = () => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState<string | null>(null);

  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction('liked');
  };

  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction('disliked');
  };

  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislike}>
        {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
        <span className="comment-action">{dislikes}</span>
      </span>
    </Tooltip>,
    <span key="comment-basic-reply-to">去处理</span>,
  ];

  const onChange = (key: string) => {
    console.log(key);
  };

  useEffect(() => {
    findByStationId({ ems_instance_id: 435 }).then((res) => {
      console.log(res.result);
    });
  }, []);

  const notice = (
    <Space>
      <Comment
        actions={actions}
        author={<a>长沙湘龙街道站</a>}
        avatar={<Avatar src="" alt="" />}
        content={
          '备案参数被修改-备案参数被修改-PM₁₀CM23108009备案参数amb_temp值0.1超出备案范围[0.1,1]'
        }
        datetime={
          <Tooltip title="2016-11-22 11:22:33">
            <span>8 hours ago</span>
          </Tooltip>
        }
      />
    </Space>
  );

  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        onChange={onChange}
        items={[
          {
            label: `待处理`,
            key: '1',
            children: notice,
          },
          {
            label: `已处理`,
            key: '2',
            children: notice,
          },
        ]}
      />
    </div>
  );
};
export default Notice;

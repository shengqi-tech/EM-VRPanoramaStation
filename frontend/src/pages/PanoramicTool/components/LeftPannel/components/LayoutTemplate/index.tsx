import React, { useEffect, useState, useRef } from 'react';
import { useModel } from 'umi';
import { CheckCard } from '@ant-design/pro-components';
import { DoubleLeftOutlined, HeartFilled, HeartOutlined } from '@ant-design/icons';
import { Image } from 'antd';
import './index.less';

export function IconAndText(imgUrl: string | undefined, titleName?: string) {
  return (
    <div>
      <img src={`/systemfile${imgUrl}`} className="title-img"></img>
      <span className="title">{titleName}</span>
    </div>
  );
}
const LayoutTemplate: React.FC = () => {
  const { hobbyList, refreshHobbyList } = useModel('PanoramicTool.layout', (ret) => ({
    refreshHobbyList: ret.refreshHobbyList,
    hobbyList: ret.hobbyList,
  }));

  const { selectMenu } = useModel('PanoramicTool.func', (ret) => ({
    selectMenu: ret.selectMenu,
  }));

  useEffect(() => {
    refreshHobbyList();
  }, []);

  return (
    <>
      <div className="LayoutTemplate">
        <div className="title">
          全局设置
          <DoubleLeftOutlined
            className="titleIcon"
            onClick={() => {
              selectMenu(0);
            }}
          />
        </div>
        <div className="content">
          <p>通用模版</p>
          <CheckCard.Group style={{ width: '280px' }} defaultValue={'A'}>
            <CheckCard
              cover={
                <>
                  <Image
                    width={'100%'}
                    src={require('@/assets/images/panoramicTool/template.png')}
                  />
                </>
              }
              value="A"
            ></CheckCard>
          </CheckCard.Group>
        </div>
        <div className="content">
          <p>
            <HeartOutlined className="icon-like" /> 个人喜欢
          </p>
          <CheckCard.Group style={{ width: '280px' }} defaultValue={'A'}>
            {hobbyList?.map((item) => {
              return (
                <CheckCard
                  key={item.id}
                  cover={
                    <>
                      <Image width={'100%'} height={150} src={`/systemfile${item.cover}`} />
                    </>
                  }
                  value={item.id}
                ></CheckCard>
              );
            })}
          </CheckCard.Group>
        </div>
      </div>
    </>
  );
};
export default LayoutTemplate;

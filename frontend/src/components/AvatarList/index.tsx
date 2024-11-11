/*
 * @Author: hugangyong 609210276@qq.com
 * @Date: 2024-02-03 11:02:59
 * @LastEditors: hugangyong 609210276@qq.com
 * @LastEditTime: 2024-02-03 11:35:57
 * @FilePath: \em360station-backend\src\components\AvatarList\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Avatar, Tooltip } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
import React from 'react';
import classNames from 'classnames';
import styles from './index.less';
const IconFont = createFromIconfontCN({
  scriptUrl: ['/iconfont/iconfont.js'],
});
export declare type SizeType = number | 'small' | 'default' | 'large';

export type AvatarItemProps = {
  tips: React.ReactNode;
  src: string;
  size?: SizeType;
  style?: React.CSSProperties;
  onClick?: () => void;
};

export type AvatarListProps = {
  Item?: React.ReactElement<AvatarItemProps>;
  size?: SizeType;
  maxLength?: number;
  excessItemsStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  children: React.ReactElement<AvatarItemProps> | React.ReactElement<AvatarItemProps>[];
};

const avatarSizeToClassName = (size?: SizeType | 'mini') =>
  classNames(styles.avatarItem, {
    [styles.avatarItemLarge]: size === 'large',
    [styles.avatarItemSmall]: size === 'small',
    [styles.avatarItemMini]: size === 'mini',
  });

const Item: React.FC<AvatarItemProps> = ({ src, size, tips, onClick = () => {} }) => {
  const cls = avatarSizeToClassName(size);

  return (
    <li className={cls} onClick={onClick}>
      {tips ? (
        <Tooltip title={tips}>
          {src.includes('/') ? (
            <Avatar src={src} size={size} style={{ cursor: 'pointer' }} />
          ) : (
            <IconFont
              type={src}
              style={{ verticalAlign: 'middle', marginTop: '-4px', marginRight: '13px' }}
            />
          )}
        </Tooltip>
      ) : (
        <Avatar src={src} size={size} />
      )}
    </li>
  );
};

const AvatarList: React.FC<AvatarListProps> & { Item: typeof Item } = ({
  children,
  size,
  maxLength = 5,
  excessItemsStyle,
  ...other
}) => {
  const numOfChildren = React.Children.count(children);
  const numToShow = maxLength >= numOfChildren ? numOfChildren : maxLength;
  const childrenArray = React.Children.toArray(children) as React.ReactElement<AvatarItemProps>[];
  const childrenWithProps = childrenArray.slice(0, numToShow).map((child) =>
    React.cloneElement(child, {
      size,
    }),
  );

  if (numToShow < numOfChildren) {
    const cls = avatarSizeToClassName(size);

    childrenWithProps.push(
      <li key="exceed" className={cls}>
        <Avatar size={size} style={excessItemsStyle}>{`+${numOfChildren - maxLength}`}</Avatar>
      </li>,
    );
  }

  return (
    <div {...other} className={styles.avatarList}>
      <ul> {childrenWithProps} </ul>
    </div>
  );
};

AvatarList.Item = Item;

export default AvatarList;

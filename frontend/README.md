## **一、引用库**

### 1、react-beautiful-dnd

> 拖拽可排序组件，用于工具底部全景排序

### 2、react-rnd

> 拖拽布局组件，用于工具全局布局

### 3、re-resizable

> 自由拖拽调整 div 宽高组件，用于工具每一块

### 4、qrcode.react

> 二维码转换

### 5、@ant-design/plots

> antd 简单图标

## **二、样式命名规则**

### 1、 下划线 "-" 分割式命名

```css
.head-title {
}
```

### 2、嵌套中使用符号 & 代替父元素

```css
.btn { // ... &.active { color: #fff; } }
```

### 3、公共变量

```css
// 间距-大 @space-large: 36px; // 间距-中 @space-middle: 24px; // 间距-小 @space-small: 12px; // 主题色 @theme-color: #0094ff;
```

```css
.container {
  width: @container-width;
  min-width: @container-width;
  margin: 0 auto;
}
```

### 4、less 图片引用使用绝对路径

```css
background: url('~@/assets/images/...') no-repeat;
```

## **三、问题集**

1、装依赖遇到 “Module ‘xxx‘ does not exist in container” 删除.umi 文件再启动！

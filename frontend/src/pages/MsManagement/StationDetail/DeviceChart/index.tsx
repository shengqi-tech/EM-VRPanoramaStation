import React, { useEffect } from 'react';
import * as echarts from 'echarts';
import bottle from '@/assets/images/panorama/station/氧气瓶.png';
import device from '@/assets/images/panorama/station/分析仪.png';
import detection from '@/assets/images/panorama/station/探测器.png';
import camera from '@/assets/images/panorama/station/摄像头.png';
import station from '@/assets/images/panorama/station/站房.png';
import instrument from '@/assets/images/panorama/station/仪器.png';

const DeviceChart = React.forwardRef((props: any, ref: any) => {
  useEffect(() => {
    var el: any = document.getElementById('deviceChart');
    var myChart = echarts.init(el);
    var nodes = [
      {
        nodeName: 'CO',
        value: [80, 250],
        symbolSize: 50,
        symbol: `image://${bottle}`,
        itemStyle: {
          color: '#D9001B',
        },
        label: {
          color: '#0faaff',
          fontSize: 15,
        },
      },
      {
        nodeName: 'SO2',
        value: [120, 250],
        symbolSize: 50,
        symbol: `image://${bottle}`,
        itemStyle: {
          color: '#D9001B',
        },
        label: {
          color: '#0faaff',
          fontSize: 15,
        },
      },
      {
        nodeName: 'NO',
        value: [160, 250],
        symbolSize: 50,
        tpfl: '1120.08',
        symbol: `image://${bottle}`,
        itemStyle: {
          color: '#D9001B',
        },
        label: {
          color: '#0faaff',
          fontSize: 15,
        },
      },
      {
        nodeName: '站房',
        value: [390, 200],
        symbolSize: 45,
        symbol: `image://${station}`,
        itemStyle: {
          color: '#3b80c3',
        },
        label: {
          fontSize: 15,
          color: '#3b80c3',
        },
      },
      {
        nodeName: '称采一体机',
        value: [660, 180],
        symbolSize: 160,
        symbol: `image://${instrument}`,
        itemStyle: {
          color: '#3b80c3',
        },
        label: {
          fontSize: 20,
          fontWeight: 'bold',
          color: '#3b80c3',
        },
      },
      {
        nodeName: 'NOx分析仪',
        value: [310, 300],
        symbolSize: 80,
        symbol: `image://${device}`,
        itemStyle: {
          color: '#3b80c3',
        },
        label: {
          fontSize: 15,
        },
      },
      {
        nodeName: 'NOx分析仪',
        value: [310, 200],
        symbolSize: 80,

        tpfl: '1936.48',
        symbol: `image://${device}`,
        itemStyle: {
          color: '#3b80c3',
        },
        label: {
          fontSize: 15,
        },
      },
      {
        nodeName: 'NOx分析仪',
        value: [310, 100],
        symbolSize: 80,

        symbol: `image://${device}`,
        itemStyle: {
          color: '#3b80c3',
        },
        label: {
          fontSize: 15,
        },
      },
      {
        nodeName: 'NOx分析仪',
        value: [470, 300],
        symbolSize: 80,

        symbol: `image://${device}`,
        itemStyle: {
          color: '#3b80c3',
        },
        label: {
          fontSize: 15,
        },
      },
      {
        nodeName: 'NOx分析仪',
        value: [470, 200],
        symbolSize: 80,

        tpfl: '790.9',
        symbol: `image://${device}`,
        itemStyle: {
          color: '#3b80c3',
        },
        label: {
          fontSize: 15,
        },
      },
      {
        nodeName: 'NOx分析仪',
        value: [470, 100],
        symbolSize: 80,

        tpfl: '790.9',
        symbol: `image://${device}`,
        itemStyle: {
          color: '#3b80c3',
        },
        label: {
          fontSize: 15,
        },
      },
      {
        nodeName: '采样头',
        value: [310, 520],
        symbolSize: 50,

        symbol: `image://${detection}`,
        itemStyle: {
          color: '#FFFF00',
        },
        label: {
          fontSize: 15,
          color: '#707070',
        },
      },
      {
        nodeName: '采样头',
        value: [470, 520],
        symbolSize: 50,

        symbol: `image://${detection}`,
        label: {
          color: '#707070',
          fontSize: 15,
        },
      },
      {
        nodeName: '空调',
        value: [630, 480],
        symbolSize: 40,

        symbol:
          'path:// M1192.463515 145.190788v77.575757H172.838788v-77.575757z M1192.463515 211.657697v77.575758H172.838788v-77.575758zM913.935515 670.999273c20.076606 0 36.615758 15.266909 38.570667 34.816l0.217212 3.971879v258.172121a38.787879 38.787879 0 0 1-77.389576 3.940848l-0.186182-3.971879v-258.172121c0-21.410909 17.37697-38.787879 38.787879-38.787879z M770.699636 754.65697a38.787879 38.787879 0 0 1 49.338182-15.732364l3.723637 1.923879 219.632484 129.08606a38.787879 38.787879 0 0 1-35.560727 68.825213l-3.754667-1.95491-219.601454-129.08606a38.787879 38.787879 0 0 1-13.777455-53.061818z M1004.078545 740.848485a38.787879 38.787879 0 0 1 42.821819 64.54303l-3.506425 2.358303-219.601454 129.086061a38.787879 38.787879 0 0 1-42.821818-64.543031l3.506424-2.358303 219.601454-129.08606zM327.773091 670.409697a38.787879 38.787879 0 0 1 44.869818 26.189576l1.024 3.847757 17.066667 81.764849c5.988848 29.168485-4.654545 61.129697-28.175515 77.606788l-2.513455 1.582545 23.676121 98.800485a38.787879 38.787879 0 0 1-24.855272 45.614545l-3.816728 1.117091a38.787879 38.787879 0 0 1-45.614545-24.855272l-1.148121-3.816728-23.893334-99.669333c-7.850667-32.985212 5.988848-69.911273 36.336485-83.843879l-4.778667 2.389334a3.971879 3.971879 0 0 0-1.179151 0.775757l-17.066667-81.609697a38.787879 38.787879 0 0 1 30.068364-45.924848zM478.083879 670.409697a38.787879 38.787879 0 0 1 44.900848 26.220606l0.99297 3.816727 17.066667 81.733818c6.019879 29.168485-4.654545 61.129697-28.144485 77.637819l-2.544485 1.582545 23.676121 98.800485a38.787879 38.787879 0 0 1-24.886303 45.614545l-3.816727 1.117091a38.787879 38.787879 0 0 1-45.614546-24.855272l-1.117091-3.816728-23.893333-99.669333c-7.850667-32.985212 5.988848-69.911273 36.336485-83.812848l-4.778667 2.358303-1.179151 0.837818-17.066667-81.671758a38.787879 38.787879 0 0 1 30.099394-45.924848zM628.363636 670.409697a38.787879 38.787879 0 0 1 44.900849 26.189576l0.99297 3.847757 17.066666 81.733818c6.081939 29.354667-4.747636 61.595152-28.609939 77.979152l-2.048 1.272242 23.676121 98.769455a38.787879 38.787879 0 0 1-24.855273 45.614545l-3.816727 1.117091a38.787879 38.787879 0 0 1-45.614545-24.855272l-1.148122-3.816728-23.893333-99.669333c-7.881697-32.985212 5.988848-69.911273 36.336485-83.843879l-4.778667 2.389334a4.096 4.096 0 0 0-1.179151 0.775757l-17.066667-81.609697a38.787879 38.787879 0 0 1 30.037333-45.924848zM1015.125333 566.30303v77.575758H328.021333v-77.575758z M1212.043636 23.272727H131.10303C71.400727 23.272727 23.303758 73.231515 23.303758 133.740606L23.272727 544.519758c0 57.219879 44.931879 110.467879 95.449212 110.467878l178.672485-0.06206-0.03103-140.101818H1045.721212v140.101818l178.734546 0.03103c50.517333 0 95.449212-53.21697 95.449212-110.467879L1319.873939 133.740606c0-60.509091-48.09697-110.467879-107.861333-110.467879zM131.10303 100.848485H1212.043636c16.228848 0 30.285576 14.584242 30.285576 32.892121v410.779152l-0.217212 3.878787c-1.768727 15.484121-13.498182 28.982303-17.625212 28.982303l-101.158788-0.03103v-65.473939c0-40.804848-32.550788-74.596848-73.293576-74.596849H293.174303l-5.08897 0.155152c-38.322424 2.668606-68.266667 35.374545-68.266666 74.472727l-0.031031 65.442909-101.096727 0.03103c-4.468364 0-17.842424-15.856485-17.842424-32.892121L100.879515 133.740606c0-18.307879 14.025697-32.892121 30.254546-32.892121z',
        itemStyle: {
          color: '#0faaff',
        },
        label: {
          color: '#0faaff',
          fontSize: 15,
        },
      },
      {
        nodeName: '摄像头',
        value: [80, 480],
        symbolSize: 40,

        symbol: `image://${camera}`,
        itemStyle: {
          color: '#0faaff',
        },
        label: {
          color: '#0faaff',
          fontSize: 15,
        },
      },
      {
        nodeName: '摄像头',
        value: [700, 480],
        symbolSize: 40,

        symbol: `image://${camera}`,
        itemStyle: {
          color: '#0faaff',
        },
        label: {
          color: '#0faaff',
          fontSize: 15,
        },
      },
    ];
    var charts = {
      nodes: [],
      linesData: [
        // 气管 线
        {
          lineStyle: {
            type: 'dashed',
            width: 1,
            color: '#02a7f0',
            curveness: 0.3,
          },
          effect: {
            show: true,
            symbolSize: 0.0001,
          },
          name: '12',
          coords: [
            [50, 320],
            [70, 340],
            [170, 340],
            [190, 320],
            [190, 160],
            [170, 140],
            [70, 140],
            [50, 160],
            [50, 320],
          ],
        },
        // 中间外框 线
        {
          lineStyle: {
            type: 'dashed',
            width: 1,
            color: '#02a7f0',
            curveness: 0.3,
          },
          effect: {
            show: true,
            symbolSize: 0.0001,
          },
          name: '12',
          coords: [
            [260, 400],
            [520, 400],
            [520, 40],
            [260, 40],
            [260, 400],
          ],
        },
        // 内框线
        {
          lineStyle: {
            type: 'dashed',
            width: 1,
            color: '#b8dbf6',
            curveness: 0.3,
          },
          effect: {
            show: true,
            trailLength: 0.5,
            symbolSize: 0.0001,
          },
          name: '12',
          coords: [
            [310, 300],
            [310, 100],
            [470, 100],
            [470, 300],
            [310, 300],
          ],
        },
        // 最左侧四根
        {
          lineStyle: {
            width: 2,
            color: '#4b7902',
            curveness: 0.3,
          },
          name: '12',
          coords: [
            [190, 170],
            [260, 170],
          ],
        },
        {
          lineStyle: {
            width: 2,
            color: '#00ffff',
            curveness: 0.3,
          },
          name: '12',
          coords: [
            [190, 215],
            [260, 215],
          ],
        },
        {
          lineStyle: {
            width: 2,
            color: '#7f7f7f',
            curveness: 0.3,
          },
          name: '12',
          coords: [
            [190, 260],
            [260, 260],
          ],
        },
        {
          lineStyle: {
            width: 2,
            color: '#d9001b',
            curveness: 0.3,
          },
          name: '12',
          coords: [
            [190, 305],
            [260, 305],
          ],
        },
        // 上面两根
        {
          lineStyle: {
            width: 2,
            color: '#7b7e85',
            curveness: 0.3,
          },
          name: '12',
          coords: [
            [310, 340],
            [310, 500],
          ],
        },
        {
          lineStyle: {
            width: 2,
            color: '#d9001b',
            curveness: 0.3,
          },
          name: '12',
          coords: [
            [470, 340],
            [470, 500],
          ],
        },
        //右边四根
        {
          lineStyle: {
            width: 2,
            color: '#4b7902',
            curveness: 0.3,
          },
          name: '12',
          coords: [
            [520, 210],
            [595, 210],
          ],
        },
        {
          lineStyle: {
            width: 2,
            color: '#00ffff',
            curveness: 0.3,
          },
          name: '12',
          coords: [
            [520, 230],
            [595, 230],
          ],
        },
        {
          lineStyle: {
            width: 2,
            color: '#7f7f7f',
            curveness: 0.3,
          },
          name: '12',
          coords: [
            [520, 250],
            [595, 250],
          ],
        },
        {
          lineStyle: {
            width: 2,
            color: '#d9001b',
            curveness: 0.3,
          },
          name: '12',
          coords: [
            [520, 270],
            [595, 270],
          ],
        },
      ],
    };
    const option = {
      tooltip: {
        //弹窗
        enterable: true, //鼠标是否可进入提示框浮层中
        backgroundColor: 'rgba(11,28,88,0.8)', //背景颜色（此时为默认色）
        borderRadius: 8, //边框圆角
        borderColor: '#00fcfd',
        borderWidth: 2,
        formatter: function (params) {
          if (params.componentSubType == 'graph') {
            if (params.data.nodeName != '') {
              var showText =
                "<div style='color:#fff' >设备名称：" +
                params.data.nodeName +
                '<br/>' +
                "<div style='color:#fff' >设备品牌：" +
                '<br/>' +
                "<div style='color:#fff' >设备型号：" +
                '<br/>';
              if (params.color == '#D9001B') {
                // showText += '电压等级：550kV <br/>';
              }
              return showText;
            }
          }
        }, //修改鼠标悬停显示的内容
      },
      xAxis: {
        min: 0,
        max: 840,
        show: false,
        type: 'value',
      },
      yAxis: {
        min: 0,
        max: 520,
        show: false,
        type: 'value',
      },
      series: [
        {
          type: 'graph',
          coordinateSystem: 'cartesian2d',
          label: {
            show: true,
            position: 'bottom',
            color: '#ffffff',
            formatter: function (item) {
              return item.data.nodeName;
            },
          },
          data: nodes,
        },
        {
          type: 'lines',
          polyline: true,
          coordinateSystem: 'cartesian2d',
          lineStyle: {
            type: 'solid',
            width: 2,
            color: '#65a6d7',
            curveness: 0.3,
          },
          effect: {
            show: true,
            trailLength: 0.1,
            symbol: 'arrow',
            color: 'orange',
            symbolSize: 8,
          },
          data: charts.linesData,
        },
      ],
    };

    myChart.setOption(option);
  }, []);

  return (
    <>
      <div id="deviceChart" style={{ width: '100%', height: '500px' }}></div>
    </>
  );
});
export default DeviceChart;

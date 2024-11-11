import React, { useEffect } from 'react';
import './index.less';
import * as echarts from 'echarts';

const LineEchart = React.forwardRef((props: any, ref: any) => {
  useEffect(() => {
    var el: any = document.getElementById('totalLineEchart');
    var myChart = echarts.init(el);
    function random(min, max) {
      return parseInt(Math.random() * (max - min) + min);
    }

    var barWidth = 30;
    var imgurl =
      'data:image/png;base64,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';
    //背景图片不接受百分比，只接受数值，获取图表的宽度实现动态背景宽度
    var imgwidth = myChart.getWidth();

    let xData = ['2022/9/6', '2022/9/7', '2022/9/8', '2022/9/9', '2022/9/10'],
      yData = [],
      barData = [],
      maxData = [125, 125, 125, 125, 125];

    for (let i = 0; i < xData.length; i++) {
      let value = random(5, 100);
      yData.push(value);
      barData.push(parseInt((value / 3) * 2 * (random(1, 100) / 100)));
    }

    const option = {
      grid: {
        top: '10%',
        left: '5%',
        bottom: '5%',
        right: '5%',
        containLabel: true,
      },
      tooltip: {
        trigger: 'item',
      },
      animation: false,
      xAxis: [
        {
          show: true,
          type: 'category',
          data: xData,
          axisTick: {
            alignWithLabel: true,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: '#fff',
            },
            margin: 30,
          },
          interval: 1,
        },
      ],
      graphic: {
        type: 'image',
        id: 'logo',
        left: 100,
        bottom: 75,
        z: 0,
        left: 'center',
        style: {
          image: imgurl,
          width: imgwidth - 100,
          height: 68,
        },
      },
      yAxis: [
        {
          splitLine: {
            lineStyle: {
              color: '#ffffff4C',
              type: 'solid',
            },
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: true,
          },
          axisLabel: {
            textStyle: {
              color: '#fff',
              fontSize: '12',
            },
          },
        },
      ],
      series: [
        {
          name: '上部圆',
          type: 'pictorialBar',
          silent: true,
          symbolSize: [40, 10],
          symbolOffset: [0, -6],
          symbolPosition: 'end',
          z: 20,
          zlevel: 10,
          data: maxData,
          itemStyle: {
            color: '#52efff',
            opacity: 0.3,
          },
        },
        {
          name: '底部圆',
          type: 'pictorialBar',
          silent: true,
          symbolSize: [40, 10],
          symbolOffset: [0, 7],
          z: 11,
          // color: '#5BFCF4',
          data: yData,
          itemStyle: {
            color: '#5BFCF4',
          },
        },
        {
          name: '背景圆柱',
          type: 'bar',
          barWidth: '40',
          barGap: '10%', // Make series be overlap
          barCateGoryGap: '10%',
          z: 16,
          itemStyle: {
            normal: {
              color: '#0788ff',
              opacity: 0.2,
            },
          },
          data: maxData,
        },
        {
          name: '内部柱子',
          type: 'bar',
          barWidth: 40,
          z: 19,
          barGap: '-100%',
          itemStyle: {
            // opacity: 0.7,
            color: function (params) {
              return new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: '#028cf3', // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#0bc2ff', // 100% 处的颜色
                  },
                ],
                false,
              );
            },
          },
          data: barData,
        },
        {
          name: '上部圆',
          type: 'pictorialBar',
          silent: true,
          symbolSize: [40, 10],
          symbolOffset: [0, -6],
          symbolPosition: 'end',
          z: 22,
          color: '#52efff',
          data: barData,
        },
        {
          name: '底部圆',
          type: 'pictorialBar',
          silent: true,
          symbolSize: [40, 10],
          symbolOffset: [0, 7],
          z: 21,
          itemStyle: {
            color: 'rgb(0,134,234)',
          },
          data: barData,
        },
      ],
    };

    myChart.setOption(option);
  }, []);

  return (
    <>
      <div id="totalLineEchart" style={{ width: '100%', height: '50vh' }}></div>
    </>
  );
});
export default LineEchart;

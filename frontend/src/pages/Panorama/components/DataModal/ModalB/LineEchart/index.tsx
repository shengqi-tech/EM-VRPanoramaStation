import React, { useEffect } from 'react';
import './index.less';
import * as echarts from 'echarts';

const LineEchart = React.forwardRef((props: any, ref: any) => {
  useEffect(() => {
    const propData = props.data || [];
    const data = propData?.flat() || [];
    const timeData = data[0]?.map((item) => {
      return item.time;
    });
    let dataZoom = [
      {
        show: true,
        type: 'slider',
        filterMode: 'none',
      },
    ];
    var el: any = document.getElementById('lineEchart');
    var myChart = echarts.init(el);
    let seriesArr: any = [];
    const option = {
      legend: {
        textStyle: {
          fontSize: 16,
          fontWeight: 'bold',
          color: '#fff',
          padding: [0, 8],
        },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
        },
      },
      grid: {
        top: '10%',
        left: '3%',
        right: '4%',
        bottom: '10%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: timeData,
          boundaryGap: false,
          splitLine: {
            show: false,
            lineStyle: {
              type: 'dashed',
              color: 'rgba(230, 247, 255, 0.20)',
            },
          },
          axisLine: {
            lineStyle: {
              color: '#ffffff',
            },
          },
          //x底部文字
          axisLabel: {
            textStyle: {
              padding: [0, 0, 0, 0], //表示 [上, 右, 下, 左] 的边距。
              color: '#ffffff',
              fontSize: 14,
            },
          },
        },
      ],
      dataZoom,
      yAxis: [
        {
          type: 'value',
          //y右侧文字
          axisLabel: {
            textStyle: {
              color: '#fff',
              fontSize: 14,
            },
          },
          // y轴的分割线
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed',
              color: 'rgba(230, 247, 255, 0.20)',
            },
          },
        },
      ],
      series: seriesArr,
    };
    data?.forEach((item, index) => {
      const key = item[0]?.polltant || '';
      const data1 = item?.map((i) => {
        return { value: i?.hisValue };
      });
      const data2 = item?.map((i) => {
        return [i?.time, i?.hisValue];
      });
      seriesArr.push(
        {
          name: `${key}`,
          type: 'line',
          smooth: false,
          symbol: 'circle', //拐点设置为实心
          symbolSize: 2, //拐点大小
          itemStyle: {
            normal: {
              borderColor: 'rgba(42,157,255,.2)', //拐点边框颜色
              borderWidth: 10, //拐点边框大小，
            },
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: 'line', // 默认为直线，可选为：'line' | 'shadow'
            },
          },
          lineStyle: {
            normal: {
              width: 3,
              shadowColor: '#1890FF',
              shadowBlur: 20,
            },
          },
          areaStyle: {
            opacity: 1,
            //右下左上
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: 'rgba(24, 144, 255, 0.1)',
              },
              {
                offset: 1,
                color: 'rgba(24, 144, 255, 0)',
              },
            ]),
          },
          data: data1,
        },
        {
          name: `${key}`,
          type: 'lines',
          coordinateSystem: 'cartesian2d',
          symbolSize: 8,
          polyline: true, // 多线段
          effect: {
            show: true,
            period: 5,
            trailLength: 0.3,
            symbolSize: 11,
            symbol: 'circle',
          },
          lineStyle: {
            normal: {
              width: 1,
              opacity: 0,
            },
          },
          // 光点
          data: [
            {
              coords: [[]],
            },
          ],
        },
      );
    });
    myChart.setOption(option);
  }, []);

  return (
    <>
      <div id="lineEchart" style={{ width: '100%', height: '100%' }}></div>
    </>
  );
});
export default LineEchart;

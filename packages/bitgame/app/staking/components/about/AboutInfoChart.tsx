'use client';

import * as echarts from 'echarts';
import {useCallback} from 'react';

/**
 * 获取饼图配置
 * @param {Array<number>} list 数据列表
 */
const getChartConfig = (list: number[]) => {
  // 颜色配置
  const colors = ['#009C66', '#FFA700', '#ED4444', '#2D6AF8'];
  // 数据
  const data: any[] = [];
  // 颜色
  const color: string[] = [];

  for (const item of list) {
    if (colors.length > 0) {
      color.push(colors.shift() as string);

      data.push({value: item});
    }
  }

  return {
    color,
    series: [
      {
        type: 'pie',
        radius: ['60%', '100%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '40',
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data,
      },
    ],
  };
};

/**
 * 饼图
 * @param {number[]} props.chartData 饼图数据
 * @returns
 */
const AboutInfoChart = (props: {chartData: number[]}): JSX.Element => {
  const {chartData = []} = props;

  const handleChartDom = useCallback(node => {
    if (node) {
      const chart = echarts.init(node);

      const option = getChartConfig(chartData);
      chart.setOption(option as any, true);
    }
  }, []);

  return <div ref={handleChartDom}></div>;
};

export default AboutInfoChart;

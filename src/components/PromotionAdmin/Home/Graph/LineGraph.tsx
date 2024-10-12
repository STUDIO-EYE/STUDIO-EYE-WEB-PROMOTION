import React from 'react';
import { ResponsiveLine } from '@nivo/line';

type LineGraphProps = {
  data: { x: string; y: number }[];
  division: 'view' | 'request';
};

const LineGraph = ({ data, division }: LineGraphProps) => {
  const colors = division === 'request' ? ['#0064FF'] : ['#E16262'];

  // 데이터의 y값을 모아서 최대값 계산
  const yValues = data.map(d => d.y);
  const maxY = Math.max(...yValues);
  const tickValues = Array.from({ length: maxY + 1 }, (_, i) => i); // 0부터 maxY까지 배열 생성

  return (
    <div style={{ height: '300px', width: '530px' }}>
      <ResponsiveLine
        data={[{ id: 'count', data }]}
        colors={colors}
        margin={{ top: 10, right: 30, bottom: 50, left: 30 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 0,
          max: 'auto',
          stacked: true,
          reverse: false,
        }}
        yFormat={(value) => Math.round(Number(value)).toString()}
        curve='linear'
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: '',
          legendOffset: 36,
          legendPosition: 'middle',
          truncateTickAt: 0,
          format: (value) => {
            const parts = value.split(' ');
            if (parts.length === 2) {
              return parts[1];
            }
            return value;
          },
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: '',
          legendOffset: -40,
          legendPosition: 'middle',
          truncateTickAt: 0,
          tickValues: tickValues,
          format: (value) => Math.round(value).toString(),
        }}
        enablePoints={true}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        enableArea={true}
        enableTouchCrosshair={true}
        useMesh={true}
        tooltip={(tooltip) => {
          return (
            <div
              style={{
                background: '#ffffff80',
                backdropFilter: 'blur(20px)',
                padding: '15px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                zIndex: 20,
              }}
            >
              <div style={{ fontSize: '0.9em', fontFamily: 'pretendard-medium' }}>
                <strong>{tooltip.point.data.xFormatted}</strong>
              </div>
              <div style={{ marginTop: '5px', fontFamily: 'pretendard-semibold' }}>
                {division === 'request' ? '문의 수' : '조회 수'} {Math.round(Number(tooltip.point.data.y))}
              </div>
            </div>
          );
        }}
      />
    </div>
  );
};

export default LineGraph;

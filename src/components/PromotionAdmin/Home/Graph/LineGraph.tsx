import React from 'react';
import { ResponsiveLine } from '@nivo/line';

type LineGraphProps = {
  data: { x: string; y: number }[];
  division: 'view' | 'request';
};

const LineGraph = ({ data, division }: LineGraphProps) => {
  const colors = division === 'request' ? ['#0064FF'] : ['#E16262'];

  const yValues = data.map((d) => d.y);
  const maxY = Math.max(...yValues); // 최대값 계산
  const numberOfTicks = 5; // 원하는 tick 개수
  let tickValues: number[] = [];
  // yValues가 비어 있지 않은 경우에만 tickValues를 계산
  if (maxY > 0) {
    const interval = maxY / (numberOfTicks - 1); // 간격 계산
    tickValues = Array.from({ length: numberOfTicks }, (_, index) => Math.round(index * interval));
  } else {
    // 데이터가 없을 경우 tickValues는 [0]으로 설정
    tickValues = [0];
  }

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
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: '',
          legendOffset: -40,
          legendPosition: 'middle',
          tickValues: tickValues,
        }}
        enableGridX={true}
        enableGridY={true}
        animate={true}
        enablePoints={true}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabel={(d) => `${d.y}`}
        pointLabelYOffset={-12}
        enablePointLabel={false} // 포인트 레이블 비활성화
        enableArea={true}
        areaOpacity={0.3}
        areaBaselineValue={0}
        areaBlendMode='normal'
        lineWidth={2}
        legends={[]} // 범례 비활성화
        isInteractive={true}
        debugMesh={false}
        enableSlices='x' // 슬라이스 활성화
        debugSlices={false}
        enableCrosshair={true}
        crosshairType='bottom-left'
        role='application'
        defs={[]} // 그래프 패턴 정의
        fill={[]} // 채우기 스타일 정의
        useMesh={true}
        layers={['grid', 'markers', 'axes', 'areas', 'lines', 'points', 'slices', 'mesh', 'legends']} // 필수 추가
        sliceTooltip={({ slice }) => (
          <div
            style={{
              background: '#fff',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
            }}
          >
            {slice.points.map((point) => (
              <div key={point.id} style={{ color: point.serieColor, fontSize: '12px' }}>
                <strong>{point.data.xFormatted}</strong>: {point.data.yFormatted}
              </div>
            ))}
          </div>
        )}
        tooltip={(tooltip) => (
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
        )}
      />
    </div>
  );
};

export default LineGraph;

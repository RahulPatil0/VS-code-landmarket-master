import React, { useEffect, useRef } from 'react';

const Report = () => {
  const barChartRef = useRef(null);
  const pieChartRef = useRef(null);

  useEffect(() => {
    const barChart = barChartRef.current.getContext('2d');
    const pieChart = pieChartRef.current.getContext('2d');

    // Example data
    const data = {
      totalProperties: 200,
      soldProperties: 150,
    };

    // Draw Bar Chart
    barChart.fillStyle = 'white';
    barChart.fillRect(0, 0, 400, 200);
    
    barChart.fillStyle = 'rgba(75, 192, 192, 0.2)';
    barChart.fillRect(50, 150 - (data.totalProperties / 2), 100, data.totalProperties / 2);
    
    barChart.fillStyle = 'rgba(255, 99, 132, 0.2)';
    barChart.fillRect(200, 150 - (data.soldProperties / 2), 100, data.soldProperties / 2);
    
    barChart.fillStyle = 'black';
    barChart.font = '16px Arial';
    barChart.fillText('Total Properties', 50, 180);
    barChart.fillText('Sold Properties', 200, 180);

    // Draw Pie Chart
    const total = data.totalProperties;
    const sold = data.soldProperties;
    const available = total - sold;

    const drawPieSegment = (ctx, startAngle, endAngle, color) => {
      ctx.beginPath();
      ctx.moveTo(150, 100);
      ctx.arc(150, 100, 100, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
    };

    let startAngle = 0;
    let endAngle = (2 * Math.PI * sold) / total;
    drawPieSegment(pieChart, startAngle, endAngle, 'rgba(54, 162, 235, 0.2)');
    
    startAngle = endAngle;
    endAngle += (2 * Math.PI * available) / total;
    drawPieSegment(pieChart, startAngle, endAngle, 'rgba(255, 206, 86, 0.2)');

    pieChart.fillStyle = 'black';
    pieChart.font = '16px Arial';
    pieChart.fillText('Sold', 200, 50);
    pieChart.fillText('Available', 200, 80);
  }, []);

  return (
    <div>
      <h1>Welcome to the admin Report Page</h1>
      <div style={{ width: '600px', margin: 'auto' }}>
        <canvas ref={barChartRef} width="400" height="200" />
        <canvas ref={pieChartRef} width="400" height="200" />
      </div>
    </div>
  );
};

export default Report;

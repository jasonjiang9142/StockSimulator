import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);



const StockChart = ({ priceProgressionDates, priceProgressionRois, maxTicks = 20 }) => {

  // Process data for Chart.js
  const chartData = {
    labels: priceProgressionDates,  // Use priceProgressionDates for X-axis
    datasets: [
      {
        label: 'ROI',  // Label for the line
        data: priceProgressionRois,  // Use priceProgressionRois for Y-axis
        borderColor: '#037b66',  // Line color
        backgroundColor: '#037b66',  // Fill color under the curve
        fill: false,  // Fill the area under the curve
        pointRadius: 0,  // Radius of points on the line
        pointHoverRadius: 1,  // Hover effect for points
        tension: 0,  // Smoothing of the line
      },
    ],
  };

  // Chart options for better design
  const chartOptions = {
    animation: {
      duration: 1000,  // Duration of the animation in milliseconds
      easing: 'easeInOutQuad',  // Easing function for the animation
    },
    responsive: true,
    plugins: {
      title: {
        display: false,
        text: 'Stock Price Progression',
        font: {
          size: 24,
        },
      },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
      },
      legend: {
        position: 'bottom',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)',
        },
        ticks: {
          maxTicksLimit: maxTicks,  // Limit the number of ticks to 10 to prevent crowding
          autoSkip: true,  // Auto-skip labels to avoid overlapping
        },
      },
      y: {
        title: {
          display: true,
          text: 'Return on Investment',
        },
        grid: {
          display: true,
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  };

  return (
    <div className="px-4 py-3">
      {priceProgressionDates.length > 0 && priceProgressionRois.length > 0 ? (
        <div>
          <h1 className='text-center font-semibold text-lg pb-4'>Your Total Returns Throughout the Years</h1>
          <div className="relative w-10/12 mx-auto">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-lg text-gray-500">Waiting for data for the stock chart...</p>
        </div>
      )}
    </div>
  );
};

export default StockChart;

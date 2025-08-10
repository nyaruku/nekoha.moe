// components/chart.jsx
import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

export default function ChartComp({ data }) {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const top150 = [...data]
      .sort((a, b) => b.message_count - a.message_count)
      .slice(0, 150);

    const labels = top150.map(entry => entry.username || `User ${entry.user_id}`);
    const counts = top150.map(entry => entry.message_count);

    if (chartInstanceRef.current) {
      // Update chart data & labels without destroying
      chartInstanceRef.current.data.labels = labels;
      chartInstanceRef.current.data.datasets[0].data = counts;
      chartInstanceRef.current.update();
      return;
    }

    const ctx = chartRef.current.getContext('2d');
    chartInstanceRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Count',
          data: counts,
          backgroundColor: '#FFF',
          borderColor: '#000',
          borderWidth: 0,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, // important to keep height fixed by container
        plugins: {
          legend: { display: false },
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
              title: (ctx) => {
                const rank = ctx[0].dataIndex + 1;
                return `#${rank}`;
              },
              label: (ctx) => {
                return `${ctx.label}: ${ctx.parsed.y}`;
              }
            }
          }
        },
        interaction: {
          mode: 'index',
          intersect: false
        },

        scales: {
          y: {
            beginAtZero: true,
            title: { display: false, text: 'Count' },
            ticks: { color: '#00CEFF' },
            grid: {
              display: false,
              drawBorder: false
            }
          },
          x: {
            title: { display: false, text: 'User' },
            ticks: {
              color: '#00CEFF',
             // minRotation: 90,
             // maxRotation: 90,
              autoSkip: false
            },
            grid: {
              display: false,
              drawBorder: false
            }
          }
        }
      }
    });

  }, [data]);

  return (
    <div style={{ width: '100%', height: '350px' }}>
      <canvas ref={chartRef} />
    </div>
  );
}

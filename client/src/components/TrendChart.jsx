import React from 'react';
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
    Filler
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const TrendChart = ({ data, dataKey, label, unit, color = '#3b82f6' }) => {
    if (!data || !data.list) return null;

    // Get next 8 data points (24 hours approx)
    const slice = data.list.slice(0, 8);

    const labels = slice.map(item => {
        const date = new Date(item.dt * 1000);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    });

    const values = slice.map(item => {
        // Navigate nested object path (e.g., 'main.humidity')
        return dataKey.split('.').reduce((obj, key) => obj && obj[key], item);
    });

    const chartData = {
        labels,
        datasets: [
            {
                label: `${label} (${unit})`,
                data: values,
                borderColor: color,
                backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
                    // Convert hex to rgba for gradient
                    // Simple hex to rgb conversion
                    const r = parseInt(color.slice(1, 3), 16);
                    const g = parseInt(color.slice(3, 5), 16);
                    const b = parseInt(color.slice(5, 7), 16);

                    gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.2)`);
                    gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
                    return gradient;
                },
                pointBackgroundColor: color,
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 3,
                pointHoverRadius: 6,
                tension: 0.4,
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: 'rgba(15, 23, 42, 0.9)',
                titleColor: '#fff',
                bodyColor: '#fff',
                padding: 12,
                cornerRadius: 8,
                displayColors: false,
                callbacks: {
                    label: (context) => `${context.parsed.y}${unit}`
                }
            }
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: {
                    color: '#64748b',
                    font: { family: 'sans-serif', size: 11 }
                }
            },
            y: {
                grid: {
                    color: 'rgba(0, 0, 0, 0.05)',
                    drawBorder: false,
                },
                ticks: {
                    color: '#64748b',
                    font: { family: 'sans-serif', size: 11 }
                }
            }
        }
    };

    return (
        <div className="h-full w-full">
            <Line options={options} data={chartData} />
        </div>
    );
};

export default TrendChart;

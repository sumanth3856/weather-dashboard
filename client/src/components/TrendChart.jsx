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
    Legend
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

const TrendChart = ({ data, dataKey, label, unit, color = '#0ea5e9' }) => {
    if (!data || !data.list) return null;

    const slice = data.list.slice(0, 8);

    const labels = slice.map(item => {
        const date = new Date(item.dt * 1000);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    });

    const values = slice.map(item => {
        return dataKey.split('.').reduce((obj, key) => obj && obj[key], item);
    });

    const chartData = {
        labels,
        datasets: [
            {
                label: `${label} (${unit})`,
                data: values,
                borderColor: color,
                backgroundColor: 'transparent',
                pointBackgroundColor: color,
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6,
                tension: 0.3,
                fill: false,
                borderWidth: 3,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                backgroundColor: '#121214',
                titleColor: '#fff',
                titleFont: { family: 'Inter', weight: 'bold' },
                bodyColor: '#fff',
                bodyFont: { family: 'Inter', weight: 'medium' },
                borderColor: 'rgba(255,255,255,0.1)',
                borderWidth: 1,
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
                    color: '#a1a1aa',
                    font: { family: 'Inter', size: 11, weight: 'bold' }
                }
            },
            y: {
                grid: {
                    color: 'rgba(161, 161, 170, 0.1)',
                    drawBorder: false,
                },
                ticks: {
                    color: '#a1a1aa',
                    font: { family: 'Inter', size: 11, weight: 'bold' }
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

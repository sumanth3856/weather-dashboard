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

const ForecastChart = ({ data, unit }) => {
    if (!data) return null;

    const labels = data.list.slice(0, 8).map(item => {
        const date = new Date(item.dt * 1000);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    });

    const temps = data.list.slice(0, 8).map(item => {
        return unit === 'metric' ? item.main.temp : item.main.temp * 9 / 5 + 32;
    });

    const chartData = {
        labels,
        datasets: [
            {
                label: `Temperature (${unit === 'metric' ? '°C' : '°F'})`,
                data: temps,
                borderColor: 'rgba(59, 130, 246, 0.8)', // Blue for light mode
                backgroundColor: (context) => {
                    const ctx = context.chart.ctx;
                    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
                    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.2)');
                    gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
                    return gradient;
                },
                pointBackgroundColor: '#3b82f6',
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
                backgroundColor: 'rgba(15, 23, 42, 0.9)', // Slate-900
                titleColor: '#fff',
                bodyColor: '#fff',
                padding: 12,
                cornerRadius: 8,
                displayColors: false,
                callbacks: {
                    label: (context) => `${context.parsed.y}${unit === 'metric' ? '°C' : '°F'}`
                }
            }
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: {
                    color: '#64748b', // Slate-500
                    font: { family: 'sans-serif', size: 11 }
                }
            },
            y: {
                grid: {
                    color: 'rgba(0, 0, 0, 0.05)',
                    drawBorder: false,
                },
                ticks: {
                    color: '#64748b', // Slate-500
                    font: { family: 'sans-serif', size: 11 }
                }
            }
        }
    };

    return (
        <div className="glass-panel p-6 animate-fade-in h-80" style={{ animationDelay: '0.1s' }}>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-slate-900 dark:text-white font-light text-lg tracking-wide">Temperature Trend</h3>
                <span className="text-xs text-slate-400 dark:text-white/40 uppercase tracking-widest">24H Forecast</span>
            </div>
            <div className="h-60 w-full">
                <Line options={options} data={chartData} />
            </div>
        </div>
    );
};

export default ForecastChart;

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

const ForecastChart = ({ data, unit }) => {
    if (!data) return null;

    const labels = data.list.slice(0, 8).map(item => {
        const date = new Date(item.dt * 1000);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    });

    const temps = data.list.slice(0, 8).map(item => {
        return unit === 'metric' ? item.main.temp : item.main.temp * 9 / 5 + 32;
    });

    // Use a solid color based on brand accent
    const solidColor = '#0ea5e9'; // Electric Sky Blue

    const chartData = {
        labels,
        datasets: [
            {
                label: `Temperature (${unit === 'metric' ? '°C' : '°F'})`,
                data: temps,
                borderColor: solidColor,
                backgroundColor: 'transparent',
                pointBackgroundColor: solidColor,
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6,
                tension: 0.3, // Soft but structured curves
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
                padding: 12,
                cornerRadius: 8,
                borderColor: 'rgba(255,255,255,0.1)',
                borderWidth: 1,
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
                    color: '#a1a1aa', // zinc-400
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
        <div className="premium-panel p-6 animate-fade-in h-80" style={{ animationDelay: '0.1s' }}>
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-brand-900 dark:text-white font-bold text-lg tracking-wide">Temperature Trend</h3>
                <span className="text-xs text-brand-500 dark:text-brand-400 font-bold uppercase tracking-widest px-3 py-1 bg-zinc-100 dark:bg-white/5 rounded-full border border-zinc-200 dark:border-white/5">24H Forecast</span>
            </div>
            <div className="h-56 w-full">
                <Line options={options} data={chartData} />
            </div>
        </div>
    );
};

export default ForecastChart;

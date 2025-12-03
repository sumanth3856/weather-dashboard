# Weather Dashboard

A modern, premium weather dashboard built with React, Node.js, and OpenWeatherMap. Features real-time weather data, 5-day forecasts, interactive maps, and a beautiful glassmorphism UI.

![Weather Dashboard Screenshot](https://via.placeholder.com/800x400?text=Weather+Dashboard+Preview)

## Features

- **Real-time Weather**: Current temperature, humidity, wind speed, and conditions.
- **5-Day Forecast**: Interactive charts and daily summaries.
- **Location Search**: Search for any city worldwide.
- **Interactive Map**: View the selected location on a map.
- **Unit Conversion**: Toggle between Celsius and Fahrenheit.
- **Geolocation**: Automatically detects your location on startup.
- **Premium UI**: Glassmorphism design with smooth animations and dynamic gradients.
- **Caching**: Backend caching to minimize API usage and improve performance.

## Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, Chart.js, React-Leaflet.
- **Backend**: Node.js, Express, Node-Cache.
- **API**: OpenWeatherMap.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenWeatherMap API Key

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/sumanth3856/weather-dashboard.git
    cd weather-dashboard
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```
    This will install dependencies for both client and server.

3.  **Configure Environment Variables**:
    Create a `.env` file in the `server` directory:
    ```env
    PORT=5000
    WEATHER_API_KEY=your_api_key_here
    ```

4.  **Start the Application**:
    ```bash
    npm run dev
    ```
    This will start both the backend server (port 5000) and the frontend client (port 5173).

## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

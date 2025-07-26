import os
import json
import time
import requests
from flask import Flask, jsonify
from dotenv import load_dotenv
from datetime import datetime, timedelta
from collections import defaultdict
import statistics

load_dotenv()
app = Flask(__name__)

# Major cities by continent with coordinates
CITIES_BY_CONTINENT = {
    'north_america': [
        {'name': 'New York', 'lat': 40.7128, 'lon': -74.0060, 'country': 'US'},
        {'name': 'Los Angeles', 'lat': 34.0522, 'lon': -118.2437, 'country': 'US'},
        {'name': 'Toronto', 'lat': 43.6532, 'lon': -79.3832, 'country': 'CA'},
        {'name': 'Mexico City', 'lat': 19.4326, 'lon': -99.1332, 'country': 'MX'}
    ],
    'europe': [
        {'name': 'London', 'lat': 51.5074, 'lon': -0.1278, 'country': 'GB'},
        {'name': 'Paris', 'lat': 48.8566, 'lon': 2.3522, 'country': 'FR'},
        {'name': 'Berlin', 'lat': 52.5200, 'lon': 13.4050, 'country': 'DE'},
        {'name': 'Madrid', 'lat': 40.4168, 'lon': -3.7038, 'country': 'ES'}
    ],
    'asia': [
        {'name': 'Tokyo', 'lat': 35.6762, 'lon': 139.6503, 'country': 'JP'},
        {'name': 'Mumbai', 'lat': 19.0760, 'lon': 72.8777, 'country': 'IN'},
        {'name': 'Beijing', 'lat': 39.9042, 'lon': 116.4074, 'country': 'CN'},
        {'name': 'Seoul', 'lat': 37.5665, 'lon': 126.9780, 'country': 'KR'}
    ],
    'south_america': [
        {'name': 'São Paulo', 'lat': -23.5505, 'lon': -46.6333, 'country': 'BR'},
        {'name': 'Buenos Aires', 'lat': -34.6118, 'lon': -58.3960, 'country': 'AR'},
        {'name': 'Lima', 'lat': -12.0464, 'lon': -77.0428, 'country': 'PE'},
        {'name': 'Bogotá', 'lat': 4.7110, 'lon': -74.0721, 'country': 'CO'}
    ],
    'africa': [
        {'name': 'Cairo', 'lat': 30.0444, 'lon': 31.2357, 'country': 'EG'},
        {'name': 'Lagos', 'lat': 6.5244, 'lon': 3.3792, 'country': 'NG'},
        {'name': 'Cape Town', 'lat': -33.9249, 'lon': 18.4241, 'country': 'ZA'},
        {'name': 'Nairobi', 'lat': -1.2921, 'lon': 36.8219, 'country': 'KE'}
    ],
    'oceania': [
        {'name': 'Sydney', 'lat': -33.8688, 'lon': 151.2093, 'country': 'AU'},
        {'name': 'Melbourne', 'lat': -37.8136, 'lon': 144.9631, 'country': 'AU'},
        {'name': 'Auckland', 'lat': -36.8485, 'lon': 174.7633, 'country': 'NZ'},
        {'name': 'Perth', 'lat': -31.9505, 'lon': 115.8605, 'country': 'AU'}
    ]
}

def get_weather_data(lat, lon, api_key):
    """Fetch current weather and forecast data from OpenWeatherMap API"""
    try:
        # Current weather
        current_url = f"http://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={api_key}&units=metric"
        current_response = requests.get(current_url, timeout=10)
        current_data = current_response.json()
        
        # 5-day forecast
        forecast_url = f"http://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={api_key}&units=metric"
        forecast_response = requests.get(forecast_url, timeout=10)
        forecast_data = forecast_response.json()
        
        return {
            'current': current_data,
            'forecast': forecast_data
        }
    except Exception as e:
        print(f"Error fetching weather data: {e}")
        return None

def calculate_energy_metrics(temp, humidity, wind_speed):
    """Calculate estimated energy consumption metrics based on weather"""
    # Simplified energy consumption estimation
    # Heating degree days (HDD) and Cooling degree days (CDD)
    base_temp = 18  # Base temperature in Celsius
    
    if temp < base_temp:
        heating_demand = (base_temp - temp) * 1.5  # Heating multiplier
        cooling_demand = 0
    else:
        heating_demand = 0
        cooling_demand = (temp - base_temp) * 1.2  # Cooling multiplier
    
    # Factor in humidity and wind
    humidity_factor = 1 + (humidity - 50) / 100  # Higher humidity increases energy needs
    wind_factor = max(0.8, 1 - wind_speed / 50)  # Wind reduces energy needs slightly
    
    total_energy_index = (heating_demand + cooling_demand) * humidity_factor * wind_factor
    
    return {
        'heating_demand': round(heating_demand, 2),
        'cooling_demand': round(cooling_demand, 2),
        'total_energy_index': round(total_energy_index, 2),
        'efficiency_rating': 'High' if total_energy_index < 10 else 'Medium' if total_energy_index < 20 else 'Low'
    }

@app.route('/api/weather-energy-by-continent')
def weather_energy_by_continent():
    """Get weather and energy analysis data for all continents"""
    api_key = os.getenv('OPENWEATHER_API_KEY')
    
    if not api_key:
        return jsonify({"error": "OpenWeatherMap API key not found. Please add OPENWEATHER_API_KEY to your .env file"}), 500
    
    continent_data = {}
    
    for continent, cities in CITIES_BY_CONTINENT.items():
        continent_data[continent] = {
            'cities': [],
            'avg_temp': 0,
            'avg_energy_index': 0,
            'weather_summary': {}
        }
        
        temps = []
        energy_indices = []
        weather_conditions = defaultdict(int)
        
        for city in cities:
            weather_data = get_weather_data(city['lat'], city['lon'], api_key)
            
            if weather_data and 'main' in weather_data['current']:
                current = weather_data['current']
                temp = current['main']['temp']
                humidity = current['main']['humidity']
                wind_speed = current.get('wind', {}).get('speed', 0)
                
                energy_metrics = calculate_energy_metrics(temp, humidity, wind_speed)
                
                city_info = {
                    'name': city['name'],
                    'country': city['country'],
                    'temperature': round(temp, 1),
                    'humidity': humidity,
                    'wind_speed': round(wind_speed, 1),
                    'weather': current['weather'][0]['description'],
                    'energy_metrics': energy_metrics
                }
                
                continent_data[continent]['cities'].append(city_info)
                temps.append(temp)
                energy_indices.append(energy_metrics['total_energy_index'])
                weather_conditions[current['weather'][0]['main']] += 1
                
                # Add small delay to respect API rate limits
                time.sleep(0.1)
        
        # Calculate continent averages
        if temps:
            continent_data[continent]['avg_temp'] = round(statistics.mean(temps), 1)
            continent_data[continent]['avg_energy_index'] = round(statistics.mean(energy_indices), 1)
            continent_data[continent]['weather_summary'] = dict(weather_conditions)
            
            # Add trend analysis
            temp_range = max(temps) - min(temps)
            continent_data[continent]['temp_variability'] = 'High' if temp_range > 15 else 'Medium' if temp_range > 8 else 'Low'
    
    return jsonify(continent_data)

@app.route('/api/continent-details/<continent>')
def continent_details(continent):
    """Get detailed analysis for a specific continent"""
    api_key = os.getenv('OPENWEATHER_API_KEY')
    
    if not api_key:
        return jsonify({"error": "OpenWeatherMap API key not found"}), 500
    
    if continent not in CITIES_BY_CONTINENT:
        return jsonify({"error": "Continent not found"}), 404
    
    cities = CITIES_BY_CONTINENT[continent]
    detailed_data = {
        'continent': continent,
        'cities': [],
        'analysis': {
            'energy_efficiency_ranking': [],
            'temperature_correlation': {},
            'seasonal_patterns': {}
        }
    }
    
    for city in cities:
        weather_data = get_weather_data(city['lat'], city['lon'], api_key)
        
        if weather_data and 'main' in weather_data['current']:
            current = weather_data['current']
            forecast = weather_data.get('forecast', {}).get('list', [])
            
            temp = current['main']['temp']
            humidity = current['main']['humidity']
            wind_speed = current.get('wind', {}).get('speed', 0)
            
            energy_metrics = calculate_energy_metrics(temp, humidity, wind_speed)
            
            # Process forecast data for trends
            forecast_temps = []
            for item in forecast[:8]:  # Next 24 hours (3-hour intervals)
                forecast_temps.append(item['main']['temp'])
            
            city_detail = {
                'name': city['name'],
                'country': city['country'],
                'current_weather': {
                    'temperature': round(temp, 1),
                    'feels_like': round(current['main']['feels_like'], 1),
                    'humidity': humidity,
                    'pressure': current['main']['pressure'],
                    'wind_speed': round(wind_speed, 1),
                    'description': current['weather'][0]['description'],
                    'icon': current['weather'][0]['icon']
                },
                'energy_analysis': energy_metrics,
                'forecast_trend': {
                    'next_24h_avg': round(statistics.mean(forecast_temps), 1) if forecast_temps else temp,
                    'temp_change': round((statistics.mean(forecast_temps) - temp), 1) if forecast_temps else 0
                }
            }
            
            detailed_data['cities'].append(city_detail)
            detailed_data['analysis']['energy_efficiency_ranking'].append({
                'city': city['name'],
                'efficiency_score': energy_metrics['total_energy_index']
            })
            
            time.sleep(0.1)
    
    # Sort cities by energy efficiency
    detailed_data['analysis']['energy_efficiency_ranking'].sort(key=lambda x: x['efficiency_score'])
    
    return jsonify(detailed_data)

@app.route('/api/global-energy-summary')
def global_energy_summary():
    """Get global energy consumption patterns summary"""
    # This would typically connect to real energy APIs like EIA
    # For now, we'll provide simulated comparative data
    
    summary = {
        'global_trends': {
            'avg_energy_efficiency': 15.2,
            'most_efficient_continent': 'Europe',
            'highest_consumption_continent': 'North America',
            'renewable_energy_leaders': ['Europe', 'Oceania'],
            'weather_impact_factor': 0.73  # How much weather affects energy consumption
        },
        'insights': [
            "Temperature extremes increase energy consumption by up to 40%",
            "Humidity levels above 70% significantly impact cooling costs",
            "Wind patterns can reduce heating costs in coastal cities",
            "Urban heat islands increase cooling demands by 15-20%"
        ],
        'recommendations': [
            "Implement smart grid systems in high-variability regions",
            "Invest in renewable energy in consistently sunny/windy areas",
            "Develop energy storage for weather-dependent consumption patterns"
        ]
    }
    
    return jsonify(summary)

if __name__ == "__main__":
    app.run(debug=True)
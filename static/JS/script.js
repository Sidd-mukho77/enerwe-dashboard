document.addEventListener('DOMContentLoaded', () => {
    console.log('🎬 Initializing EnerWe animations...');

    // --- ANIMATION STYLES FIRST ---
    function addAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Letter Animation */
            .title-letter {
                display: inline-block;
                opacity: 0;
                transform: translateY(50px) rotateX(90deg);
                animation-fill-mode: forwards;
            }
            
            @keyframes letterReveal {
                0% {
                    opacity: 0;
                    transform: translateY(50px) rotateX(90deg);
                }
                100% {
                    opacity: 1;
                    transform: translateY(0) rotateX(0deg);
                }
            }
            
            /* Enhanced Hero Animations */
            .hero-content {
                animation: heroFadeIn 1s ease-out 0.5s forwards;
            }
            
            @keyframes heroFadeIn {
                from { 
                    opacity: 0;
                    transform: translateY(20px);
                }
                to { 
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            /* Stat Item Reveals */
            .stat-item {
                opacity: 0;
                transform: translateY(30px);
                animation-fill-mode: forwards;
            }
            
            @keyframes statReveal {
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            /* Tagline Animation */
            .tagline {
                opacity: 0;
                transform: translateY(20px);
                animation: fadeInUp 0.8s ease-out 2s forwards;
            }
            
            /* CTA Animation */
            .cta-container {
                opacity: 0;
                transform: translateY(20px);
                animation: fadeInUp 0.8s ease-out 3.5s forwards;
            }
            
            @keyframes fadeInUp {
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
        console.log('✅ Animation styles added');
    }

    // --- FLOATING PATHS ANIMATION - Neural Network Style ---
    function initFloatingPaths() {
        const svg = document.querySelector('.floating-paths-svg');
        if (!svg) {
            console.log('❌ SVG container not found');
            return;
        }

        console.log('✅ Creating neural network data flows...');
        
        // Clear any existing paths
        svg.innerHTML = '';
        
        // Create neural network-style paths
        const networkPaths = [];
        
        // Horizontal data streams
        for (let i = 0; i < 8; i++) {
            const y = 50 + (i * 40);
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            const pathData = `M-100,${y} Q200,${y + Math.sin(i) * 20} 500,${y} Q800,${y - Math.sin(i) * 15} 1100,${y}`;
            
            path.setAttribute('d', pathData);
            path.setAttribute('stroke', '#ffffff');
            path.setAttribute('stroke-width', '2');
            path.setAttribute('stroke-opacity', '0.4');
            path.setAttribute('fill', 'none');
            path.setAttribute('stroke-linecap', 'round');
            
            const dashLength = 300;
            path.setAttribute('stroke-dasharray', `${dashLength} 50`);
            path.setAttribute('stroke-dashoffset', `${dashLength}`);
            
            path.style.animation = `dataFlow${i} ${8 + (i * 1)}s linear infinite`;
            
            svg.appendChild(path);
            networkPaths.push(path);
            
            // Create animation for this path
            const pathStyle = document.createElement('style');
            pathStyle.textContent = `
                @keyframes dataFlow${i} {
                    0% {
                        stroke-dashoffset: ${dashLength};
                        stroke-opacity: 0.2;
                    }
                    50% {
                        stroke-opacity: 0.6;
                    }
                    100% {
                        stroke-dashoffset: -${dashLength};
                        stroke-opacity: 0.2;
                    }
                }
            `;
            document.head.appendChild(pathStyle);
        }
        
        // Diagonal connection lines
        for (let i = 0; i < 6; i++) {
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            const startX = 100 + (i * 150);
            const startY = 80 + (i * 30);
            const endX = startX + 200;
            const endY = startY + 120;
            
            const pathData = `M${startX},${startY} Q${startX + 100},${startY + 60} ${endX},${endY}`;
            
            path.setAttribute('d', pathData);
            path.setAttribute('stroke', '#ffffff');
            path.setAttribute('stroke-width', '1.5');
            path.setAttribute('stroke-opacity', '0.3');
            path.setAttribute('fill', 'none');
            path.setAttribute('stroke-linecap', 'round');
            
            const dashLength = 200;
            path.setAttribute('stroke-dasharray', `${dashLength} 30`);
            path.setAttribute('stroke-dashoffset', `${dashLength}`);
            
            path.style.animation = `neuralFlow${i} ${10 + (i * 1.5)}s linear infinite`;
            
            svg.appendChild(path);
            
            // Create animation for diagonal paths
            const pathStyle = document.createElement('style');
            pathStyle.textContent = `
                @keyframes neuralFlow${i} {
                    0% {
                        stroke-dashoffset: ${dashLength};
                        stroke-opacity: 0.1;
                    }
                    30% {
                        stroke-opacity: 0.5;
                    }
                    70% {
                        stroke-opacity: 0.5;
                    }
                    100% {
                        stroke-dashoffset: -${dashLength};
                        stroke-opacity: 0.1;
                    }
                }
            `;
            document.head.appendChild(pathStyle);
        }
        
        // Vertical data columns
        for (let i = 0; i < 5; i++) {
            const x = 150 + (i * 200);
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            const pathData = `M${x},-50 Q${x + Math.cos(i) * 30},100 ${x},250 Q${x - Math.cos(i) * 20},400 ${x},550`;
            
            path.setAttribute('d', pathData);
            path.setAttribute('stroke', '#ffffff');
            path.setAttribute('stroke-width', '1.8');
            path.setAttribute('stroke-opacity', '0.35');
            path.setAttribute('fill', 'none');
            path.setAttribute('stroke-linecap', 'round');
            
            const dashLength = 250;
            path.setAttribute('stroke-dasharray', `${dashLength} 40`);
            path.setAttribute('stroke-dashoffset', `${dashLength}`);
            
            path.style.animation = `verticalFlow${i} ${12 + (i * 1)}s linear infinite`;
            
            svg.appendChild(path);
            
            // Create animation for vertical paths
            const pathStyle = document.createElement('style');
            pathStyle.textContent = `
                @keyframes verticalFlow${i} {
                    0% {
                        stroke-dashoffset: ${dashLength};
                        stroke-opacity: 0.2;
                    }
                    40% {
                        stroke-opacity: 0.6;
                    }
                    60% {
                        stroke-opacity: 0.6;
                    }
                    100% {
                        stroke-dashoffset: -${dashLength};
                        stroke-opacity: 0.2;
                    }
                }
            `;
            document.head.appendChild(pathStyle);
        }
        
        // Neural connection nodes (small pulsing circles)
        for (let i = 0; i < 12; i++) {
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            const x = 100 + (i % 4) * 250;
            const y = 100 + Math.floor(i / 4) * 150;
            
            circle.setAttribute('cx', x.toString());
            circle.setAttribute('cy', y.toString());
            circle.setAttribute('r', '3');
            circle.setAttribute('fill', '#ffffff');
            circle.setAttribute('opacity', '0.4');
            
            circle.style.animation = `nodePulse${i} ${3 + (i * 0.3)}s ease-in-out infinite`;
            
            svg.appendChild(circle);
            
            // Create pulsing animation for nodes
            const nodeStyle = document.createElement('style');
            nodeStyle.textContent = `
                @keyframes nodePulse${i} {
                    0%, 100% {
                        opacity: 0.2;
                        transform: scale(1);
                    }
                    50% {
                        opacity: 0.8;
                        transform: scale(1.5);
                    }
                }
            `;
            document.head.appendChild(nodeStyle);
        }
        
        console.log('✅ Created neural network data flows with connection nodes');
        console.log('📊 Total SVG elements:', svg.children.length, '(paths + nodes)');
    }

    // --- LETTER BY LETTER ANIMATION ---
    function initLetterAnimation() {
        const titleElement = document.querySelector('.title-text');
        if (!titleElement) {
            console.log('❌ Title element not found');
            return;
        }

        console.log('✅ Initializing letter animation...');
        
        const text = titleElement.getAttribute('data-text') || titleElement.textContent.trim();
        titleElement.innerHTML = '';
        
        text.split('').forEach((letter, index) => {
            const span = document.createElement('span');
            span.textContent = letter;
            span.className = 'title-letter';
            span.style.animationDelay = `${0.8 + index * 0.15}s`;
            span.style.animation = `letterReveal 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${0.8 + index * 0.15}s forwards`;
            titleElement.appendChild(span);
        });
        
        console.log(`✅ Created letter animation for "${text}"`);
    }

    // --- STAT ANIMATIONS ---
    function initStatAnimations() {
        const statItems = document.querySelectorAll('.stat-item');
        statItems.forEach((item, index) => {
            item.style.animationDelay = `${2.5 + index * 0.2}s`;
            item.style.animation = `statReveal 0.6s ease-out ${2.5 + index * 0.2}s forwards`;
        });
        console.log('✅ Stat animations initialized');
    }

    // --- SMOOTH SCROLL FOR CTA ---
    function initSmoothScroll() {
        const ctaButton = document.getElementById('cta-button');
        if (ctaButton) {
            ctaButton.addEventListener('click', (e) => {
                e.preventDefault();
                console.log('🔄 Smooth scrolling to map section...');
                
                const target = document.querySelector('#map-section');
                if (target) {
                    target.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start' 
                    });
                } else {
                    console.log('❌ Map section not found for smooth scroll');
                }
            });
            console.log('✅ Smooth scroll initialized');
        } else {
            console.log('❌ CTA button not found');
        }
    }

    // --- INITIALIZE ALL ANIMATIONS ---
    function initAllAnimations() {
        console.log('🎬 Starting animation initialization sequence...');
        
        // Add styles first
        addAnimationStyles();
        
        // Initialize animations with slight delays to ensure DOM is ready
        setTimeout(() => {
            initFloatingPaths();
        }, 100);
        
        setTimeout(() => {
            initLetterAnimation();
        }, 200);
        
        setTimeout(() => {
            initStatAnimations();
        }, 300);
        
        setTimeout(() => {
            initSmoothScroll();
        }, 400);
        
        console.log('✅ All animations initialized!');
    }

    // Start animations
    initAllAnimations();

    // --- DASHBOARD MAP SETUP ---
    console.log('🗺️ Initializing map and dashboard...');
    
    // Check if Leaflet is loaded
    if (typeof L === 'undefined') {
        console.error('❌ Leaflet library not loaded');
        return;
    }

    const map = L.map('map').setView([20, 0], 2);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(map);

    const resultsSection = document.getElementById('results-section');
    const resultsContent = document.getElementById('results-content');
    const loadingIndicator = document.getElementById('loading');
    const lastUpdateElement = document.getElementById('last-update');
    const insightsContent = document.getElementById('insights-content');
    
    let geojsonLayer;
    let weatherEnergyData = {};
    let globalInsights = {};

    // Update timestamp
    if (lastUpdateElement) {
        lastUpdateElement.textContent = new Date().toLocaleString();
    }

    // --- UTILITY FUNCTIONS ---
    function getContinentKey(continentName) {
        const normalizeContinent = (name) => {
            name = name.toLowerCase();
            if (name.includes('north') && name.includes('america')) return 'north_america';
            if (name.includes('south') && name.includes('america')) return 'south_america';
            if (name.includes('asia')) return 'asia';
            if (name.includes('europe')) return 'europe';
            if (name.includes('africa')) return 'africa';
            if (name.includes('oceania') || name.includes('australia')) return 'oceania';
            return 'global';
        };
        return normalizeContinent(continentName);
    }

    function getEfficiencyClass(energyIndex) {
        if (energyIndex < 10) return 'high-efficiency';
        if (energyIndex < 20) return 'medium-efficiency';
        return 'low-efficiency';
    }

    function getDominantWeather(weatherSummary) {
        if (!weatherSummary) return 'N/A';
        let maxCount = 0;
        let dominant = 'Mixed';
        for (const [weather, count] of Object.entries(weatherSummary)) {
            if (count > maxCount) {
                maxCount = count;
                dominant = weather;
            }
        }
        return dominant;
    }

    function getEnergyPattern(avgIndex) {
        if (avgIndex < 10) return 'Highly efficient, low consumption';
        if (avgIndex < 20) return 'Moderate consumption, seasonal variation';
        return 'High consumption, weather-dependent';
    }

    // --- API ERROR DISPLAY ---
    function showApiKeyError(errorMessage) {
        if (!loadingIndicator) return;
        
        loadingIndicator.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <div class="loading-dots-container" style="margin: 0 auto 20px;">
                    <div class="loading-dot"></div>
                    <div class="loading-dot"></div>
                    <div class="loading-dot"></div>
                    <div class="loading-dot"></div>
                    <div class="loading-dot"></div>
                    <div class="loading-dot"></div>
                    <div class="loading-dot"></div>
                    <div class="loading-dot"></div>
                    <div class="loading-dot"></div>
                    <div class="loading-dot"></div>
                    <div class="loading-dot"></div>
                    <div class="loading-dot"></div>
                    <div class="loading-dot"></div>
                    <div class="loading-dot"></div>
                    <div class="loading-dot"></div>
                    <div class="loading-dot"></div>
                </div>
                <h3 style="color: #ffffff; margin-bottom: 10px; font-weight: 300;">API Key Required</h3>
                <p style="margin-bottom: 15px; opacity: 0.7;">${errorMessage}</p>
                <div style="background: rgba(255, 255, 255, 0.05); padding: 15px; border-radius: 2px; text-align: left; border: 1px solid rgba(255, 255, 255, 0.1);">
                    <p style="margin-bottom: 10px; font-weight: 400;">To get weather data:</p>
                    <ol style="margin-bottom: 15px; opacity: 0.8;">
                        <li>Sign up at <a href="https://www.weatherapi.com/" target="_blank" style="color: #ffffff;">WeatherAPI.com</a></li>
                        <li>Get your free API key (1M calls/month, no payment info needed!)</li>
                        <li>Create a <code style="background: rgba(0,0,0,0.5); padding: 2px 4px; border-radius: 2px;">.env</code> file in your project root</li>
                        <li>Add: <code style="background: rgba(0,0,0,0.5); padding: 2px 4px; border-radius: 2px;">WEATHER_API_KEY=your_api_key_here</code></li>
                    </ol>
                    <p style="font-style: italic; opacity: 0.7;">No payment details required - just email signup!</p>
                </div>
            </div>
        `;
    }

    // --- DATA FETCHING ---
    async function loadAllData() {
        try {
            if (loadingIndicator) {
                loadingIndicator.style.display = 'flex';
            }
            
            // Fetch weather and energy data
            const weatherResponse = await fetch('/api/weather-energy-by-continent');
            if (!weatherResponse.ok) {
                throw new Error(`Weather API error: ${weatherResponse.statusText}`);
            }
            weatherEnergyData = await weatherResponse.json();
            
            // Check for API key error
            if (weatherEnergyData.error) {
                showApiKeyError(weatherEnergyData.error);
                return;
            }
            
            // Fetch global insights
            const insightsResponse = await fetch('/api/global-energy-summary');
            globalInsights = await insightsResponse.json();
            
            // Load continent boundaries
            const geojsonResponse = await fetch('/static/continents.geo.json');
            const geojsonData = await geojsonResponse.json();
            
            // Initialize map with weather data
            initializeMap(geojsonData);
            
            // Load global insights
            loadGlobalInsights();
            
            if (loadingIndicator) {
                loadingIndicator.style.display = 'none';
            }
            
        } catch (error) {
            console.error('Error loading data:', error);
            if (loadingIndicator) {
                loadingIndicator.innerHTML = `
                    <div class="loading-dots-container">
                        <div class="loading-dot"></div>
                        <div class="loading-dot"></div>
                        <div class="loading-dot"></div>
                        <div class="loading-dot"></div>
                        <div class="loading-dot"></div>
                        <div class="loading-dot"></div>
                        <div class="loading-dot"></div>
                        <div class="loading-dot"></div>
                        <div class="loading-dot"></div>
                        <div class="loading-dot"></div>
                        <div class="loading-dot"></div>
                        <div class="loading-dot"></div>
                        <div class="loading-dot"></div>
                        <div class="loading-dot"></div>
                        <div class="loading-dot"></div>
                        <div class="loading-dot"></div>
                    </div>
                    <span class="loading-text">Error loading data: ${error.message}</span>
                `;
            }
        }
    }

    // --- MAP FUNCTIONS ---
    function getFeatureStyle(feature) {
        const continentName = feature.properties.CONTINENT || feature.properties.continent;
        const continent = getContinentKey(continentName);
        const data = weatherEnergyData[continent];
        
        if (!data || !data.avg_energy_index) {
            return { fillColor: "#666666", weight: 2, opacity: 1, color: 'white', fillOpacity: 0.6 };
        }
        
        // Color based on energy efficiency (lower index = more efficient = green)
        let fillColor = "#4CAF50"; // High efficiency (green)
        if (data.avg_energy_index > 15) {
            fillColor = "#FF9800"; // Medium efficiency (orange)
        }
        if (data.avg_energy_index > 25) {
            fillColor = "#F44336"; // Low efficiency (red)
        }
        
        return {
            fillColor: fillColor,
            weight: 2,
            opacity: 1,
            color: 'white',
            fillOpacity: 0.7
        };
    }

    function initializeMap(geojsonData) {
        geojsonLayer = L.geoJson(geojsonData, {
            style: (feature) => getFeatureStyle(feature),
            onEachFeature: onEachFeature
        }).addTo(map);
    }

    // --- MAP INTERACTIVITY ---
    const highlightStyle = { weight: 4, color: '#ffc107', fillOpacity: 0.9 };

    function highlightFeature(e) {
        const layer = e.target;
        layer.setStyle(highlightStyle).bringToFront();
        
        // Update insights panel with continent data
        const continentName = layer.feature.properties.CONTINENT || layer.feature.properties.continent;
        updateContinentalInsights(continentName);
        
        // Show tooltip with basic info
        const continent = getContinentKey(continentName);
        const data = weatherEnergyData[continent];
        
        if (data) {
            const tooltip = `
                <strong>${continentName}</strong><br>
                Avg Temperature: ${data.avg_temp}°C<br>
                Energy Index: ${data.avg_energy_index}<br>
                Cities Monitored: ${data.cities.length}
            `;
            layer.bindTooltip(tooltip).openTooltip();
        }
    }

    function resetHighlight(e) {
        if (geojsonLayer) {
            geojsonLayer.resetStyle(e.target);
        }
        e.target.closeTooltip();
        
        // Reset insights panel to default
        resetContinentalInsights();
    }

    function onMapClick(e) {
        const layer = e.target;
        const continentName = layer.feature.properties.CONTINENT || layer.feature.properties.continent;
        
        updateResults(continentName);
        
        // Reveal and scroll to results
        if (resultsSection) {
            resultsSection.classList.remove('inactive');
            resultsSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    function onEachFeature(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: onMapClick
        });
    }

    // --- CONTINENTAL INSIGHTS ---
    function updateContinentalInsights(continentName) {
        const continent = getContinentKey(continentName);
        const data = weatherEnergyData[continent];
        
        if (!data || !insightsContent) return;
        
        const insights = getContinentalInsights(continentName, data);
        
        insightsContent.innerHTML = `
            <div class="continent-insights-active">
                <h4>
                    <i class="fas fa-map-marker-alt"></i>
                    ${continentName}
                </h4>
                
                <div class="continent-stats">
                    <div class="continent-stat">
                        <span class="stat-value">${data.avg_temp}°C</span>
                        <div class="stat-label">Avg Temperature</div>
                    </div>
                    <div class="continent-stat">
                        <span class="stat-value">${data.avg_energy_index}</span>
                        <div class="stat-label">Energy Index</div>
                    </div>
                    <div class="continent-stat">
                        <span class="stat-value">${data.cities.length}</span>
                        <div class="stat-label">Cities Monitored</div>
                    </div>
                    <div class="continent-stat">
                        <span class="stat-value">${data.temp_variability}</span>
                        <div class="stat-label">Temp Variability</div>
                    </div>
                </div>
                
                <div class="continent-highlights">
                    <h5>Key Insights</h5>
                    <ul>
                        ${insights.map(insight => `<li>${insight}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
    }

    function resetContinentalInsights() {
        if (!insightsContent) return;
        
        insightsContent.innerHTML = `
            <div class="default-insights">
                <h4>Global Weather & Energy Overview</h4>
                
                <div class="insight-grid">
                    <div class="insight-stat">
                        <h5><i class="fas fa-globe"></i> Coverage</h5>
                        <p>48 major cities across all inhabited continents providing comprehensive global weather and energy analysis</p>
                    </div>
                    
                    <div class="insight-stat">
                        <h5><i class="fas fa-thermometer-half"></i> Temperature Range</h5>
                        <p>Monitoring from Arctic conditions (-30°C) to tropical climates (+40°C) for complete thermal analysis</p>
                    </div>
                    
                    <div class="insight-stat">
                        <h5><i class="fas fa-bolt"></i> Energy Patterns</h5>
                        <p>Real-time energy demand calculations based on heating/cooling needs, humidity, and wind factors</p>
                    </div>
                    
                    <div class="insight-stat">
                        <h5><i class="fas fa-sync-alt"></i> Live Updates</h5>
                        <p>Data refreshes every 10 minutes to provide current weather conditions and energy consumption trends</p>
                    </div>
                </div>
            </div>
        `;
    }

    function getContinentalInsights(continentName, data) {
        const insights = {
            'North America': [
                `Winter heating demands drive high energy consumption in northern cities like Toronto and Chicago`,
                `Extreme temperature variations between Alaska and Mexico create diverse energy patterns`,
                `Urban heat islands in major cities like New York increase cooling costs by 15-20%`,
                `Wind patterns from the Great Lakes region help moderate energy needs in Chicago`
            ],
            'Europe': [
                `Moderate climate leads to most energy-efficient continental performance globally`,
                `Nordic countries like Sweden utilize cold temperatures for natural cooling systems`,
                `Mediterranean regions show increased cooling demands during summer months`,
                `Strong renewable energy infrastructure reduces weather-dependent energy costs`
            ],
            'Asia': [
                `Monsoon patterns create dramatic seasonal energy consumption variations`,
                `High humidity in tropical cities like Singapore significantly increases cooling costs`,
                `Dense urban populations amplify heat island effects in mega-cities like Tokyo and Delhi`,
                `Desert regions show extreme temperature swings requiring both heating and cooling`
            ],
            'South America': [
                `Equatorial cities maintain consistent energy needs throughout the year`,
                `High altitude cities like Bogotá have unique heating requirements despite tropical latitude`,
                `Amazon basin cities face constant high humidity increasing energy demands`,
                `Southern cone cities experience reverse seasons creating counter-cyclical patterns`
            ],
            'Africa': [
                `Saharan cities experience extreme heat requiring intensive cooling systems`,
                `Sub-Saharan regions benefit from moderate temperatures year-round`,
                `Coastal cities utilize ocean breezes to reduce energy consumption naturally`,
                `High solar potential makes this continent ideal for renewable energy development`
            ],
            'Oceania': [
                `Island climates benefit from ocean temperature moderation effects`,
                `Seasonal patterns opposite to Northern Hemisphere create unique energy cycles`,
                `Remote locations drive innovation in renewable energy and energy storage`,
                `Tropical Pacific islands maintain consistent low energy needs year-round`
            ]
        };
        
        return insights[continentName] || [
            `Unique weather patterns influence energy consumption in this region`,
            `Local climate conditions create specific energy efficiency opportunities`,
            `Geographic factors play a key role in regional energy demands`,
            `Weather variability impacts seasonal energy consumption patterns`
        ];
    }

    // --- RESULTS FUNCTIONS ---
    async function updateResults(continentName) {
        const continent = getContinentKey(continentName);
        const data = weatherEnergyData[continent];
        
        if (!data || !resultsContent) {
            if (resultsContent) {
                resultsContent.innerHTML = `
                    <h2 class="region-title">${continentName}</h2>
                    <p>No weather or energy data available for this region.</p>
                `;
            }
            return;
        }

        // Show loading state
        resultsContent.innerHTML = `
            <div class="loading-details">
                <div class="loading-dots-container">
                    <div class="loading-dot"></div>
                    <div class="loading-dot"></div>
                    <div class="loading-dot"></div>
                    <div class="loading-dot"></div>
                    <div class="loading-dot"></div>
                    <div class="loading-dot"></div>
                    <div class="loading-dot"></div>
                    <div class="loading-dot"></div>
                    <div class="loading-dot"></div>
                    <div class="loading-dot"></div>
                    <div class="loading-dot"></div>
                    <div class="loading-dot"></div>
                    <div class="loading-dot"></div>
                    <div class="loading-dot"></div>
                    <div class="loading-dot"></div>
                    <div class="loading-dot"></div>
                </div>
                <span class="loading-text">Loading detailed analysis for ${continentName}...</span>
            </div>
        `;

        try {
            // Fetch detailed data for this continent
            const detailResponse = await fetch(`/api/continent-details/${continent}`);
            const detailData = await detailResponse.json();
            
            displayDetailedResults(continentName, data, detailData);
        } catch (error) {
            console.error('Error fetching detailed data:', error);
            displayBasicResults(continentName, data);
        }
    }

    function displayDetailedResults(continentName, basicData, detailData) {
        if (!resultsContent) return;
        
        const cities = detailData.cities || basicData.cities;
        const analysis = detailData.analysis || {};
        
        let contentHTML = `
            <div class="results-header">
                <h2 class="region-title">
                    <i class="fas fa-globe"></i>
                    ${continentName}
                </h2>
                <div class="region-summary">
                    <div class="summary-card">
                        <div class="summary-icon"><i class="fas fa-thermometer-half"></i></div>
                        <div class="summary-content">
                            <div class="summary-value">${basicData.avg_temp}°C</div>
                            <div class="summary-label">Average Temperature</div>
                        </div>
                    </div>
                    <div class="summary-card">
                        <div class="summary-icon"><i class="fas fa-bolt"></i></div>
                        <div class="summary-content">
                            <div class="summary-value">${basicData.avg_energy_index}</div>
                            <div class="summary-label">Energy Index</div>
                        </div>
                    </div>
                    <div class="summary-card">
                        <div class="summary-icon"><i class="fas fa-chart-bar"></i></div>
                        <div class="summary-content">
                            <div class="summary-value">${basicData.temp_variability}</div>
                            <div class="summary-label">Temperature Variability</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="content-grid">
                <div class="city-analysis-card">
                    <h3 class="card-title">
                        <i class="fas fa-city"></i>
                        City Analysis
                    </h3>
                    <div class="cities-grid">
        `;

        cities.forEach(city => {
            const energyMetrics = city.energy_analysis || city.energy_metrics;
            const currentWeather = city.current_weather || city;
            
            contentHTML += `
                <div class="city-card">
                    <div class="city-header">
                        <h4>${city.name}</h4>
                        <span class="country-code">${city.country}</span>
                    </div>
                    <div class="weather-info">
                        <div class="temp">${currentWeather.temperature}°C</div>
                        <div class="description">${currentWeather.description || currentWeather.weather}</div>
                    </div>
                    <div class="energy-metrics">
                        <div class="metric">
                            <span class="metric-label">Energy Index:</span>
                            <span class="metric-value ${getEfficiencyClass(energyMetrics.total_energy_index)}">${energyMetrics.total_energy_index}</span>
                        </div>
                        <div class="metric">
                            <span class="metric-label">Efficiency:</span>
                            <span class="metric-value">${energyMetrics.efficiency_rating}</span>
                        </div>
                    </div>
                </div>
            `;
        });

        contentHTML += `
                    </div>
                </div>

                <div class="insights-card">
                    <h3 class="card-title">
                        <i class="fas fa-lightbulb"></i>
                        Regional Insights
                    </h3>
                    <div class="insights-content">
                        <div class="insight-item">
                            <i class="fas fa-award"></i>
                            <div>
                                <strong>Most Efficient City:</strong>
                                ${analysis.energy_efficiency_ranking && analysis.energy_efficiency_ranking[0] ? 
                                    analysis.energy_efficiency_ranking[0].city : 'N/A'}
                            </div>
                        </div>
                        <div class="insight-item">
                            <i class="fas fa-cloud"></i>
                            <div>
                                <strong>Dominant Weather:</strong>
                                ${getDominantWeather(basicData.weather_summary)}
                            </div>
                        </div>
                        <div class="insight-item">
                            <i class="fas fa-chart-line"></i>
                            <div>
                                <strong>Energy Pattern:</strong>
                                ${getEnergyPattern(basicData.avg_energy_index)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        resultsContent.innerHTML = contentHTML;
    }

    function displayBasicResults(continentName, data) {
        displayDetailedResults(continentName, data, { cities: data.cities, analysis: {} });
    }

    // --- GLOBAL INSIGHTS ---
    function loadGlobalInsights() {
        const insightsContainer = document.getElementById('global-insights');
        
        if (!globalInsights.global_trends || !insightsContainer) {
            return;
        }

        const trends = globalInsights.global_trends;
        
        insightsContainer.innerHTML = `
            <div class="insight-card">
                <div class="insight-icon"><i class="fas fa-trophy"></i></div>
                <div class="insight-content">
                    <h3>Most Efficient Region</h3>
                    <p>${trends.most_efficient_continent}</p>
                </div>
            </div>
            <div class="insight-card">
                <div class="insight-icon"><i class="fas fa-fire"></i></div>
                <div class="insight-content">
                    <h3>Highest Energy Usage</h3>
                    <p>${trends.highest_consumption_continent}</p>
                </div>
            </div>
            <div class="insight-card">
                <div class="insight-icon"><i class="fas fa-leaf"></i></div>
                <div class="insight-content">
                    <h3>Renewable Leaders</h3>
                    <p>${trends.renewable_energy_leaders.join(', ')}</p>
                </div>
            </div>
            <div class="insight-card">
                <div class="insight-icon"><i class="fas fa-percentage"></i></div>
                <div class="insight-content">
                    <h3>Weather Impact Factor</h3>
                    <p>${(trends.weather_impact_factor * 100).toFixed(0)}%</p>
                </div>
            </div>
        `;
    }

    // --- AUTO-REFRESH FUNCTIONALITY ---
    function startAutoRefresh() {
        setInterval(() => {
            console.log('🔄 Auto-refreshing weather data...');
            loadAllData();
        }, 600000); // 10 minutes
    }

    // --- INITIALIZE DASHBOARD ---
    loadAllData();
    startAutoRefresh();
    
    console.log('🕒 Auto-refresh enabled: Data will update every 10 minutes');
    console.log('🎯 EnerWe Dashboard initialized successfully');
});
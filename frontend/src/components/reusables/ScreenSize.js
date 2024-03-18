import { useState, useEffect } from 'react';

const useScreenSize = () => {
    const [chartWidth, setChartWidth] = useState(getChartWidth());
    const [chartHeight, setChartHeight] = useState(getChartHeight());

    useEffect(() => {
        const handleResize = () => {
            setChartWidth(getChartWidth());
            setChartHeight(getChartHeight());
        };

        
    }, []); // Empty dependency array ensures this effect runs only once during mount

    function getChartWidth() {
        return window.innerWidth <= 768 ? window.innerWidth * 0.9 : window.innerWidth * 0.5;
    }

    function getChartHeight() {
        return window.innerHeight <= 800 ? window.innerHeight * 0.4 : window.innerHeight * 0.7;
    }

    return [chartWidth, chartHeight];
};

export default useScreenSize;

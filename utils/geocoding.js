const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const geoApiKey = process.env.GEOCODING_KEY;

const geocoding = async (address) => {
    const theGeocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${geoApiKey}`;
    const geocodingResult = await axios.get(theGeocodingUrl);
    const { status, results } = geocodingResult.data;
    if (status === 'OK') {
        const { formatted_address, geometry } = results[0];
        const { location } = geometry;
        return {
            status,
            formatted_address,
            location,
        };
    } else {
        return { status };
    }
};

module.exports = geocoding;

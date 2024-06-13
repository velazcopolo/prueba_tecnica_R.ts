"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const locations_1 = require("../locations");
const string_similarity_1 = require("string-similarity"); // Requiere instalación de la biblioteca 'string-similarity' (npm install string-similarity)
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.get('/', (req, res) => {
    res.send(locations_1.locations);
});
app.get('/cities', (req, res) => {
    const cities = locations_1.locations
        .map(location => location.city)
        .reduce((cities, currentCity) => {
        if (!cities.includes(currentCity)) {
            cities.push(currentCity);
        }
        return cities;
    }, []);
    res.status(200).send(cities);
});
app.get('/districts', (req, res) => {
    const districts = locations_1.locations.map(location => location.district);
    res.status(200).json(districts);
});
app.get('/:city/districts', (req, res) => {
    const city = req.params.city;
    if (!containsOnlyLetters(city)) {
        res.status(400).send('City must be a string');
    }
    const districts = locations_1.locations.filter((location) => {
        return location.city === formatCityName(city);
    }).map((location) => {
        return location.district;
    });
    res.status(200).json(districts);
});
app.get('/:city', (req, res) => {
    const city = req.params.city;
    const formattedCity = formatCityName(city);
    const formattedDistricts = locations_1.locations.map(location => formatCityName(location.district));
    const foundDistrict = formattedDistricts.find(district => district === formattedCity);
    if (containsOnlyLetters(city)) {
        const units = locations_1.locations.filter((location) => {
            return formatCityName(location.city) === formattedCity || formatCityName(location.district) === foundDistrict;
        }).map((location) => {
            return location.units;
        }).reduce((units, currenUnits) => {
            return units + currenUnits;
        }, 0);
        res.status(200).json(units);
    }
    else {
        res.status(400).send('City must be a string');
    }
});
app.get('/search/:searchString', (req, res) => {
    const searchString = req.params.searchString;
    const formattedCity = formatCityName(searchString);
    const formattedDistricts = locations_1.locations.map(location => formatCityName(location.district));
    const foundDistrict = formattedDistricts.find(district => district === formattedCity);
    if (containsOnlyLetters(searchString)) {
        const resultCity = locations_1.locations.find(location => {
            const normalizedCity = formatCityName(location.city);
            const normalizedSearch = formatCityName(searchString);
            return normalizedCity.includes(normalizedSearch);
        });
        const resultDistrict = locations_1.locations.find(location => {
            const normalizedDistrict = formatCityName(location.district);
            const normalizedSearch = formatCityName(searchString);
            return normalizedDistrict.includes(normalizedSearch);
        });
        if (resultCity) {
            const similarityRate = calculateStringSimilarity(resultCity.city, searchString);
            res.status(200).json({
                found: true,
                rate: similarityRate,
                city: resultCity.city,
                name: resultCity.city,
                type: 'CITY'
            });
        }
        else if (resultDistrict) {
            const similarityRate = calculateStringSimilarity(resultDistrict.district, searchString);
            res.status(200).json({
                found: true,
                rate: similarityRate,
                city: resultDistrict.city,
                name: resultDistrict.district,
                type: 'DISTRICT'
            });
        }
        else {
            res.status(200).json({
                found: false,
                rate: null,
                city: null,
                name: null,
                type: null
            });
        }
    }
    else {
        res.status(400).send('City must be a string');
    }
});
// Regular Expresion tambien  RegEx que verifica si solo son caracteres alfabeticos 
function containsOnlyLetters(inputString) {
    inputString = inputString.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    // Regular expression to match letters, spaces, and hyphens
    const regex = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s-]+$/;
    return regex.test(inputString);
}
function formatCityName(district) {
    district = district.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    district = district.toLowerCase();
    district = district.split(' ').map(word => word).join('');
    district = district.charAt(0).toUpperCase() + district.slice(1);
    return district;
}
function calculateStringSimilarity(str1, str2) {
    // Usar la función compareTwoStrings de string-similarity para obtener un coeficiente de similitud
    const similarity = (0, string_similarity_1.compareTwoStrings)(str1, str2);
    // Convertir el coeficiente de similitud en porcentaje multiplicando por 100
    const similarityPercentage = similarity * 100;
    // Redondear el resultado a dos decimales
    return parseFloat(similarityPercentage.toFixed(2));
}
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

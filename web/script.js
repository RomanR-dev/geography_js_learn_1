// const fireEmoji = '🔥'


const spanElement = document.querySelector('span')
const btnElement = document.querySelector('button')
const countryElement = document.querySelector('.country')
const inputElement = document.querySelector('.country_1')


btnElement.addEventListener('click', () => {
    let country = inputElement.value
    console.log(country)
    countryElement.textContent = "chosen country/city " + country
    inputElement.value = ''

    const map = document.querySelector('.country_img')
    getCountryCoordinates(country).then((coords) => {
        if (!coords) {
            map.src = "https://media.istockphoto.com/id/538665020/photo/internet-meme-why-you-no-rage-face-3d-illustration.jpg?s=612x612&w=0&k=20&c=5D_g8Jy8kqg5Op2bb4RvcH8_6y0HGPqt29TKDrEqLyM="
        } else {
            const {lat, lon} = coords
            const fullImgUrl = getCountryMapImage(country, lat, lon)
            map.src = fullImgUrl
            map.alt = countryElement.textContent
        }
    })
})


// Function to get the OpenStreetMap image URL for a given country
function getCountryMapImage(countryName, lat, lon) {
    // Base URL for OpenStreetMap Static Maps API
    const baseUrl = 'https://static-maps.yandex.ru/1.x/'

    // Construct the map URL
    const params = new URLSearchParams({
        l: 'map',           // Map layer (map for roadmap, sat for satellite)
        ll: `${lon},${lat}`,          // Center coordinates (longitude, latitude) - default to (0,0)
        spn: '20,10',       // Map span (longitude span, latitude span)
        size: '600,400',    // Map size (width, height in pixels)
        lang: 'en_US',      // Language
        text: countryName,  // Country name to display as text
    });

    const fullUrl = `${baseUrl}?${params.toString()}`
    return fullUrl
}

async function getCountryCoordinates(countryName) {
    const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(countryName)}`;

    try {
        const response = await fetch(apiUrl, {
            headers: {
                'User-Agent': 'MyApp/1.0', // Recommended for identifying your app
            },
        });
        const data = await response.json();

        if (data.length > 0) {
            const {lat, lon} = data[0];
            console.log({'lat': lat, 'lon': lon});
            return {'lat': lat, 'lon': lon};
        } else {
            console.log('no data')
            return null;
        }
    } catch (error) {
        console.log(error)
        return null;
    }
}
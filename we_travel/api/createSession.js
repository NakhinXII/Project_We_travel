const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://travel-advisor.p.rapidapi.com/flights/create-session',
  params: {
    o1: 'DMK',
    d1: 'CNX',
    dd1: '2022-03-15',
    currency: 'USD',
    ta: '1',
    c: '0'
  },
  headers: {
    'X-RapidAPI-Key': '0ce1801f0emsh4f9245a4c2e81e1p1ff9a5jsn64334aa3c40c',
    'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
  }
};

try {
	const response = await axios.request(options);
	console.log(response.data);
} catch (error) {
	console.error(error);
}
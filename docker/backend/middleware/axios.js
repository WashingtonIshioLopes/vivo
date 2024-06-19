const axios = require('axios');
const https = require('https');

// Cria uma instância do axios com um agente https que ignora a verificação de certificados
const axiosInstance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
});

module.exports = axiosInstance;
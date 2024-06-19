const winston = require('winston');

// Função para criar e configurar o logger
const createLogger = () => {
  // Configuração dos transportes de log
  const logger = winston.createLogger({
    level: 'info', // Nível de log padrão
    format: winston.format.combine(
      winston.format.timestamp(), // Adiciona o timestamp
      winston.format.json() // Formato JSON
    ),
    transports: [
      // Transporte para console
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(), // Adiciona cores
          winston.format.simple() // Formato simples
        )
      }),
      // Transporte para arquivo de log
      new winston.transports.File({ filename: 'logfile.log' })
    ]
  });

  return logger;
};

module.exports = createLogger;


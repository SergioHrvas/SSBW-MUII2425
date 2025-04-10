import winston from 'winston'
const { combine, timestamp, align, printf } = winston.format;
import DailyRotateFile from 'winston-daily-rotate-file'

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'debug',
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss', // Cambié a formato 24h (hh->HH)
    }),
    align(),
    printf(info => `[${info.timestamp}] ${info.level.toUpperCase()}: ${info.message}`)
  ),
  transports: [
    // Consola (siempre activa)
    new winston.transports.Console(),
    
    // Rotación para logs generales
    new DailyRotateFile({
      filename: 'logs/app-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true, // Comprime archivos viejos
      maxSize: '120m', // Rota al alcanzar 20MB
      maxFiles: '14d', // Conserva logs por 14 días
      level: 'info'
    }),
    
    // Rotación para errores
    new DailyRotateFile({
      filename: 'logs/error-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '30d', // Los errores se conservan por 30 días
      level: 'error'
    })
  ],
  exceptionHandlers: [
    new DailyRotateFile({
      filename: 'logs/exceptions-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '30d'
    })
  ]
});

// Manejo de excepciones no capturadas
logger.exceptions.handle(
  new DailyRotateFile({
    filename: 'logs/exceptions-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '30d'
  })
);
				
export default logger
export const infoLogger = (...params) => {
if (process.env.NODE_ENV !== 'test') {
    console.log(...params)
}
    }
    
export const errorLogger = (...params) => {
    if (process.env.NODE_ENV !== 'test') {
      console.error(...params)
    }
}
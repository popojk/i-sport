module.exports = {
  development: {
    username: 'root',
    password: '96450065',
    database: 'i_sport_workplace',
    host: '127.0.0.1',
    port: '3307',
    dialect: 'mysql'
  },
  test: {
    username: 'root',
    password: '96450065',
    database: 'i_sport_workplace',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  /*
  production: {
    username: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    host: process.env.RDS_HOSTNAME,
    database: process.env.RDS_DB_NAME,
    dialect: 'mysql',
    operatorsAliases: false
  } */
  production: {
    username: 'root',
    password: '96450065',
    database: 'i_sport_workplace',
    host: 'isport-db',
    port: '3306',
    dialect: 'mysql'
  }
}

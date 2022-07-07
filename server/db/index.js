const mysql = require('mysql');
const Pool = require('mysql/lib/Pool');

mysql.createPool({
    connectionLimit: 10,
    password: 'password',
    user: 'user',
    database: 'rfid',
    host: 'localhost',
    port: '3306' 

});

// rfid - cria uma 'connectionPool para qq Querie que queiramos fazer

let rfiddb = {};

rfiddb.all = () => {
    return new Promise((resolve, reject) => {
        Pool.query(`SELECT * FROM user`, (err,results) => {
            if(err) {
                return reject(err);
            }
        return(results);
        });
    });

};

// rfid - cria um query em sql (selecciona todos os campos da tabela user)

module.exports = rfiddb;

rfiddb.one = (id) => {
    return new Promise((resolve, reject) => {
        Pool.query(`SELECT * FROM user WHERE nome = ?`, [nome], (err,results) => {
            if(err) {
                return reject(err);
            }
        return(results);
        });
    }); 

};

// rfid - '?' evita sql injecion -- [nome] pode ser um array de valores i.e. [nome, morada, email]


const mysql = require('mysql');

connection = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: 'violin555',
    database: 'pi18'
});

let userModel = {};

// Devuelve los vendedores de la BD
userModel.getSellers = (callback) => {
    if (connection) {
        connection.query (
            'SELECT * FROM seller',
            (err, rows) => {
                if (err) {
                    throw err;
                } else {
                    callback(null, rows);
                }
            }
        )
    }
}; 

// Inserta datos en la tabla seller
// Ponemos como parametro los datos a ingresar y el callback
userModel.insertSeller = (userData, callback) => {
    if (connection) {
        connection.query (
            'INSERT INTO seller SET ?', userData,
            (err, result) => {
                if (err) {
                    throw err;
                } else {
                    callback (null, {
                        'insertId': result.insertId
                    });
                }
            }
        )
    }
};

// Actualiza información de los sellers
userModel.updateSeller = (userData, callback) => {
    if (connection) {

        const sql = `
            UPDATE seller SET 
            completeName = ${connection.escape(userData.completeName)},
            adressLine = ${connection.escape(userData.adressLine)},
            cellPhone = ${connection.escape(userData.cellPhone)}
            WHERE idSeller = ${connection.escape(userData.idSeller)}
        ` 
        connection.query(sql, (err, result) => {
            if (err) {
                throw err;
            } else {
                callback (null, {
                    "msg": "Success"
                });
            }
        });
    }
};

userModel.deleteSeller = (idSeller, callback) => {
    if (connection) {
        let sql = `
            SELECT * FROM seller WHERE idSeller = ${connection.escape(idSeller)}
        `;

        connection.query(sql, (err, row) => {
            if(row) {
                let sql = `
                    DELETE FROM seller WHERE idSeller = ${idSeller}
                `;

                connection.query(sql, (err, result) => {
                    if (err) {
                        throw err;
                    } else {
                        callback(null, {
                            msg: 'Seller deleted'
                        });
                    }
                });
            } else {
                callback(null, {
                    msg: 'Not exists'
                });
            }
        });
    }
}

module.exports = userModel;
const User = require('../models/user');

// Resibe app
module.exports = function (app) {

    app.get('/users', (req, res) => {
        User.getSellers((err, data) => {
            res.status(200).json(data);
        });
    });

    app.post('/users', (req, res) => {
        // Objeto
        const userData = {
            idSeller: null,
            completeName: req.body.completeName,
            adressLine: req.body.adressLine,
            cellPhone: req.body.cellPhone
        };

        User.insertSeller(userData, (err, data) => {
            if (data && data.insertId) {
                res.json({
                    success: true,
                    msg: 'Usuario insertado',
                    data: data
                })
            } else {
                res.status(500).json ({
                success: false,
                msg: 'Error'  
                });
            }
        });
    });

    //Actualiza la informacion de los sellers
    app.put('/users/:idSeller', (req, res) => {

        const userData = {
            idSeller: req.params.idSeller,
            completeName: req.body.completeName,
            adressLine: req.body.adressLine,
            cellPhone: req.body.cellPhone
        };
        
        User.updateSeller(userData, (err, data) => {
            if (data && data.msg) {
                res.json(data)
            } else {
                res.json({
                    success: false,
                    msg: 'Error'
                })
            }
        });
    });

    app.delete('/users/:idSeller', (req, res) => {
        User.deleteSeller(req.params.idSeller, (err, data) => {
            if (data && data.msg === 'Seller deleted' || data.msg === 'Not exists') {
                res.json({
                    success: true,
                    data
                })
            } else {
                res.status(500).json({
                    msg: 'Error'
                })
            }
        });
    });
}
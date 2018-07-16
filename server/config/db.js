var mongoose = require('mongoose'),
    user = require("../models/user");
var connection = mongoose.connect('mongodb://localhost/mean_db', {
    useMongoClient: true
});

connection.on("open", function(ref) {
    console.log("Connected to mongo server.");
    user.find({ userName: 'admin' }, function(err, data) {
        if (err) {
            console.log("Error on Admin Find: ",err);
        } else {
            if (data.length === 0)
                createAdmin();
            else console.log("Admin already created");
        }
    });

    function createAdmin() {
        var model = new user({ name: 'Admin', userName: 'admin', password: 'admin', role: 'Admin' });
        model.save(function(err, result) {
            if (err) {
                console.log("error on Admin creation: ", err);
                return;
            }
            console.log("Admin created:");
        });
    }
});

module.exports = connection;
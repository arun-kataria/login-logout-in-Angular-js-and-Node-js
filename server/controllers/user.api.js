var express = require("express"),
    router = express.Router(),
    user = require("../models/user");

router.get("/", function(req, res) {
    user.find({ userName: { '$nin': ['admin'] } }, function(err, data) {
        if (err) {
            res.send(response(false, err, null));
            return;
        }
        res.send(response(true, 'success!', data));
    });
}).get("/:id", function(req, res) {
    var id = req.params.id;
    user.find({ _id: id }, function(err, data) {
        if (err) {
            res.send(response(false, err, null));
            return;
        }
        res.send(response(true, 'success!', data[0]));
    });
}).post("/", function(req, res) {
    var obj = req.body;
    var model = new user(obj);

    model.save(function(err, result) {
        if (err) {
            res.send(response(false, 'Same User Name Already created', null));
            return;
        }
        res.send(response(true, 'created', result));
    });

}).put("/:id", function(req, res) {
    var id = req.params.id;
    var obj = req.body;
    user.findByIdAndUpdate(id, { name: obj.name, userName: obj.userName, password: obj.password },
        function(err, result) {
            if (err) {
                res.send(response(false, err, null));
                return;
            }
            res.send(response(true, 'updated', result));
        });
}).delete("/:id", function(req, res) {
    var id = req.params.id;
    user.findByIdAndRemove(id, function(err, result) {
        if (err) {
            res.send(response(false, err, null));
            return;
        }
        res.send(response(true, 'deleted', result));
    });
}).post("/login", function(req, res) {
    var obj = req.body;
    user.find({ userName: obj.userName, password: obj.password }, function(err, data) {
        if (err) {
            res.send("error");
            return;
        } else {
            if (data.length === 0)
                res.send(response(false, "Wrong Username/ Password", null));
            else res.send(response(true, "success", data[0]));
        }
    });
})

//this will create resoinse object.
function response(success, message, data) {
    return { success: success, message: message, data: data }
}

module.exports = router;
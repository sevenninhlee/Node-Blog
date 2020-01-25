var db = require("../common/database");
var q = require('q');

var conn = db.getConnection();

function addUser(user) {

    if (user) {
        var defer = q.defer();

        var query = conn.query('INSERT INTO users SET ?', user, function (err, result) {
            if (err) {
                defer.reject(err);
            } else {
                defer.resolve(result);
            }
        });

        return defer.promise;
    }
    return false;
}

function getUserByEmail(email) {
    if (email) {
        var defer = q.defer();

        var query = conn.query('SELECT * FROM users WHERE ?', { email: email }, function (err, result) {
            if (err) {
                defer.reject(err);
            } else {
                defer.resolve(result);
            }
        });

        return defer.promise;
    }

    return false;
}

function getAllUsers() {
    var defer = q.defer();

    var query = conn.query('SELECT * FROM users', function (err, users) {
        if (err) {
            defer.reject(err);
        } else {
            defer.resolve(users);
        }
    });

    return defer.promise;
}

module.exports = {
    addUser: addUser,
    getUserByEmail: getUserByEmail,
    getAllUsers: getAllUsers,
}
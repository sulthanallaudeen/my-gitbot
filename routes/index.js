var express = require('express');
var router = express.Router();
var GitHub = require('github-api');
var a = 'd789657a';
var b = '523faef4363318cc96';
var c = 'e1b39f0e909766';
var token = a + b + c;

// basic auth
var gh = new GitHub({
    token: token
});

// var me = gh.getUser(); // no user specified defaults to the user for whom credentials were provided
// me.listNotifications(function(err, notifications) {
//     console.log(notifications)
// });

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'GitBot' });
});

// /* GET User */
// router.post('/user', function(req, res, next) {
//     var data = req.body.name
//     console.log(data);
//     var user = gh.getUser(data);
//     res.status(202).json({
//         'success': 1,
//         'data': user
//     });
// });

/* Get User Data*/
router.post('/', function(req, res, next) {
    var user = gh.getUser(req.body.name);
    user.listRepos(function(err, repos) {
        if (err) {
            res.status(202).json({
                'success': 0,
                'message': err
            });
        } else {
            // var data = '';
            // for (let index = 0; index < repos.length; index++) {
            //     console.log(repos[index].name);
            //     data += repos[index].name;
            // }
            res.status(202).json({
                'success': 1,
                'data': repos
            });
        }
    });
});

module.exports = router;
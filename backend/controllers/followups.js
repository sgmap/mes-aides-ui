var Followup = require('mongoose').model('Followup');
var situation = require('./situations');

exports.followup = function(req, res, next, id) {
    Followup.findById(id, function(err, followup) {
        if (err) return next(err);
        if (! followup || ! followup.situation) return res.redirect('/');
        req.followup = followup;

        situation.situation(req, res, next, followup.situation);
    });
};

exports.resultRedirect = function(req, res) {
    situation.attachAccessCookie(req, res);
    res.redirect('/foyer/resultat?situationId=' + req.situation._id);
};

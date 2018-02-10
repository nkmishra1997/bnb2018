module.exports = function(app, passport) {
var controller = require('./controller.js')
var path = require("path");
const session      = require('express-session');

// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.sendfile('../views/index.html'); // load the index.ejs file
    });

    // PROFILE SECTION =========================

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });


//============================================================================
//Admin routes ===============================================================
//============================================================================



app.route('/adminDashboard')
    .get(isLoggedIn, isAdmin,controller.customerDetail);

app.route('/admin/companylist')
    .get(isLoggedIn, isAdmin,controller.companyList);

app.route('/admin/userlist')
    .get(isLoggedIn, isAdmin, controller.customerList);

app.route('/admin/newslist')
    .get(isLoggedIn, isAdmin,controller.adminNewsList);

app.route('/admin/addCompany')
    .post(isLoggedIn, isAdmin, controller.addCompany);

app.route('/admin/addNews')
    .post(isLoggedIn, isAdmin,controller.addNews);

// app.route('/admin/newsDetail/:id')
//     .get(isLoggedIn, isAdmin,controller.newsDetails);

app.route('/admin/companyDetail/:id')
    .get(isLoggedIn, isAdmin, controller.companyDetails);

app.route('/admin/userDetails/:id')
    .get(isLoggedIn, isAdmin,controller.customerDetail);

app.route('/admin/modifyCompany/:id')
    .post(isLoggedIn, isAdmin,controller.modifyCompany);

app.route('/admin/modifyNews/:id')
    .post(isLoggedIn, isAdmin,controller.modifyNews);

app.route('/admin/deleteCompany/:id')
    .delete(isLoggedIn, isAdmin, controller.deleteCompany);

app.route('/admin/deleteNews/:id')
    .post(isLoggedIn, isAdmin,controller.deleteNews);

app.route('/admin/modifyUser/:id')
    .post(isLoggedIn, isAdmin, controller.modifyUser);

app.route('/admin/deleteUser/:id')
    .post(isLoggedIn, isAdmin, controller.deleteUser);



// ============================================================================
// Stock Market ===============================================================
// ============================================================================

app.route('/companylist')
    .get(isLoggedIn,controller.companyList);

app.route('/cryptolist')
    .get(isLoggedIn,controller.cryptoList);

app.route('/companydetail/:id')
    .get(isLoggedIn,controller.companyDetails);

app.route('/newslist')
    .get(isLoggedIn,controller.newsList);

// ============================================================================
// Customer  ===============================================================
// ============================================================================

app.route('/customerdetail')
    .get(isLoggedIn,controller.customerDetail);

app.route('/scoreboard')
    .get(isLoggedIn,controller.customerList);

app.route('/buy/:id')
    .post(isLoggedIn,controller.buy);

app.route('/sell/:id')
    .post(isLoggedIn,controller.sell);

app.route('/short/:id')
    .post(isLoggedIn, controller.short);

app.route('/cover/:id')
    .post(isLoggedIn, controller.cover);

app.route('/takeloan')
    .post(isLoggedIn,controller.takeLoan);

app.route('/repayloan')
    .post(isLoggedIn,controller.repayLoan);

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // facebook -------------------------------

        // send to facebook to do the authentication
        app.get('/auth/facebook',passport.authenticate('facebook', { scope : ['email'] }));

        // handle the callback after facebook has authenticated the user
        app.get('/auth/facebook/callback',
            passport.authenticate('facebook'), function(req, res) {
                // Explicitly save the session before redirecting!
                req.session.save(() => {
                  res.redirect('/market');
                })
              });
app.get('/auth/userdata', isLoggedIn,function(req, res) {
    Donator.findById(req.user, function(err, fulluser) {
        if (err) throw err;
        res.json(fulluser);
    })
});

// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================

    // facebook -------------------------------

        // send to facebook to do the authentication
        app.get('/connect/facebook' , passport.authorize('facebook', { scope : 'email' }));

        // handle the callback after facebook has authorized the user
        app.get('/connect/facebook/callback',
            passport.authorize('facebook'),function(req, res) {
                // Explicitly save the session before redirecting!
                req.session.save(() => {
                  res.redirect('/market');
                })
              });

};
// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        if(req.user.ban==false){
            return next();
        }
        else{
            console.log('You are banned');
            res.redirect('/');
        }    
    }
    else{
            console.log('User not authenticated in isLoggedIn');
            res.redirect('/');
        }

}

//to ensure that the user is a admin
function isAdmin(req, res, next){
    if(req.user.admin == true){
        return next();
    }
    else{
        console.log("you dont have permission");
        res.redirect('/');
    }
}

module.exports = function(app, passport) {
var controller = require('./controller.js')
var path = require("path");

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
    .get(isLoggedIn, isAdmin, controller.customerDetail);

app.route('/admin/companylist')
    .get(isLoggedIn, isAdmin, controller.companyList);

app.route('/admin/userlist')
    .get(isLoggedIn, isAdmin, controller.customerList);

app.route('/admin/newslist')
    .get(isLoggedIn, isAdmin, controller.newsList);

app.route('/admin/addCompany')
    .post(passport.authenticate('facebook-token'), isAdmin, controller.addCompany);

app.route('/admin/addNews')
    .post(passport.authenticate('facebook-token'), isAdmin, controller.addNews);

app.route('/admin/newsDetail/:id')
    .get(isLoggedIn, isAdmin, controller.newsDetails);

app.route('/admin/companyDetail/:id')
    .get(isLoggedIn, isAdmin, controller.companyDetails);

app.route('/admin/userDetails/:id')
    .get(isLoggedIn, isAdmin, controller.customerDetail);

app.route('/admin/modifyCompany/:id')
    .post(passport.authenticate('facebook-token'), isAdmin, controller.modifyCompany);

app.route('/admin/modifyNews/:id')
    .post(passport.authenticate('facebook-token'), isAdmin, controller.modifyNews);

app.route('/admin/deleteCompany/:id')
    .delete(passport.authenticate('facebook-token'), isAdmin, controller.deleteCompany);

app.route('/admin/deleteNews/:id')
    .post(passport.authenticate('facebook-token'), isAdmin, controller.deleteNews);

app.route('/admin/modifyUser/:id')
    .post(passport.authenticate('facebook-token'), isAdmin, controller.modifyUser);

app.route('/admin/deleteUser/:id')
    .post(passport.authenticate('facebook-token'), isAdmin, controller.deleteUser);



// ============================================================================
// Stock Market ===============================================================
// ============================================================================

app.route('/companylist')
    .get(passport.authenticate('facebook-token'), controller.companyList);

app.route('/companydetail/:id')
    .get(passport.authenticate('facebook-token'), controller.companyDetails);

app.route('/newslist')
    .get(passport.authenticate('facebook-token'), controller.newsList);

// ============================================================================
// Customer  ===============================================================
// ============================================================================

app.route('/customerdetail')
    .get(passport.authenticate('facebook-token'), controller.customerDetail);


app.route('/scoreboard')
    .get(passport.authenticate('facebook-token'), controller.customerList);

app.route('/buy/:id')
    .post(passport.authenticate('facebook-token'), controller.buy);

app.route('/sell/:id')
    .post(passport.authenticate('facebook-token'), controller.sell);

app.route('/short/:id')
    .post(passport.authenticate('facebook-token'), controller.short);

app.route('/cover/:id')
    .post(passport.authenticate('facebook-token'), controller.cover);

app.route('/takeloan')
    .post(isLoggedIn, controller.takeLoan);

app.route('/repayloan')
    .post(isLoggedIn, controller.repayLoan);

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // facebook -------------------------------

        // send to facebook to do the authentication
        app.get('/auth/facebook', passport.authenticate('facebook', { scope : ['email'] }));

        // handle the callback after facebook has authenticated the user
        app.get('/auth/facebook/callback',
            passport.authenticate('facebook', {

                successRedirect : '/market',
                failureRedirect : '/'
            }));
app.get('/auth/userdata', isLoggedIn, function(req, res) {
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
        app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));

        // handle the callback after facebook has authorized the user
        app.get('/connect/facebook/callback',
            passport.authorize('facebook', {
                successRedirect : '/market',
                failureRedirect : '/'
            }));

};
// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();}
    else{
            console.log('no header');
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

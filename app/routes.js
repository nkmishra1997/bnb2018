module.exports = function(app, passport) {
var controller = require('./controller.js')
var path = require("path");

// normal routes ===============================================================

    // show the home page (will also have our login links)
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    // PROFILE SECTION =========================
/*
    app.get('/profile', isLoggedIn, function(req, res) {
        console.log(req.user)
    });
*/
    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });


//============================================================================
//Admin routes ===============================================================
//============================================================================



app.route('/adminDashboard')
    .get(passport.authenticate('facebook-token'), isAdmin, controller.customerDetail);

app.route('/admin/companylist')
    .get(passport.authenticate('facebook-token'), isAdmin, controller.companyList);

app.route('/admin/userlist')
    .get(passport.authenticate('facebook-token'), isAdmin, controller.customerList);

app.route('/admin/newslist')
    .get(passport.authenticate('facebook-token'), isAdmin, controller.newsList);

app.route('/admin/addCompany')
    .post(passport.authenticate('facebook-token'), isAdmin, controller.addCompany);

app.route('/admin/addNews')
    .post(passport.authenticate('facebook-token'), isAdmin, controller.addNews);

app.route('/admin/newsDetails/:id')
    .get(passport.authenticate('facebook-token'), isAdmin, controller.newsDetails);

app.route('/admin/companyDetail/:id')
    .get(passport.authenticate('facebook-token'), isAdmin, controller.companyDetails);

app.route('/admin/UserDetails/:id')
    .get(passport.authenticate('facebook-token'), isAdmin, controller.customerDetail);

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
    .get(isLoggedIn, controller.companyList);

app.route('/companydetail/:id')
    .get(isLoggedIn, controller.companyDetails);

app.route('/newslist')
    .get(isLoggedIn, controller.newsList);

// ============================================================================
// Customer  ===============================================================
// ============================================================================

app.route('/customerdetail')
    .get(isLoggedIn, controller.customerDetail);

app.route('/leaderboard')
    .get(isLoggedIn, controller.customerList);

app.route('/buy/:id')
    .post(isLoggedIn, controller.buy);

app.route('/sell/:id')
    .post(isLoggedIn, controller.sell);

app.route('/short/:id')
    .post(isLoggedIn, controller.short);

app.route('/cover/:id')
    .post(isLoggedIn, controller.cover);

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

            app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/../bnb/dist/index.html'));
});

};
// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
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

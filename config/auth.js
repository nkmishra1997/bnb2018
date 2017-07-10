// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : 'APP ID', // your App ID
        'clientSecret'  : 'APP SECRE T', // your App Secret
        'callbackURL'   : 'http://localhost:3000/auth/facebook/callback',
        'profileFields'   : ['id', 'displayName', 'name', 'gender' , 'email', 'photos']
    }

};
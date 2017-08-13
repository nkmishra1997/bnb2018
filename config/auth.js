// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '254657541699156', // your App ID
        'clientSecret'  : 'af61439843e96ced07745b95eaf86e36', // your App Secret
        'callbackURL'   : 'http://localhost:3000/auth/facebook/callback',
        'profileFields'   : ['id', 'displayName', 'name', 'gender' , 'email', 'photos']
    }

};

const express = require("express");
const router = express.Router();
const passport = require('passport');

require('../passportStrategy');
const session = require('express-session');

const mySession = session({
    secret: 'cats',
    resave: false,
    saveUninitialized: true
})

const initSession = router => {
    router.use(mySession);
    router.use(passport.initialize());
    router.use(passport.session());
}

router.use(express.json());
initSession(router);


function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

/**
 * @swagger
 * /api/auth/login:
 *   get:
 *     description: Provides a link to sign in with google.
 *     tags: [auth]
 *     responses:
 *       '200':
 *         description: Successful Response
 */
router.get('/login', (req, res) => {
    res.status(200).send('<a href="/api/auth/google">Authenticate with Google</a>');
});


/**
 * @swagger
 * /api/auth/google:
 *   get:
 *     description: Send user to google login page.
 *     tags: [auth]
 */
router.get('/google/', (req, res, next) => {
    if (req.query.return) req.session.oauth2return = req.query.return;
    next();
}, passport.authenticate('google', { scope: ['email', 'profile'] }));


/**
 * @swagger
 * /api/auth/google/callback:
 *   get:
 *     description: Redirects user to /api/auth/testLoggedIn on successful login and /api/auth/google/failure on unsuccessful login.
 *     tags: [auth]
 */
 router.get('/google/callback',
 passport.authenticate('google'), (req, res) => {
     const redirect = req.session.oauth2return || "/api-docs"
     delete req.session.oauth2return;
     res.redirect(redirect);
 }
);


/**
 * @swagger
 * /api/auth/google/failure:
 *   get:
 *     description: Failed to login
 *     tags: [auth]
 *     responses:
 *       '401':
 *         description: Login failed.
 */
 router.get('/google/failure', (req, res) => {
    res.status(401).send('Failed to authenticate...');
});


/**
* @swagger
* /api/auth/login/success:
*   get:
*     description: Checks whether or not user is logged in
*     tags: [auth]
*/
router.get('/login/success', (req, res) => {
    if (req.user) return res.json({
        ok: true,
        user: req.user,
    });
    
    return res.status(401).json({
        ok: false,
    });
});


/**
 * @swagger
 * /api/auth/testLoggedIn:
 *   get:
 *     description: A protected route only for logged in users.
 *     tags: [auth]
 *     security:
 *       - oAuth:
 *          - logged_in
 *     responses:
 *       '200':
 *         description: Successful Response
 */
router.get('/testLoggedIn', isLoggedIn, (req, res) => {
    res.status(200).send(`Hello ${req.user.displayName}`);
});


/**
 * @swagger
 * /api/auth/logout:
 *   get:
 *     description: Lets a user logout
 *     tags: [auth]
 *     responses:
 *       '200':
 *         description: Successful Response
 */
router.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.status(200).send("logged out");
});


exports.authRouter = router;
exports.isLoggedIn = isLoggedIn;
exports.initSession = initSession;

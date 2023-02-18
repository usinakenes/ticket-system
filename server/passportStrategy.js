const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

// prisma stuff
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const GOOGLE_CLIENT_ID = "1017397100859-lmfctes7fvs8ac3op5lraepjdl8580dp.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";


passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.NODE_ENV === "production" ? "https://biljettsystem.salamon.xyz" : "http://localhost:7050"}/api/auth/google/callback`,
    passReqToCallback: true,
},
    async function (request, accessToken, refreshToken, profile, done) {
        const { displayName, email } = profile;

        try {
            // add or update user in db
            await prisma.user.upsert({
                where: {
                    email,
                },
                update: {
                    email,
                    name: displayName,
                },
                create: {
                    email,
                    name: displayName,
                },
            });
        } catch (err) {
            // db down
            return done(null, null);
        }

        return done(null, profile);
    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});
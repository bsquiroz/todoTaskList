const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const { Users } = require("../models");

passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
        },
        async (email, password, done) => {
            try {
                let user = await Users.findOne({ where: { email } });
                if (user && bcrypt.compareSync(password, user.password)) {
                    return done(null, user);
                }
                return done(null, false);
            } catch (error) {
                done(error);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    return done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        let user = await Users.findByPk(id, { plain: true });
        done(null, user);
    } catch (error) {
        done(error);
    }
});

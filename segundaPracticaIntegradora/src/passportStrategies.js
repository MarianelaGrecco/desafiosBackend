import passport from "passport";
import { usersModel } from "./models/Users.js";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GithubStrategy } from "passport-github2";
import { compareData } from "./path.js";

// estrategia passport-local
passport.use(
  "login",
  new LocalStrategy( 
    {
      usernameField: "email",
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try { 
        const user = await usersModel.findOne({ email });
        if (!user) {
          return done(null, false);
        }
        const isPasswordValid = await compareData(password, user.password);
        if (!isPasswordValid) {
          return done(null, false);
        }
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

// GITHUB - PASSPORT

passport.use(
    'githubSignup',
    new GithubStrategy(
      {
        clientID: 'Iv1.d43820ab865f3b86',
        clientSecret: '9a559c4245c8e271edb97c07310185084c784607',
        callbackURL: "http://localhost:4000/api/users/github",
      },
      async (accessToken, refreshToken, profile, done) => {
        const { name, email } = profile._json

        if (!email) {
            return done(null, false, { message: 'Correo electrónico no disponible en el perfil de GitHub' });}
        try {
          const userDB = await usersModel.findOne({ email })
          if (userDB) {
            return done(null, userDB)
          }
          const user = {
            first_name: name.split(' ')[0],
            last_name: name.split(' ')[1] || '',
            email,
            password: ' ',
          }
          const newUserDB = await usersModel.create(user)
          done(null, newUserDB)
        } catch (error) {
          done(error)
        }
      }
    )
  )


//Métodos de passport
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await usersModel.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

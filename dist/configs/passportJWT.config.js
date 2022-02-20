"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requirePassportJWT = void 0;
const passport_jwt_1 = __importDefault(require("passport-jwt"));
const models_1 = require("../models");
const config_1 = require("../configs/config");
const { Strategy: JWTStrategy, ExtractJwt } = passport_jwt_1.default;
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config_1.JWT_SECRET,
};
const passportJWTStrategy = new JWTStrategy(opts, (jwtPayload, done) => {
    const _id = jwtPayload._id;
    models_1.User.findOne({ _id })
        .then((user) => {
        if (user) {
            done(null, user);
        }
        else {
            done(null, false);
        }
    })
        .catch((error) => done(error, false));
});
const requirePassportJWT = (passport) => {
    passport.use(passportJWTStrategy);
    return passport;
};
exports.requirePassportJWT = requirePassportJWT;
//# sourceMappingURL=passportJWT.config.js.map
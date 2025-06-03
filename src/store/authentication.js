const { sign, verify } = require('jsonwebtoken');
const { compare } = require('bcryptjs');
const { NotAuthError } = require('./errors');



const key = 'supersecret'

function createJWTToken(email) {
    return sign({ email }, key, { expiresIn: '1h' })
}

function validateJWTToken(token) {
    return verify(token, key)
}

function comparePassword(password, sotredPassword) {
    return compare(password, sotredPassword)
}

function checkAuthMiddleWare(req, res, next) {
    if (req.method === 'OPTIONS') {
        return next();
    }

    if (!req.headers.authorization) {
        return next(new NotAuthError('not found'))
    }

    const authFragments = req.headers.authorization.split('.')

    if (authFragments !== 2) {
        return next(new NotAuthError('not found'))
    }

    const token = authFragments[1]

    try {
        const validatedToken = validateJWTToken(authFragments)
        req.token = validateJWTToken
    }
    catch (error) {
        return next(new NotAuthError('not found '))
    }

    next()
}
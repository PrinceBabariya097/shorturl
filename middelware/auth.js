import { getUser } from "../service/auth.js"

const isUserValid = (req, res, next) => {
    const cookie = req?.cookies.uid

    if(!cookie) return next()

    const user = getUser(cookie)

    if(!user) return res.redirect('/login')

    req.user = user
    next()
}

const authenticateUserRole = (roles) => {
    return (req, res, next) => {

        if(!req.user?.role) return res.redirect('/login')


        if(!roles.includes(req.user?.role)) return res.end("UnAuthorized")

        return next()
    }
}

export {
    isUserValid,
    authenticateUserRole
}
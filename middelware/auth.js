import { getUser } from "../service/auth.js"

const isUserValid = (req, res, next) => {
    const cookie = req?.cookies.uid
    // console.log(req.cookies);

    if(!cookie) return next()

    const user = getUser(cookie)

    if(!user) return res.redirect('/login')

    req.user = user
    // console.log(user);
    next()
}

const authenticateUserRole = (roles) => {
    return (req, res, next) => {

        if(!req.user?.role) return res.redirect('/login')

        console.log(req);

        if(!roles.includes(req.user?.role)) return res.end("UnAuthorized")

        return next()
    }
}

export {
    isUserValid,
    authenticateUserRole
}
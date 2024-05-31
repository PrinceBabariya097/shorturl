import { getUser } from "../service/auth.js"

const isUserValid = (req, res, next) => {
    const cookie = req.cookies?.uid

    if(!cookie) return res.redirect('/login')

    const user = getUser(cookie)

    if(!user) return res.redirect('/login')

    res.user = user
    next()
}

const getUserId = (req, res, next) => {
    const cookie = req.cookies?.uid
    const user = getUser(cookie)
    res.user = user
    next()
}

export {
    isUserValid,
    getUserId
}
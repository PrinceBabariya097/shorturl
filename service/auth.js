import jwt from 'jsonwebtoken'
import  'dotenv/config'

const setUser = (user) => {
    return jwt.sign({
        id:user._id,
        email:user.email,
    },process.env.JWTSICRETKEY)
}

const getUser = (id) => {
    return jwt.verify(id,process.env.JWTSICRETKEY)
}

export {
    setUser,
    getUser
}
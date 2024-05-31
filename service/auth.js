const setUserAndSessionId = new Map()

const setUser = (id, user) => {
    setUserAndSessionId.set(id, user)
}

const getUser = (id) => {
    return setUserAndSessionId.get(id)
}

export {
    setUser,
    getUser
}
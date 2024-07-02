import { User } from "../model/user.js";
import { setUser } from "../service/auth.js";

function generateUUID() {
  // Placeholder characters
  const template = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
  
  return template.replace(/[xy]/g, function(c) {
      const random = Math.random() * 16 | 0;
      const value = c === 'x' ? random : (random & 0x3 | 0x8);
      return value.toString(16);
  });
}


const signUpUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Please fill all the fields." });
    }

    const user = await User.create({
      name,
      email,
      password,
    });
    return res.redirect("/login")

  } catch (error) {
    throw error
  }
};

const logInUser = async (req, res) => {
    try {
        const {email, password} = req.body
        if (!email || !password) {
            return res.status(400).json({error: "Please fill all the fields."})
        }
        const isUser = await User.findOne({
            email,
            password
        })

        if(!isUser){
            return res.status(400).json({error: "Invalid credentials."})
        }

          const token = setUser(isUser)
          res.cookie('uid',token)
        return res.redirect("/")
      } catch (error) {
        throw error
    }
}

export { signUpUser, logInUser };

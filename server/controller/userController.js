const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let userSchema = require("../model/userSchema");

class Authentication {
  static async signup(req, res) {

    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    const isValidPassword = (password) => {
      return password.length >= 8;
    };

    try {
      let { fullName, email, password, retypepass } = req?.body.values;

      if (!fullName || fullName.length < 3) {
        return res
          .status(400)
          .json({ error: "Full name must be at least 3 characters long" });
      }

      if (!email || !isValidEmail(email)) {
        return res.status(400).json({ error: "Invalid email format" });
      }

      if (!password || !isValidPassword(password)) {
        return res
          .status(400)
          .json({ error: "Password must be at least 8 characters long" });
      }

      if (password !== retypepass) {
        return res.status(400).json({ error: "Passwords do not match" });
      }

      const salt = bcrypt.genSaltSync(10);

      password = bcrypt.hashSync(password, salt);

      const user = new userSchema({ fullName, email, password });
      await user.save();

      return res.status(200).json({ message: "Validation successful" });
    } catch (error) {
      return res.status(400).json({ message: "bad request", error: error });
    }
  }

  static async login(req, res) {
    let { email, password } = req.body.values;


    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const finduser = await userSchema.findOne({ email });
    if (finduser) {
      if (!bcrypt.compareSync(password, finduser.password)) {
        return res.status(400).json({
          errors: "Invalid Credentials.",
                  });
      }
    }

    const payloadData = {
      email: finduser.email,
    };
    const token = jwt.sign(payloadData, process.env.JWT_SECRET||"khdsgfhasdfhf", {
      expiresIn: "365d",
    });

    return res.json({
      message: "Logged in",
      access_token: `Bearer ${token}`,
    });

    return res.status(400).json({
      errors: {
        email: "No user found with this email.",
      },
    });
  }
}

module.exports = Authentication;

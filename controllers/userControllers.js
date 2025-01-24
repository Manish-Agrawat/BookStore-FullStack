import User from "../Models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { Console } from "console";
import Contact from "../Models/contactSchema.js";

export async function registerController(req, res) {
  // register controller here
  try {
    const { fullName, username, email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
      return res.status(200).json({
        message: "User already exists",
        success: false,
      });
    }

    const hashedPasword = await bcrypt.hash(password, 10);

    const updateUser = new User({
      fullName,
      username,
      email,
      password: hashedPasword,
    });

    await User(updateUser).save();

    res.status(200).json({
      message: "User registered successfully",
      success: true,
    });
  } catch (error) {
    res.status(401).json({
      message: `Error occurred while registering user ${error}`,
      success: false,
    });
  }
}

export async function loginController(req, res) {
  // login controller here
  try {
    const { username, email, password } = req.body;

    const user = await User.findOne({ $or: [{ username }, { email }] });
    if (!user) {
      return res.status(200).json({
        message: "User not exist , please create account ",
        success: false,
      });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(200).json({
        message: "Incorrect  Detail ",
        success: false,
      });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        message: "User logged in successfully",
        success: true,
        token,
      });
  } catch (error) {
    res.status(401).json({
      message: `Error occurred while login user ${error.message}`,
      success: false,
    });
  }
}

export async function logoutController(req, res) {
  try {
    res.status(200).cookie("token", "").json({
      message: "User logged out successfully",
      success: true,
    });
  } catch (error) {
    res.status(401).json({
      message: `Error occurred while logout user ${error.message}`,
      success: false,
    });
  }
}

export async function forgotPasswordController(req, res) {
  // forgot password controller here
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(200).json({
        message: "User not found",
        success: false,
      });
    }
    // Generate a random token
    const resetToken = crypto.randomBytes(30).toString("hex");
    const resetTokenExpiration = Date.now() + 10 * 60 * 1000; // 10 mint for vaild token expiration
    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiration;
    await user.save();
    // Send email with token
    const transporter = nodemailer.createTransport({
      service: "gmail", // Your email service provider
      auth: {
        user: process.env.My_Gmail, //  use environment variable for email
        pass: process.env.Gmail_Password, // use environment variable for password
      },
    });
    const resetLink = `${req.headers.origin}/reset-password/${resetToken}`;
    const mailOptions = {
      from: process.env.My_Gmail, // Use environment variable for email
      to: email,
      subject: "Password Reset of Book Store ",

      html: `
    <div class="bg-gray-50 p-6 rounded-lg">
      <div class="max-w-md mx-auto bg-white shadow-lg rounded-lg">
        <div class="px-6 py-4">
          <h2 class="text-2xl font-semibold text-center text-gray-800 mb-4">Password Reset Request</h2>
          <p class="text-gray-600 text-base mb-4">Hello,</p>
          <p class="text-gray-600 text-base mb-4">We received a request to reset your password. You can reset your password using the link below:</p>
          <a href="${resetLink}" class="inline-block bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out w-full mt-4">Reset Your Password</a>
          <p class="text-gray-600 text-sm mt-4">If you did not request a password reset, please ignore this email.</p>
          <p class="text-gray-600 text-xs mt-2">Regards, <br/> The Support Team</p>
        </div>
      </div>
    </div>
  `,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({
      message: "Reset password email sent successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
export async function verifyResetTokenController(req, res) {
  try {
    const { token } = req.params;

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }, // Ensure the token hasn't expired
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Token is valid", // Token is valid for password reset
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function resetPasswordController(req, res) {
  try {
    const { token, password } = req.body;

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }, // Ensure token is valid
    });

    if (!user) {
      return res.status(200).json({
        success: false,
        message: "Invalid or expired token",
      });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password and clear the reset token and expiry
    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpiry = null;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export async function contactController(req, res) {
  try {
    const { name, email, message } = req.body;

    await Contact({
      name,
      email,
      message,
      createdAt: new Date(),
    }).save();
    res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
}

export async function authToken(req, res) {
  const token = req.cookies.token; // Access HttpOnly cookie

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const _id = decoded.userId;

    const userInfo = await User.findOne({ _id });

    return res.status(200).json({ valid: true, userInfo });
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

export async function adminController(req ,res){
   try {
     const { fullName, username, email, password } = req.body;

     const user = await User.findOne({ email });

     if (user) {
       return res.status(200).json({
         message: "Admin already exists",
         success: false,
       });
     }

     const hashedPasword = await bcrypt.hash(password, 10);

     const updateUser = new User({
       fullName,
       username,
       email,
       password: hashedPasword,
       isAdmin: true,
     });

     await User(updateUser).save();

     res.status(200).json({
       message: "Admin registered successfully",
       success: true,
     });
   } catch (error) {
     res.status(401).json({
       message: `Error occurred while registering user ${error}`,
       success: false,
     });
   }

}

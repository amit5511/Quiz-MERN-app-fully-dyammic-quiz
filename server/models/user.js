import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role:{
    type:String,
    default:'user'
  },
  createdQuiz: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'quiz',
    },
  ],
  attemptedQuiz: [
    {
      quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'quiz',
      },
      title: String,
      score: Number,
      totalMarks: Number,
    },
  ],
});

// Hash password before saving the user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Generate JWT
userSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id },process.env.JWT_KEY, {
    expiresIn: '3d',
  });
};

// Compare passwords
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('user', userSchema);

export default User;

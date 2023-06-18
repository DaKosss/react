const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Метод для хеширования пароля перед сохранением пользователя
userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }

    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;

    return next();
  } catch (error) {
    return next(error);
  }
});

// Метод для проверки введенного пароля
userSchema.methods.checkPassword = async function (password) {
  try {
    const isValid = await bcrypt.compare(password, this.password);
    return isValid;
  } catch (error) {
    throw new Error(error);
  }
};

const User = mongoose.model('User', userSchema, 'user');

module.exports = User;

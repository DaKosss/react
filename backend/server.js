const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../src/models/User'); // Подключение модели пользователя

const app = express();
const port = 3000;
const dbURI = 'mongodb+srv://root:Dadmin@cluster0.ugnjbzg.mongodb.net/?retryWrites=true&w=majority';

// Подключение к базе данных MongoDB
mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

app.use(express.static(path.join(__dirname, '../build')));
app.use(express.json());

// Обработка POST-запроса на регистрацию пользователя
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Проверяем, существует ли уже пользователь с таким email
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already exists' });
    }

    // Хешируем пароль перед сохранением пользователя
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создаем нового пользователя и сохраняем его в базе данных
    const newUser = new User({
      username,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    // console.error('Error registering user:', error);
    // res.status(500).json({ error: 'Internal server error' });
    console.log(username, password);
  }
});


// Обработка POST-запроса на авторизацию пользователя
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Находим пользователя по имени
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Сравниваем хешированный пароль с введенным паролем
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Авторизация успешна
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

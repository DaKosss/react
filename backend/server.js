const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../src/models/User'); // Подключение модели пользователя

const app = express();
const port = 3000;
const dbURI = 'mongodb+srv://root:Dadmin@cluster0.ugnjbzg.mongodb.net/rSite?retryWrites=true&w=majority';

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
  const { username, password, role } = req.body;

  try {
    // Проверяем, существует ли уже пользователь с таким username
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    // Создаем нового пользователя и сохраняем его в базе данных
    const newUser = new User({
      username,
      password, // Используем пароль напрямую
      role, // Передаем значение роли из запроса
    });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
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
    res.status(200).json({ message: 'Login successful', role: user.role });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/api/user/id', (req, res) => {
  const { username } = req.query;

  User.findOne({ username }) // Поиск пользователя по имени пользователя
    .then((user) => {
      if (user) {
        const { id, username, role } = user; // Получение полей id, username и role из найденного пользователя
        res.status(200).json({ id, username, role }); // Возвращение id, username и role в JSON-ответе
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      res.status(500).json({ message: 'Internal server error' });
    });
});


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

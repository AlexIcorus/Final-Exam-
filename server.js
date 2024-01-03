const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// เชื่อมต่อกับฐานข้อมูล MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'website'
});

db.connect((err) => {
  if (err) {
    console.error('ບໍ່ສາມາດເຊື່ອມຕໍ່ກັບຖານຂໍ້ມູນໄດ້ ' + err.message);
  } else {
    console.log('ເຊື່ອມຕໍ່ກັບຖານຂໍ້ມູນສຳເລັດ');
  }
});

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

// Serve static files from the "css" directory
app.use('/css', express.static(path.join(__dirname, 'public', 'css')));

// Serve static files from the "pictures" directory
app.use('/pictures', express.static(path.join(__dirname, 'public', 'pictures')));
app.use('/pictures', express.static(path.join(__dirname, 'public', 'Pics')));
app.use('/pictures', express.static(path.join(__dirname, 'public', 'Pics-Toy')));




// หน้าแรก

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname ,'public', 'auth-login-Register-basic.html'));
});
// หน้าล็อกอิน
app.post('/home', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // ตรวจสอบในฐานข้อมูล
  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, result) => {
    if (err) throw err;

    if (result.length > 0) {
      // Redirect to home.html on successful login
      res.redirect('/home.html');
    } else {
      // Respond with a script that triggers an alert
      res.status(401).send(`
        <script>
          alert('ລະຫັດຫຼືຊື່ຜູ້ໃຊ້ບໍ່ຖືກຕ້ອງ');
          window.location.href = '/';
        </script>
      `);
    }
  });
});


app.post('/register', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  // Validate password length
  if (password.length < 8) {
    return res.status(401).send(`
        <script>
          alert('ລະຫັດຜ່ານຕ້ອງມີຢ່າງໜ້ອຍ 8 ຕົວອັກສອນ');
          window.location.href = '/';
        </script>
      `);
  }

  // Validate if the password contains a special symbol other than '@'
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return res.status(400).send(`
      <script>
        alert('ລະຫັດຜ່ານຕ້ອງມີຕົວອັກສອນພິເສດ');
        window.location.href = '/';
      </script>
    `);
  }

  // Check if the email or name already exists in the database
  const checkQuery = 'SELECT * FROM users WHERE email = ? OR user_name = ?';
  db.query(checkQuery, [email, name], (checkErr, checkResult) => {
    if (checkErr) {
      console.error('Error checking database:', checkErr);
      res.status(500).send({ message: 'Internal Server Error' });
      return;
    }

    if (checkResult.length > 0) {
      // Email or name already exists
      res.status(401).send(`
        <script>
          alert('ອີເມວຫຼືຊື່ຜູ້ໃຊ້ຖືກນຳໃຊ້ແລ້ວ ກະລຸນາລອງປ້ອນຕົວອື່ນ');
          window.location.href = '/';
        </script>
      `);
    } else {
      // Insert data into the database
      const insertQuery = 'INSERT INTO users (user_name, email, password) VALUES (?, ?, ?)';
      db.query(insertQuery, [name, email, password], (insertErr, insertResult) => {
        if (insertErr) {
          console.error('Error in registration:', insertErr);
          res.status(500).send({ message: 'Internal Server Error' });
          return;
        }

        console.log('User registered successfully');
        res.status(401).send(`
          <script>
            alert('ລົງທະບຽນສຳເລັດ');
            window.location.href = '/';
          </script>
        `);
      });
    }
  });
});

app.get('/user/:email', (req, res) => {
  const userEmail = req.params.email;

  // Query to fetch user data based on email
  const query = `SELECT * FROM users WHERE email = '${userEmail}'`;

  connection.query(query, (error, results) => {
    if (error) {
      console.error('Error executing the query:', error);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const user = results[0];
    res.json(user);
  });
});



app.listen(port, () => {
  console.log(`ເຊີບເວີ້ທີ່ເຮັດວຽກ http://localhost:${port}`);
});

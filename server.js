const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT_EXPRESS = process.env.PORT || 5000;
const MONGODB_URI = ''; // Replace with your MongoDB connection string

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

mongoose.connect(MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
	.then(() => {
		console.log('Connected to MongoDB');

		const userSchema = new mongoose.Schema({
			username: String,
			password: String,
		});

		const User = mongoose.model('User', userSchema);

		app.post('/api/register', async (req, res) => {
			try {
				const hashedPassword = await bcrypt.hash(req.body.password, 10);
				const newUser = new User({
					username: req.body.username,
					password: hashedPassword,
				});
				await newUser.save();

				console.log('User registered successfully:', newUser);
				console.log(`User ${newUser.username} registered successfully`);

				res.status(200).json({ message: 'User registered successfully' });
			} catch (error) {
				console.error('Error registering user:', error);
				res.status(500).json({ error: 'Internal Server Error' });
			}
		});

		app.get('/api/data', async (req, res) => {
			try {
				const items = await User.find();
				res.json(items);
			} catch (error) {
				console.error('Error fetching data:', error);
				res.status(500).json({ error: 'Internal Server Error' });
			}
		});

		app.post('/api/login', async (req, res) => {
			try {
				console.log('Received login request:', req.body);
				const { username, password } = req.body;
				const user = await User.findOne({ username });

				if (!user) {
					console.log('User not found');
					return res.status(401).json({ error: 'Invalid username or password' });
				}

				const passwordMatch = await bcrypt.compare(password, user.password);

				if (passwordMatch) {
					console.log('Login successful!');
					return res.status(200).json({ message: 'Login successful' });
				} else {
					console.log('Incorrect password');
					return res.status(401).json({ error: 'Invalid username or password' });
				}
			} catch (error) {
				console.error('Error logging in:', error);
				res.status(500).json({ error: 'Internal Server Error' });
			}
		});


		const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  socket.on('join', (room) => {
    // Join a specific room based on user ID or some other identifier
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  socket.on('chat message', (data) => {
    console.log(`Received message in room ${data.room}: ${data.message}`);

    // Broadcast the message to all clients in the same room
    io.to(data.room).emit('chat message', { username: data.username, message: data.message });
  });
});
		
	
	server.listen(PORT_EXPRESS, () => {
    console.log(`Express app is running on port ${PORT_EXPRESS}`);
    console.log('Socket.IO server is running');
});
	})
	.catch((error) => {
		console.error('Error connecting to MongoDB:', error);
	});
// Your existing server-side code
// ...

// Add this code to handle group creation
io.on('connection', (socket) => {
	console.log('A user connected');
  
	socket.on('disconnect', () => {
	  console.log('User disconnected');
	});
  
	socket.on('join', (room) => {
	  // Join a specific room based on user ID or some other identifier
	  socket.join(room);
	  console.log(`User joined room: ${room}`);
	});
  
	socket.on('chat message', (data) => {
	  console.log(`Received message in room ${data.room}: ${data.message}`);
  
	  // Broadcast the message to all clients in the same room
	  io.to(data.room).emit('chat message', { username: data.username, message: data.message });
	});
  
	// Handle group creation
	socket.on('create group', (newGroup) => {
	  console.log(`Group created: ${newGroup}`);
	  io.emit('available rooms', [...new Set([...availableRooms, newGroup])]);
	});
  });
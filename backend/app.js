const express = require('express');
const {User} = require('./db/connectdb');
const {Journal} = require('./db/connectdb');
const {Mood} = require('./db/connectdb');
const env = require('dotenv').config;
const cors = require('cors')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;

env();

app.use(express.json());
const corsOptions = {
  origin: "*", 
  methods: ["GET", "POST"], 
  allowedHeaders: ["Content-Type", "Authorization"], 
};


app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.send('Hello World!')
})

/*
    get User details

    post - /editUsername x
    post - /updateXp     x        

    post - /newMoodCreate
    data - req.body - {
        date,
        DAY,
        mood,
        enerygylevel
    }

    get - /getLast7Mood

    //heatmap


    get -/get all journal  x
    edit - /editJournal    x
    post - /createJournal  x
    delete - /deleteJournalx

*/

//USER DETAILS
app.post('/newUser', async(req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
          username,
          email,
          password: hashedPassword,
          imageUrl: 0,
          xp: 0,
          level: 0,
        });

        await newUser.save();
        res.status(201).json({ message: "New user added", user: newUser });
    } catch (error) {
        console.error('Error creating new user:', error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
})

app.post('/login', async (req, res) => {
    console.log("login")
    try {
        const { email, password } = req.body;
    
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

const verifyJWT = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to authenticate token' });
        }
        req.userId = decoded.id;
        next();
    });
};

app.use('/userDetails', verifyJWT);
app.use('/editUsername', verifyJWT);
app.use('/updateXp', verifyJWT);
app.use('/isLogged', verifyJWT);
app.use('/getAllJournals', verifyJWT);
app.use('/createJournal', verifyJWT);
app.use('/editJournal', verifyJWT);
app.use('/deleteJournal', verifyJWT);

app.post('/userDetails', async(req, res) => {
    console.log(req.body)
    try {
        const {email} = req.body;
        if(!email) {
            return res.json({message:"send email"})
        }
        const user = await User.findOne({ email });

        if(!user) {
            return res.status(404).json({message: 'User not found'});
        }

        const userDetails = {
            username: user.username,
            email:user.email,
            imageUrl:user.imageUrl,
            xp:user.xp,
            level:user.level,
        }

        res.status(200).json(userDetails);
    }

    catch(error) {
        console.error(error);
        res.status(500).json({message: 'Server error'});
    }
});

app.post('/editUsername', async (req, res) => {
    try {
        const {new_username, email} = req.body;

        const updatedUser = User.findOneAndUpdate(
            {email},
            {username: new_username},
            {new: true}
        )

        if(!updatedUser) {
            return res.status(404).json({message:'User not found'});
        }

        res.status(200).json({message: 'Username updated successfully', user: updatedUser});
    } catch (error) {
        console.error('Error updating username:', error);
        res.status(500).json({message:'Server error', error: error.message})
    }
})

app.post('/updateXp', async (req, res) => {
    try {
        const {email} = req.body;
        const user = await User.findOne({email});
     
        let newLevel = user.level;
        let newXp = user.xp +1;
        if(newXp > 5) {
            newXp = 0;
            newLevel++;

            const updatedXp = await User.findOneAndUpdate(
                {email},
                {xp:newXp},
                {level:newLevel},
                {new:true}
            )
        } else {
            newXp++;
            const updatedXp = await User.findOneAndUpdate(
                {email},
                {xp:newXp},
                {new:true}
            )
        }

        return res.status(201).json({message:'Updated Xp', xp:newXp, level:newLevel});
    }

    catch (error) {
        res.status(500).json({message:'Cannot update xp', error: error.message})
    }
})

//MOODS
app.get('/isLogged', async (req, res) => {
    try {
        
        const date = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth()+1).padStart(2, '0');
        const year = now.getFullYear();
        const now = `${date}${month}${year}`;

        const Logged = await Mood.findOne({date:now}) 
        let isLogged
        if(Logged) {
            isLogged = true;
        } else {
            isLogged = false;
        }

        return res.status(201).json({isLogged:isLogged})
    } catch (error) {
        return res.status(500).json({message:'Error checking log', error: error.message})
    }
})



// JOURNAL ENDPOINTS
app.get('/getAllJournals', async (req, res) => {
    try {
        const {userId,date} = req.body;

        if(!userId) {
            return res.status(400).json({message:'user ID is required'});
        }

        const journals = await Journal.find({user_id:userId,date:date})
            .sort({time: -1}).exec(); // Fetch all journals from the database
        res.status(200).json(journals); // Return the journals as a JSON response
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error fetching journals', error: error.message });
    }
});

app.post('/createJournal', async (req, res) => {
    try {
        const {user_id, content} = req.body;
        const date = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth()+1).padStart(2, '0');
        const year = now.getFullYear();
        const now = `${date}${month}${year}`;

        const currentTime = new Date().toTimeString().split(' ')[0];

        const newJournal = new Journal({
            user_id,
            content,
            date: now,
            time: currentTime,
        });

        await newJournal.save();

        res.status(201).json({message: 'Error creating Journal entry', journal: newJournal})
    }
    catch (error) {
        console.log(error);
        res.status(500).json({message: 'Error creating Journal entry', error: error.message })
    }
})

app.patch('/editJournal', async (req, res) => {
    try {
        const {journalID, newContent} = req.body;

        const updatedJournal = Journal.findbyIDAndUpdate(
            journalID,
            {content: newContent},
            {new: true}
        )

        if(!updatedJournal) {
            return res.status(404).json({message:'Journal not found'});
        }

        res.status(200).json({message: 'journal updated successfully', journal: updatedJournal});
    } catch (error) {
        console.error('Error updating journal:', error);
        res.status(500).json({message:'Server error', error: error.message})
    }
})

app.delete('/deleteJournal', async (req, res) => {
    try {
        const {journalId} = req.body;

        if(!journalId) {
            return res.status(400).json({message:'Journal ID is required'});
        }

        const deletedJournal = await Journal.findOneAndDelete(journalId);

        if(!deleteJournal) {
            return res.status(404).json({message: 'Journal not found'});
        }

        res.status(200).json({message: 'Journal deleted successfully', journal: deletedJournal});
    }
    catch (error) {
        console.error('Error deleting journal', error);
        res.status(500).json({message: 'Error deleting journal', error: error.message})
    }
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})
const express = require('express');
const {User} = require('./db/connectdb');
const {Journal} = require('./db/connectdb');
const {Mood} = require('./db/connectdb');
const env = require('dotenv').config;

const app = express();
const port = 3000;

app.use(express.json());

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
        const {username, email, password} = req.body;
    const newUser = new User({
        username: username,
        email: email,
        password: password,
    });

    await newUser.save();
    res.status(201).send({message:"new user added", user: newUser});
    }
    catch(error) {
        res.status(500).send({message:"server error", error: error.message});
    }
})

app.get('/userDetails', async(req, res) => {
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

app.put('/editUsername', async (req, res) => {
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

app.put('/updateXp', async (req, res) => {
    try {
        const {email} = req.body;
        let newXp = User.findOne({email}).xp;
        let newLevel = User.findOne({email}).level;
        if(xp > 5) {
            xp = 1;
            level++;

            const updatedXp = User.findOneAndUpdate(
                {email},
                {xp:newXp},
                {level:newLevel},
                {new:true}
            )
        } else {
            xp++;
            const updatedXp = User.findOneAndUpdate(
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

// JOURNAL ENDPOIINTS
app.get('/getAllJournals', async (req, res) => {
    try {
        const {userId,date} = req.body;

        if(!userId) {
            return res.status(400).json({message:'user ID is required'});
        }

        const journals = await Journal.find({user_id:userId,date:date}); // Fetch all journals from the database
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
        const now = `${day}${month}${year}`;

        const currentDay = now.toLocaleString('en-us', { weekday: 'short' });
        const newJournal = new Journal({
            user_id,
            content,
            date: now,
            day: currentDay
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
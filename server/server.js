const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());
app.use(express.json());

// 1. Connection
mongoose.connect('mongodb://127.0.0.1:27017/Housify')
    .then(() => console.log("✅ Database Connected"))
    .catch(err => console.log("❌ DB Connection Error", err));

// 2. Models
const User = mongoose.model('User', new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}));

// 3. Auth Routes
app.post('/api/signup', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        await User.create({ email: req.body.email, password: hashedPassword });
        res.status(201).json({ status: "ok" });
    } catch (err) { res.status(400).json({ error: "Email exists" }); }
});

app.post('/api/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user && await bcrypt.compare(req.body.password, user.password)) {
        res.json({ status: "ok" });
    } else { res.status(400).json({ error: "Invalid login" }); }
});

// 4. Detailed Calculation Engine
app.post('/api/calculate', (req, res) => {
    const { budget, rooms, location, family, hasVehicle, needsWater, needsElectric } = req.body;
    const b = parseFloat(budget) || 0;
    const r = parseInt(rooms) || 1;

    // Detailed Estimator Data
    const estimator = [
        { category: "Materials", item: "Bricks/Blocks", qty: `${r * 2500} units`, cost: b * 0.25 },
        { category: "Materials", item: "Cement Bags", qty: `${r * 80} bags`, cost: b * 0.15 },
        { category: "Materials", item: "Steel & Sand", qty: "Reinforcement Grade", cost: b * 0.15 },
        { category: "Labor", item: "Masonry & Helpers", qty: "Project Team", cost: b * 0.20 },
        { category: "Utilities", item: "Plumbing/Electric", qty: needsWater && needsElectric ? "Full Install" : "Partial", cost: b * 0.15 },
        { category: "Other", item: "Permits & Safety", qty: "Legal Fees", cost: b * 0.10 }
    ];

    // Construction Phases
    const phases = [
        { title: "Stage 1: Foundation", task: `Footing & site prep for ${family} occupants.`, duration: "3 Weeks" },
        { title: "Stage 2: Superstructure", task: `Raising walls for ${r} rooms.`, duration: "6 Weeks" },
        { title: "Stage 3: Utilities", task: `Installing ${hasVehicle ? 'Parking Slab' : 'Basic Path'} & Utilities.`, duration: "4 Weeks" }
    ];

    res.json({
        estimator,
        phases,
        advice: `For your project in ${location}, prioritize the ${needsWater ? 'Water Storage' : 'Roofing'} system early in the build to save costs.`
    });
});

app.listen(5001, () => console.log("🚀 Server running on port 5001"));
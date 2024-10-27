const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, // Referencia al modelo de Usuario
        ref: 'User', 
        required: true 
    },
    score: { 
        type: Number, 
        required: true 
    },
    updatedAt: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model('Score', scoreSchema);

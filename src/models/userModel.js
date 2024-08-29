import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ['admin', 'team member'], // Ensures the role can only be 'admin' or 'team member'
        required: true,
    },
});

const User = mongoose.models.users || mongoose.model('users', userSchema);

export default User;
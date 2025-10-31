import mongoose from 'mongoose';

export const adminDB = mongoose.createConnection(process.env.MONGO_URI_ADMIN, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

export const userDB = mongoose.createConnection(process.env.MONGO_URI_USERS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

adminDB.on('connected', () => console.log('Admin DB connected'));
userDB.on('connected', () => console.log('User DB connected'));

adminDB.on('error', (err) => console.error('Admin DB error:', err));
userDB.on('error', (err) => console.error('User DB error:', err));

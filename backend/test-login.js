const UserAccount = require('./model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function testLogin() {
    try {
        // Test user data
        const testUser = {
            firstName: 'Test',
            lastName: 'User',
            username: 'testuser',
            email: 'test@example.com',
            password: 'password123'
        };

        // Check if user exists
        let user = await UserAccount.findOne({ where: { email: testUser.email } });
        
        if (!user) {
            console.log('Creating test user...');
            const salt = await bcrypt.genSalt(10);
            const hashedPass = await bcrypt.hash(testUser.password, salt);
            
            user = await UserAccount.create({
                firstName: testUser.firstName,
                lastName: testUser.lastName,
                username: testUser.username,
                email: testUser.email,
                password: hashedPass
            });
            console.log('Test user created:', user.id);
        } else {
            console.log('Test user already exists:', user.id);
        }

        // Test login
        console.log('\nTesting login...');
        const loginUser = await UserAccount.findOne({ where: { email: testUser.email } });
        
        if (loginUser) {
            const isMatch = await bcrypt.compare(testUser.password, loginUser.password);
            if (isMatch) {
                const token = jwt.sign(
                    { id: loginUser.id, role: loginUser.role },
                    process.env.JWT_TOKEN || 'your_super_secret_jwt_token_key_here_please_change_in_production',
                    { expiresIn: '24h' }
                );
                
                const userResponse = {
                    id: loginUser.id,
                    firstName: loginUser.firstName,
                    lastName: loginUser.lastName,
                    username: loginUser.username,
                    email: loginUser.email,
                    role: loginUser.role
                };
                
                console.log('Login successful!');
                console.log('User data:', userResponse);
                console.log('Token:', token);
            } else {
                console.log('Password does not match');
            }
        } else {
            console.log('User not found');
        }
        
    } catch (error) {
        console.error('Test error:', error);
    }
}

// Run the test
testLogin(); 
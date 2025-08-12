const bcrypt = require('bcrypt');
const { connectDB, sequelize } = require('./db/database');
const UserAccount = require('./model/userModel');

async function createAdminUser() {
  try {
    await connectDB();
    await sequelize.sync({ alter: false });

    const adminData = {
      username: 'admin',
      email: 'admin@tankmuseum.com',
      password: 'admin123',
      role: 'admin'
    };

    // Check if admin already exists
    const existingAdmin = await UserAccount.findOne({ where: { email: adminData.email } });
    if (existingAdmin) {
      console.log('Admin user already exists!');
      process.exit(0);
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminData.password, salt);

    // Create admin user
    await UserAccount.create({
      username: adminData.username,
      email: adminData.email,
      password: hashedPassword,
      role: adminData.role
    });

    console.log('Admin user created successfully!');
    console.log('Email:', adminData.email);
    console.log('Password:', adminData.password);
    console.log('Role:', adminData.role);

    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
}

createAdminUser(); 
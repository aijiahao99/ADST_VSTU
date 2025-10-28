// src/seedUsers.js
const monk = require('monk');
const { ObjectId } = require('mongodb');

//  
const db = monk('mongodb://dbadmin:MongoDB03@192.168.11.119:27017/my-employees?authSource=admin&readPreference=primary&ssl=false&directConnection=true');

const users = db.get('users');

async function seedUsers() {
  try {
    const sampleUsers = [
      {
        _id: ObjectId("64c7f3e2a4b6e3f277c1e7f1"),
        username: 'dev1',
        password: 'hashed_pw_1',
        job: 'developer'
      },
      {
        _id: ObjectId("64c7f3e2a4b6e3f277c1e7f2"),
        username: 'design1',
        password: 'hashed_pw_2',
        job: 'designer'
      },
      {
        _id: ObjectId("64c7f3e2a4b6e3f277c1e7f3"),
        username: 'manager1',
        password: 'hashed_pw_3',
        job: 'manager'
      },
      {
        _id: ObjectId("64c7f3e2a4b6e3f277c1e7f4"),
        username: 'test1',
        password: 'hashed_pw_4',
        job: 'tester'
      },
      {
        _id: ObjectId("64c7f3e2a4b6e3f277c1e7f5"),
        username: 'analyst1',
        password: 'hashed_pw_5',
        job: 'analyst'
      },
      {
        _id: ObjectId("64c7f3e2a4b6e3f277c1e7f6"),
        username: 'admin1',
        password: '123456',
        job: 'admin'
      }
    ];

    const inserted = await users.insert(sampleUsers);
    console.log('✅ insert ok:');
    inserted.forEach(user => {
      console.log(`- ${user.username} | _id: ${user._id}`);
    });

    db.close(); // ✅ close connection
  } catch (error) {
    console.error('❌ insert fail:', error);
  }
}

seedUsers();

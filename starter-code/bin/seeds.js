const mongoose = require('mongoose');
// Model 
const Celebrity = require('../models/celebrity');

mongoose.connect('mongodb://localhost/celebrities',{
  useNewUrlParser: true
});


const seedCelebs = [
  {name: 'Bugs Bunny',
  occupation: 'Cartoon',
  catchPhrase: 'Whats up duck?'
},
{name: 'Donald Duck',
occupation: 'Cartoon',
catchPhrase: 'Hua Hua Hua'
},
{name: 'Mickey Mouse',
occupation: 'Cartoon',
catchPhrase: 'Hello boys & girls'
}
];


Celebrity.insertMany(seedCelebs)
.then(data => {
  console.log(`Success! ${data.length} add to the collection `);
  mongoose.connection.close();
})
.catch(err => {
  console.log(err);
})
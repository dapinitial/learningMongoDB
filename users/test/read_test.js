const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
	let david;
	
	beforeEach((done) => {
		david = new User({name: 'David'});
		david.save()
		.then(() => done());
	});

	// FIND ALL USERS NAMED: DAVID

	it('Finds all the users named David', (done) => {
		User.find({ name: 'David' })
		.then((users) => {
			
			// console.log(users);
			
			/** Gotcha with Mongo! The id's are the same but the type
				* is different and fails a triple equals comparisson!
				* MongoDB stores ids as ObjectId("5837c269c1d1c78c39b44cd5")
				* but the ._id returns: 5837c269c1d1c78c39b44cd5
				* try the two console logs below.
				*/

			// console.log(users[0]._id);
			// console.log(david._id);	

			assert(users[0]._id.toString() === david._id.toString())
			done();
		});		
	});

	// FIND A PARTICULAR RECORD

	it('Find a user with a particular ID', (done) => {
		User.findOne({ _id: david._id })
		.then((user) => {
			assert(user.name === 'David');
			done();
		});
	});

});
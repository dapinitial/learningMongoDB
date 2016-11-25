const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
	let david;

	beforeEach((done) => {
		david = new User({ name: 'David' });
		david.save()
			.then(() => done());
	});

	it('Instance type using set and save', (done) => {
		//console.log(david); // logs "David"
		david.set('name', 'Anthony'); // Only in memory, not persisted to database!
		//console.log(david); // logs "Anthony"
		david.save() // Saves to database. 
			.then(() => User.find({}))
			.then((users) => {
				assert(users.length === 1);
				assert(users[0].name === 'Anthony');
				done();
			});
	});

});
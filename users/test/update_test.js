const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
	let david;

	beforeEach((done) => {
		david = new User({ name: 'David' });
		david.save()
			.then(() => done());
	});

	function assertName(operation, done) {
		operation
			.then(() => User.find({}))
				.then((users) => {
					assert(users.length === 1);
					assert(users[0].name === 'Anthony');
					done();
				});
	}

	it('Instance type using set and save', (done) => {
		david.set('name', 'Anthony'); // Only in memory, not persisted to database!
		assertName(david.save(), done); // Saves to database. 
			
	});

	it('A model instance can update', (done) => {
		assertName(david.update({ name: 'Anthony' }), done);
	});
	
});
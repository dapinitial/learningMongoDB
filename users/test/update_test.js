const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
	let david;

	beforeEach((done) => {
		david = new User({ name: 'David', likes: 0 });
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

	it('A model class can update', (done) => {
		assertName(User.update({ name: 'David' }, { name: 'Anthony' }), done);
	});

	it('A model class can update one recrod', (done) => {
		assertName(User.findOneAndUpdate({ name: 'David' }, { name: 'Anthony' }), done);
	});

	it('A model class can find a record with an Id and update', (done) => {
		assertName(User.findByIdAndUpdate(david._id, { name: 'Anthony' }), done);
	});

	it('A user can increment their likes by 1', (done) => {
		User.update({ name: 'David' }, { $inc: { likes: 1} })
			.then(() => User.findOne({ name: 'David'})
				.then((user) => {
						assert(user.likes === 1);
						done();
					}));
	});

});
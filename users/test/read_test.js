const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
	let david, anthony, puerto, gomez;

	beforeEach((done) => {
		david = new User({name: 'David'});
		anthony = new User({name: 'Anthony'});
		puerto = new User({name: 'Puerto'});
		gomez = new User({name: 'Gomez'});

		Promise.all([puerto.save(), gomez.save(), david.save(), anthony.save()])
			.then(() => done());
	});

	it('Finds all the users named David', (done) => {
		User.find({ name: 'David' })
		.then((users) => {

			assert(users[0]._id.toString() === david._id.toString());
			done();
		});
	});

	it('Find a user with a particular ID', (done) => {
		User.findOne({ _id: david._id })
		.then((user) => {
			assert(user.name === 'David');
			done();
		});
	});

	it('can skip and limit the result set', (done) => {
		User.find({})
			.sort({ name: -1 })
			.skip(1)
			.limit(2)
			.then((users) => {
				assert(users.length === 2);
				assert(users[0].name === 'Puerto');
				assert(users[1].name === 'David');
				// assert(users[2].name === 'Puerto');
				// assert(users[3].name === 'Gomez');
				done();
			});
	});
});

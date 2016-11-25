const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', () => {

	let david;

	beforeEach((done) => {
		david = new User({ name: "David" });
		david.save()
			.then(() => done());
	});

	it('Model instance remove', (done) => {
		david.remove()
			// highly reusable promise
			.then(() => User.findOne({ name: 'David' }))
			.then((user) => {
				assert(user === null);
				done();
			});
	});

	it('Class method remove', (done) => {
		// Remove a bunch of a records within a given criteria
		User.remove({ name: 'David' })
			// highly reusable promise
			.then(() => User.findOne({ name: 'David' }))
				.then((user) => {
					assert(user === null);
					done();
				});
	});

	it('Class method findOneAndRemove', (done) => {
		User.findOneAndRemove({ name: 'David' })
			// highly reusable promise
			.then(() => User.findOne({ name: 'David' }))
				.then((user) => {
					assert(user === null);
					done();
				});
	});

	it('Class method findByIdAndRemove', (done) => {
		User.findByIdAndRemove(david._id)
			// highly reusable promise
			.then(() => User.findOne({ name: 'David' }))
				.then((user) => {
					assert(user === null);
					done();
				});
	});

});
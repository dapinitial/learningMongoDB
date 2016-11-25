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
			.then(() => User.findOne({ name: 'David' }))
			.then((user) => {
				assert(user === null);
				done();
			});
	});

	it('Class method remove', () => {
		
	});

	it('Class method findAndRemove', () => {
		
	});

	it('Class method findByIdAndRemove', () => {
		
	});

});
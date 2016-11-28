const assert = require('assert');
const User = require('../src/user');

describe('Validating records', () => {
	it('requires a user name', () => {
		const user = new User({ name: undefined });
		const validationResult = user.validateSync();
		//console.log(validationResult);
		const { message } = validationResult.errors.name;

		assert(message === 'Name is required.');

	});

	it('Requires a user name longer than 1 character.', () => {
		const user = new User({ name: 'A' });
		const validationResult = user.validateSync();
		const { message } = validationResult.errors.name;

		assert(message === 'Name must be longer than 1 character.');

	});

	it('Disallows invalid record from being saved to Mongo.', (done) => {
		const user = new User({ name: 'A' });
		user.save()
			.catch((validationResult) => {
				const { message } = validationResult.errors.name;
				assert(message === 'Name must be longer than 1 character.');
				done();
			});
	});

});
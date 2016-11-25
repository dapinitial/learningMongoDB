const assert = require('assert');
const User = require('../src/user');

describe('Creating records', 
	() => {
		it('Saves a user',
			(done) => {
				const david = new User({ name: 'David' });
				david.save()
					.then(() => {
						// Has David been Saved successfully?
						assert(!david.isNew);
						done();
					});
		});
});
const assert = require('assert');
const User = require('../src/user');

describe('Virtual types', () => {
	it('postCount returns number of posts', (done) => {
		const david = new User({
			name: 'david',
			posts: [{ title: 'PostTitle' }]
		});

		david.save()
		.then(() => User.findOne({ name: 'David' }))
		.then((user) => {
			assert(david.postCount === 1);
			done();
		});
	});
});
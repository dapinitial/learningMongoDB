const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {
	it('Can create a subdocument.', (done) => {
		const david = new User({ 
			name: 'David',
			posts: [{title: 'PostTitle'}]
		});
		david.save()
			.then(() => User.findOne({ name: 'David' }))
			.then((user) => {
				assert(user.posts[0].title === 'PostTitle');
		done();
		});
	});
});

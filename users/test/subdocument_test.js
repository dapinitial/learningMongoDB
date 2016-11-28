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
			});
			done();
	});

	it('Can add subdocument to an existing record.', (done) => {
		const david = new User({ 
			name: 'David',
			posts: [] 
		});

		david.save()
			.then(() => User.findOne({ name: 'David' }))
			.then((user) => {
				user.posts.push({ title: 'New Post' });
				return user.save();
			})
			.then(() => User.findOne({ name: 'Joe' }))
			.then((user) => {
				assert(user.posts[0].title === 'New Post');
			});
			done();
		});

	it('Can remove an existing subdocument.', (done) => {
		const david = new User({ 
			name: 'David',
			posts: [{title: 'PostTitle'}]
		});
		david.save()
			.then(() => User.findOne({ name: 'David' }))
			.then((user) => {
				const post = user.posts[0];
				post.remove();
				return user.save();
			});
			done();
	});
});

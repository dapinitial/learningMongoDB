const mongoose = require('mongoose');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Associations', () => {
	
	let david, blogPost, comment;

	beforeEach((done) => {

		david = new User({ name: 'David' });
		blogPost = new BlogPost({ title: 'JS is great', content: 'Yep, it really is!' });
		comment = new Comment({ content: 'Congrats on a great post!' });

		david.blogPosts.push(blogPost);
		blogPost.comments.push(comment);

		comment.user = david;

		Promise.all([ david.save(), blogPost.save(), comment.save() ])
			.then(() => done());
	});

	it.only('Saves a relation between a user and a blogPost', (done) => {
		User.findOne({ name: 'David' })
			.populate('blogPosts')
			.then((user) => {
				console.log(user);
				done();
			});
	});

});
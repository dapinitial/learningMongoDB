const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Assocations', () => {
	let david, blogPost, comment;

	beforeEach((done) => {
		david = new User({ name: 'David' });
		blogPost = new BlogPost({ title: 'JS is Great', content: 'Yep it really is' });
		comment = new Comment({ content: 'Congrats on great post' });

		david.blogPosts.push(blogPost);
		blogPost.comments.push(comment);
		comment.user = david;

		Promise.all([david.save(), blogPost.save(), comment.save()])
		.then(() => done());
	});

	it('saves a relation between a user and a blogpost', (done) => {
		User.findOne({ name: 'David' })
		.populate('blogPosts')
		.then((user) => {
			console.log(user.blogPosts)
			assert(user.blogPosts[0].title === 'JS is Great');
			done();
		});
	});

	it('saves a full relation graph', (done) => {
		User.findOne({ name: 'David' })
		.populate({
			path: 'blogPosts',
			populate: {
				path: 'comments',
				model: 'comment',
				populate: {
					path: 'user',
					model: 'user'
				}
			}
		})
		.then((user) => {
			console.log(user.blogPosts[0].comments);
			assert(user.name === 'David');
			assert(user.blogPosts[0].title === 'JS is Great');
			assert(user.blogPosts[0].comments[0].content === 'Congrats on great post');
			assert(user.blogPosts[0].comments[0].user.name === 'David');
			done();
		});
	});
});
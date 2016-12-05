const mongoose = require('mongoose');
const assert = require('assert');
const User  = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('Middleware', () => {

  beforeEach((done) => {
    david = new User({ name: 'David' });
    blogPost = new BlogPost({ title: 'JS is Great', content: 'Yep it really is' });

    david.blogPosts.push(blogPost);

    Promise.all([david.save(), blogPost.save()])
      .then(() => done());
  });

  it('users cleanup dangling blogposts on remove', (done) => {
    david.remove()
      .then(() => BlogPost.count())
      .then((count) => {
        assert(count === 0);
        done();
      });
  });
});

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = require('./post')

const UserSchema = new Schema({
	name: {
		type: String,
		validate: {
			validator: (name) =>	name.length > 1,
			message: 'Name must be longer than 1 character.'
		},
		required: [true, 'Name is required.'],
	},
  //postCount: Number,
  posts: [PostSchema],
  likes: Number,
  blogPosts: [{
  	type: Schema.Types.ObjectId,
  	refs: 'blogPost'
  }]
});

UserSchema.virtual('postCount').get(function() {
	// console.log('heya!');
	return this.posts.length;	
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
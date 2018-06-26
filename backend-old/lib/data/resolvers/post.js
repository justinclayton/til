import * as dbPosts from '../../dynamo/posts';

export default {
  Query: {
    posts: () => dbPosts.getPosts(),
    post: (_, args) => dbPosts.getPostById(args.id),
  },
  Mutation: {
    createPost: (_, args) => dbPosts.createPost(args),
    updatePost: (_, args) => dbPosts.updatePost(args),
    deletePost: (_, args) => dbPosts.deletePost(args),
    incrementVoteForPost: (_, args) => dbPosts.incrementVoteForPost(args),
  },
};

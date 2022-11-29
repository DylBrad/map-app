import * as React from 'react';

import { listPosts } from '../../API';
import NewsFeedPost from '../../components/NewsFeedPost/NewsFeedPost';

const NewsFeed = () => {
  const [posts, setPosts] = React.useState([]);

  const getAllPosts = async () => {
    const posts = await listPosts();
    setPosts(posts.reverse());
  };

  React.useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div className="nav-child newsfeed-container">
      {posts.map((post) => {
        return (
          <NewsFeedPost
            postAuthor={post.author}
            postImage={post.image}
            postDescription={post.description}
          />
        );
      })}
    </div>
  );
};

export default NewsFeed;

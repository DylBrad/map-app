import * as React from 'react';
import { listLogEntries } from '../../API';

const NewsFeed = () => {
  const [posts, setPosts] = React.useState([]);

  const getAllPosts = async () => {
    const posts = await listLogEntries();
    setPosts(posts);
  };

  React.useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div className="nav-child">
      {posts.map((post) => {
        console.log(post);
        return (
          <>
            <div></div>
            <h2>{post.title}</h2>
          </>
        );
      })}
    </div>
  );
};

export default NewsFeed;

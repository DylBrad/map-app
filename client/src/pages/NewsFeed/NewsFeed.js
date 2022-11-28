import * as React from 'react';

import { IconContext } from 'react-icons';
import { FaUserAlt } from 'react-icons/fa';

import { listLogEntries } from '../../API';

const NewsFeed = () => {
  const [posts, setPosts] = React.useState([]);

  const getAllPosts = async () => {
    const posts = await listLogEntries();
    setPosts(posts.reverse());
  };

  React.useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div className="nav-child newsfeed-container">
      {posts.map((post) => {
        return (
          <div className="newsfeed-post">
            <div className="author-details">
              <IconContext.Provider
                value={{ className: 'react-icons', size: 24 }}
              >
                <div className="profile-pic">
                  <FaUserAlt value={{ className: 'react-icons' }} />
                </div>
              </IconContext.Provider>
              <div>
                <h2>Author Name</h2>
                <span>Location?</span>
              </div>
            </div>
            <div
              className="image-container"
              style={{ backgroundImage: 'url(' + post.image + ')' }}
            ></div>
            <div className="post-details">
              <h3>{post.title}</h3>
              <p>{post.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NewsFeed;

import React from 'react';
import { IconContext } from 'react-icons';
import { FaUserAlt } from 'react-icons/fa';

import { findOneUser } from '../../API';

const NewsFeedPost = (props) => {
  const [user, setUser] = React.useState(null);
  const findUser = async () => {
    const user = await findOneUser(props.postAuthor);
    setUser(user);
  };

  React.useEffect(() => {
    findUser();
  }, []);

  return (
    <div className="newsfeed-post">
      <div className="author-details">
        <IconContext.Provider value={{ className: 'react-icons', size: 24 }}>
          <div className="profile-pic">
            <FaUserAlt value={{ className: 'react-icons' }} />
          </div>
        </IconContext.Provider>
        <div>
          <h2>{user && user.username}</h2>
        </div>
      </div>
      <div
        className="image-container"
        style={{ backgroundImage: 'url(' + props.postImage + ')' }}
      ></div>
      <div className="post-details">
        <p>{props.postDescription}</p>
      </div>
    </div>
  );
};

export default NewsFeedPost;

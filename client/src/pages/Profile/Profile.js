import * as React from 'react';
import { IconContext } from 'react-icons';
import { FaUserAlt } from 'react-icons/fa';
import { GrAddCircle } from 'react-icons/gr';

import NewPostForm from '../../components/NewPostForm/NewPostForm';
import DeleteButton from '../../components/DeleteButton/DeleteButton';

import { listPosts } from '../../API';

const Profile = () => {
  const [showNewPostForm, setShowNewPostForm] = React.useState(false);
  const [posts, setPosts] = React.useState([]);

  const getUsersPosts = async () => {
    const posts = await listPosts();
    setPosts(posts);
  };
  React.useEffect(() => {
    getUsersPosts();
  }, []);

  const handleClick = () => {
    setShowNewPostForm(true);
  };

  return (
    <div className="nav-child profile-container">
      <div className="profile-info">
        <IconContext.Provider value={{ className: 'react-icons', size: 54 }}>
          <div className="profile-pic">
            <FaUserAlt value={{ className: 'react-icons' }} />
          </div>
        </IconContext.Provider>
        <div className="profile-bio">
          <h2>User Name</h2>
          <p>User Bio</p>
        </div>
      </div>

      <div className="button-container" onClick={handleClick}>
        <IconContext.Provider value={{ className: 'react-icons', size: 64 }}>
          <GrAddCircle />
        </IconContext.Provider>
        <span>New Post</span>
      </div>

      <div className="profile-gallery">
        {posts.map((post) => {
          return (
            <>
              <h2>{post.description}</h2>

              <DeleteButton postId={post._id} />
            </>
          );
        })}
      </div>

      {showNewPostForm && (
        <NewPostForm setShowNewPostForm={setShowNewPostForm} />
      )}
    </div>
  );
};

export default Profile;

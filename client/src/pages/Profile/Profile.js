import * as React from 'react';

import NewPostForm from '../../components/NewPostForm/NewPostForm';

const Profile = () => {
  const [showNewPostForm, setShowNewPostForm] = React.useState(false);

  const handleClick = () => {
    setShowNewPostForm(true);
  };

  return (
    <div className="nav-child">
      <div className="profile-info">
        <div>
          <span>User Image</span>
        </div>
        <div>
          <h2>User Name</h2>
          <p>User Bio</p>
        </div>
      </div>
      <div className="profile-gallery">
        <button onClick={handleClick}>Add New Post</button>
        Image Gallery
      </div>

      {showNewPostForm && (
        <NewPostForm setShowNewPostForm={setShowNewPostForm} />
      )}
    </div>
  );
};

export default Profile;

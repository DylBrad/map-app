import * as React from 'react';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';

import { IconContext } from 'react-icons';
import { FaUserAlt } from 'react-icons/fa';
import { GrAddCircle } from 'react-icons/gr';

import jwt_decode from 'jwt-decode';

import NewPostForm from '../../components/NewPostForm/NewPostForm';
import DeleteButton from '../../components/DeleteButton/DeleteButton';
import EditProfileForm from '../../components/EditProfileForm/EditProfileForm';

import {
  updateUserProfile,
  listCurrentUserPosts,
  findOneUser,
} from '../../API';

const Profile = () => {
  const [showNewPostForm, setShowNewPostForm] = React.useState(false);
  const [showEditProfileForm, setShowEditProfileForm] = React.useState(false);
  const [posts, setPosts] = React.useState([]);
  const [profilePic, setProfilePic] = React.useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  const token = cookies.token;

  let decodedToken = undefined;
  if (token !== undefined) {
    decodedToken = jwt_decode(token);
  }

  const getUsersPosts = async () => {
    // const posts = await listPosts();
    const id = decodedToken._id;
    const posts = await listCurrentUserPosts(id);
    setPosts(posts);
  };

  const getUserProfilePic = async () => {
    const id = decodedToken._id;
    const user = await findOneUser(id);
    const profilePicture = user.profile_pic;
    setProfilePic(profilePicture);
  };

  React.useEffect(() => {
    getUsersPosts();
    getUserProfilePic();
  }, []);

  const handleClick = () => {
    setShowNewPostForm(true);
  };

  // stuff
  const [showNewProfilePic, setShowNewProfilePic] = React.useState(false);
  const { register, handleSubmit } = useForm();

  const showPicForm = () => {
    setShowNewProfilePic(true);
  };
  const handleCloseProfileForm = () => {
    setShowNewProfilePic(null);
  };
  const onSubmit = async (data) => {
    const id = decodedToken._id;
    updateUserProfile(id, data);
  };

  // edit profile form
  const handleShowEditProfileForm = () => {
    setShowEditProfileForm(true);
  };

  return (
    <div className="nav-child profile-container">
      <div className="profile-info">
        <div className="profile-pic">
          {profilePic ? (
            <div className="profile-pic-container">
              <img src={profilePic}></img>
            </div>
          ) : (
            <IconContext.Provider
              value={{ className: 'react-icons', size: 54 }}
            >
              <FaUserAlt value={{ className: 'react-icons' }} />
            </IconContext.Provider>
          )}

          <div onClick={showPicForm}>
            <IconContext.Provider
              value={{ className: 'react-icons', size: 14 }}
            >
              <GrAddCircle />
            </IconContext.Provider>
          </div>

          {showNewProfilePic && (
            <form className="newpost-form" onSubmit={handleSubmit(onSubmit)}>
              <div className="close-icon" onClick={handleCloseProfileForm}>
                ✖
              </div>
              <label htmlFor="profile_pic">Image</label>
              <input {...register('profile_pic')} />
              <button>Upload</button>
            </form>
          )}
        </div>
        <div className="profile-bio">
          <h2>{decodedToken.username}</h2>
          <p>
            {decodedToken.bio
              ? decodedToken.bio
              : `Hello, I am ${decodedToken.username}! Lets connect!`}
          </p>
          <div>
            <button
              className="edit-profile-btn"
              onClick={handleShowEditProfileForm}
            >
              Edit Profile
            </button>
          </div>
          {showEditProfileForm && <EditProfileForm />}
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
            <div className="image-box">
              <div
                className="grid-image"
                style={{ backgroundImage: 'url(' + post.image + ')' }}
              ></div>
              <div className="overlay">
                <div className="details">
                  <h2>{post.description}</h2>
                </div>
                <DeleteButton postId={post._id} />
              </div>
            </div>
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

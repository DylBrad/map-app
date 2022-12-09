import * as React from 'react';
import { useCookies } from 'react-cookie';

import { IconContext } from 'react-icons';
import { FaUserAlt } from 'react-icons/fa';
import { GrAddCircle } from 'react-icons/gr';

import jwt_decode from 'jwt-decode';

import NewPostForm from '../../components/NewPostForm/NewPostForm';
import DeleteButton from '../../components/DeleteButton/DeleteButton';

import { listPosts } from '../../API';

const Profile = () => {
  const [showNewPostForm, setShowNewPostForm] = React.useState(false);
  const [posts, setPosts] = React.useState([]);
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  const token = cookies.token;

  let decodedToken = undefined;
  if (token !== undefined) {
    decodedToken = jwt_decode(token);
  }

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

  const [showNewProfilePic, setShowNewProfilePic] = React.useState(false);
  const showPicForm = () => {
    setShowNewProfilePic(true);
  };
  const [file, setFile] = React.useState();
  const onFileChange = (event) => {
    // Updating the state
    setFile({ file: event.target.files[0] });
  };
  const onFileUpload = async () => {
    console.log('Upload file');
    console.log('File:', file);
  };

  return (
    <div className="nav-child profile-container">
      <div className="profile-info">
        <div className="profile-pic">
          <IconContext.Provider value={{ className: 'react-icons', size: 54 }}>
            <FaUserAlt value={{ className: 'react-icons' }} />
          </IconContext.Provider>

          <div onClick={showPicForm}>
            <IconContext.Provider
              value={{ className: 'react-icons', size: 14 }}
            >
              <GrAddCircle />
            </IconContext.Provider>
          </div>

          {showNewProfilePic && (
            <>
              <input type="file" onChange={onFileChange} />
              <button onClick={onFileUpload}>Upload</button>
            </>
          )}
        </div>
        <div className="profile-bio">
          <h2>{decodedToken.username}</h2>
          <p>
            {decodedToken.bio
              ? decodedToken.bio
              : `Hello, I am ${decodedToken.username}! Lets connect!`}
          </p>
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

import * as React from 'react';

import { deletePost } from '../../API';

const DeleteButton = (props) => {
  const [deletedPostId, setDeletedPostId] = React.useState(null);

  const handleClick = () => {
    setDeletedPostId(props.postId);
  };

  const handleDelete = async (postId) => {
    postId = deletedPostId;
    console.log(postId);
    await deletePost(postId);
  };

  return (
    <>
      <button onClick={handleClick}>Delete</button>

      {deletedPostId && (
        <div>
          <p>Are you sure you want to delete this post?</p>
          <button onClick={handleDelete}>Confirm</button>
        </div>
      )}
    </>
  );
};

export default DeleteButton;

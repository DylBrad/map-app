import * as React from 'react';
import { useForm } from 'react-hook-form';
import { createUserPost } from '../../API';
import { useCookies } from 'react-cookie';

import jwt_decode from 'jwt-decode';

const NewPostForm = (props) => {
  const { register, handleSubmit } = useForm();
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  const token = cookies.token;

  let decodedToken = undefined;
  if (token !== undefined) {
    decodedToken = jwt_decode(token);
  }

  const onSubmit = async (data) => {
    data.author = decodedToken._id;
    const posted = await createUserPost(data);
  };

  const handleClick = () => {
    props.setShowNewPostForm(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="close-icon" onClick={handleClick}>
        ✖
      </div>
      <label htmlFor="image">Image</label>
      <input {...register('image')} required />
      <label htmlFor="description">description</label>
      <textarea {...register('description')} rows={3}></textarea>
      <button>Create Post</button>
    </form>
  );
};

export default NewPostForm;

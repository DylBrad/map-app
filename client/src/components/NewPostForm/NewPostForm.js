import * as React from 'react';
import { useForm } from 'react-hook-form';
import { createUserPost } from '../../API';

const NewPostForm = (props) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const posted = await createUserPost(data);
    console.log(posted);
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

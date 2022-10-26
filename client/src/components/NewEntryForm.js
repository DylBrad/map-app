import * as React from 'react';
import { useForm } from 'react-hook-form';
import { createLogEntry } from '../API';

const NewEntryForm = (props) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      data.latitude = props.location.latitude;
      data.longitude = props.location.longitude;
      const created = await createLogEntry(data);
      console.log(created);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="entry-form">
      <label htmlFor="title">Title</label>
      <input {...register('title')} required />
      <label htmlFor="comments">Comments</label>
      <textarea
        {...register('comments')}
        rows={3}
        required
        placeholder="Please include a description of the services available here."
      />
      <label htmlFor="image">Image</label>
      <input {...register('image')} required />
      <button>Submit</button>
    </form>
  );
};

export default NewEntryForm;

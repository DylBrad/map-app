import * as React from 'react';
import { useForm } from 'react-hook-form';
import { createLogEntry } from '../API';

const NewEntryForm = (props) => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      data.latitude = props.location.latitude;
      data.longitude = props.location.longitude;
      const created = await createLogEntry(data);
      console.log(created);
      props.onClose();
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
    setLoading(false);
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
      <button disabled={loading}>
        {loading ? 'Posting...' : 'Create Post'}
      </button>
      {error ? <h3 className="error">{error}</h3> : null}
    </form>
  );
};

export default NewEntryForm;
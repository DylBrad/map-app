import * as React from 'react';

const NewEntryForm = () => {
  return (
    <form className="entry-form">
      <label for="title">Title</label>
      <input name="title" />
      <label for="comments">Comments</label>
      <textarea name="comments" rows={3} />
      <label for="image">Image</label>
      <input name="image" />
      <button>Submit</button>
    </form>
  );
};

export default NewEntryForm;

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';
import jwt_decode from 'jwt-decode';

import { updateUserProfile } from '../../API';

const EditProfileForm = () => {
  const { register, handleSubmit } = useForm();
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  const token = cookies.token;

  let decodedToken = undefined;
  let id = undefined;
  if (token !== undefined) {
    decodedToken = jwt_decode(token);
    id = decodedToken._id;
  }

  const onSubmit = async (data) => {
    console.log(data);
    const updatedUser = await updateUserProfile(id, data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="bio">Bio</label>
      <textarea {...register('bio')} rows="3"></textarea>
      <button>Update</button>
    </form>
  );
};

export default EditProfileForm;

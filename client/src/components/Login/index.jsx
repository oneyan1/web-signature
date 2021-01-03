import React from 'react';
import TextInput from '../TextInput';

const Login = () => {
  return (
    <div className='row justify-content-center align-items-center'>
      <div className='col-6'>
        <div className='card white darken-1'>
          <h1 className='lato-font text-center'>Web-signature</h1>
          <div className='card-content white-text'>
            <span className='card-title'>authorization</span>
            <div>
              <TextInput label={'email'} type={'text'}/>
              <TextInput label={'password'}  type={'password'}/>
            </div>
          </div>
          <div className='card-action'>
            <button className='btn yellow darken-4 mr-5'>login</button>
            <button className='btn grey lighten-1 black-text'>
              registrstion
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

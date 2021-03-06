import React from 'react';
import UserApi from '../../api/User';
import { Redirect } from "react-router-dom";
import { toast } from 'react-toastify';

import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class Registration extends React.PureComponent {
  state = {
    username: '',
    email: '',
    password: '',
    redirect: false
  };

  inputChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  };

  signUpHandler = async (event) => {
    event.preventDefault();
    UserApi.register({
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    }).then(res => {
      this.setState({
        redirect: true
      });
    }).catch(err => {
      toast.error(err.response.data.message);
    });
  };

  render() {
    if (this.state.redirect) {
      return (
        <Redirect to='/authentication' />
      );
    }

    return (
      <div>
        <Typography variant='h5' className='registration-header'>Registration</Typography>
        <Box className='registration-box'>
          <form onSubmit={this.signUpHandler}>
            <TextField className='registration-input'
                       label='username'
                       name='username'
                       onChange={this.inputChangeHandler}
                       value={this.state.username}
            />
            <TextField className='registration-input'
                       label='email'
                       name='email'
                       onChange={this.inputChangeHandler}
                       value={this.state.email}
            />
            <TextField className='registration-input'
                       label='password'
                       type='password'
                       name='password'
                       onChange={this.inputChangeHandler}
                       value={this.state.password}
            />
            <Button type='submit' color='primary' variant='contained'>Sign up!</Button>
          </form>
        </Box>
      </div>
    );
  }
}

export default Registration;
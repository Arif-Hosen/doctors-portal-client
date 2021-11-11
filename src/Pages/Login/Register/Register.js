import React, { useState } from 'react';
import { Button, Container, Grid, TextField, Typography, CircularProgress, Alert } from '@mui/material';
import login from '../../../images/login.png';
import { NavLink, useHistory } from 'react-router-dom';
import useAuth from './../../../hooks/useAuth';

const Register = () => {
    const [loginData, setLoginData] = useState({});
    // console.log('loginData', loginData)
    const history = useHistory();
    const { user, authError, registerUser, isLoading } = useAuth();


    const handleOnBlur = e => {
        const field = e.target.name;
        const value = e.target.value;

        const newLoginData = { ...loginData };
        newLoginData[field] = value;
        console.log(newLoginData)
        setLoginData(newLoginData);
    }
    const handleLoginSubmit = e => {
        if (loginData.password !== loginData.password2) {
            alert('Your password did not match');
            return
        }
        registerUser(loginData.email, loginData.password, loginData.name, history);
        e.preventDefault();
    }

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item sx={{ mt: 8 }} xs={8} md={6}>
                    <Typography variant="body1" gutterBottom>
                        Register
                    </Typography>
                    {!isLoading && <form onSubmit={handleLoginSubmit}>
                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            id="standard-basic"
                            label="Your Name"
                            variant="standard"
                            name='name'
                            onBlur={handleOnBlur}
                        />
                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            id="standard-basic"
                            type="email"
                            label="Your Email"
                            variant="standard"
                            name='email'
                            onBlur={handleOnBlur}
                        />

                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            id="standard-basic"
                            type="password"
                            label="Your Password"
                            variant="standard"
                            name='password'
                            onBlur={handleOnBlur}
                        />
                        <TextField
                            sx={{ width: '75%', m: 1 }}
                            id="standard-basic"
                            type="password"
                            label="Retype Your Password"
                            variant="standard"
                            name='password2'
                            onBlur={handleOnBlur}
                        />

                        <Button sx={{ width: '75%', m: 1 }} type='submit' variant='contained'>Register</Button>
                        <NavLink
                            style={{ textDecoration: 'none' }}
                            to='/login'>
                            <Button variant="text">Already Registerd? Please Login</Button>
                        </NavLink>
                    </form>}

                    {/* if is loading is true, then visible spinner */}
                    {isLoading && <CircularProgress sx={{ m: 5 }} />
                    }

                    {/* after succesfully registered, give a alert message */}
                    {user.email && <Alert severity="success">User created successfully!</Alert>}

                    {/* if any error occured, give the error message */}
                    {authError && <Alert severity="error">{authError}</Alert>}
                </Grid>
                <Grid item xs={4} md={6}>
                    <img style={{ width: '100%' }} src={login} alt='log'></img>
                </Grid>

            </Grid>
        </Container>



    );
};

export default Register;
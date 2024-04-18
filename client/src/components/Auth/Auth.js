import  React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';

import {Avatar, Button, Paper, Grid, Typography, Container, Box} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useStyles } from "./styles";

import Input from './input';
import { signin, signup } from '../../actions/auth';


const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

const Auth = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [isSignup, setIsSignup] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialState);


    const handleSubmit = (e) => {
        e.preventDefault();

        if(isSignup) {
            dispatch(signup(formData, navigate))
        } else {
            dispatch(signin(formData, navigate))
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

    const switchMode = () => {
        setIsSignup((prev) => !prev);
        setShowPassword(false);
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({type: 'AUTH', data: {result, token}});
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    const googleFailure = (error) => {
        console.log(error);
        console.log('Failure');
    }

    
    return (
        <Container component="main" maxWidth="xs">
            <Paper sx={classes.paper} elevation={3}>
                <Avatar sx={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
                <form sx={classes.form} onSubmit={handleSubmit}>
                    <Grid sx={{padding: 2}} container spacing={2}>
                        {
                            isSignup && (
                                <>
                                    <Box sx={{display: 'flex', flexDirection: 'row'}}>
                                        <Input name="firstName" label="First Name" handleChange={handleChange} half />
                                        <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                                    </Box>
                                </>
                            )
                        }
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword} />
                        { isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />}
                    </Grid>
                    <Button type="submit" fullWidth variant='contained' color='primary' sx={classes.submit} >
                        {isSignup ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <GoogleLogin 
                        clientId="492371190706-rkv04hagqogd53nv9t52ebnqv5rp2pev.apps.googleusercontent.com" 
                        render={(renderProps) => (<div><Button sx={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} variant='contained'>Google Sign In</Button></div>)} onSuccess={googleSuccess} onFailure={googleFailure} cookiePolicy='single_host_origin'/>
                    <Grid container>
                        <Grid item>
                            <Button sx={classes.submit} onClick={switchMode}>{isSignup ? 'Already have an account ?' : "Don't have an account ?"}</Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux'

import { AppBar, Avatar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useStyles } from "./styles";
import social from "../../images/social.png";

import { jwtDecode } from 'jwt-decode';


const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    
    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = jwtDecode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
        
    }, [location]);

    const logout = () => {
        dispatch({ type: 'LOGOUT'});
        navigate('/');
        setUser(null);
    }
    
    return (
        <AppBar sx={classes.appBar} position="static">
            <div sx={classes.brandContainer}>
                <Typography component={Link} to="/" sx={classes.heading} variant="h2" align="center">Social</Typography>
                <img sx={classes.image} src={social} alt="Social" height="40" />
            </div>
            <Toolbar sx={classes.toolbar}>
                {user ? (
                    <Box sx={classes.profile}>
                        <Avatar sx={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography sx={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant="contained" sx={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </Box>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>
        </AppBar>   
    )
};

export default Navbar;
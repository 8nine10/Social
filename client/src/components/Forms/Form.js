import React, {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import FileBase from "react-file-base64";

import { TextField, Button, Typography, Paper } from "@mui/material";
import { useStyles } from "./styles";

import {createPost, updatePost} from "../../actions/posts";

const Form = ({currentId, setCurrentId}) => {
    const [postData, setPostData] = useState({
        title: '',
        message: '',
        tags: '',
        selectedFile: '',
    });
    const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId) : null);
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const navigate = useNavigate();
    const classes = useStyles();

    useEffect(() => {
        if (post) setPostData(post);
    }, [post])

    const handelSubmit = (e) => {
        e.preventDefault();

        if (currentId) {
            dispatch(updatePost(currentId, { ...postData, name: user?.result?.name}));
        } else {
            dispatch(createPost({ ...postData, name: user?.result?.name}, navigate));
        }
        clear();
    }
    
    const clear = () => {
        setCurrentId(null);
        setPostData({
            title: '',
            message: '',
            tags: '',
            selectedFile: '',
        });
    }
    
    if (!user?.result?.name) {
        return (
            <Paper>
                <Typography variant="h6" align="center">
                    Please Sign In to create posts.
                </Typography>
            </Paper>
        );
    }

    
    return (
        <Paper sx={classes.paper} elevation={6}>
            <form autoComplete="off" noValidate onSubmit={handelSubmit}>
                <Typography variant="h5" sx={classes.root}>
                    {currentId ? 'Editing' : 'Creating'} A Post
                </Typography>
                {/* <TextField sx={classes.fileInput} name="creator" variant="outlined" label="Creator" fullWidth value={postData.creator} onChange={(e) => setPostData({ ...postData, creator: e.target.value})} /> */}
                <TextField sx={classes.fileInput} name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value})} />
                <TextField sx={classes.fileInput} name="message" variant="outlined" label="Message" fullWidth value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value})} />
                <TextField sx={classes.fileInput} name="tags" variant="outlined" label="Tags" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',')})} />
                <div sx={classes.fileInput}>
                    <FileBase type="file" multiple={false} onDone={({base64}) => setPostData({...postData, selectedFile: base64})} />
                </div>
                <Button sx={classes.buttonSubmit} variant="container" color="primary" size="large" type="submit" fullWidth>Submit</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    );
}

export default Form;
import React, { useState, useRef } from "react";
import { useDispatch } from 'react-redux';

import { Typography, TextField, Button, Box } from '@mui/material';
import { useStyles } from "./styles";

import { commentPost } from '../../actions/posts'

const CommentSection = ({ post }) => {
    const user = JSON.parse(localStorage.getItem('profile'));
    const classes = useStyles();
    const dispatch = useDispatch();
    const [comments, setComments] = useState(post?.comments);
    const [comment, setComment] = useState('');
    const commentsRef = useRef();

    const handelClick = async () => {
        const finalComment = `${user.result.name}: ${comment}`;
        const newComments = await dispatch(commentPost(finalComment, post._id));
        setComments(newComments);
        setComment('');

        commentsRef.current.scrollIntoView({ behaviour: 'smooth' });
    };

    return (
        <div>
            <Box sx={classes.commentsOuterContainer}>
                <Box sx={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant="h6">Comments</Typography>
                    {comments.map((c, i) => (
                        <Typography key={i} gutterBottom variant="subtitle1">
                            {c}
                        </Typography>
                    ))}
                    <div ref={commentsRef} />
                </Box>
                {user?.result?.name && (
                    <Box style={{width: '70%'}}>
                        <Typography gutterBottom variant="h6">Write a comment</Typography>
                        <TextField fullWidth rows={4} variant='outlined' lable='Comment' multiline value={comment} onChange={(e) => setComment(e.target.value)} />
                        <Button style={{marginTop: '10px'}} fullWidth disabled={!comment} color="primary" variant="contained" onClick={handelClick}>Comment</Button>
                    </Box>
                )}
            </Box>
        </div>
    )
}

export default CommentSection
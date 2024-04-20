import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Paper, Typography, CircularProgress, Divider, Box, CardContent, CardMedia } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useStyles } from "./styles";

import { getPost, getPostsBySearch } from "../../actions/posts";
import CommentSection from "./CommentSection";
import moment from "moment";

const PostDetails = () => {
    const classes = useStyles();
    const { post, posts, isLoading } = useSelector((state) => state.posts);
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPost(id));
    }, [id]);

    useEffect(() => {
        if (post) {
            dispatch(getPostsBySearch({ seatch: 'none', tags: post?.tags.join(',')}));
        }
    }, [post])

    const openPost = (_id) => navigate(`/posts/${_id}`);

    const recommendedPosts = posts.filter(({ _id}) => _id !== id);
    
    if (!post) return null;

    if (isLoading) {
        return (
            <Paper elevation={6} sx={classes.loadingPaper}>
                <CircularProgress size='7em'></CircularProgress>
            </Paper>
        )
    }

    return (
        <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
            <Box sx={classes.card}>
                <CardContent sx={classes.section}>
                    <Typography variant='h3' component='h2'>{post.title}</Typography>
                    <Typography gutterBottom variant='h6' color='textSecondary' component='h2'>{post.tags.map((tag) => `#${tag} `)}</Typography>
                    <Typography gutterBottom variant="body1" sx={{fontSize: '20px'}} component='p'>{post.message}</Typography>
                    <Typography variant="h6" sx={{fontSize: '15px'}} >Created By: {post.name}</Typography>
                    <Typography variant="body1" sx={{fontSize: '12px'}} >{moment(post.createdAt).fromNow()}</Typography>
                </CardContent>
                <CardMedia component='img' sx={classes.media} image={post.selectedFile || 'none'} />
            </Box>
            <Divider style={{margin: '20px 0'}} />
            <CommentSection post={post} />
            {(recommendedPosts.length !== 0) && (
                <Paper>
                    <Box sx={classes.section}>
                        <Typography gutterBottom variant="h5">You might also like : </Typography>
                        <Divider />
                        <Box sx={classes.recommendedPosts}>
                            {recommendedPosts.map(({title, message, name, likes, selectedFile, _id}) => (
                                <Paper style={{ padding: '5px', borderRadius: '5px', margin: '10px' }} elevation={6}>
                                    <div style={{margin: '20px', cursor: 'pointer'}} onClick={() => openPost(_id)} key={_id}>
                                        <Typography gutterBottom variant='h6'>{title}</Typography>
                                        <img src={selectedFile} width='200px' />
                                        <Typography gutterBottom variant='subtitle2'>{name}</Typography>
                                        {/* <Typography gutterBottom variant='subtitle2'>{message}</Typography> */}
                                        <Typography gutterBottom variant='subtitle2'>Likes: {likes.length}</Typography>
                                    </div>
                                </Paper>
                            ))}
                        </Box>
                    </Box>
                </Paper>
            )}
        </Paper>
    )
}

export default PostDetails
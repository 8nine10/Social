import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography, ButtonBase } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useStyles } from "./styles";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbUpAltOutlined from "@mui/icons-material/ThumbUpAltOutlined";
import DeleteIcon from "@mui/icons-material/Delete";

import moment from "moment";
import {deletePost, likePost} from "../../../actions/posts";




const Post = ({post, setCurrentId}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const navigate = useNavigate();
    const [likes, setLikes] = useState(post?.likes);
    const hasLikedPost = post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))


    const openPost = () => navigate(`/posts/${post._id}`);

    const handelLike = async () => {
        dispatch(likePost(post._id));

        if (hasLikedPost) {
            setLikes(post.likes.filter((id) => id !== (user?.result.googleId || user?.result?._id)))
        } else {
            setLikes([ ...post.likes, (user?.result?.googleId || user?.result?._id)])
        }
    }

    const Likes = () => {
        if (likes.length > 0) {
            return likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
                ? (
                    <>
                        <ThumbUpAltIcon fontSize="small" /> &nbsp; {(likes.length > 2) ? `You and ${likes.length - 1} others` : `${likes.length > 1 ? 'Likes' : ''}`}
                    </>
                ) : (
                    <>
                        <ThumbUpAltOutlined fontSize="small" /> &nbsp; {likes.length === 1 ? `Like` : `Likes`}
                    </>
                )
        }
        return <>
            <ThumbUpAltOutlined fontSize='small' /> &nbsp; Like
        </>;
    }


    return (
        <Card sx={classes.card} raised elevation={6} >
        <ButtonBase sx={classes.media} onClick={openPost}>
            <CardMedia component="img" sx={classes.img} image={post.selectedFile} />
            <CardContent>
                <Box sx={classes.title}>
                    <Typography component="div" variant="h5">{post.title}</Typography>
                    {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                        <Button style={{color: "black"}} size="small" onClick={(e) => { e.stopPropagation(); setCurrentId(post._id)}}>
                            <MoreHorizIcon fontSize="default" />
                        </Button>
                    )}
                </Box>
                <Box sx={classes.details}>
                    <Typography component="div" variant="h6">
                        {post.message}
                    </Typography>
                </Box>
                <Box sx={classes.creator}>
                    <Typography component="div" variant="subtitle5">{post.name}</Typography>
                    <Typography variant="subtitle5">{moment(post.createdAt).fromNow()}</Typography>
                </Box>
                <Box sx={classes.tags}>
                    <Typography component="div" variant="subtitle3">
                        {post.tags.map((tag) => `#${tag} `)}
                    </Typography>
                </Box>
            </CardContent>
        </ButtonBase>
            <CardActions sx={classes.cardActions}>
                <Button size="small" color="primary" disabled={!user?.result} onClick={handelLike}>
                    <Likes />
                </Button>
                {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
                    <Button size="small" color="primary" onClick={() => dispatch(deletePost(post._id))}>
                        <DeleteIcon fontSize="small" />
                        &nbsp;Delete&nbsp;
                    </Button>
                )}
            </CardActions>
        </Card>
    );
}

export default Post;

import React from "react";
import { useSelector } from "react-redux";

import { Grid, CircularProgress } from "@mui/material";
import { useStyles } from "./styles.js";

import Post from "./Post/Post.js";


const Posts = ({setCurrentId}) => {
    const classes = useStyles();
    const { posts, isLoading } = useSelector((state) => state.posts)

    if (!posts.length && !isLoading) return 'No Posts';

    return (
        isLoading ? <CircularProgress /> : (
            <Grid sx={classes.mainContainer} container alignItems="stretch" spacing={3}>
                {posts.map((post) => (
                    <Grid key={post._id} item xs={12} sm={6} md={6} lg={3}>
                        <Post post={post} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid>
        )
    );
}

export default Posts;
import React, {useEffect, useState} from 'react';
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from 'react-router-dom';

import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@mui/material';
import { MuiChipsInput } from 'mui-chips-input'
import { useStyles } from "./styles.js";

import { getPosts, getPostsBySearch } from '../../actions/posts';
import Posts from '../Posts/Posts'
import Form from '../Forms/Form';
import Pagination  from '../Pagination';



function useQuery() {
  return new URLSearchParams(useLocation().search);
}

 


const Home = () => {

    const [currentId, setCurrentId] = useState(0);
    const dispatch = useDispatch();
    const query = useQuery();
    const navigate = useNavigate();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const classes = useStyles();
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);

    
    const searchPost = () => {
      if (search.trim() || tags) {
        dispatch(getPostsBySearch({search, tags: tags.join(',') }))
        navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
      } else {
        navigate('/');
      }
    }

    const handelKeyPress = (e) => {
      if (e.keyCode === 13) {
          searchPost();
      }
    }

    const handelOnAdd = (newTag) => setTags(newTag);
    
    return (
      <Grow in>
        <Container maxWidth="xl">
          <Grid container  justify="space-between" alignItems="stretch" spacing={3} sx={classes.gridContainer}>
            <Grid item xs={12} sm={6} md={9}>
              <Posts setCurrentId={setCurrentId} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
            <AppBar sx={classes.appBarSearch} position="static" clolr="inherit">
              <TextField name='search' variant="outlined" label="Search Memories" fullWidth value={search} onChange={(e) => setSearch(e.target.value)} onKeyPress={handelKeyPress} />
              <MuiChipsInput style={{margin: '10px 0'}} value={tags} onChange={handelOnAdd} label="Search Tags" variant="outlined" />
              <Button variant='contained' onClick={searchPost} sx={classes.searchButton} color='primary'>Search</Button>
            </AppBar>
              <Form currentId={currentId} setCurrentId={setCurrentId} />
              {(!searchQuery && !tags.length) && (
                <Paper elevation={6} sx={classes.pagination}>
                  <Pagination page={page} />
                </Paper>
              )}
            </Grid>
          </Grid>
        </Container>
      </Grow>
    )
}

export default Home
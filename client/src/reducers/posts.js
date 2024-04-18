import { COMMENT, START_LOADING, END_LOADING, LIKE, UPDATE, FETCH_ALL, CREATE, DELETE, FETCH_BY_SEARCH, FETCH_POST } from "../constants/actionTypes";

const temp = (state = { isLoading: true, posts: [], post: null }, action) => {
    switch (action.type) {
        case UPDATE:
        case LIKE:
            return { ...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post)};
        case FETCH_ALL:
            return {
                ...state,
                posts: action.payload.data,
                currentPage: action.payload.currentPage,
                numberOfPages: action.payload.numberOfPages,
            }
        case CREATE:
            return {...state, posts: [...state.posts, action.payload]}; 
        case DELETE:
            return {...state, posts: state.posts.filter((post) => post._id !== action.payload)};
        case FETCH_BY_SEARCH:
            return { ...state, posts: action.payload };
        case START_LOADING:
            return { ...state, isLoading: true};
        case END_LOADING:
            return { ...state, isLoading: false};
        case FETCH_POST:
            return { ...state, post: action.payload };
        case COMMENT:
            return { ...state, posts: state.posts.map((post) => {
                if (post._id === action.payload._id) {
                    return action.payload;
                }
                return post;
            })};
        default:
            return state;
    }
}

export default temp;
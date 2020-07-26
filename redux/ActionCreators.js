import * as ActionTypes from './ActionTypes';
import { baseurl } from '../shared/baseUrl';

export const fetchPosts = (subreddits) => (dispatch) => {
    dispatch(postsLoading())
    return fetch(baseurl + subreddits+'.json')
    .then(response => {
        if (response.ok) {
          return response
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText)
          error.response = response;
          throw error
        }
      },
      error => {
            var errmess = new Error(error.message)
            throw errmess
      })
    .then(response => response.json())
    .then(posts => dispatch(addPosts(posts)))
    .catch(error => dispatch(postsFailed(error.message)))
};

export const postsLoading = () => ({
    type: ActionTypes.POSTS_LOADING
});

export const postsFailed = (errmess) => ({
    type: ActionTypes.POSTS_FAILED,
    payload: errmess
});

export const addPosts = (posts) => ({
    type: ActionTypes.ADD_POSTS,
    payload: posts
});

export const fetchComments = (permalink) => (dispatch) => {
    dispatch(commentsLoading())
    return fetch(baseurl +permalink+ '.json')
    .then(response => {
        if (response.ok) {
          return response
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText)
          error.response = response
          throw error
        }
      },
      error => {
            var errmess = new Error(error.message)
            throw errmess
      })
    .then(response => response.json())
    .then(comments => dispatch(addComments(comments)))
    .catch(error => dispatch(commentsFailed(error.message)))
};

export const commentsLoading = () => ({
    type: ActionTypes.COMMENTS_LOADING
});

export const commentsFailed = (errmess) => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errmess
});

export const addComments = (comments) => ({
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
});
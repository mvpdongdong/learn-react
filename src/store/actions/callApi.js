import { axiosGet } from '~/utils/request';

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'LOAD_POSTS_FAILURE';

export const loadPosts = (postType) => {
  return {
    types: [LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE],
    shouldCallApi: (state) => !state['posts'][postType],
    callApi () {
      return axiosGet({
        url: `https://proxy-oagpwnbkpe.now.sh/topics/${postType}.json`
      });
    },
    payload: {
      postType
    }
  };
};

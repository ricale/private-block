const urls = {
  post: {
    detail:     (id) => `/post/${id}/`,
    publish:    (id) => `/post/${id}/publish/`,
    edit:       (id) => `/post/${id}/edit/`,
    remove:     (id) => `/post/${id}/remove/`,
    addComment: (id) => `/post/${id}/comment/`,
  },
  comment: {
    remove:  (id) => `/comment/${id}/remove/`,
    approve: (id) => `/comment/${id}/approve/`,
  },
  category: {
    list: ()   => `/category/`,
    post: (id) => `/category/${id}/post/`
  }
};

export default urls;

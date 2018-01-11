const urls = {
  session: {
    login:  () => `/accounts/login/`,
    logout: () => `/accounts/logout/`
  },

  post: {
    detail:     (id) => `/post/${id}/`,
    publish:    (id) => `/post/${id}/publish/`,
    edit:       (id) => `/post/${id}/edit/`,
    remove:     (id) => `/post/${id}/remove/`,
    addComment: (id) => `/post/${id}/comment/`,

    new: () => `/post/new/`,

    list:         ()     => ``,
    listWithPage: (page) => `/page/${page}/`,
    draft:         ()     => `/draft/`,
    draftWithPage: (page) => `/draft/page/${page}/`
  },
  comment: {
    remove:  (id) => `/comment/${id}/remove/`,
    approve: (id) => `/comment/${id}/approve/`,
  },
  category: {
    list:         ()        => `/category/`,
    post:         (id)      => `/category/${id}/post/`,
    postWithPage: (id,page) => `/category/${id}/post/page/${page}/`,
    draft:        (id)      => `/category/${id}/draft/`,
  }
};

export default urls;

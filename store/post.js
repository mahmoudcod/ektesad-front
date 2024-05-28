export const state = () => ({
  comments: []
});

export const getters = {
  GET_COMMENTS: state => state.comments,

  GET_COMMENT_NUM: state => state.comments.length
};

export const mutations = {
  SET_COMMENTS: (state, comments) => {
    state.comments = comments;
  },
  ADD_PARENT_COMMENT: (state, comment) => {
    state.comments.push(comment);
  },
  ADD_CHILD_COMMENT: (state, comment) => {
    let parentComment = state.comments.find(comm => {
      return comm.id === comment.parent.id;
    });
    if (!parentComment.child) {
      parentComment.child = [];
    }
    let existedChild = parentComment.child.find(ch => {
      return ch.id === comment.id;
    });
    if (!existedChild) {
      parentComment.child.push(comment);
    }
  }
};

export const actions = {
  CUSTOMIZE_COMMENTS: ({ commit }, postComments) => {
    let comments = [];
    if (postComments.length) {
      postComments.map(comm => {
        if (!comm.parent) {
          comments.push(comm);
        }
      });
      postComments.map(comm2 => {
        if (comm2.parent) {
          let existedParent = comments.find(c => {
            return c.id === comm2.parent.id;
          });
          if (existedParent) {
            if (!existedParent.child) {
              existedParent.child = [];
            }
            let existedChild = existedParent.child.find(ch => {
              return ch.id === comm2.id;
            });
            if (!existedChild) {
              existedParent.child.push(comm2);
            }
          }
        }
      });
    }
    commit('SET_COMMENTS', comments);
  },
  COMMENT_ADDED: ({ state, commit }, { isChild, comment }) => {
    if (!isChild) {
      commit('ADD_PARENT_COMMENT', comment);
    } else {
      commit('ADD_CHILD_COMMENT', comment);
    }
  }
};

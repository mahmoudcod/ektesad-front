import gql from 'graphql-tag';

export const ADD_COMMENT = gql`
  mutation addComment($commentInput: CommentInput) {
    Comment: createComment(input: { data: $commentInput }) {
      comment {
        id
        anonymusUser
        text
        parent {
          id
        }
      }
    }
  }
`;

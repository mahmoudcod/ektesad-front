import gql from 'graphql-tag';

export const ADD_POST = gql`
  mutation createPost($postInput: PostInput) {
    Post: createPost(input: { data: $postInput }) {
      post {
        id
        updatedAt
        createdAt
        title
        slug
        featureImage {
          url
        }
        published
      }
    }
  }
`;

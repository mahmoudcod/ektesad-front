import gql from "graphql-tag";

export const GET_POSTS = gql`
  query getPostsConnection(
    $where: JSON
    $sort: String
    $limit: Int
    $start: Int
    $whereComment: JSON
  ) {
    Posts: postsConnection(
      where: $where
      sort: $sort
      limit: $limit
      start: $start
    ) {
      values {
        title
        category
        id
        slug
        published
        createdAt
        updatedAt
        featured
        body
        userName
        userEmail
        excerpt
        comments(where: $whereComment) {
          id
          text
          anonymusUser
          parent {
            id
          }
        }
        user {
          id
          slug
          username
          avatar
          bio
          profilePicture {
            url
          }
        }
        featureImage {
          url
        }
        tags {
          id
          name
        }
      }
    }
  }
`;

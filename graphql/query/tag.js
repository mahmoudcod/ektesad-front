import gql from 'graphql-tag';

export const GET_TAGS = gql`
  query getTagsConnection(
    $where: JSON
    $sort: String
    $limit: Int
    $start: Int
    $wherePost: JSON
    $sortPost: String
  ) {
    Tags: tagsConnection(
      where: $where
      sort: $sort
      limit: $limit
      start: $start
    ) {
      values {
        id
        name
        posts(where: $wherePost, sort: $sortPost) {
          title
          category
          id
          slug
          published
          createdAt
          updatedAt
          featured
          body
          user {
            id
            slug
            username
            avatar
          }
          featureImage {
            url
          }
        }
      }
    }
  }
`;

import gql from 'graphql-tag';

export const GET_USERS = gql`
  query getUsers($where: JSON, $sort: String, $limit: Int, $start: Int) {
    Users: usersConnection(
      where: $where
      sort: $sort
      limit: $limit
      start: $start
    ) {
      values {
        role {
          name
        }
        username
        slug
        blocked
        confirmed
        confirmDate
        password
        email
        phone
        id
        bio
        createdAt
        address
        blockDate
        unBlockDate
        roles
        avatar
      }
    }
  }
`;

export const COUNT_USERS = gql`
  query getUsersConnection($where: JSON) {
    Count: usersConnection(where: $where) {
      aggregate {
        count
      }
    }
  }
`;

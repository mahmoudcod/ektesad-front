import gql from 'graphql-tag';

export const GET_FIGURES = gql`
  query getFigures($where: JSON, $sort: String, $limit: Int, $start: Int) {
    Figures: figuresConnection(
      where: $where
      sort: $sort
      limit: $limit
      start: $start
    ) {
      values {
        name
        createdAt
        id
        slug
        nationality
        birthDate
        age
        job
        bio
        stayingCountry
        featureImage {
          url
        }
      }
    }
  }
`;

export const GET_FIGURE = gql`
  query getFigures($where: JSON, $sort: String, $limit: Int, $start: Int) {
    Figure: figuresConnection(where: $where) {
      values {
        name
        createdAt
        id
        slug
        nationality
        birthDate
        age
        job
        bio
        stayingCountry
        featureImage {
          url
        }
        posts(sort: $sort, limit: $limit, start: $start) {
          title
          category
          id
          slug
          published
          createdAt
          updatedAt
          featured
          featureImage {
            url
          }
        }
      }
    }
  }
`;

import gql from 'graphql-tag';

export const GET_FORMATS = gql`
  query getFormats {
    Formats: formats {
      id
      name
    }
  }
`;

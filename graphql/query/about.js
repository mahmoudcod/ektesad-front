import gql from 'graphql-tag';

export const GET_ABOUT = gql`
  query about {
    abouts {
      vision
      description
      mission
      video {
        url
      }
    }
  }
`;

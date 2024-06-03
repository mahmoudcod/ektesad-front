import gql from 'graphql-tag';

export const GET_SETTINGS = gql`
  query getSettings {
    Settings: settings {
      facebook
      googlePlus
      pinterest
      twitter
      email
      phone
      appLogo
    }
  }
`;

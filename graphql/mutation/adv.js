import gql from 'graphql-tag';

export const ADD_ADV = gql`
  mutation addAdv($advInput: AdvInput) {
    Adv: createAdv(input: { data: $advInput }) {
      adv {
        id
      }
    }
  }
`;

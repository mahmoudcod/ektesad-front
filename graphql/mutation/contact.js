import gql from 'graphql-tag';

export const CONTACT = gql`
  mutation contact($contactInput: ContactInput) {
    Contact: createContact(input: { data: $contactInput }) {
      contact {
        name
        email
        message
      }
    }
  }
`;

import gql from 'graphql-tag';

export const DEPENSES_QUERY = gql`
  query Depenses {
    depenses {
      id
      name
      amount
      displayedAmount
      createdAt
      updatedAt
    }
  }
`;

export const CURRENCIES_QUERY = gql`
  query Currencies {
    currencies {
      id
      abbreviation
    }
  }
`;
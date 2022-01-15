import gql from 'graphql-tag';

export const DEPENSES_QUERY = gql`
  query Depenses {
    depenses {
      id
      name
      amount
      category {
        id
        name
      }
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
      name
      abbreviation
    }
  }
`;
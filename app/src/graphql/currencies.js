import gql from 'graphql-tag';

export const CURRENCIES_QUERY = gql`
  query Currencies {
    currencies {
      id
      name
      abbreviation
    }
  }
`;
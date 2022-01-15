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
      currency {
        id
        name
        abbreviation
      }
      displayedAmount
      createdAt
      updatedAt
    }
  }
`;

export const DEPENSES_UPDATE_MUTATION = gql`
  mutation UpdateDepense(
    $id: ID!
    $name: String
    $notes: String
    $amount: Int
    $currencyId: ID
    $categoryId: ID
  ) {
    updateDepense(
      id: $id
      name: $name
      amount: $amount
      notes: $notes
      currencyId: $currencyId
      categoryId: $categoryId
    ) {
      id
      name
      amount
      displayedAmount
      createdAt
      updatedAt
    }
  }
`;

export const DEPENSES_DELETE_MUTATION = gql`
  mutation DeleteDepense(
    $id: ID!
  ) {
    deleteDepense(
      id: $id
    ) {
      id
      name
      amount
      displayedAmount
      createdAt
      updatedAt
    }
  }
`;

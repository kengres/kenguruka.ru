import gql from 'graphql-tag';

export const DEPENSES_ADD_MUTATION = gql`
  mutation createDepense(
    $name: String!
    $notes: String
    $amount: Int
    $currencyId: ID!
    $categoryId: ID!
  ) {
    createDepense(
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
  mutation deleteDepense($id: ID!) {
    deleteDepense(id: $id) {
      id
    }
  }
`;
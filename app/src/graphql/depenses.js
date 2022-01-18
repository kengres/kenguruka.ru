import gql from 'graphql-tag';

export const DEPENSES_QUERY = gql`
         query Depenses($monthDate: String, $categoryId: ID) {
           depenses(monthDate: $monthDate, categoryId: $categoryId) {
             id
             name
             amount
             date
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

export const SINGLE_DEPENSE_QUERY = gql`
         query Depense($id: ID!) {
           depense(id: $id) {
             id
             name
             amount
             date
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

export const DEPENSES_ADD_MUTATION = gql`
  mutation createDepense(
    $name: String!
    $notes: String
    $amount: Int
    $currencyId: ID!
    $categoryId: ID!
    $date: String
  ) {
    createDepense(
      name: $name
      amount: $amount
      notes: $notes
      currencyId: $currencyId
      categoryId: $categoryId
      date: $date
    ) {
      id
      name
      amount
      date
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
    $date: String
  ) {
    updateDepense(
      id: $id
      name: $name
      amount: $amount
      notes: $notes
      currencyId: $currencyId
      categoryId: $categoryId
      date: $date
    ) {
      id
      name
      amount
      date
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
    }
  }
`;

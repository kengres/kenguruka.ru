import gql from 'graphql-tag';

export const CATEGORIES_QUERY = gql`
         query Categories {
           categories {
             id
             name
             createdAt
             updatedAt
           }
         }
       `;

export const CATEGORIES_CREATE_MUTATION = gql`
         mutation CreateCategory($name: String!) {
           createCategory(name: $name) {
             id
             name
             createdAt
             updatedAt
           }
         }
       `;

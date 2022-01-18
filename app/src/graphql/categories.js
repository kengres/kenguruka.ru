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

export const SINGLE_CATEGORY_QUERY = gql`
         query Category($id: ID!) {
           category(id: $id) {
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

export const CATEGORIES_UPDATE_MUTATION = gql`
         mutation UpdateCategory($id: ID!, $name: String) {
           updateCategory(id: $id, name: $name) {
             id
             name
             createdAt
             updatedAt
           }
         }
       `;

export const CATEGORIES_DELETE_MUTATION = gql`
         mutation DeleteCategory($id: ID!) {
           deleteCategory(id: $id) {
             id
             name
             createdAt
             updatedAt
           }
         }
       `;

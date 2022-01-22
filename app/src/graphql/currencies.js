import gql from 'graphql-tag';

export const CURRENCIES_QUERY = gql`
         query Currencies {
           currencies {
             id
             name
             abbreviation
             isPrimary
             rates {
               id
               currencyTo {
                 id
               }
               amount
             }
           }
         }
       `;

export const CURRENCIES_CREATE_MUTATION = gql`
         mutation CreateCurrency($name: String!, $abbreviation: String!, $isPrimary: Boolean, $rates: [RateInput]) {
           createCurrency(name: $name, abbreviation: $abbreviation, isPrimary: $isPrimary, rates: $rates) {
             id
             name
             abbreviation
             isPrimary
           }
         }
       `;

export const CURRENCIES_UPDATE_MUTATION = gql`
         mutation UpdateCurrency(
           $id: ID!
           $name: String
           $abbreviation: String
           $isPrimary: Boolean
           $rates: [RateInput]
         ) {
           updateCurrency(id: $id, name: $name, abbreviation: $abbreviation, isPrimary: $isPrimary, rates: $rates) {
             id
             name
             abbreviation
           }
         }
       `;

export const CURRENCIES_DELETE_MUTATION = gql`
         mutation DeleteCurrency($id: ID!) {
           deleteCurrency(id: $id) {
             id
             name
             abbreviation
           }
         }
       `;
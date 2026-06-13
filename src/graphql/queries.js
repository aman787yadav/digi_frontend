import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query {
    users {
      id
      name
      email
      role
      created_at
    }
  }
`;


export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      name
      email
      role
    }
  }
`;
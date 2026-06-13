import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login(
    $email: String!
    $password: String!
  ) {
    login(
      email: $email
      password: $password
    ) {
      token
    }
  }
`;


export const SIGNUP = gql`
  mutation Signup(
    $name: String!
    $email: String!
    $password: String!
  ) {
    signup(
      name: $name
      email: $email
      password: $password
    ) {
      id
      name
      email
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser(
    $name: String!
    $email: String!
    $password: String!
    $role: String!
  ) {
    createUser(
      name: $name
      email: $email
      password: $password
      role: $role
    ) {
      id
      name
      email
      role
    }
  }
`;


export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;


export const UPDATE_USER = gql`
  mutation UpdateUser(
    $id: ID!
    $name: String
    $email: String
    $password: String
    $role: String
  ) {
    updateUser(
      id: $id
      name: $name
      email: $email
      password: $password
      role: $role
    ) {
      id
      name
      email
      role
    }
  }
`;


refetchQueries: ["GetUsers"]
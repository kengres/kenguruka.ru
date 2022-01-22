import gql from "graphql-tag";

export const FLAVORS_QUERY = gql`
  query Flavors {
    flavors @client {
      isProdMode
      isProd
      isStage
      isDev
      activeUrl
    }
  }
`;

export const SET_FLAVORS_MUTATION = gql`
  mutation SetFlavors($isDev: Boolean, $isStage: Boolean, $isProd: Boolean) {
    setFlavors(isStage: $isStage, isDev: $isDev, isProd: $isProd) @client {
      isDev
      isStage
      isProd
    }
  }
`;

export const PERMISSIONS_QUERY = gql`
  query {
    permissions @client {
      isSubscriber
      isEditor
      isAdmin
      isSuper
    }
  }
`;

export const SET_PERMISSIONS_MUTATION = gql`
  mutation SetPermissions($isSubscriber: Boolean, $isEditor: Boolean, $isAdmin: Boolean, $isSuper: Boolean) {
    setPermissions(isSubscriber: $isSubscriber, isEditor: $isEditor, isAdmin: $isAdmin, isSuper: $isSuper) @client {
      isSubscriber
      isEditor
      isAdmin
      isSuper
    }
  }
`;


export const LOG_USER_IN_MUTATION = gql`
  mutation LogUserIn($username: String!, $password: String!) {
    logUserIn(username: $username, password: $password) {
      token
      userId
      refreshToken
    }
  }
`;
export const AUTO_LOG_USER_IN = gql`
  mutation AutoLogUserIn($refreshToken: String!) {
    autoLogUserIn(refreshToken: $refreshToken) {
      token
      userId
      refreshToken
    }
  }
`;

export const REFRESH_TOKEN_MUTATION = gql`
  mutation RefreshTokens($token: String!, $refreshToken: String!) {
    refreshTokens(token: $token, refreshToken: $refreshToken) {
      token
      userId
      refreshToken
    }
  }
`;

export const USERS_QUERY = gql`
  query Users {
    users {
      id
      active
      email
      name
      verified
      role
      createdAt
      updatedAt
    }
  }
`;

export const QUERY_ME_CLIENT = gql`
  query MeClient {
    me @client {
      id
      active
      username
      name
      verified
      createdAt
      updatedAt
    }
  }
`;

export const QUERY_ME_SERVER = gql`
  query Me {
    me {
      id
      active
      username
      name
      verified
      createdAt
      updatedAt
    }
  }
`;

export const SINGLE_USER_QUERY = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      active
      username
      name
      verified
      createdAt
      updatedAt
    }
  }
`;


export const USER_COUNTS_QUERY = gql`
         query UserCounts {
           userCounts
         }
       `;


export const CREATE_ACCOUNT_MUTATION = gql`
  mutation CreateAccount($name: String!, $username: String!, $password: String!) {
    createAccount(name: $name, username: $username, password: $password)
  }
`;

export const VERIFY_CODE_MUTATION = gql`
  mutation VerifyCode($username: String!, $code: String!) {
    verifyCode(username: $username, code: $code) {
      userId
      token
      refreshToken
    }
  }
`;

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($id: ID!, $name: String, $email: String, $password: String, $active: Boolean, $role: Int) {
    updateUser(id: $id, name: $name, email: $email, active: $active, role: $role, password: $password) {
      id
      active
      email
      name
      verified
      role
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_PROFILE_MUTATION = gql`
  mutation UpdateProfile($name: String, $email: String, $newPassword: String, $oldPassword: String) {
    updateProfile(name: $name, email: $email, newPassword: $newPassword, oldPassword: $oldPassword) {
      id
      active
      email
      name
      verified
      role
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_USER_MUTATION = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
      active
      email
      name
      verified
      role
      createdAt
      updatedAt
    }
  }
`;

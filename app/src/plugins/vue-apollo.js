import Vue from 'vue'
import VueApollo from 'vue-apollo'
import JsCookies from 'js-cookie'
import { createApolloClient, restartWebsockets } from 'vue-cli-plugin-apollo/graphql-client'
import { LOGIN_TOKEN_NAME, REFRESH_TOKEN_NAME } from "@/utils/constants";
// Install the vue plugin
Vue.use(VueApollo)

// Http endpoint
const httpEndpoint = process.env.VUE_APP_GRAPHQL_HTTP
// Files URL root
export const filesRoot = process.env.VUE_APP_FILES_ROOT || httpEndpoint.substr(0, httpEndpoint.indexOf('/graphql'))

Vue.prototype.$filesRoot = filesRoot

// Config
const defaultOptions = {
  httpEndpoint,
  wsEndpoint: null,
  tokenName: LOGIN_TOKEN_NAME,
  refreshTokenName: REFRESH_TOKEN_NAME,
  persisting: false,
  websocketsOnly: false,
  ssr: false,
  httpLinkOptions: {
    headers: {
      "x-ref-token": localStorage.getItem(REFRESH_TOKEN_NAME)
    }
  },
  // getAuth: (tokenName) => ...
  getAuth: tokenName => {
    const token = localStorage.getItem(tokenName);
    return token ? `JABA ${token}` : "";
  },
  // Additional ApolloClient options
  // apollo: { ... }

  // Client local data (see apollo-link-state)
  // clientState: { resolvers: { ... }, defaults: { ... } }
}

// Call this in the Vue app file
export function createProvider(options = {}) {
  // Create apollo client
  const { apolloClient, wsClient } = createApolloClient({
    ...defaultOptions,
    ...options,
  })
  apolloClient.wsClient = wsClient

  // Create vue apollo provider
  const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
    defaultOptions: {
      $query: {
        // fetchPolicy: 'cache-and-network',
      },
    },
    errorHandler(error) {
      // eslint-disable-next-line no-console
      console.log('%cError', 'background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;', error.message)
    },
  })

  return apolloProvider
}

// Manually call this when user log in
export async function onLogin(apolloClient, token, refreshToken) {
  if (typeof localStorage !== 'undefined' && token) {
    localStorage.setItem(LOGIN_TOKEN_NAME, token)
    localStorage.setItem(REFRESH_TOKEN_NAME, refreshToken);
    JsCookies.set(LOGIN_TOKEN_NAME, token);
    JsCookies.set(REFRESH_TOKEN_NAME, refreshToken);
  }
  if (apolloClient.wsClient) restartWebsockets(apolloClient.wsClient)
  try {
    await apolloClient.resetStore()
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('%cError on cache reset (login)', 'color: orange;', e.message)
  }
}

// Manually call this when user log out
export async function onLogout(apolloClient) {
  if (typeof localStorage !== 'undefined') {
    localStorage.removeItem(LOGIN_TOKEN_NAME);
    localStorage.removeItem(REFRESH_TOKEN_NAME);
    JsCookies.remove(LOGIN_TOKEN_NAME);
    JsCookies.remove(REFRESH_TOKEN_NAME);
  }
  if (apolloClient.wsClient) restartWebsockets(apolloClient.wsClient)
  try {
    await apolloClient.resetStore()
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('%cError on cache reset (logout)', 'color: orange;', e.message)
  }
}

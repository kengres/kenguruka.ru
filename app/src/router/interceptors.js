import { getTokenInfo } from '@/utils/auth'
import { LOGIN_TOKEN_NAME, nav, REFRESH_TOKEN_NAME } from "@/utils/constants";
import { REFRESH_TOKEN_MUTATION, /* QUERY_ME_CLIENT, */ QUERY_ME_SERVER } from '@/graphql/users'
import { onLogin } from '@/plugins/vue-apollo'

import { apolloProvider } from "../main";

export const checkUserInterceptor = async (to, __, next) => {
  // console.log(`[Interceptor] to meta: `, to.meta)
  // console.log(`[Interceptor] to meta role: `, to.matched.some(r => r.meta.role))

  if (to.matched.some(record => record.meta.userRequired)) {
    try {
      const userData = await getUserData()
      // console.log(`[Interceptor] permissions: `, getPermissionFromRole(userData.role))
      // await apolloProvider.defaultClient.mutate({
      //   mutation: SET_PERMISSIONS_MUTATION,
      //   variables: getPermissionFromRole(userData.role)
      // })
      if (to.matched.some(record => record.meta.role)) {
        // console.log(`user role: `, userData.role)
        // console.log(`req. role: `, to.meta.role)
        if (userData.role >= to.meta.role) {
          next()
        } else {
          next(false)
        }
      } else {
        next()
      }
    } catch (error) {
      // console.log(`error login: `, error)
      next(nav.passport.login)
    }
  } else {
    next()
  }
}

const getUserData = async () => {
  const token = localStorage.getItem(LOGIN_TOKEN_NAME)
  const { decodable, valid, expired } = getTokenInfo(token)
  // console.log('[token] decodable: ', decodable)
  // console.log('[token] valid: ', valid)
  // console.log('[token] expired: ', expired)
  if (!decodable || !valid) {
    // * Remove from Local Storage
    removeDataFromLS()
    const e = new Error("Invalid token!")
    throw e
  } else {
    if (expired) {
      // console.warn(`token expired...`)
      await initRefreshToken(token)
    }
    const me = await fetchUserData()
    if (!me) {
      const e = new Error("No user found!")
      throw e
    } else {
      return me
    }
  }
}

const fetchUserData = async () => {
  // console.log(`fetching user...`)
  const { data } = await apolloProvider.defaultClient.query({
    query: QUERY_ME_SERVER,
  });
  // if (!data) {
  //   const { data: dtServer } = await apolloProvider.defaultClient.query({ query: QUERY_ME_SERVER });
  //   // console.log(`dtServer: `, dtServer.me)
  //   return dtServer.me
  // }
  // console.log(`dtClient: `, data.me)
  return data.me;
}

const removeDataFromLS = () => {
  localStorage.removeItem(LOGIN_TOKEN_NAME)
  localStorage.removeItem(REFRESH_TOKEN_NAME)
}

const initRefreshToken = async (token) => {
  // console.log(`check refresh token...`)
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_NAME)
  const { decodable, valid, expired } = getTokenInfo(refreshToken)
  // console.log('[rfsh token] decodable: ', decodable)
  // console.log('[rfsh token] valid: ', valid)
  // console.log('[rfsh token] expired: ', expired)
  if (!decodable || !valid || expired) {
    const e = new Error("Invalid refresh token!")
    throw e
  } else {
    try {
      removeDataFromLS()
      const { data: { refreshTokens: { token: newTkn, refreshToken: newRfTkn } } } = await apolloProvider.defaultClient.mutate({
        mutation: REFRESH_TOKEN_MUTATION,
        variables: {
          token,
          refreshToken
        }
      })
      await onLogin(apolloProvider.defaultClient, newTkn, newRfTkn);
      // console.log(`refresh last next...`)
    } catch (error) {
      console.log(`error refresh: `, error)
      // next(nav.passport.login)
      throw error;
    }
  }
}
import '../styles/react-toastify.css'
import '../styles/globals.css'

import axios from 'axios'
import Head from 'next/head'
import { useEffect } from 'react'

import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import Layout from '../components/Layout'
import { Provider } from 'react-redux'

import store from '../store'
import { loginUser } from '../store/slices/authSlice'

import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/dist/client/router'

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_ENDPOINT // Setting default base URL

// Create a client
const queryClient = new QueryClient()

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    const token = JSON.parse(localStorage.getItem('token'))
    if (token?.access_token && user?.name) {
      store.dispatch(
        loginUser({
          token: token.access_token,
          email: user.email,
          name: user.name,
        })
      )
    }
    if (token?.access_token) {
      console.log('token', token?.access_token)
      // INTERCEPT REQUEST VIA AXIOS
      axios.interceptors.request.use(
        function (config) {
          // Do something before request is sent
          config.headers['Authorization'] = 'Bearer ' + token.access_token

          return config
        },
        function (error) {
          // Do something with request error
          return Promise.reject(error)
        }
      )
    }
  }, [router])
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'))
    if (!token?.access_token) {
      if (router.pathname !== '/product') {
        router.replace('/product')
      }
    }
  }, [router])

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Layout>
            <Head>
              {/* react bootstrap style link */}
              <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css"
                integrity="sha384-KyZXEAg3QhqLMpG8r+8fhAXLRk2vvoC2f3B09zVXn8CA5QIVfZOJ3BCsw2P0p/We"
                crossOrigin="anonymous"
              />
            </Head>
            <Component {...pageProps} />
          </Layout>
        </Provider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      <ToastContainer hideProgressBar={true} />
    </>
  )
}

export default MyApp

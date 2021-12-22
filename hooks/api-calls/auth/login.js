import { useMutation } from 'react-query'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../../store/slices/authSlice'
import { useRouter } from 'next/dist/client/router'

export const useLogin = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  return useMutation(
    // API CAll DEmo For Login page
    (loginData) => axios.post(`asdf`, loginData).then((res) => res.data),
    {
      onSuccess: (response) => {
        localStorage.setItem('token', JSON.stringify(response.token))
        localStorage.setItem('user', JSON.stringify(response.user))
        dispatch(
          loginUser({
            token: response.token.access_token,
            mobile: response.user.mobile,
            name: response.user.name,
          })
        )
        router.push('/dashboard')
      },
      onError: (error) => {
        if (error.response.data.code.toString()[0] === '4') {
          toast.error(error.response.data.message)
        }
      },
    }
  )
}

import { useState } from 'react'
import styles from './index.module.css'
import Button from '../UI/Button'

import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { useLogin } from '../../hooks/api-calls/auth/login'

const Login = () => {
  const [mobile, setMobile] = useState('')
  const [password, setPassword] = useState('')

  // hooks
  const { isLoading: loggingIn, mutate: login } = useLogin()

  const submitFn = () => {
    login({
      mobile: mobile,
      password: password,
      source: 'sales_panel',
    })
  }

  return (
    <div className={styles.LoginRegister}>
      Non - Worikng page
    </div>
  )
}

export default Login

const InputField = (props) => {
  const { title, type, value, setValue, placeholder, id } = props
  const [changedType, setChangedType] = useState(type)
  return (
    <div className={styles.InputField}>
      <div className={styles.InputTitle}>{title}</div>
      <input
        className={styles.InputBox}
        placeholder={placeholder}
        type={type === 'password' ? changedType : type}
        value={value}
        id={id}
        onChange={(e) => setValue(e.target.value)}
      />
      {/* for password id show eye icon */}
      {id === 'password' ? (
        changedType === 'password' ? (
          <AiFillEyeInvisible
            className={styles.Eye}
            onClick={() => {
              setChangedType('text')
            }}
          />
        ) : (
          <AiFillEye
            className={styles.Eye}
            onClick={() => {
              setChangedType('password')
            }}
          />
        )
      ) : null}
    </div>
  )
}

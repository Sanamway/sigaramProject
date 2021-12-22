import { useRouter } from 'next/dist/client/router'
import { useEffect, useState } from 'react'
import Creators from './Creators'
import AD from './AD'
import Clients from './Clients'
import styles from './index.module.css'

const Users = () => {
  const router = useRouter()
  const [tab, setTab] = useState('')

  useEffect(() => {
    setTab(router.query.tab)
  }, [router.query.tab])

  let content = ''
  if (tab === 'ad') {
    content = <AD />
  } else if (tab === 'clients') {
    content = <Clients />
  } else if (tab === 'creators') {
    content = <Creators />
  }

  return <div className={styles.Container}>{content}</div>
}

export default Users

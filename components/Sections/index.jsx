import { useRouter } from 'next/dist/client/router'
import { useEffect, useState } from 'react'
import Skillsets from './Skillsets'
import ProjectType from './ProjectType'
import Industries from './Industries'
import styles from './index.module.css'

const Sections = () => {
  const router = useRouter()
  const [tab, setTab] = useState('')

  useEffect(() => {
    setTab(router.query.tab)
  }, [router.query.tab])

  let content = ''
  if (tab === 'project-type') {
    content = <ProjectType />
  } else if (tab === 'skillsets') {
    content = <Skillsets />
  } else if (tab === 'industries') {
    content = <Industries />
  }

  return <div className={styles.Container}>{content}</div>
}

export default Sections

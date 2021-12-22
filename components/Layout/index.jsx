import { Row, Col } from 'react-bootstrap'
import Sidebar from './Sidebar'
import Navbar from './Navbar'
import { useState } from 'react'
import styles from './index.module.css'

import { useSelector } from 'react-redux'

const Layout = (props) => {
  const { token } = useSelector((state) => state.auth)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showSettingDropdown, setShowSettingDropdown] = useState(false)

  return (
    <Row className="m-0">
      <Col
        xs="auto"
        className={`p-0 ${styles.Col1} ${token ? '' : styles.Hide}`}
      >
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
          setShowSettingDropdown={setShowSettingDropdown}
          showSettingDropdown={showSettingDropdown}
        />
      </Col>
      <Col className="p-0">
        <Navbar
          setSidebarOpen={setSidebarOpen}
          setShowSettingDropdown={setShowSettingDropdown}
          showSettingDropdown={showSettingDropdown}
        />
        <div className={styles.Content}>{props.children}</div>
      </Col>
    </Row>
  )
}

export default Layout

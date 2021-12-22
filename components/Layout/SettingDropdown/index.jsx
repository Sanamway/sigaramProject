import styles from './index.module.css'

import { IoMdSettings, IoMdHelpCircle } from 'react-icons/io'
import { BiExit, BiBuildings } from 'react-icons/bi'
import { MdPayment, MdNotificationsNone } from 'react-icons/md'
import { Row, Col } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../../store/slices/authSlice'
import { Image } from 'react-bootstrap'

const items = [
  {
    icon: <Image src="/images/settings.png" alt="" />,
    title: 'Account Settings',
    subtitle: 'Consectetur adipiscing elit dolor sit',
  },
  {
    icon: <Image src="/images/company.png" alt="" />,
    title: 'Company Profile',
    subtitle: 'Lorem ipsum dolor sit',
  },
  {
    icon: <Image src="/images/payment.png" alt="" />,
    title: 'Payment Info',
    subtitle: 'Consectetur adipiscing elit dolor sit',
  },
  {
    icon: <Image src="/images/notifications.svg" alt="" />,
    title: 'Notification Settings',
    subtitle: 'Lorem ipsum dolor sit',
  },
  {
    icon: <Image src="/images/help.png" alt="" />,
    title: 'Support',
    subtitle: 'Consectetur adipiscing elit dolor sit',
  },
  {
    icon: <Image src="/images/exit.png" alt="" />,
    title: 'Log Out',
    subtitle: 'Lorem ipsum dolor sit',
    url: '/logout',
  },
]

const SettingDropdown = () => {
  const dispatch = useDispatch()
  return (
    <div className={styles.SettingDropdown}>
      {items.map((item, idx) => (
        <div
          key={idx}
          className={styles.Item}
          onClick={() => {
            if (item.url === '/logout') {
              dispatch(logoutUser())
            }
          }}
        >
          <Row className="m-0">
            <Col xs="auto" className={styles.Icon}>
              {item.icon}
            </Col>
            <Col className={styles.Text}>
              <Row className={`m-0 ${styles.TextUpper}`}>{item.title}</Row>
              <Row className={`m-0 ${styles.TextLower}`}>{item.subtitle}</Row>
            </Col>
          </Row>
        </div>
      ))}
    </div>
  )
}

export default SettingDropdown

/* eslint-disable @next/next/no-img-element */
import styles from './index.module.css'
import { IoMdArrowDropdown } from 'react-icons/io'
import { GiHamburgerMenu } from 'react-icons/gi'
import { Row, Col } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import Image from 'next/image'

import SettingDropdown from '../SettingDropdown'
import Backdrop from '../../UI/Backdrop'

const items = [
  {
    icon: <Image src="/images/comment.png" alt="" height="18px" width="18px" />,
  },
  {
    icon: (
      <Image
        src="/images/notifications.svg"
        alt=""
        height="22.75px"
        width="18.67px"
      />
    ),
  },
]

const Navbar = (props) => {
  const { setSidebarOpen, showSettingDropdown, setShowSettingDropdown } = props
  const { name, token } = useSelector((state) => state.auth)

  return (
    <>
      <Row
        className={`${styles.Navbar} ${token ? '' : 'justify-content-start'}`}
      >
        {token ? (
          <Col xs="auto" className={`${styles.Hamburger}`}>
            <GiHamburgerMenu
              onClick={() => setSidebarOpen(true)}
              style={{width: "18px"}}
            />
            <img
              className={`cursor-pointer ${styles.Logo}`}
              src="/images/at-logo.png"
              alt="Air Teams Logo"
              onClick={() => router.push('/')}
            />
          </Col>
        ) : (
          <Col xs="auto">
            <Image
              width="224"
              height="60"
              className={`cursor-pointer`}
              src="/images/at-logo.png"
              alt="Air Teams Logo"
              unoptimized={true}
              onClick={() => router.push('/')}
            />
          </Col>
        )}
        {token ? (
          <Col xs="auto" className="d-inline-block p-0">
            {items.map((item, idx) => (
              <div key={idx} className={styles.Item}>
                {item.icon}
              </div>
            ))}
            <div
              className={`${styles.Item} ${styles.Name}`}
              onClick={() => setShowSettingDropdown(true)}
            >
              <span className={styles.AvatarContainer}>
                <img
                  src="/images/adminIcon.png"
                  alt="avatar"
                  className={styles.Avatar}
                />
              </span>
              &nbsp;&nbsp;
              <span className={styles.DesktopOnly}>
                {name} <IoMdArrowDropdown />
              </span>
            </div>
          </Col>
        ) : null}
      </Row>
      {showSettingDropdown ? (
        <>
          <SettingDropdown />
          <Backdrop
            bgcolor="rgba(0, 0, 0, 0)"
            clicked={() => setShowSettingDropdown(false)}
          />
        </>
      ) : null}
    </>
  )
}

export default Navbar

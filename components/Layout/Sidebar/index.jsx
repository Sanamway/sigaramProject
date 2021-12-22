import Image from 'next/image'
import styles from './index.module.css'
import { IoMdArrowDropdown } from 'react-icons/io'
import Backdrop from '../../UI/Backdrop'
import { useRouter } from 'next/dist/client/router'

const items = [
  {
    icon: <Image src="/images/Home.png" alt="" width="14px" height="16px" />,
    title: 'Dashboard',
    url: '/dashboard',
  },
  {
    icon: <Image src="/images/Home.png" alt="" width="14px" height="16px" />,
    title: 'Products',
    url: '/products',
  },

  {
    icon: <Image src="/images/folder.png" alt="" width="20px" height="18px" />,
    title: 'Orders',
    url: '/order',
    // subcategory: [],
  },
  


  // {
  //   icon: (
  //     <Image src="/images/SectionIcon.png" alt="" width="21px" height="18px" />
  //   ),
  //   title: 'Sections',
  //   url: '/sections',
  //   subcategory: [
  //     { title: 'Project Type', query: 'project-type' },
  //     { title: 'Skillsets', query: 'skillsets' },
  //     { title: 'Industries', query: 'industries' },
  //   ],
  // },
  // {
  //   icon: <Image src="/images/user.png" alt="" width="18px" height="19px" />,
  //   title: 'User',
  //   url: '/user',
  //   subcategory: [],
  // },
  // {
  //   icon: <Image src="/images/folder.png" alt="" width="20px" height="18px" />,
  //   title: 'Projects',
  //   url: '/projects',
  //   subcategory: [],
  // },

]

const Sidebar = (props) => {
  const { sidebarOpen, setSidebarOpen, setShowSettingDropdown } = props
  const router = useRouter()
  const url = router.pathname
  const tab = router.query?.tab

  return (
    <>
      <div
        className={`${styles.Sidebar} ${sidebarOpen ? styles.SidebarOpen : styles.SidebarClose
          }`}
        onClick={() => setShowSettingDropdown(false)}
      >
        <div className={`text-center pt-3 ${styles.LogoContainer}`}>
          <Image
            width="224"
            height="60"
            className="cursor-pointer "
            src="/images/at-logo.png"
            alt="Air Teams Logo"
            unoptimized={true}
            onClick={() => router.push('/')}
          />
        </div>
        <div className="pt-5">
          {items.map((item, idx) => {
            return (
              <details
                key={idx}
                className={styles.DetailItem}
                onClick={() => {
                  if (url !== item.url && !item?.subcategory?.length) {
                    router.push(item.url)
                    setSidebarOpen(false)
                  }
                }}
              >
                <summary
                  className={`${styles.Item} ${url === item.url ? styles.ActiveItem : ''
                    }`}
                >
                  <span>
                    {item.icon}&nbsp;&nbsp;&nbsp;{item.title}
                  </span>
                  {item.subcategory ? (
                    <span className={styles.DropdownIcon}>
                      <IoMdArrowDropdown />
                    </span>
                  ) : null}
                </summary>
                {item.subcategory ? (
                  <div>
                    {item.subcategory.map((subitem, idx) => (
                      <div
                        key={idx}
                        className={`${styles.Subitem} ${tab === subitem.query ? styles.ActiveSubitem : ''
                          }`}
                        onClick={() => {
                          router.push(
                            `${item.url}?tab=${subitem.query}`,
                            undefined,
                            {
                              shallow: true,
                            }
                          )
                          setSidebarOpen(false)
                        }}
                      >
                        {subitem.title}
                      </div>
                    ))}
                  </div>
                ) : null}
              </details>
            )
          })}
        </div>
      </div>
      {sidebarOpen ? <Backdrop clicked={() => setSidebarOpen(false)} /> : null}
    </>
  )
}

export default Sidebar

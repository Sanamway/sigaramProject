import { Button } from 'react-bootstrap'
import styles from './index.module.css'

const CustomButton = ({ variant, size, children, block, ...others }) => {
  return (
    <Button
      {...others}
      className={
        variant === 'link'
          ? `${variant === 'link' ? `${styles.VariantLink}` : ''}`
          : `${styles.Normal} ${
              variant === 'outline-primary' ? styles.Outline : ''
            } ${size === 'sm' ? styles.Small : ''}`
      }
      style={block ? { width: '100%' } : {}}
    >
      {children}
    </Button>
  )
}

export default CustomButton

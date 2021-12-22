import classes from './Backdrop.module.css'

const Backdrop = (props) => {
  const { bgcolor, clicked } = props
  return (
    <div
      className={classes.Backdrop}
      onClick={clicked}
      style={
        bgcolor
          ? { backgroundColor: bgcolor }
          : { backgroundColor: 'rgba(0, 0, 0, 0.5)' }
      }
    ></div>
  )
}

export default Backdrop

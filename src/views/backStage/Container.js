import './Container.scss'

function Container(props) {
  const { children } = props

  return (
    <div>
      <p>123</p>
      { children }
    </div>
  )
}

export default Container
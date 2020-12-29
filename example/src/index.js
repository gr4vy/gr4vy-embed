import ReactDOM from 'react-dom'
import Gr4vy from '@gr4vy/embed'

ReactDOM.render(
  <Gr4vy
    amount={1299}
    currency={`USD`}
    apiHost='localhost:3100'
    iframeHost='localhost:8080'
    bearerToken='JWT_TOKEN'
    showButton
    debug='debug'
    externalIdentifier='user-123'
  />,
  document.getElementById(`app`)
)

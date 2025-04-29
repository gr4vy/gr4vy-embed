import React, { memo, useState } from 'react'
import ReactDOM from 'react-dom'
import Embed from '../src'

const MemoEmbed = memo(function MemoEmbed({
  onComplete,
}: {
  onComplete: CallableFunction
}) {
  return (
    <form action="/" id="payment-form">
      <Embed
        form="#payment-form"
        intent="capture"
        amount={1299}
        currency="AUD"
        buyerExternalIdentifier="user-009"
        iframeHost={process.env.IFRAME_HOST ?? '127.0.0.1:8080'}
        apiHost={process.env.API_HOST ?? '127.0.0.1:3100'}
        token={process.env.TOKEN ?? '123456'}
        debug
        country="AU"
        onEvent={(name, data) =>
          console.debug(`Merchant page received ${name}`, data)
        }
        locale="en"
        onComplete={(transaction) => onComplete(transaction)}
      />
      <input type="submit" />
    </form>
  )
})

const App = () => {
  const [transaction, setTransaction] = useState(null)

  return (
    <div style={{ maxWidth: '500px' }}>
      <MemoEmbed onComplete={setTransaction} />
      {transaction && (
        <>
          <p>Transaction ID: {transaction.id}</p>
          <p>Status: {transaction.status}</p>
          <p>Payment Method ID: {transaction.paymentMethod?.id}</p>
        </>
      )}
    </div>
  )
}

ReactDOM.render(<App />, document.querySelector('#app'))

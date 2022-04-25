import React, {useState, useEffect} from 'react'

function Confirmation(props) {
  const [showDialog, toggleDialog] = useState(false);

  useEffect(() => {
    if (props.confirmation) {
      toggleDialog(true);
    } else {
      toggleDialog(false);
    }
  }, [props.confirmation]);

  function closeConfirmation() {
    toggleDialog(false);
    window.location.reload();
  }

  return (
    <div className={showDialog ? 'confirmation' : 'hidden'}>
      <span className="close" onClick={() => closeConfirmation()}>X</span>
      <h1>Order Confirmed!</h1>
      <h2>Confirmation# {Math.floor(Math.random() * 1000000000)}</h2>
      <p>(This is an example site. No order has been placed.)</p>
    </div>
  )
}

export default Confirmation
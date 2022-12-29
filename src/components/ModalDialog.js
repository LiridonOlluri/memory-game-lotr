import React from 'react'
import './ModalDialog.css';

function ModalDialog() {
  return (

  <div>
    <h2>Alert Messages</h2>

    <p>YOUR WIN</p>
    <div class="alert">
      <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
      <button><strong>Click here for New Game</strong> </button>
    </div>
  </div>

  )
}

export default ModalDialog
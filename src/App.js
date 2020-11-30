import React, { useState } from 'react'

import './App.css'

const App = (props) => {
  const [meetingNumber, setMeetingNumber] = useState('')
  const [passWord, setPassWord] = useState('')

  return (
    <div className="App">
      <div style={{ width: '40%', height: "40%" }} className="m-2 p-2">
        <div className="form-group">
          <label for="meeting_number">Meeting Number</label>
          <input
            type="text"
            className="form-control"
            id="meeting_number"
            value={meetingNumber}
            onChange={(e) => setMeetingNumber(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label for="password">Password</label>
          <input
            type="text"
            className="form-control"
            id="password"
            value={passWord}
            onChange={(e) => setPassWord(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary"
          onClick={() => {
            window.open(`/zoom-meeting?meetingNumber=${meetingNumber}&passWord=${passWord}`, "Zoom Meeting", "esizable=yes,top=50,left=300,width=800,height=500");
          }}
        >
          Send Link
          </button>
      </div>
    </div>
  )
}

export default App


import React from 'react'

const Text = ({addAnswers}) => {
  return (
     <input className="form-control" onChange={(e)=>addAnswers(e.target.value)}/>
  )
}

export default Text

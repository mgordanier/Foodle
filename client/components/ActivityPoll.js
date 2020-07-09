import React from 'react'
import activity from '../pollOptions/activity'

const ActivityPoll = (props) => {
  const {handleChange, handleSubmit, options} = props
  const typeNames = Object.keys(activity)
  let selectedType = activity[typeNames[0]]
  let subtypes = activity[selectedType]

  return (
    <div>
      <div className="tabs is-toggle">
        <ul>
          {typeNames.map((typeName) => {
            return (
              <li
                key="type"
                onClick={(event) => {
                  event.target.classList.add('is-active')
                }}
              >
                <a>{typeName}</a>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

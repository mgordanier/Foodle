import React, {useState, useRef} from 'react'
import ExpandMore from './ExpandMore'

export default function UserDashboardAccordion(props) {
  const [setActive, setActiveState] = useState('')
  const [setHeight, setHeightState] = useState('0px')

  //useRef gives us a means of storing mutable values throughout a component’s lifecycle
  //Refs provide a way to access DOM nodes or React elements created in the render method
  const content = useRef(null)

  function toggleAccordion() {
    setActiveState(setActive === '' ? 'active' : '')
    setHeightState(
      setActive === 'active' ? '0px' : `${content.current.scrollHeight}px`
    )
  }
  return (
    <div className="accordion_section">
      <button
        className={`accordion${setActive}`}
        onClick={toggleAccordion}
        variant="contained"
        size="small"
      >
        <p className="accordion_title">{props.title}</p>
        <ExpandMore width={12} fill="#666" />
      </button>
      <div
        ref={content}
        style={{maxHeight: `${setHeight}`}}
        className="accordion_content"
      >
        <div
          className="accordion_text"
          dangerouslySetInnerHTML={{__html: props.content}}
        />
      </div>
    </div>
  )
}

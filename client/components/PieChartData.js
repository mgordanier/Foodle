import React, {useState, useEffect} from 'react'
import * as d3 from 'd3'

import {Pie} from './index'
import {tallyVotes} from '../pollOptions/pollUtils'

export default function PieChartData(props) {
  //if poll is not defined, does not render piechart
  if (!props.polls || (props.polls && !props.polls.length)) {
    return null
  }

  let pollResponsesArr = []
  const suggestionPoll = props.polls.find((poll) => poll.name === 'suggestions')
  const responses = suggestionPoll.responses

  for (let i = 0; i < responses.length; i++) {
    let obj = {}
    let selections = responses[i].selections
    selections = selections.map((selection) => selection.name)
    obj.selections = selections
    pollResponsesArr.push(obj)
  }

  const data = tallyVotes(pollResponsesArr)

  return (
    <div className="">
      <div>
        <h2 className="is-size-4 has-text-weight-semibold">Current Results</h2>
        <Pie
          data={data}
          width={600}
          height={600}
          innerRadius={30}
          outerRadius={225}
        />
      </div>
    </div>
  )
}

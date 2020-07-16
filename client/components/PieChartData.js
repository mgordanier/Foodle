import React from 'react'
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
  const margin = {
    top: 20,
    right: 20,
    bottom: 30,
    left: 40,
  }

  //responsive pie chart
  const default_width = 700 - margin.left - margin.right
  const default_height = 500 - margin.top - margin.bottom
  const default_ratio = default_width / default_height

  const current_width = window.innerWidth
  const current_height = window.innerHeight
  const current_ratio = current_width / current_height
  let h
  let w
  if (current_ratio > default_ratio) {
    h = default_height
    w = default_width
  } else {
    margin.left = 20
    w = current_width
    h = w / default_ratio
  }

  const width = w - 50 - margin.right
  const height = h - margin.top - margin.bottom

  // set_size();

  // if (width < 500) {
  //   svg.append("g")
  //        .attr("transform", "translate(0," + height + ")")
  //        .call(d3.axisBottom(x).ticks(5));
  // } else {
  //       svg.append("g")
  //           .attr("transform", "translate(0," + height + ")")
  //           .call(d3.axisBottom(x));
  // }

  return (
    <div className="">
      <div>
        <article className="message is-primary">
          <div className="message-header is-centered">
            <p>Current Results: </p>
          </div>
          <div className="message-body">
            <Pie
              data={data}
              width={900}
              height={500}
              innerRadius={75}
              outerRadius={225}
            />
          </div>
        </article>

        {/* <h1 className="title">Current Results: </h1>
        <Pie
          data={data}
          width={1000}
          height={300}
          innerRadius={75}
          outerRadius={225}
        /> */}
      </div>
    </div>
  )
}

import React, {useState, useEffect} from 'react'
import * as d3 from 'd3'
import {Pie} from './index'
// import {fetchPollResults} from '../store/poll'
import {connect} from 'react-redux'

function PieChartData(props) {
  // const generateData = () => {
  // let responseArray = []
  // let responseObj = {}

  // get selected poll
  // map selected poll to props
  // extract results
  // helper function to turn results into this:
  // return [
  //   {type: 'korean', value: 2},
  //   {type: 'mexican', value: 1},
  // ]

  const data = [
    {type: 'korean', value: 2},
    {type: 'mexican', value: 1},
  ]

  // useEffect(() => {
  //   props.fetchPollResults()
  // }, [])
  // }
  return (
    <div className="container">
      <div>
        <h1 className="title">Current Results: </h1>
        <Pie
          data={data}
          width={600}
          height={600}
          innerRadius={50}
          outerRadius={250}
        />
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    responses: state.poll.pollResponses,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // fetchPollResults: () => dispatch(fetchPollResults()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PieChartData)

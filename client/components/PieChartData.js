import React, {useState, useEffect} from 'react'
import * as d3 from 'd3'
import {Pie} from './index'
import {fetchPollResults} from '../store/poll'
import {connect} from 'react-redux'

function PieChartData(props) {
  const generateData = () => {
    let responseArray = []
    let responseObj = {}
    if (props.responses) {
      let selections = props.responses.map(response => response.selections)
      const array = []
      for (let i = 0; i < selections.length; i++) {
        array.push(...selections[i])
      }
      for (let i = 0; i < array.length; i++) {
        if (responseObj[array[i]]) {
          responseObj[array[i]] += 1
        } else {
          responseObj[array[i]] = 1
        }
      }

      for (let key in responseObj) {
        let restaurantObj = {}
        restaurantObj.type = key
        restaurantObj.value = responseObj[key]
        responseArray.push(restaurantObj)
      }
      return responseArray
    }
  }

  // return [
  //   {type: 'korean', value: 2},
  //   {type: 'mexican', value: 1},
  // ]

  const data = generateData()

  useEffect(() => {
    props.fetchPollResults()
  }, [])

  return (
    <div className="Piechart">
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

const mapStateToProps = state => {
  return {
    responses: state.poll.pollResponses
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchPollResults: () => dispatch(fetchPollResults())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PieChartData)

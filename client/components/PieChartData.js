import React, {useState} from 'react'
import * as d3 from 'd3'
import {Pie} from './index'

export function PieChartData() {
  const generateData = () => {
    return [
      {type: 'korean', value: 2},
      {type: 'mexican', value: 1},
      {type: 'japanese', value: 5},
      {type: 'american', value: 1},
      {type: 'chinese', value: 1},
    ]
  }

  const [data, setData] = useState(generateData())

  const changeData = () => {
    setData(generateData())
  }

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

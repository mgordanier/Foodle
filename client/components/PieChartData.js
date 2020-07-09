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

  // PIE 2 LOCATION
  // const generateLocation = () => {
  //   return [
  //     {type: 'Brookyln',  value:'NYC'},
  //     {type: 'Soho', value: 'NYC'},
  //     {type: 'East Village', value: 'NYC'}
  //   ]
  // }

  const [data, setData] = useState(generateData())
  // const [location, setLocation] = useState(generateLocation())

  const changeData = () => {
    setData(generateData())
    // setLocation(generateLocation())
  }

  return (
    <div className="Piechart">
      {/* <div>
        <button onClick={changeData}>Transform</button>
      </div> */}
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

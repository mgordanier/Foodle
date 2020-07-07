import React, {useState} from 'react'
import * as d3 from 'd3'
import {Pie} from './index'

export function PieChartData() {
  //generates random data for piechart - will change with our data
  const generateData = () => {
    // return d3.range(length).map((item, index) => ({
    //   date: index,
    //   value:
    //     value === null || value === undefined ? Math.random() * 100 : value,
    // }))
    return [
      {type: 'korean', value: 2},
      {type: 'mexican', value: 1},
      {type: 'japanese', value: 5},
      {type: 'american', value: 1},
      {type: 'chinese', value: 1}
    ]
  }

  const generateTime = () => {
    return [{date: 'Saturday', value: '12PM'}, {date: 'Sunday', value: '1PM'}]
  }

  //current state value & function that lets you update it
  //similar to this.state, this.setState
  //inside useState(initialState)
  const [data, setData] = useState(generateData())
  const [time, setTime] = useState(generateTime())
  // const [data, setData] = useState(results)

  //on button click, runs changedata where it changes value of data through setdata function
  const changeData = () => {
    setData(generateData())
    setTime(generateTime())
  }

  return (
    <div className="Piechart">
      <div>
        <button onClick={changeData}>Transform</button>
      </div>
      <div>
        <span className="label">Hooks</span>
        <Pie
          data={data}
          time={time}
          width={1000}
          height={1000}
          innerRadius={50}
          outerRadius={250}
        />
      </div>
    </div>
  )
}

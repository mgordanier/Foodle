import React from 'react'
import * as d3 from 'd3'
import {Pie} from './index'

export function PieChartData() {
  const generateData = (value, length = 5) => {
    d3.range(length).map((item, index) => ({
      date: index,
      value: value === null || value === undefined ? Math.random() * 100 : value
    }))
  }

  const [data, setData] = useState(generateData())
  const changeData = () => {
    setData(generateData())
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
          width={200}
          height={200}
          innerRadius={60}
          outerRadius={100}
        />
      </div>
    </div>
  )
}

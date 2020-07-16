import React from 'react'
import location from '../pollOptions/location'

export default CountyArray = () => {
  const allCountyObj = Object.values(location)[0].county
  const bronxArray = Object.values(allCountyObj.bronx.neighborhood)
  const brooklynArray = Object.values(allCountyObj.kings.neighborhood)
  const manhattanArray = Object.values(allCountyObj['new+york'].neighborhood)
  const queensArray = Object.values(allCountyObj.queens.neighborhood)
  const statenIslandArray = Object.values(allCountyObj.richmond.neighborhood)
  console.log('manhattanArray', manhattanArray)

  return (
    <div>
      {manhattanArray.map((n) => (
        <label key={n.searchStr}>
          {n.displayName}
          <input
            type="checkbox"
            name={n.displayName}
            checked={this.state.neighborhood.get(n.displayName)}
            onChange={this.handleLocationCheckboxChange}
          />
        </label>
      ))}
    </div>
  )
}

// "npm run location" will run this file, which processes JSON output
// from the Zillow neighborhoods API into a simplified locations object
// and writes the result in client/pollOptions/location.js

const fs = require('fs')
const path = require('path')
const zillowNeighborhoodsJSON = require('./zillow-neighborhoods.json')

//HELPER FUNCTIONS

//convert county to borough for nyc
const boroughFrom = county => {
  switch (county) {
    case 'Kings':
      return 'Brooklyn'
    case 'Queens':
      return 'Queens'
    case 'New York':
      return 'Manhattan'
    case 'Bronx':
      return 'Bronx'
    case 'Richmond':
      return 'Staten Island'
    default:
      return county
  }
}

// convert name string from Zillow API to format compatible with Google Places API search-by-text
const searchStr = string => {
  return string
    .toLowerCase()
    .split(' ')
    .join('+')
}

// create new object in desired format using info from Zillow API output object
const buildLocationObj = neighborhoods => {
  const location = {}

  neighborhoods.forEach(hood => {
    const {name, regionid, county, city} = hood.fields
    const countyKey = searchStr(county)
    const cityKey = searchStr(city)
    const hoodKey = searchStr(name)

    if (!location[cityKey]) {
      location[cityKey] = {
        displayName: city,
        searchStr: cityKey,
        county: {}
      }
    }
    if (!location[cityKey].county[countyKey]) {
      location[cityKey].county[countyKey] = {
        displayName: boroughFrom(county),
        searchStr: searchStr(boroughFrom(county)),
        neighborhood: {}
      }
    }
    location[cityKey].county[countyKey].neighborhood[hoodKey] = {
      displayName: name,
      searchStr: searchStr(name),
      geoId: regionid
    }
  })
  return location
}

function generateLocationFile() {
  const filepath = path.join(
    __dirname,
    '..',
    '..',
    'client',
    'pollOptions',
    'location.js'
  )
  const location = buildLocationObj(zillowNeighborhoodsJSON)

  fs.writeFile(filepath, JSON.stringify(location), err => {
    if (err) throw err
    console.log('location file saved!')
  })
}

generateLocationFile()

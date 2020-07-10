import activity from './activity'
import location from './location'

// filter activity object based on contents of a selections array
// selectionsArr contains the search strings (keys) of selected activity sub-types in the activity object
export const activityFilter = selectionsArr => {
  // TBD
}

// filter location object based on contents of a selections array
// selectionsArr contains the search strings (keys) of selected neighborhoods in the location object
export const locationFilter = selectionsArr => {
  // TBD
}

// returns a flattened version of the activity object
// where the search string (key) of each activity sub-type is accessible as N object key
// and each activity sub-type contains a value indicating its type
export const activityFlattener = () => {
  const flatActivity = {}
  Object.keys(activity).forEach(type => {
    Object.keys(activity[type]).forEach(subtype => {
      flatActivity[subtype] = activity[type][subtype]
      flatActivity[subtype].type = type
    })
  })
  return flatActivity
}

// returns a flattened version of the location object
// where the search string (key) of each neighborhood is accessible as an object key
// and each neighborhood object contains keys for its borough and city
export const locationFlattener = () => {
  const flatLocation = {}
  Object.keys(location).forEach(city => {
    const cityObj = {
      displayName: location[city].displayName,
      searchStr: location[city].searchStr
    }
    Object.keys(location[city].county).forEach(county => {
      const countyObj = {
        displayName: location[city].county[county].displayName,
        searchStr: location[city].county[county].searchStr
      }
      Object.keys(location[city].county[county].neighborhood).forEach(
        neighborhood => {
          const neighborhoodObj =
            location[city].county[county].neighborhood[neighborhood]
          neighborhoodObj.city = cityObj
          neighborhoodObj.borough = countyObj

          flatLocation[neighborhood] = neighborhoodObj
        }
      )
    })
  })
  return flatLocation
}

import activity from './activity'
import location from './location'

// filter activity object based on contents of a selections array
// selectionsArr contains the search strings (keys) of selected activity sub-types in the activity object
export const activityFilter = (selectionsArr) => {
  // TBD
}

// filter location object based on contents of a selections array
// selectionsArr contains the search strings (keys) of selected neighborhoods in the location object
export const locationFilter = (selectionsArr) => {
  // TBD
}

// returns a flattened version of the activity object
// where the search string (key) of each activity sub-type is accessible as N object key
// and each activity sub-type contains a value indicating its type
const activityFlattener = () => {
  const flatActivity = {}
  Object.keys(activity).forEach((type) => {
    Object.keys(activity[type]).forEach((subtype) => {
      flatActivity[subtype] = activity[type][subtype]
      flatActivity[subtype].type = type
    })
  })
  return flatActivity
}
export const flatActivity = activityFlattener()

// returns a flattened version of the location object
// where the search string (key) of each neighborhood is accessible as an object key
// and each neighborhood object contains keys for its borough and city
const locationFlattener = () => {
  const flatLocation = {}
  Object.keys(location).forEach((city) => {
    const cityObj = {
      displayName: location[city].displayName,
      searchStr: location[city].searchStr,
    }
    Object.keys(location[city].county).forEach((county) => {
      const countyObj = {
        displayName: location[city].county[county].displayName,
        searchStr: location[city].county[county].searchStr,
      }
      Object.keys(location[city].county[county].neighborhood).forEach(
        (neighborhood) => {
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
export const flatLocation = locationFlattener()

// convert poll results into votes array with objects key = name, value = number of votes
// INPUT pollResponsesArr: [{selections:['french', 'thai']}, {selections:['korean']}, {selections:['korean', 'french', 'thai']}]
// OUTPUT votes: [{type:french, value: 2}]
export const tallyVotes = (pollResponsesArr) => {
  let votes = []
  let voteObj = {}
  let selections = pollResponsesArr.map((response) => response.selections)
  const array = []
  for (let i = 0; i < selections.length; i++) {
    array.push(...selections[i])
  }
  for (let i = 0; i < array.length; i++) {
    if (voteObj[array[i]]) {
      voteObj[array[i]] += 1
    } else {
      voteObj[array[i]] = 1
    }
  }
  for (let key in voteObj) {
    let restaurantObj = {}
    restaurantObj.type = key
    restaurantObj.value = voteObj[key]
    votes.push(restaurantObj)
  }
  return votes
}

// takes votes object and determines what distribution of suggestions to return
// find the highest vote value and return the type
// if there is a tie, doesn't matter, just return a random one
// INPUT votes: const votes = [{type:'french', value: 2}, {type:'korean', value: 3}, {type:'thai', value: 1}]
// OUTPUT most votes: 'korean'
export const selectMostVoted = (votes) => {
  let mostVotes = 0
  votes.forEach((voteObj) => {
    if (voteObj.value > mostVotes) mostVotes = voteObj.value
  })
  votes = votes.filter((voteObj) => voteObj.value === mostVotes)
  const randomIdx = Math.floor(Math.random() * votes.length)
  return votes[randomIdx].type
}

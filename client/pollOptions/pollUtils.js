import activity from './activity'
import location from './location'

// selectionsArr contains stings indicating the path to selected activities in the activity object
export const activityFilter = (selectionsArr) => {
  selectionsArr.reduce((acc, selection) => {
    selection.split('.')
  }, {})
  Object.keys(activity).filter((type) => selectionsArr.includes(type))
}

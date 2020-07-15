// import React from 'react'
// import {fetchOneEvent} from '../store/events'
// import {connect} from 'react-redux'
// import Select from 'react-select'
// import makeAnimated from 'react-select/animated'

// class LocationPoll extends React.Component {
//   constructor() {
//     super()
//     this.state = {
//       selections: [],
//     }
//   }
//   componentDidMount() {
//     this.props.fetchOneEvent(this.props.event.urlKey)
//   }

//   handleChange = (e) => {
//     const values = e.map((item) => item.value)
//     this.setState(
//       {
//         selections: values,
//       },
//       () => {
//         if (this.props.onChange) {
//           this.props.onChange(this.state)
//         }
//       }
//     )
//   }

//   handleSubmit = (e) => {
//     // save the poll response
//   }

//   render() {
//     // const {handleChange, handleSubmit, options} = props
//     // const typeNames = Object.keys(activity)
//     // let selectedType = activity[typeNames[0]]
//     // let subtypes = activity[selectedType]

//     console.log('selections', this.state.selections)
//     console.log('this.props.event', this.props.event)
//     const {neighborhood} = this.props.event
//     const animatedComponents = makeAnimated()
//     let re = /{"|",/
//     const neighborhoodArray = neighborhood.split(re)
//     console.log('neighborhoodArray', neighborhoodArray)

//     const options = []
//     neighborhood.map((item) => {
//       let obj = {
//         value: item,
//         label: item,
//       }
//       options.push(obj)
//     })
//     console.log('options', options)

//     return (
//       <Select
//         name="selections"
//         closeMenuOnSelect={false}
//         components={animatedComponents}
//         defaultValue={[options[0]]}
//         isMulti
//         options={options}
//         onChange={this.handleChange}
//       />
//     )
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     event: state.events.event,
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     fetchOneEvent: (urlKey) => dispatch(fetchOneEvent(urlKey)),
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(LocationPoll)

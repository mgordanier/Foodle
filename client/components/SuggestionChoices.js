import React, {Component} from 'react'
import {ChoiceModal} from './ChoiceModal'

export class SuggestionChoices extends Component {
  constructor() {
    super()
    this.state = {
      modalState: false,
    }
    this.toggleModal = this.toggleModal.bind(this)
  }

  toggleModal() {
    this.setState((prev) => {
      const newState = !prev.modalState
      return {modalState: newState}
    })
  }

  render() {
    const {restaurant, handleCheckboxChange} = this.props

    return (
      <div className="card">
        <div className="card-image">
          <figure className="image is-4by3">
            <img
              src="https://comps.canstockphoto.com/coloring-cartoon-illustration-of-ramen-eps-vector_csp62947381.jpg"
              alt="Placeholder image"
              className="cursor"
              onClick={() => {
                this.toggleModal()
              }}
            />
          </figure>
        </div>
        <div className="card-content">
          <div className="media">
            {/* <div className="media-left">
              <figure className="image is-48x48">
                <img
                  src="https://bulma.io/images/placeholders/96x96.png"
                  alt="Placeholder image"
                />
              </figure>
            </div> */}
            <div className="media-content">
              <p className="title is-4">{restaurant.name}</p>
              <p className="subtitle is-6">{restaurant.vicinity}</p>
            </div>
          </div>

          <div className="content">
            {/* Description of restaurant here */}
            <p className="subtitle is-6">Rating: {restaurant.rating}</p>
            <br />
          </div>

          <ChoiceModal
            closeModal={this.toggleModal}
            modalState={this.state.modalState}
            restaurant={restaurant}
          />

          <label className="checkbox labelName">
            <input
              type="checkbox"
              name="selectedRestaurant"
              className="margin-right"
              onChange={(event) =>
                handleCheckboxChange(restaurant.place_id, event)
              }
            />
            Select To Vote
          </label>
        </div>
      </div>
    )
  }
}

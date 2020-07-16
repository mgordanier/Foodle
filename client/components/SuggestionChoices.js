// SuggestionChoices displays the information for one restaurant in a restaurant suggestions poll
// and a checkbox to select that restaurant for your response to the poll

import React, {Component} from 'react'
import {ChoiceModal} from './ChoiceModal'

export class SuggestionChoices extends Component {
  constructor() {
    super()
    this.state = {
      modalState: false,
    }
    this.toggleModal = this.toggleModal.bind(this)
    this.handleCheckBoxClick = this.handleCheckBoxClick.bind(this)
  }

  toggleModal(event) {
    event.stopPropagation()
    this.setState((prev) => {
      const newState = !prev.modalState
      return {modalState: newState}
    })
  }

  handleCheckBoxClick(restaurant, isChecked) {
    this.props.handleCheckboxChange(restaurant, isChecked)
  }

  render() {
    const {restaurant} = this.props

    // const restaurantPlace = `https://www.google.com/maps/search/?api=1&query=${restaurant.name.replace(
    //   / /g,
    //   '+'
    // )}`

    const isChecked = !!this.props.selectedRestaurants.find(
      (selectedRestaurant) => {
        return selectedRestaurant.place_id === restaurant.place_id
      }
    )

    return (
      <div className="card cursor">
        {/* <div className="card-image">
          <figure className="image is-4by3">
            <img
              src="/corgi.jpg"
              alt="Placeholder image"
              className="cursor"
              onClick={() => {
                this.toggleModal()
              }}
            />
          </figure>
        </div> */}
        <div className="card-content">
          <div className="media">
            <div className="media-content">
              <a
                href={restaurant.url}
                className="cursor has-text-link is-spaced title is-4"
                target="_blank"
                rel="noopener noreferrer"
              >
                {restaurant.name}
              </a>
              <p className="subtitle is-6">{restaurant.vicinity}</p>
            </div>

            <div className="buttons">
              <button
                type="button"
                className="button is-primary is-light is-small"
                onClick={this.toggleModal}
              >
                More details
              </button>
            </div>
          </div>

          <ChoiceModal
            closeModal={this.toggleModal}
            modalState={this.state.modalState}
            restaurant={restaurant}
          />

          <div
            className="field"
            onClick={() => {
              this.handleCheckBoxClick(restaurant, !isChecked)
            }}
          >
            <input
              className="is-checkradio is-large"
              type="checkbox"
              name="selectedRestaurant"
              checked={isChecked}
              readOnly
            />
            <label htmlFor="selectedRestaurant">Select To Vote</label>
          </div>
        </div>
      </div>
    )
  }
}

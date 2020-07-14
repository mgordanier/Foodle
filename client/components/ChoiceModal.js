import React from 'react'

export const ChoiceModal = (props) => {
  const {closeModal, modalState, restaurant} = props
  // console.log('oneRestaurant', oneRestaurant)

  if (!modalState || !restaurant) {
    return null
  }

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={closeModal} />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{restaurant.name}</p>
          <button
            type="button"
            className="delete"
            aria-label="close"
            onClick={closeModal}
          />
        </header>

        <button type="button" className="button is-danger is-light">
          <a href={restaurant.url}>Google Maps</a>
        </button>

        <section className="modal-card-body">
          <h3>Price Level: {restaurant.price_level}</h3>
          <p>{restaurant.formatted_phone_number}</p>
          <p>
            <a href={restaurant.website}>{restaurant.website}</a>
          </p>
        </section>
        <footer className="modal-card-foot">
          <div>
            <button type="button" className="button" onClick={closeModal}>
              Close
            </button>
          </div>
        </footer>
      </div>
    </div>
  )
}

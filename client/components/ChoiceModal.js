import React from 'react'

export const ChoiceModal = (props) => {
  const {closeModal, modalState, restaurant} = props

  if (!modalState || !restaurant) {
    return null
  }

  let priceNumber = restaurant.price_level
  let priceLevel = '$'.repeat(priceNumber)

  return (
    <div className="modal is-active">
      <div className="modal-background" />
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
          <h1>{priceLevel}</h1>
          {restaurant.rating && <p>Rating: {restaurant.rating}</p>}
          <p>{restaurant.formatted_phone_number}</p>
          <p>{restaurant.vicinity}</p>

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

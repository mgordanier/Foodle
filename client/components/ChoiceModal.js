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

        <a
          href={restaurant.url}
          target="_blank"
          rel="noopener noreferrer "
          className="button is-primary is-light is-fullwidth"
        >
          Open in Google Maps
        </a>

        <section className="modal-card-body">
          <h1>{priceLevel}</h1>
          {restaurant.rating && <p>Rating: {restaurant.rating}</p>}
          <p>{restaurant.formatted_phone_number}</p>
          <p>{restaurant.vicinity}</p>

          <p>
            <a
              href={restaurant.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              {restaurant.website}
            </a>
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

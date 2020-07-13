import React from 'react'

export const ChoiceModal = (props) => {
  const {closeModal, modalState, oneRestaurant} = props
  // console.log('oneRestaurant', oneRestaurant)

  if (!modalState || !oneRestaurant.result) {
    return null
  }

  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={closeModal} />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{oneRestaurant.result.name}</p>
          <button className="delete" aria-label="close" onClick={closeModal} />
        </header>

        <button className="button is-danger is-light">
          <a href={oneRestaurant.result.url}>Google Maps</a>
        </button>

        <section className="modal-card-body">
          <h3>Price Level: {oneRestaurant.result.price_level}</h3>
          <p>{oneRestaurant.result.formatted_phone_number}</p>
          <p>
            <a href={oneRestaurant.result.website}>
              {oneRestaurant.result.website}
            </a>
          </p>
        </section>
        <footer className="modal-card-foot">
          <div>
            <button className="button" onClick={closeModal}>
              Close
            </button>
          </div>
        </footer>
      </div>
    </div>
  )
}

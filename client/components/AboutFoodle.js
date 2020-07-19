import React from 'react'

export const AboutFoodle = () => {
  return (
    <div className="has-background-primary border">
      <div className="container columns is-centered has-background-primary">
        <div className="column is-half is-mobile">
          <div className="column">
            <h1 className="title is-1 has-text-centered aboutpadding">
              About Us
            </h1>
            <h2 className="subtitle has-text-weight-bold has-text-centered">
              Foodle was inspired by indecisiveness
            </h2>

            <div>
              <p>
                Choosing a place to eat with friends doesn't have to be
                difficult. It's as simple as creating an event with your
                location and food preference in mind, sharing that link with
                your loved ones, and voting on a randomly generated restaurant
                poll.
              </p>
            </div>

            <div className="aboutparagraph">
              <p>
                Once the voting begins, a piechart is rendered realtime to
                visually display your groups votes and preferences anonymously.
              </p>
            </div>

            <div className="aboutparagraph has-text-weight-semibold has-text-centered aboutparagraph ">
              <p>
                Special thanks to{' '}
                <a href="https://looka.com/onboarding">Looka</a> for our
                beautiful logo!
              </p>
            </div>

            <div className="aboutmargin">
              <h2 className="title is-2 has-text-centered">Meet the Team</h2>
            </div>
            <div className="aboutparagraph">
              <p className="">
                Please don't hesitate to reach out to any of the creators! We
                would love to answer any questions that you may have.
              </p>
            </div>
            <div className="linkedinlogo">
              <div className="aboutparagraph padding-bottom">
                <p>
                  <img src="/linkedin.png" className="linkedin" />
                  <a href="https://www.linkedin.com/in/mary-gordanier/">
                    Mary Gordanier
                  </a>
                </p>
                <p>
                  <img src="/linkedin.png" className="linkedin" />
                  <a href="https://www.linkedin.com/in/lillyoh/">Lilly Oh</a>
                </p>
                <p>
                  <img src="/linkedin.png" className="linkedin" />
                  <a href="https://www.linkedin.com/in/yang-gu-6398206a/">
                    Yang Gu
                  </a>
                </p>
                <p>
                  <img src="/linkedin.png" className="linkedin" />
                  <a href="https://www.linkedin.com/in/yang-jennifer/">
                    Jennifer Yang
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import React, {Component} from 'react'

export default class InputPollForm extends Component {
  // const [form, setForm] = useState("")
  // const handleSubmit = (event) => {
  //   event.preventDefault()
  // }

  // componentDidMount() {
  //   const calendars = bulmaCalendar.attach('[type="date"]', options);
  //   calendars.forEach(calendar => {
  //     calendar.on('date:selected', date => {
  //       console.log(date);
  //     });
  //   });

  //   const element = document.querySelector('#my-element');
  //   if (element) {
  //     element.bulmaCalendar.on('select', datepicker => {
  //       console.log(datepicker.data.value());
  //     });
  //   }
  // }

  render() {
    return (
      <section className="section">
        <div className="hero-body">
          <div className="columns is-centered">
            <div className="column is-half">
              {/* <div className="field">
          <label className="label">Event Name </label>
          <div className="control">
            <input className="input" type="text" placeholder="Text input"/>
          </div>
        </div> */}

              <div className="field">
                <label className="label">Participant's Name</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Text input"
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Location</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="New York City"
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Food Preferences</label>
                <div className="control">
                  <div className="select">
                    <select>
                      <option>Select dropdown</option>
                      <option>African</option>
                      <option>American</option>
                      <option>Asian</option>
                      <option>Caribbean</option>
                      <option>Chinese</option>
                      <option>Greek</option>
                      <option>Mexican</option>
                      <option>Indian</option>
                      <option>Indonesian</option>
                      <option>Italian</option>
                      <option>Japanese</option>
                      <option>Jamaican</option>
                      <option>Korean</option>
                      <option>Laotian</option>
                      <option>Lebanese</option>
                      <option>Malaysian</option>
                      <option>Taiwanese</option>
                      <option>Thai</option>
                      <option>Turkish</option>
                      <option>Portuguese</option>
                      <option>Vietnamese</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="field">
                <label className="label">Date & Time</label>
                <input
                  type="date"
                  data-display-mode="inline"
                  data-is-range="true"
                  data-close-on-select="false"
                />
              </div>

              <div className="field">
                <label className="label">Date & Time</label>
                <input
                  type="time"
                  data-display-mode="inline"
                  data-is-range="true"
                  data-close-on-select="false"
                />
              </div>

              <div className="field">
                <label className="label">Message</label>
                <div className="control">
                  <textarea className="textarea" placeholder="Textarea" />
                </div>
              </div>

              <div className="field">
                <div className="control">
                  <label className="radio">
                    <input type="radio" name="question" />
                    Yes
                  </label>
                  <label className="radio">
                    <input type="radio" name="question" />
                    No
                  </label>
                </div>
              </div>

              <div className="field is-grouped">
                <div className="control">
                  <button className="button is-primary">Submit</button>
                </div>
                <div className="control">
                  <button className="button is-link is-light">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

import React, { Component } from 'react';

class Telehandler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 0,
      formData: {},
    };
  }

  questions = [
    {
      page: 'Page 1',
      questions: [
        'Paint',
		'Sheet Metal (Fiberglass) Condition',
        'Steps/Ladder',
        'Hand Rails',
        'Exterior Lights',
      ],
    },
    {
      page: 'Page 2',
      questions: [
        'Travel Alarm',
        'Horn',
        'Seat Belt',
        'Current Safety Manual',
        'Current Operator/Maintenance Manual',
      ],
    },
    {
      page: 'Page 3',
      questions: [
        'Seats/Armrests',
		'Mirrors',
        'Hydraulic Controls',
		'Steering Controls',
        'Drivetrain Controls',
        'Transmission Disconnect Control',
        'Load Charts',
		'Engine Oil Pressure',
        'Warning Lights',
		'Gauges',
        'Hour Meter/Odometer',
		'Limited Function Check (Control Station)',
      ],
    },
	{
      page: 'Page 4',
      questions: [
	  'Emissions Label',
	  'Blow-By (Subjecrive Observation)',
	  'Starter', 
	  'Exhaust System', 
	  'Radiator', 
	  'Oil Leaks', 
	  'Fuel Leaks', 
	  'Cooling System Leaks', 
	  'Engine - Left Side', 
	  'Engine - Right Side', 
	  'DEF/AdBlue Tank',
	  'Limited Function Check (Engine)',
      ],
    },
	{
      page: 'Page 5',
      questions: [
	  'Transmission', 
	  'Transfer Case/Drop Box', 
	  'Front Drive Axle', 
	  'Front Axle Oscillating Pin',
	  'Rear Drive Axle',
	  'Rear Axle Oscillating Pin',
	  'Final Drivers',
	  'Limited Function Check (Engine)',
      ],
    },
	{
      page: 'Page 6',
      questions: [
	  'Pump (Hydraulics)', 
	  'Valves', 
	  'Hydraulic Tank',  
	  'Hose(Hydraulics)', 
	  'Auxilliary Hydraulic Plumbing', 
	  'Boom Lift Cylinder(s)',  
	  'Telescope Boom Cylinders',
	  'Carriage Tilt Cylinders',
	  'Frame Leveling Cylinder',
	  'Steering Cylinders',
	  'Limited Function Check (Hydraulics)',
      ],
    },
	{
      page: 'Page 7',
      questions: [
	  'Boom Condition', 
	  'Left Side Boom', 
	  'Right Side Boom', 
	  'Chain/Tensioners', 
	  'Boom Wear Guides', 
	  'Steering Linkage', 
	  'Frame Condition',
	  'Limited Function Check (Chassis)',
	  'Master Cylinder',
	  'Brake Control',
	  'Brake Lines/Hoses',
	  'Park Brake',
	  'Limited Function Check (Brakes)',
	  'Tire Brands',
	  'Left Front Tire',
	  'Left Rear Tire',
	  'Right Rear Tire',
	  'Right Front Tire',
	  'Wheel Condition',
	  'Wheel Studs, Nuts, Lugs',
      ],
    },
	{
      page: 'Page 8',
      questions: [
	  'Loader Quick Coupler', 
	  'Load Back Rest', 
	  'Fork', 
      ],
    },
	
    // Add more pages and questions here...
  ];

  // Function to handle next step
  nextStep = () => {
    this.setState({ currentStep: this.state.currentStep + 1 });
  };

  // Function to handle previous step
  prevStep = () => {
    this.setState({ currentStep: this.state.currentStep - 1 });
  };

  // Function to handle radio button selection
  handleOptionChange = (question, option) => {
    const { formData, currentStep } = this.state;
    const updatedFormData = { ...formData };
    updatedFormData[question] = option;

    // If "N/A" is selected, show the input text box
    if (option === 'N/A') {
      updatedFormData[`${question}_comment`] = '';
    } else {
      delete updatedFormData[`${question}_comment`];
    }

    this.setState({ formData: updatedFormData });
  };

  // Function to handle input text change
  handleInputChange = (question, event) => {
    const { formData } = this.state;
    const updatedFormData = { ...formData };
    updatedFormData[`${question}_comment`] = event.target.value;
    this.setState({ formData: updatedFormData });
  };

  // Function to handle picture upload
  handlePictureUpload = (question) => {
    // Implement picture upload logic here
    console.log(`Upload a picture for ${question}`);
  };

  // Function to render the current step
  renderStep = () => {
    const { currentStep, formData } = this.state;
    const currentQuestions = this.questions[currentStep];

    return (
      <div>
        <h2>{currentQuestions.page}</h2>
        <ul>
          {currentQuestions.questions.map((question) => (
            <li key={question}>
              <p>{question}</p>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name={question}
                    value="Good"
                    checked={formData[question] === 'Good'}
                    onChange={() => this.handleOptionChange(question, 'Good')}
                  />
                  Good
                </label>
                <label>
                  <input
                    type="radio"
                    name={question}
                    value="Issues"
                    checked={formData[question] === 'Issues'}
                    onChange={() => this.handleOptionChange(question, 'Issues')}
                  />
                  Issues
                </label>
                <label>
                  <input
                    type="radio"
                    name={question}
                    value="N/A"
                    checked={formData[question] === 'N/A'}
                    onChange={() => this.handleOptionChange(question, 'N/A')}
                  />
                  N/A
                </label>
              </div>
              {formData[question] === 'N/A' && (
                <div>
                  <p>Comments:</p>
                  <textarea
                    value={formData[`${question}_comment`] || ''}
                    onChange={(event) => this.handleInputChange(question, event)}
                  />
                </div>
              )}
              <button onClick={() => this.handlePictureUpload(question)}>
                Upload Picture
              </button>
            </li>
          ))}
        </ul>
        {currentStep > 0 && (
          <button onClick={this.prevStep}>Previous</button>
        )}
        {currentStep < this.questions.length - 1 && (
          <button onClick={this.nextStep}>Next</button>
        )}
        {currentStep === this.questions.length - 1 && (
          <button onClick={this.handleSubmit}>Submit</button>
        )}
      </div>
    );
  };

  // Function to handle form submission
  handleSubmit = () => {
    // Process the final form data here
    console.log('Final Form Data:', this.state.formData);
    // You can submit the data to a server or perform any necessary actions.
  };

  render() {
    return <div>{this.renderStep()}</div>;
  }
}

export default Telehandler;

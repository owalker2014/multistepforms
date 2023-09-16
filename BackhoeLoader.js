import React, { Component } from 'react';

class BackhoeLoader extends Component {
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
        'Sheet Metal (Fiberglass) Condition',
        'Paint',
        'Glass',
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
        'Safety Lock Out/Stop',
        'Current Safety Manual',
        'Current Operator/Maintenance Manual',
      ],
    },
    {
      page: 'Page 3',
      questions: [
        'Mirrors',
        'Seats/Armrests',
        'Hydraulic Controls',
        'Backhoe Control Configuration',
        'Drivetrain Controls',
        'Dash Console',
        'Engine Oil Pressure',
        'Warning Lights',
        'Gauges',
        'Hour Meter',
        'Indication of Additional Hours',
		'Heater',
      ],
    },
	{
      page: 'Page 4',
      questions: [
	  'Blow-By (Subjective Observation)', 
	  'Starter', 
	  'Exhaust System', 
	  'Radiator', 
	  'Oil Leaks', 
	  'Fuel Leaks', 
	  'Cooling System Leaks', 
	  'Engine - Left Side', 
	  'Engine - Right Side', 
	  'Limited Function Check',
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
	  'Final Drives', 
	  'Cooling System Leaks', 
	  'Limited Function Check',
      ],
    },
	{
      page: 'Page 6',
      questions: [
	  'Pump (Hydraulics)', 
	  'Valves', 
	  'Hydraulic Tank', 
	  'Hoses (Hydraulics)', 
	  'Loader Lift Cylinders', 
	  'Bucket Tilt Cylinders', 
	  'Outrigger Cylinders', 
	  'Boom Swing Cylinder(s)', 
	  'Boom Lift Cylinder(s)', 
	  'Stick Cylinder', 
	  'Bucket Cylinder', 
	  'Limited Function Check',
      ],
    },
	{
      page: 'Page 7',
      questions: [
	  'Steering Linkage', 
	  'Master Cylinder', 
	  'Park Brake', 
	  'Limited Function Check - Brakes', 
	  'Frame Condition', 
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
	  'Lift Arm Condition', 
	  'Chassis to Arm Pins', 
	  'Tilt Linkage', 
	  'Tilt Linkage Pins and Bushings', 
	  'Bucket To Arm Pins', 
	  'Limited Function Check',
      ],
    },
	{
      page: 'Page 9',
      questions: [
	  'Boom Condition', 
	  'Stick Condition', 
	  'Stick Extension Wear Guides', 
	  'Boom Lock (Backhoe)', 
	  'Swing Tower Pivot', 
	  'Boom Base Pin and Bushings', 
	  'Pin and Bushings Boom to Stick', 
	  'Pin and Bushings Stick to Bucket', 
	  'Outriggers', 
	  'Limited Function Check',
      ],
    },
	{
      page: 'Page 10',
      questions: [
	  'Loader Bucket Condition', 
	  'Loader Bucket Edge/Shanks', 
	  'Backhoe/Excavator Bucket Condition', 
	  'Backhoe/Excavator Bucket Shanks and Teeth', 
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

export default BackhoeLoader;

import React, { Component } from 'react';

class MiniExcavator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 0,
      formData: {},
    };
  }

  questions = [
    {
      page: 'General Appearance',
      questions: [
        'CE Mark',
        'Paint',
        'Glass',
        'Steps/Ladder',
        'Hand Rails',
        'Exterior Lights',
      ],
    },
    {
      page: 'Safety',
      questions: [
        'Travel Alarm',
        'Horn',
        'Seat Belt',
        'Safety Lock Out/Stop',
		'Swing Break',
        'Current Safety Manual',
        'Current Operator/Maintenance Manual',
      ],
    },
    {
      page: 'Control Station',
      questions: [
        'Seats/Armrests',
		'Mirrors',
		'Steering Controls',
        'Hydraulic Controls',
        'Auxilliary Hydraulic Control',
        'Drivetrain Controls',
        'Dash Console',
        'Engine Oil Pressure',
        'Warning Lights',
        'Gauges',
        'Hour Meter',
		'Air Conditioner',
		'Heater',
		'Limited Function Check',
      ],
    },
	{
      page: 'Engine',
      questions: [
	  'Emissions Label',
	  'A/C Compressor',
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
      page: 'Drivetrain',
      comment:'The operational test is confined to a low-speed, load-free evaluation in a flat area. Full verification of differential interlocks, transmission shifting, and drive axle functionality is not possible. The inspector checks for abnormal noises, observes leaks, and notes physical damage.',
      questions: [
	  'Left Drive Motor', 
	  'Right Drive Motor', 
	  'Left Final Drive', 
	  'Right Final Drive',
	  'Limited Function Check',
      ],
    },
	{
      page: 'Hydraulics',
      questions: [
	  'Pump (Hydraulics)', 
	  'Valves', 
	  'Hydraulic Tank', 
	  'Hydraulic Control Pattern Changer', 
	  'Hose (Hydraulics)', 
	  'Auxilliary Hydraulic Plumbing', 
	  'Swing Motor',  
	  'Hydraulic Center Swivel',
	  'Boom Swing Cylinders',
	  'Boom Lift Cylinders',
	  'Stick Cylinder',
	  'Bucket Cylinder',
	  'Thumb Cylinder',
	  'Blade Lift Cylinder',
	  'Limited Function Check',
      ],
    },
	{
      page: 'Boom Condition',
      comment: 'Inspections for pin connection pivot point wear are limited to visual and tactile assessments; dial indicator tests are not conducted.',
      questions: [
	  'Boom Condition', 
	  'Stick Condition', 
	  'Swing Tower Pivot', 
	  'Boom Base Pin and Bushings', 
	  'Pin and Bushings Boom  to Stick', 
	  'Pin and Bushings Stick to Coupler', 
	  'Turntable Beearing',
	  'Bottom Covers',
	  'Limited Function Check',
      ],
    },
	{
      page: 'Undercarriage',
      questions: [
	  'Roller Frames', 
	  'Grouse Height Measurement', 
	  'Track Belt Condition', 
	  'Rubber Belt Drive Lugs', 
	  'Track Tensioners', 
	  'Carrier Rollers',
	  'Front Idler Wear',
	  'Track Rollers',
	  'Sprockets',
      ],
    },
	{
      page: 'Specialty',
      questions: [
	  'Excavator Bucket Condition', 
	  'Teeth/Adapter', 
	  'Blade Condition', 
	  'Blade Cutting Edge Condition',
	  'Thumn',
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

export default MiniExcavator;

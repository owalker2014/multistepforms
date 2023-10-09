import React, { Component } from 'react';

class TrackExcavator extends Component {
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
        'Paint',
		    'Sheet Metal (Fiberglass) Condition',
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
        'Hydraulic Controls',
        'Drivetrain Controls',
        'Dash Console',
		    'Engine Oil Pressure',
        'Warning Lights',
		    'Gauges',
        'Hour Meter',
		    'Air Conditioner',
		    'Heater',
		    'Limited Function Check (Control Station)',
      ],
    },
	{
      page: 'Engine',
      questions: [
        'A/C Compressor',
        'Blow-By (Subjecrive Observation)',
        'Starter', 
        'Exhaust System', 
        'Radiator', 
        'Oil Leaks', 
        'Fuel Leaks', 
        'Cooling System Leaks', 
        'Engine - Left Side', 
        'Engine - Right Side', 
        'Limited Function Check (Engine)',
      ],
    },
	{
      page: 'Drivetrain',
      comment: 'The operational test is confined to low-speed assessment in a flat area without a load, preventing full verification of differential interlocks, transmission shifting, and drive axle functionality. During the test, the inspector checks for abnormal noises, observes for leaks, and records any physical damage.',
      questions: [
        'Left Drive Motor', 
        'Right Drive Motor', 
        'Left Final Drive', 
        'Right Final Drive',
        'Limited Function Check (Drivetrain)',
      ],
    },
	{
      page: 'Hydraulics',
      questions: [
        'Pump (Hydraulics)', 
        'Valves', 
        'Hydraulic Tank',  
        'Hydraulic Control Pattern Changer',
        'Hose(Hydraulics)', 
        'Hydraulic Center Swivel', 
        'Boom Lift Cylinder(s)',  
        'Stick Cylinder',
        'Bucket Cylinder',
        'Limited Function Check (Hydraulics)',
      ],
    },
	{
      page: 'Chassis',
      comment: 'Inspections for pin connection pivot point wear are restricted to observations based on sound, sight, and touch; dial indicator testing is omitted from the process.',
      questions: [
        'Boom Condition', 
        'Stick Condition', 
        'Boom Base Pin and Bushings', 
        'Pin and Bushings Boom to Stick', 
        'Pin and Bushings Stick to Bucket', 
        'Turntable Bearning', 
        'Bottom Covers',
        'Limited Function Check (Chassis)',
          ],
    },
	{
      page: 'Undercarriage',
      questions: [
        'Left Roller Frame', 
        'Left Track Tensioner', 
        'Left Track Pads', 
        'Left Grouser Height',
        'Left Track Links',
        'Left Track Bushings',
        'Left Carrier Roller',
        'Left Track Rollers',
        'Left Idler',
        'Left Sprocket',
        'Right Roller Frame',
        'Right Track Tensioner',
        'Right Track Pads',
        'Right Grouser Height',
        'Right Track Links',
        'Right Track Bushings',
        'Right Carrier Roller',
        'Right Track Rollers',
        'Right Idler',
        'Right Sprocket',
      ],
    },
	{
      page: 'Specialty',
      questions: [
        'Excavator Bucket Condition', 
        'Teeth/Adapter', 
        'Thumb', 
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

export default TrackExcavator;

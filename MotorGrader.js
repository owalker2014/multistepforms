import React, { Component } from 'react';

class MotorGrader extends Component {
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
	  'Emissions Label',
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
      questions: [
	  'Transmission', 
	  'Right Drive Axle', 
	  'Rear Tandem (Chain Drives)', 
	  'Limited Function Check (Drivetrain)',
      ],
    },
	{
      page: 'Hydraulics',
      questions: [
	  'Pump (Hydraulics)', 
	  'Valves', 
	  'Hydraulic Tank',  
	  'Hose(Hydraulics)', 
	  'Articulation Cylinder', 
	  'Hydraulic Motors',  
	  'Blade Lift Cylinders',
	  'Blade Angle Cylinders',
	  'Blade Side Shift Cylinder',
	  'Saddle Positioning Cylinders',
	  'Saddle Lock Pin',
	  'Steering Cylinders',
	  'Wheel Lean Cylinders',
	  'Limited Function Check (Hydraulics)',
      ],
    },
	{
      page: 'Chassis',
      comment: 'Pin connection pivot point wear inspections involve only visual, tactile assessments; no dial indicator tests are conducted.',
      questions: [
	  'Y-Frame', 
	  'Y-Frame Pivot Trunnion', 
	  'Blade Tilt Frame (Saddle)', 
	  'Circle Frame and Brackets', 
	  'Circle Wear Strips', 
	  'Circle Support Brackets', 
	  'Circle Gear Box',
	  'Circle Gear',
	  'Mold Board Slide Wear Strip',
	  'Articulating Center Pins',
	  'Front Axle Oscillating Pins',
	  'Steering Linkage',
	  'Wheel Tilt Linkage',
	  'Belly Pins',
	  'Limited Function Check (Grader)',
	  'Park Brake',
	  'Limited Function Check (Brakes)',
	  'Frame Condition',
	  'Tire Brands',
	  'Left Steer Tire',
	  'Left Front Drive Tires',
	  'Left Rear Drive Tires',
	  'Right Rear Drive Tires',
	  'Right Front Drive Tires',
	  'Right Steer Tire',
	  'Wheel Condition',
	  'Wheel Studs, Nuts, Lugs',
      ],
    },
	{
      page: 'Specialty',
      questions: [
	  'Blade Condition', 
	  'Blade Cutting Edge Condition', 
	  'Front Lift Group', 
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

export default MotorGrader;

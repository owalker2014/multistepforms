import React, { Component } from 'react';

class CompactTrackLoader extends Component {
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
        'Sheet Metal (Fiberglass) Condition',
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
        'Current Safety Manual',
        'Current Operator/Maintenance Manual',
      ],
    },
    {
      page: 'Control Station',
      questions: [
        'Mirrors',
        'Seats/Armrests',
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
      page: 'Drivetrain',
      Comment: 'The operational test is constrained to low speeds within a confined, flat area, and it does not involve carrying a load. Complete verification of differential interlocks, full transmission shifting, and the functionality of all drive axles is not possible during this test. The inspector primarily relies on listening for unusual sounds, observing any leaks, and documenting any physical damage.',
      questions: [
        'Drive Motors', 
        'Final Drives', 
        'Limited Function Check', 
      ],
    },
	{
      page: 'Hydraulics',
      questions: [
        'Pump (Hydraulics)', 
        'Valves', 
        'Hydraulic Tank', 
        'Hoses (Hydraulics)', 
        'Auxilliary Hydraulic Plumbing', 
        'Loader Lift Cylinders', 
        'Bucket Tilt Cylinders',  
        'Limited Function Check',
      ],
    },
	{
      page: 'Chassis',
      Comment: 'Pivot point wear inspections for pin connections are conducted through visual, auditory, and tactile observations, without the use of a dial indicator.',
      questions: [
        'Frame Condition', 
        'Belly Pans', 
        'Lift Arm Condition', 
        'Chassis to Arm Pin', 
        'Quick Coupler to Arm Pins', 
        'Limited Function Check',  
      ],
    },
	{
      page: 'Rubber Track Undercarriage',
      questions: [
        'Roller Frames', 
        'Grouse Height Measurement', 
        'Track Belt Condition', 
        'Rubber Belt Drive Lugs', 
        'Track Tensionners', 
        'Front Idler Wear',
        'Rear Idler Wear',
        'Track Rollers',
        'Sprockets',
      ],
    },
	{
      page: 'Speciality',
      questions: [
        'Quick Coupler', 
        'Loader Bucket Condition', 
        'Loader Bucket Cutting Edge/Shank/Teeth', 
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

export default CompactTrackLoader;

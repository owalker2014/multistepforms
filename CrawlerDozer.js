import React, { Component } from 'react';

class CrawlerDozer extends Component {
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
        'Crawler Dozer Control Configuration',
        'Drivetrain Controls',
        'Dash Console',
        'Engine Oil Pressure',
        'Warning Lights',
        'Gauges',
        'Hour Meter',
        'Indication of Additional Hours',
		'Air Conditioner',
		'Heater',
		'Limited Function Check',
      ],
    },
	{
      page: 'Page 4',
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
      page: 'Page 5',
      questions: [
	  'Drive Motors', 
	  'Final Drives', 
	  'Limited Function Check (Drivetrain - Track)', 
      ],
    },
	{
      page: 'Page 6',
      questions: [
	  'Pump (Hydraulics)', 
	  'Valves', 
	  'Hydraulic Tank', 
	  'Hoses (Hydraulics)', 
	  'Blade Lift Cylinder', 
	  'Blade Tilt Cylinder', 
	  'Ripper Cylinders',  
	  'Limited Function Check',
      ],
    },
	{
      page: 'Page 7',
      questions: [
	  'Blade Condition', 
	  'Blade Cutting Edge Condition', 
	  'Ripper Condition', 
	  'Push Arm/C-Frame Condition', 
	  'Push Arm Pivot/C-Frame Condition', 
	  'Tilt Linkage and Bushings', 
	  'Blade Trunnions/Bushings', 
	  'Limited Function Check (Dozer)', 
	  'Frame Condition', 
	  'Belly Pans', 
      ],
    },
	{
      page: 'Page 8',
      questions: [
	  'Pivot Shafts', 
	  'Equalizer Bar Pivot Points', 
	  'Left Roller Frame', 
	  'Left Track Tensioner', 
	  'Left Track Pads', 
	  'Left Grouser Heights',
	  'Left Track Links',
	  'Left Track Bushings',
	  'Left Carrier Roller',
	  'Left Track Rollers',
	  'Left Front Idler',
	  'Left Sprocket',
	  'Right Roller Frame',
	  'Right Track Tensioner',
	  'Right Track Pods',
	  'Right Grouser Height',
	  'Right Track Links',
	  'Right Track Bushings',
	  'Right Carrier Rollers',
	  'Right Track Rollers',
	  'Right Front Idler',
	  'Right Sprocket',
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

export default CrawlerDozer;

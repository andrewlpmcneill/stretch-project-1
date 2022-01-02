let numberOfBarsSwitch = 1;
let moreOptionsSwitch = 1;
let numberOfBars = 0;
let dataArray = [];
let options = {};

// This seems to be required, I think so that it's loaded first? Not sure
$(document).ready(function() {

  // Replace Chart Name with Custom One
  //Use jQuery to select the button via its parent, and perform a function
  $('#options').on('click', '#inputChartNameButton', function(){
    // Set a variable to the text field's contents
    let newTitle = $('#inputChartNameText').val();
    // Replace the chart name with the text field's contents
    $('#chartName').text(newTitle);

  });


    // Add labels and text inputs for the number of bars specified
  $('#options').on('click', '#numberOfBarsButton', function() {

    if (numberOfBarsSwitch === 1) {

      let number = $('#numberOfBarsText').val();
      numberOfBars = number;
      for (let i = 1; i <= number; i++){

        const barName = '<br><br><label><strong>Bar ' + i + '</strong></label>';
        const value = '<br><label>Value: </label>';
        const valueText = '<input type="text" id="bar' + i + 'ValueText">';
        const label = '<label><br>Label: </label>';
        const labelText = '<input type="text" id="bar' + i + 'LabelText">';
        const barColour = '<br><label for="colours' + i + '">Bar Colour: </label>';
        // Name is for the data from dropdown menu to be submitted I think... the id is for the label
        const barColourSelect = '<select name="colours' + i + '" id="colours' + i + '">\n'
          + '<option value="black">Black</option>\n'
          + '<option value="white">White</option>\n'
          + '<option value="blue">Blue</option>\n'
          + '<option value="red">Red</option>\n'
          + '<option value="yellow">Yellow</option>\n'
          + '<option value="green">Green</option>\n'
          + '</select>';
        const labelColour = '<br><label for="label' + i + 'Colour">Label Colour: </label>';
        const labelColourSelect = '<select name="label' + i + 'Colour" id="label' + i + 'Colour">\n'
          + '<option value="white">White</option>\n'
          + '<option value="black">Black</option>\n'
          + '<option value="blue">Blue</option>\n'
          + '<option value="red">Red</option>\n'
          + '<option value="yellow">Yellow</option>\n'
          + '<option value="green">Green</option>\n'
          + '</select>';
        const valuePlacement = '<br><label for="valuePlacement' + i + '">Value Placement: </label>';
        const valuePlacementSelect = '<select name="valuePlacement' + i + '" id="valuePlacement' + i + '">\n'
          + '<option value="top">Top</option>\n'
          + '<option value="middle">Middle</option>\n'
          + '<option value="bottom">Bottom</option>\n'
        const valueColour = '<br><label for="valueColours' + i + '">Value Colour: </label>';
        const valueColourSelect = '<select name="valueColours' + i + '" id="valueColours' + i + '">\n'
          + '<option value="white">White</option>\n'
          + '<option value="black">Black</option>\n'
          + '<option value="blue">Blue</option>\n'
          + '<option value="red">Red</option>\n'
          + '<option value="yellow">Yellow</option>\n'
          + '<option value="green">Green</option>\n'
          + '</select>';


        $('#options').append(barName, barColour, barColourSelect, value, valueText, valueColour, valueColourSelect, valuePlacement, valuePlacementSelect, label, labelText, labelColour, labelColourSelect);

      }

      const axesLabel = '<br><br><label>X-Axis Label: </label><input type="text" id="xAxisLabelText"><br><label>Y-Axis Label: </label><input type="text" id="yAxisLabelText">'
      const submitButton = '<br><br><br><button id="submitButton"><strong>SUBMIT</strong></button>';
      const moreOptionsButton = '<br><br><br><button id="moreOptionsButton">More Options</button>';

      $('#options').append(axesLabel, submitButton, moreOptionsButton);

    }

    numberOfBarsSwitch = 0;

  })

  // Show more options
  $('#options').on('click', '#moreOptionsButton', function() {

    if (moreOptionsSwitch === 1) {

      const barSpacingLabel = '<br><br><label>Bar Spacing: </label>';
      const lessSpacingButton = '<button id="lessSpacingButton">Less </button>';
      const moreSpacingButton = '<button id="moreSpacingButton">More</button>';


      $('#options').append(barSpacingLabel, lessSpacingButton, moreSpacingButton);

    }

    moreOptionsSwitch = 0;

  })

  // CHART DRAWING TIME


// CAPTURE DATA AND OPTIONS FROM FORM
  $('#options').on('click', '#submitButton', function () {

    for (let i = 1; i <= numberOfBars; i++) {

    //CONSTRUCT 'data' ARGUMENT
      const valueSelector = '#bar' + i + 'ValueText';
      const valueValue = $(valueSelector).val();
      dataArray.push(valueValue);


      //CONSTRUCT 'options' ARGUMENT

      // Bar Colours:
      const barColourSelector = '#colours' + i;
      const barColour = $(barColourSelector).val();
      const barColourKeyName = 'bar' + i + 'Colour';
      options[barColourKeyName] = barColour;

      // Value (text) Colour:
      const valueColourSelector = '#valueColours' + i;
      const valueColour = $(valueColourSelector).val();
      const valueColourKeyName = 'value' + i + 'Colour';
      options[valueColourKeyName] = valueColour;

      // Value Placement:
      const valuePlacementSelector = '#valuePlacement' + i;
      const valuePlacement = $(valuePlacementSelector).val();
      const valuePlacementKeyName = 'value' + i + 'Placement';
      options[valuePlacementKeyName] = valuePlacement;

      // Label:
      const labelSelector = '#bar' + i + 'LabelText';
      const label = $(labelSelector).val();
      const labelKeyName = 'bar' + i + 'LabelText';
      options[labelKeyName] = label;

      // Label Colour:
      const labelColourSelector = '#label' + i + 'Colour';
      const labelColour = $(labelColourSelector).val();
      const labelColourKeyName = 'label' + i + 'Colour';
      options[labelColourKeyName] = labelColour;

    }

    const yTickMaxValue = yTickMaxFunction(dataArray);
    console.log('Y Tick Max = ' + yTickMaxValue + ' ' + typeof yTickMaxValue);
    const yTickArray = yTicksFunction(yTickMaxValue);
    console.log('Y Tick Array = ' + yTickArray);

    for (let i = 0; i < yTickArray.length; i++) {

      console.log('Got here at least!');
      $('#tick' + String(i)).append('<p>' + Number(yTickArray[i]).toFixed(1) + '</p>');

    }

  })


});

// MAIN FUNCTION FOR GENERATING CHART
const drawBarChart = (data, options, element) => {

  const yTickMaxValue = yTickMaxFunction(data);
  //** RETURNS STRING **
  // With this, we can both determine all our y-ticks,
  // and use the value to help calculate bar heights

  const sectionWidth = sectionWidthFunction(data);
  // ** RETURNS NUMBER**
  // Here we would run loops of data.length length, creating
  // both HTML and CSS elements
    // HTML: inside <table id="chart"> <tbody>:
    //                <tr class="section" id="section' + i + '"">
    //
    // CSS: #chart #section + i {left: 0;} etc.

  const spaceArray = barAndSpaceWidthFunction(sectionWidth);
  const barWidth = spaceArray[0];
  const spaceWidth = spaceArray[1];
  const barHeightArray = [];

  // Generate bar heights
  data.forEach(element => {

    barHeightArray.push(barHeightFunction(element, yTickMaxValue));

  })




};

// HELPER FUNCTION FOR DETERMINING THE VALUE OF THE TOP OF THE Y-AXIS
const yTickMaxFunction = data => {

  let yMax = '';
  const numbersData = [];

  // Turn data into numbers from strings so that we can sort
  data.forEach(element => {
    const number = Number(element);
    numbersData.push(number);
  });

  // console.log('Break 1: ' + numbersData)

  // Sort lowest to highest
  const sortedData = numbersData.sort(function(a,b) {
    return a-b;
  });

  // console.log('Break 2: ' + sortedData);

  // Take the highest value, convert it to a string
  const highest = Math.floor(sortedData[sortedData.length - 1]);
  const stringHighest = String(highest);

  // console.log('Break 3: (should be rounded down now)' + stringHighest + ' ' + typeof stringHighest + 'Length: ' + stringHighest.length);

  // If the highest value is a single digit number (<10), just add 1 to it and call it a day
  if (stringHighest.length === 1) {

    let yMaxNumber = Number(stringHighest) + 1;
    yMax = String(yMaxNumber);
    return yMax;

  }

  // Otherwise, insert a decimal point so that the number is less than 10
  let convertedHighest;
  if (stringHighest[1] != '.') {

    convertedHighest = stringHighest.slice(0,1) + '.' + stringHighest.slice(1);
    // console.log('Break 4a: ' + convertedHighest + ' ' + typeof convertedHighest);

  } else {
    // Unless it's already there...
    convertedHighest = stringHighest;
    // console.log('Break 4b: ' + convertedHighest + ' ' + typeof convertedHighest);

  }

  // If, for x.y, y < 5 (ex. 2.3) round up to .5 (ex. 2.5)
  if (Number(convertedHighest[2]) < 5 && stringHighest[1] != '.') {

    // Realizing now that I could just skip this step...
    convertedHighest = convertedHighest.slice(0,2) + '5' + convertedHighest.slice(3);
    // console.log('Break 5a: ' + convertedHighest);


    // Then make a yMax string!
    for (let i = 0; i < stringHighest.length; i++) {

      if (i === 0) {

        yMax += convertedHighest[0];

      } else if (i === 1) {

        yMax += convertedHighest[2];

      } else {

        yMax += '0';

      }

    }

  // Else, round up the whole number and make 0's of the rest (if not a single digit decimal ex. 8.7)
  } else if (Number(convertedHighest[2]) < 5 && stringHighest[1] === '.') {

    for (let i = 0; i < 2; i++) {

      if (i === 0 || i === 1) {

        yMax += stringHighest[i];

      } else if (i === 2) {

        yMax += '5'

      }

    }

  } else if (Number(convertedHighest[2]) >= 5 && stringHighest[1] != '.') {

    // We will do this at the same time as we round up
    for (let i = 0; i < stringHighest.length; i++) {

      if (i === 0) {

        yMax += String(Number(convertedHighest[0]) + 1);

      } else {

        yMax += '0';

      }

    }

  } else if (Number(convertedHighest[2]) >= 5 && stringHighest[1] === '.') {

      yMax += String(Number(convertedHighest[0]) + 1);

  }

  return yMax;

};

// HELPER FUNCTION FOR DETERMINING SECTION WIDTH
const sectionWidthFunction = data => {

  const numberOfBars = data.length;

  const nominalWidth = 800 / numberOfBars;

  if (nominalWidth % 1 >= 0.5) {

    $('#chart').css("width", String(Math.ceil(nominalWidth) * numberOfBars));
    console.log('Changed chart width to ' + String(Math.ceil(nominalWidth) * numberOfBars) + ' pixels.');
    return Math.ceil(nominalWidth);

  } else if (nominalWidth % 1 < 0.5) {

    $('#chart').css("width", String(Math.floor(nominalWidth) * numberOfBars));
    console.log('Changed chart width to ' + String(Math.floor(nominalWidth) * numberOfBars) + ' pixels.');
    return Math.floor(nominalWidth);

  } else {

    return nominalWidth;

  }

};

// HELPER FUNCTION FOR DETERMINING BAR AND SPACE WIDTH
// **TAKES A NUMBER**
const barAndSpaceWidthFunction = sectionWidth => {

  // sectionWidth is a NUMBER

  let widthArray = [];

  if (sectionWidth % 2 > 0) {

    let newWidth = Math.ceil(sectionWidth / 2);
    let newSpace = (sectionWidth - newWidth) / 2;
    widthArray.push(String(newWidth));
    widthArray.push(String(newSpace));

  } else {

    widthArray.push(String(sectionWidth / 2));
    widthArray.push(String(sectionWidth / 4));

  }

  return widthArray;

};

// HELPER FUNCTION FOR DETERMINING BAR HEIGHT FOR A SINGLE VALUE
const barHeightFunction = (value, yMax) => {

  const yMaxNumber = Number(yMax);
  const valueNumber = Number(value);
  const ratio = valueNumber / yMaxNumber;

  return String(Math.ceil(ratio * 400));

};

// HELPER FUNCTION FOR DETERMINING ALL 5 Y-AXIS TICKS
const yTicksFunction = yMax => {

  let yTicksArray = [];
  const yTicksOneFifth = Number(yMax)/5;
  for (let i = 1; i <= 5; i++) {

    switch (i) {

      case 5:
        yTicksArray.push(yMax);
        break;

      default:
        yTicksArray.push(String(yTicksOneFifth * i));

    }

  }

  return yTicksArray;

};

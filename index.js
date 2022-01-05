let numberOfBarsSwitch = 1;
let moreOptionsSwitch = 1;
let numberOfBars = 0;
let dataArray = [];
let options = {};

const elementForChart = '#chart1';


$(document).ready(function() {


  $('#options').on('click', '#inputChartNameButton', function(){

    const newTitle = $('#inputChartNameText').val();
    const colour = $('#chartNameColour').val();
    console.log(colour.slice(0,2));
    const size = $('#chartNameSize').val();
    console.log(size);

    $('#chartName').text(newTitle);
    $('#chartName').css("color", colour);
    $('#chartName').css("font-size", size);

  });


    // Add labels and text inputs for the number of bars specified
  $('#options').on('click', '#numberOfBarsButton', function() {

    numberOfBarsEnter();

  })

  // Show more options
  $('#options').on('click', '#moreOptionsButton', function() {

    moreOptions();

  })


  // CAPTURE DATA AND OPTIONS FROM FORM, DRAW BAR CHART
  $('#options').on('click', '#submitButton', function () {

    drawBarChart(dataArray, options, elementForChart);

  })

  // LESS SPACING:
  $('#options').on('click', '#lessSpacingButton', function() {

    lessBarSpacing(options);

  })

  // MORE SPACING:
  $('#options').on('click', '#moreSpacingButton', function() {

    moreBarSpacing(options);

  })

  // RESET SPACING:
  $('#options').on('click', '#resetSpacingButton', function() {

    resetSpacing(options);

  })

});

// Helper functions for this app:



// ****************
// API Follows:
// ****************

// MAIN FUNCTION FOR GENERATING CHART
const drawBarChart = (data, options, element) => {

  drawChartBackground(element);
  storeData(options);
  drawYTicks(data);
  drawBars(data, options);

};

// HELPER FUNCTION FOR EXPANDING OPTIONS WHEN SUBMITTED
const numberOfBarsEnter = () => {

  if (numberOfBarsSwitch === 1) {

    let number = $('#numberOfBarsText').val();
    numberOfBars = number;

      // Add to our main object for future reference:
      options['numberOfBars'] = numberOfBars;

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

}

// HELPER FUNCTION FOR EXPANDING 'MORE OPTIONS' WHEN CLICKED
const moreOptions = () => {

  if (moreOptionsSwitch === 1) {

    const barSpacingLabel = '<br><br><label>Bar Spacing: </label>';
    const lessSpacingButton = '<button id="lessSpacingButton">Less </button>';
    const moreSpacingButton = '<button id="moreSpacingButton">More</button>';
    const resetSpacingButton = '<button id="resetSpacingButton">Reset</button>';


    $('#options').append(barSpacingLabel, lessSpacingButton, moreSpacingButton, resetSpacingButton);

  }

  moreOptionsSwitch = 0;

}

// HELPER FUNCTION FOR STORING INPUT DATA FROM FIELDS
const storeData = (options) => {

  numberOfBars = options['numberOfBars'];

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

      // Value:
      const valueKeyName = 'value' + i;
      options[valueKeyName] = valueValue;

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

}


// HELPER FUNCTION FOR DETERMINING THE VALUE OF THE TOP OF THE Y-AXIS
const yTickMaxFunction = data => {

  let yMax = '';
  const numbersData = [];

  // Turn data into numbers from strings so that we can sort
  data.forEach(element => {
    const number = Number(element);
    numbersData.push(number);
  });

  // Sort lowest to highest
  const sortedData = numbersData.sort(function(a,b) {
    return a-b;
  });

  // Take the highest value, convert it to a string
  const highest = Math.floor(sortedData[sortedData.length - 1]);
  const stringHighest = String(highest);

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

  } else {
    // Unless it's already there...
    convertedHighest = stringHighest;

  }

  // If, for x.y, y < 5 (ex. 2.3) round up to .5 (ex. 2.5)
  if (Number(convertedHighest[2]) < 5 && stringHighest[1] != '.') {

    // Realizing now that I could just skip this step...
    convertedHighest = convertedHighest.slice(0,2) + '5' + convertedHighest.slice(3);

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

// HELPER FUNCTION FOR DRAWING ALL Y-AXIS TICKS
const drawYTicks = data => {

  const yTickMaxValue = yTickMaxFunction(data);
  const yTickArray = yTicksFunction(yTickMaxValue);

  for (let i = 0; i < yTickArray.length; i++) {

    if (yTickMaxValue % 5 > 0) {

      $('#tick' + String(i)).append('<p>' + Number(yTickArray[i]).toFixed(1) + '</p>');

    } else {

      $('#tick' + String(i)).append('<p>' + Number(yTickArray[i]) + '</p>');

    }


  }

};

// HELPER FUNCTION FOR DRAWING ALL BARS, VALUES, AND LABELS
const drawBars = (data, options) => {

  const sectionWidth = sectionWidthFunction(data);
  const barAndSpaceWidth = barAndSpaceWidthFunction(sectionWidth);
  // WE NOW HAVE AN ARRAY -> INDEX 0 IS BAR WIDTH, 1 IS SPACE WIDTH
  const barWidth = barAndSpaceWidth[0];
  const spaceWidth = barAndSpaceWidth[1];
  // TIME FOR HEIGHT
  const yTickMaxValue = yTickMaxFunction(data);


  // SETTING FUNCTION
  for (let i = 0; i < data.length; i++) {

    // Make the bar
    const leftCalculation = String(Number(spaceWidth) + (Number(sectionWidth) * i));
    const barHeight = barHeightFunction(data[i], yTickMaxValue);

    // Add "left" calculation to options object:
    const leftCalculationKeyName = 'bar' + (i + 1) + 'Left';
    options[leftCalculationKeyName] = leftCalculation;

    // Add bar height to options object:
    const barHeightKeyName = 'bar' + (i + 1) + 'Height';
    options[barHeightKeyName] = barHeight;

    // Fetch and declare value placement to top, middle, or bottom:
    const valuePlacementKeyName = 'value' + (i + 1) + 'Placement';
    const valuePlacementSetting = options[valuePlacementKeyName];
    let margin = 0;
    switch (valuePlacementSetting) {

      case 'top':
        margin = 10;
        break;

      case 'middle':
        margin = (Number(barHeight) - 10) / 2;
        break;

      case 'bottom':
        margin = Number(barHeight) - 10;

    }

    // Fetch and declare label
    const labelTextKeyName = 'bar' + (i + 1) + 'LabelText';
    const labelText = options[labelTextKeyName];
    let labelMargin = 0;
    switch (valuePlacementSetting) {

      case 'bottom':
        labelMargin = 10;
        break;

      case 'middle':
        labelMargin = (Number(barHeight) / 2) + 5;
        break;

      case 'top':
        labelMargin = Number(barHeight) - 10;

    }

    // Fetch and declare bar colour
    const barColourKeyName = 'bar' + (i + 1) + 'Colour';
    const barColour = options[barColourKeyName];

    // Fetch and declare value colour
    const valueColourKeyName = 'value' + (i + 1) + 'Colour';
    const valueColour = options[valueColourKeyName];

    // Fetch and declare label colour
    const labelColourKeyName = 'label' + (i + 1) + 'Colour';
    const labelColour = options[labelColourKeyName];

    // Add bar height, bar colour, value, value placement, and label to HTML with appropriate CSS:
    $('#bars').append('<tr>\n\t<td id="bar' + String(i + 1) + '" style="border-style: solid; border-width: thin; background: ' + barColour + '; left: ' + leftCalculation + 'px; width: ' + barWidth + 'px; height: ' + barHeight + 'px;">\n\t\t<p style="color: ' + valueColour + '; margin: ' + margin + 'px 0 0;">' + data[i] + '</p>\n\t\t<p style="color: ' + labelColour + '; margin: ' + labelMargin +'px 0 0;">' + labelText + '</p>\n\t</td>\n</tr>');

  }

};

// HELPER FUNCTION FOR UNIFORMLY REDUCING SPACE BETWEEN BARS (INCREMENT = 10px)
const lessBarSpacing = options => {

  const numberOfBars = options['numberOfBars'];
  const increment = 5;

  if (Number(numberOfBars) % 2 === 0) {

    // EVEN
    // Determine "middle" bar
    const middleLeftBar = Number(numberOfBars) / 2;
    const middleRightBar = middleLeftBar + 1;

    for (let i = 1; i <= Number(numberOfBars); i++) {

      if (i < middleLeftBar) {

        const leftValue = $('#bar' + i).css("left");
        const newValue = parseInt(leftValue) + (((middleLeftBar - i) + 2) * increment);
        $('#bar' + i).css("left", newValue + "px");

      }

      else if (i === middleLeftBar) {

        const leftValue = $('#bar' + i).css("left");
        const newValue = parseInt(leftValue) + (increment);
        $('#bar' + i).css("left", newValue + "px");

      }

      else if (i === middleRightBar) {

        const leftValue = $('#bar' + i).css("left");
        const newValue = parseInt(leftValue) - (increment);
        $('#bar' + i).css("left", newValue + "px");

      }

      else {

        const leftValue = $('#bar' + i).css("left");
        const newValue = parseInt(leftValue) - (((i - middleRightBar) + 2) * increment);
        $('#bar' + i).css("left", newValue + "px");

      }

    }

  }

  else {

    // ODD
    // Determine middle bar, which will remain fixed
    const middleBar = Math.ceil(Number(numberOfBars) / 2);

    for (let i = 1; i <= Number(numberOfBars); i++) {

      if (i <= middleBar) {

        const leftValue = $('#bar' + i).css("left");
        const newValue = parseInt(leftValue) + ((middleBar - i) * increment);
        $('#bar' + i).css("left", newValue + "px");

      }

      else {

        const leftValue = $('#bar' + i).css("left");
        const newValue = parseInt(leftValue) - ((i - middleBar) * increment);
        $('#bar' + i).css("left", newValue + "px");

      }

    }

  }

}

// HELPER FUNCTION FOR UNIFORMLY INCREASING SPACE BETWEEN BARS (INCREMENT = 10px)
const moreBarSpacing = options => {

  const numberOfBars = options['numberOfBars'];
  const increment = 5;

  if (Number(numberOfBars) % 2 === 0) {

    // EVEN
    // Determine "middle" bars
    const middleLeftBar = Number(numberOfBars) / 2;
    const middleRightBar = middleLeftBar + 1;

    for (let i = 1; i <= Number(numberOfBars); i++) {

      if (i < middleLeftBar) {

        const leftValue = $('#bar' + i).css("left");
        const newValue = parseInt(leftValue) - (((middleLeftBar - i) + 2) * increment);
        $('#bar' + i).css("left", newValue + "px");

      }

      else if (i === middleLeftBar) {

        const leftValue = $('#bar' + i).css("left");
        const newValue = parseInt(leftValue) - (increment);
        $('#bar' + i).css("left", newValue + "px");

      }

      else if (i === middleRightBar) {

        const leftValue = $('#bar' + i).css("left");
        const newValue = parseInt(leftValue) + (increment);
        $('#bar' + i).css("left", newValue + "px");

      }

      else {

        const leftValue = $('#bar' + i).css("left");
        const newValue = parseInt(leftValue) + (((i - middleRightBar) + 2) * increment);
        $('#bar' + i).css("left", newValue + "px");

      }

    }

  }

  else {

    // ODD
    // Determine middle bar, which will remain fixed
    const middleBar = Math.ceil(Number(numberOfBars) / 2);

    for (let i = 1; i <= Number(numberOfBars); i++) {

      if (i <= middleBar) {

        const leftValue = $('#bar' + i).css("left");
        const newValue = parseInt(leftValue) - ((middleBar - i) * increment);
        $('#bar' + i).css("left", newValue + "px");

      }

      else {

        const leftValue = $('#bar' + i).css("left");
        const newValue = parseInt(leftValue) + ((i - middleBar) * increment);
        $('#bar' + i).css("left", newValue + "px");

      }


    }

  }

};

const resetSpacing = (options) => {

  const numberOfBars = Number(options['numberOfBars']);

  for (let i = 1; i <= numberOfBars; i++) {

    const selector = 'bar' + i + 'Left';
    const originalValue = options[selector];
    $('#bar' + i).css("left", originalValue + "px");

  }

};

const drawChartBackground = (element) => {

  // Insert necessary HTML
  $(element).append('<table id="chart">\n\t<tbody id="bars">\n\n\t</tbody>\n</table>');
  $(element).append('<div id="ticks"></div>');

  // Draw y-ticks
  const numberOfTicks = 5;
  for (let i = numberOfTicks - 1; i >= 0; i--) {

    $('#ticks').append('<div class="tick" id="tick' + i + '" style="height: 79px;"></div>');

  }

  // Insert necessary persistent CSS styling to document head (we are styling some things that don't exist yet)
  $(document.head).append('<style>#chart {display: block; position: relative; width: 800px; height: 400px; background: rgb(255, 255, 255); border: 2px solid gray; font: 9px Helvetica;}</style>');
  $(document.head).append('<style>#chart tr, #chart th, #chart td {position: absolute; bottom: 0; width: 0px; z-index: 2; padding: 0; text-align: center;}</style>');
  $(document.head).append('<style>#chart .bar p {margin: 5px 0 0; padding: 0;}</style>');
  $(document.head).append('<style>#ticks {position: relative; top: -400px; left: 0; z-index: 1; font: 9px Helvetica}</style>');
  $(document.head).append('<style>#ticks .tick {position: relative; border-bottom: 1px solid #BBB; width: 803px;}</style>');
  $(document.head).append('<style>#ticks .tick p {position: absolute; left: 100%; top: -0.67em; margin: 0 0 0 0.5em;}</style>');
  $(document.head).append('<style>#tick4 p {position: absolute; left: 100%; top: 0em; margin: 0 0 0 0.5em;}</style>');

};

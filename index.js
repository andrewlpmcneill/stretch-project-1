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

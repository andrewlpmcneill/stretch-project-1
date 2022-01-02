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

  })

  // const drawBarChart = (data, options, element) => {

  //   const sortedData = data.sort(function(a,b) {
  //     return a-b;
  //   });

  //   5 -




  // }


});

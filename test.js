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

const sectionWidthFunction = data => {

  const numberOfBars = data.length;

  const nominalWidth = 800 / numberOfBars;

  if (nominalWidth % 1 >= 0.5) {

    //$('#chart').css("width", String(Math.ceil(nominalWidth) * numberOfBars));
    console.log('Changed chart width to ' + String(Math.ceil(nominalWidth) * numberOfBars) + ' pixels.');
    return Math.ceil(nominalWidth);

  } else if (nominalWidth % 1 > 0 && nominalWidth % 1 < 0.5) {

    //$('#chart').css("width", String(Math.floor(nominalWidth) * numberOfBars));
    console.log('Changed chart width to ' + String(Math.floor(nominalWidth) * numberOfBars) + ' pixels.');
    return Math.floor(nominalWidth);

  } else {

    return nominalWidth;

  }

};

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

const barHeightFunction = (value, yMax) => {

  const yMaxNumber = Number(yMax);
  const valueNumber = Number(value);
  const ratio = valueNumber / yMaxNumber;

  return String(Math.ceil(ratio * 400));

};

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

const drawBars = data => {

  const sectionWidth = sectionWidthFunction(data);
  const barAndSpaceWidth = barAndSpaceWidthFunction(sectionWidth);
  // WE NOW HAVE AN ARRAY -> INDEX 0 IS BAR WIDTH, 1 IS SPACE WIDTH
  const barWidth = barAndSpaceWidth[0];
  const spaceWidth = barAndSpaceWidth[1];
  // TIME FOR HEIGHT
  const yTickMaxValue = yTickMaxFunction(data);
  for (let i = 0; i < data.length; i++) {

    const barHeight = barHeightFunction(data[i], yTickMaxValue);
    console.log(barHeight + ' ' + typeof barHeight);

  }

  // TIME TO SET HTML AND CSS FOR WIDTH AND HEIGHT

  //$('#bars').append('<tr>\n\t<td id="bar' + i + '" style="left: ' + spaceWidth + 'px; width: ' + barWidth + 'px; height: ')

  return;

};

const array = ['1','2','3'];
console.log(drawBars(array));

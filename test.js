const yTickMax = data => {

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

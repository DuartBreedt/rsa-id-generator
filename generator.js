"use strict";

function randomGenerator() {
    const year = formatDate(Math.round(Math.random() * 99) + 1900);
    const month = formatDate(Math.round(Math.random() * 11) + 1);
    const day = formatDate(Math.round(Math.random() * 27) + 1);

    let gender = Math.round(Math.random());
    gender = gender == 0 ? "Female" : "Male";

    let citizenship = Math.round(Math.random());
    citizenship = citizenship == 0 ? "SA Citizen" : "Permanent Citizen";

    return generateIdNumber({year, month, day}, gender, citizenship);
}

function formatDate(toFormat){
    return toFormat < 10? "0" + String(toFormat): String(toFormat);
}

function generateIdNumber(dateOfBirth, gender, citizenship) {

    const dobValue = dateOfBirth.year.substring(2) + dateOfBirth.month + dateOfBirth.day;

    if (gender.trim().toLowerCase() == "female") {
        gender = String(Math.floor(Math.random() * 4999));
        for(var newGender = gender, i = 0; i < 4 - gender.length; i++) {
            newGender = '0' + newGender;
        }
        gender = newGender;
    } else if (gender.trim().toLowerCase() == "male") {
        gender = String((Math.floor(Math.random() * 4999) + 5000));
    }

    if (citizenship.trim().toLowerCase() == "sa citizen") {
        citizenship = "0";
    } else if (citizenship.trim().toLowerCase() == "permanent citizen") {
        citizenship = "1";
    }

    const race = "8";

    const incompleteIdNumber = dobValue + gender + citizenship + race;

    const checksum = performChecksum(incompleteIdNumber);

    const idNumber = incompleteIdNumber + checksum;
    return idNumber;
}

function performChecksum(incompleteIdNumber) {
    const oddDigits = sumOfOddDigits(incompleteIdNumber);
    const evenDigits = sumOfEvenDigits(incompleteIdNumber);

    return processSumOfDigitsLastDigit(oddDigits, evenDigits);
}

function sumOfOddDigits(idNumber) {
    return  parseInt(idNumber.charAt(0)) +
            parseInt(idNumber.charAt(2)) +
            parseInt(idNumber.charAt(4)) +
            parseInt(idNumber.charAt(6)) +
            parseInt(idNumber.charAt(8)) +
            parseInt(idNumber.charAt(10));
}

function sumOfEvenDigits(idNumber) {
    const evenDigits = String(concatenatedEvenNumbersTimesTwo(idNumber));

    for (var sum = 0, i = 0; i < evenDigits.length; i++) {
        sum += parseInt(evenDigits.charAt(i));
    }
    return sum;
}

function concatenatedEvenNumbersTimesTwo(idNumber) {
    const evenNumbers =
    idNumber.charAt(1) +
    idNumber.charAt(3) +
    idNumber.charAt(5) +
    idNumber.charAt(7) +
    idNumber.charAt(9) +
    idNumber.charAt(11);

    return parseInt(evenNumbers) * 2;
}

function processSumOfDigitsLastDigit(sumOfOddNumbers, sumEvenDigits) {
    const stringOfInt = String(sumOfOddNumbers + sumEvenDigits);
    const lastChar = parseInt(stringOfInt.charAt(stringOfInt.length - 1));
    return lastChar == 0 ? 0 : 10 - lastChar;
}
function calculateIcingRisk() {
    var outsideAirTempC = parseFloat(document.getElementById('outsideAirTempC').value);
    var dewPointC = parseFloat(document.getElementById('dewPointC').value);
    var outsideAirTempF = parseFloat(document.getElementById('outsideAirTempF').value);
    var dewPointF = parseFloat(document.getElementById('dewPointF').value);

    // Check if at least one set of values is provided
    if (isNaN(outsideAirTempC) && isNaN(outsideAirTempF) ||
        isNaN(dewPointC) && isNaN(dewPointF)) {
        alert('Please enter at least one valid set of temperature and dew point values.');
        return;
    }

    // Fill empty Celsius values with converted Fahrenheit values and vice versa
    if (isNaN(outsideAirTempC) && !isNaN(outsideAirTempF)) {
        outsideAirTempC = (outsideAirTempF - 32) * (5 / 9);
        document.getElementById('outsideAirTempC').value = outsideAirTempC.toFixed(2);
    }

    if (isNaN(dewPointC) && !isNaN(dewPointF)) {
        dewPointC = (dewPointF - 32) * (5 / 9);
        document.getElementById('dewPointC').value = dewPointC.toFixed(2);
    }

    if (isNaN(outsideAirTempF) && !isNaN(outsideAirTempC)) {
        outsideAirTempF = (outsideAirTempC * 9 / 5) + 32;
        document.getElementById('outsideAirTempF').value = outsideAirTempF.toFixed(2);
    }

    if (isNaN(dewPointF) && !isNaN(dewPointC)) {
        dewPointF = (dewPointC * 9 / 5) + 32;
        document.getElementById('dewPointF').value = dewPointF.toFixed(2);
    }

    // Calculate relative humidity using the provided formula
    var relativeHumidity = 100 * Math.exp((17.625 * dewPointC) / (243.04 + dewPointC)) / Math.exp((17.625 * outsideAirTempC) / (243.04 + outsideAirTempC));

    var resultElement = document.getElementById('result');
    resultElement.innerHTML = '';

    resultElement.innerHTML += 'Calculated Relative Humidity: ' + relativeHumidity.toFixed(2) + '%<br>';

    var severity = getIcingSeverity(relativeHumidity);

    resultElement.innerHTML += 'Severity of Carburetor Icing: ' + severity;

    if (outsideAirTempC - dewPointC <= 20) {
        resultElement.innerHTML += '<br>Risk of carburetor icing. Consider taking precautions.';
    } else {
        resultElement.innerHTML += '<br>Low risk of carburetor icing.';
    }
}

function clearInputs() {
    document.getElementById('outsideAirTempC').value = '';
    document.getElementById('dewPointC').value = '';
    document.getElementById('outsideAirTempF').value = '';
    document.getElementById('dewPointF').value = '';
    document.getElementById('result').innerHTML = '';
}

function getIcingSeverity(relativeHumidity) {
    if (relativeHumidity >= 80) {
        return 'Severe';
    } else if (relativeHumidity >= 60) {
        return 'Moderate';
    } else if (relativeHumidity >= 40) {
        return 'Mild';
    } else {
        return 'Low';
    }
}

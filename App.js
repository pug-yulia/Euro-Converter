import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';


export default function App() {
  const [currencies, setCurrencies] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [currencyValue, setCurrencyValue] = useState('');
  const [euroValue, setEuroValue] = useState('');

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const fetchCurrencies = async () => {
    try {
      const response = await fetch('https://api.apilayer.com/exchangerates_data/latest', {
        headers: {
          'apikey': 'sHsnmZWgcG6AvFgONxZSpZZlWAwX5pxe', // Replace 'YOUR_API_KEY' with your actual API key
        },
      });
      const data = await response.json();
    console.log('API Response:', data); // Log the response data for debugging
    if (data && data.rates) {
      const currencyCodes = Object.keys(data.rates);
      console.log('Currency Codes:', currencyCodes); // Log the currency codes for debugging
      setCurrencies(currencyCodes);
    } else {
      console.error('Error: Currency rates data is undefined.');
    }
  } catch (error) {
    console.error('Error fetching currencies:', error);
  }
  };

  const handleConvert = () => {
    if (selectedCurrency && currencyValue) {
      const rate = rates[selectedCurrency]; // Access the exchange rate of the selected currency from the rates object
      if (rate) {
        const euros = parseFloat(currencyValue) / parseFloat(rate); // Convert currency value to euros
        setEuroValue(euros.toFixed(2)); // Set the euro value in state
      } else {
        console.error('Error: Exchange rate for selected currency is undefined.');
      }
    }
  };
  

  return (
    <View style={styles.container}>
      <Text>Select Currency:</Text>
      <Picker
        selectedValue={selectedCurrency}
        onValueChange={(itemValue, itemIndex) => setSelectedCurrency(itemValue)}>
        {currencies.map(currency => (
          <Picker.Item key={currency} label={currency} value={currency} />
        ))}
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Enter Currency Value"
        keyboardType="numeric"
        value={currencyValue}
        onChangeText={setCurrencyValue}
      />
      <Button title="Convert" onPress={handleConvert} />
      <Text>Euro Value: {euroValue}</Text>
    </View>
  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    width: '80%',
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
});

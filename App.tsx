import React from 'react';
import { StatusBar } from 'react-native';
import { Root } from './src/screens/root';

function App() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#4CAF50" />
      <Root />
    </>
  );
}

export default App;

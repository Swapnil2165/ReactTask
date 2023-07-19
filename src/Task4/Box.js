import React, { useState } from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import { TextField, Button, Typography, Box } from '@mui/material';
import './Box.css';

function App() {
  const [box1Value, setBox1Value] = useState('');
  const [box2Value, setBox2Value] = useState('');
  const [validationMessage1, setValidationMessage1] = useState('');
  const [validationMessage2, setValidationMessage2] = useState('');
  const [showChart, setShowChart] = useState(false);
  const [chartData, setChartData] = useState([]);

  const handleBox1Change = (e) => {
    const value = e.target.value;
    if (value <= 100) {
      setBox1Value(value);
      setBox2Value(100 - value);
      setValidationMessage1('');
    } else {
      setValidationMessage1('Incorrect Value');
      setTimeout(() => {
        setValidationMessage1('');
      }, 2000);
    }
  };

  const handleBox2Change = (e) => {
    const value = e.target.value;
    if (value <= 100) {
      setBox2Value(value);
      setBox1Value(100 - value);
      setValidationMessage2('');
    } else {
      setValidationMessage2('Incorrect Value');
      setTimeout(() => {
        setValidationMessage2('');
      }, 2000);
    }
  };

  const handleChartButtonClick = () => {
    const newData = [
      { title: 'Box 1', value: parseInt(box1Value), color: '#E38627' },
      { title: 'Box 2', value: parseInt(box2Value), color: '#C13C37' },
    ];
    setChartData(newData);
    setShowChart(true);
  };

  return (
    <div className="container">
      <Box className="box">
        <Typography variant="h5" component="div" className="title" gutterBottom>
          Box 1:
        </Typography>
        <TextField
          type="number"
          value={box1Value}
          onChange={handleBox1Change}
          error={validationMessage1 !== ''}
          helperText={validationMessage1}
          className="text-field"
        />
        <Typography variant="h5" component="div" className="title" gutterBottom>
          Box 2:
        </Typography>
        <TextField
          type="number"
          value={box2Value}
          onChange={handleBox2Change}
          error={validationMessage2 !== ''}
          helperText={validationMessage2}
          className="text-field"
        /><br /><br />
        <Button variant="contained" onClick={handleChartButtonClick} className="button">
          Create Chart
        </Button><br /><br />
        
        {showChart && <PieChart data={chartData} className="chart" />}
      </Box>
    </div>
  );
}

export default App;
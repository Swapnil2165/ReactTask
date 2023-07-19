import React, { useState, useEffect } from 'react';
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography
} from '@mui/material';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [isLogged, setIsLogged] = useState(false);
  const [leaveApplications, setLeaveApplications] = useState([]);
  const [leaveReason, setLeaveReason] = useState('');
  const [leaveDateFrom, setLeaveDateFrom] = useState('');
  const [leaveDateTo, setLeaveDateTo] = useState('');
  const [isRegistering, setIsRegistering] = useState(false); // Track registration state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [department, setDepartment] = useState('');

  useEffect(() => {
    // Load user data from local storage
    const storedLeaveApplications = localStorage.getItem('leaveApplications');
    if (storedLeaveApplications) {
      setLeaveApplications(JSON.parse(storedLeaveApplications));
    }
  }, []);

  useEffect(() => {
    // Save leave applications data to local storage
    localStorage.setItem('leaveApplications', JSON.stringify(leaveApplications));
  }, [leaveApplications]);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleContactNumberChange = (event) => {
    setContactNumber(event.target.value);
  };

  const handleDepartmentChange = (event) => {
    setDepartment(event.target.value);
  };

  const handleSignup = () => {
    console.log('Signup button clicked');
    const storedUserData = localStorage.getItem('userData');
    let userData = storedUserData ? JSON.parse(storedUserData) : {};

    // Check if the username already exists
    const existingUser = userData[username];
    if (existingUser) {
      alert('Username is already registered');
      return;
    }

    userData[username] = {
      password: password,
      role: role,
      firstName: firstName,
      lastName: lastName,
      email: email,
      contactNumber: contactNumber,
      department: department
    };

    localStorage.setItem('userData', JSON.stringify(userData));
    setIsRegistering(false); // After successful signup, switch back to the login page
  };

  const handleLogin = () => {
    console.log('Login button clicked');
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      const matchedUser = userData[username];
      if (matchedUser && matchedUser.password === password && matchedUser.role === role) {
        setIsLogged(true);
      } else {
        alert('Invalid Username, Password, or Role');
      }
    } else {
      alert('User does not exist');
    }
  };

  const handleLogout = () => {
    setIsLogged(false);
  };

  const handleLeaveReasonChange = (event) => {
    setLeaveReason(event.target.value);
  };

  const handleLeaveDateFromChange = (event) => {
    setLeaveDateFrom(event.target.value);
  };

  const handleLeaveDateToChange = (event) => {
    setLeaveDateTo(event.target.value);
  };

  const handleLeaveApplication = () => {
    // Handle leave application logic here
    const newLeaveApplication = {
      id: leaveApplications.length + 1,
      staffName: username,
      reason: leaveReason,
      dateFrom: leaveDateFrom,
      dateTo: leaveDateTo,
      status: 'Pending'
    };
    setLeaveApplications([...leaveApplications, newLeaveApplication]);
    setLeaveReason('');
    setLeaveDateFrom('');
    setLeaveDateTo('');
  };

  const handleApproveLeave = (id) => {
    // Handle leave approval logic here
    const updatedLeaveApplications = leaveApplications.map((application) => {
      if (application.id === id) {
        return { ...application, status: 'Approved' };
      }
      return application;
    });
    setLeaveApplications(updatedLeaveApplications);
  };

  const handleRejectLeave = (id) => {
    // Handle leave rejection logic here
    const updatedLeaveApplications = leaveApplications.map((application) => {
      if (application.id === id) {
        return { ...application, status: 'Rejected' };
      }
      return application;
    });
    setLeaveApplications(updatedLeaveApplications);
  };

  const renderHomePage = () => (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Leave Management
      </Typography>
      {isRegistering ? (
        <>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <TextField
              label="First Name"
              value={firstName}
              onChange={handleFirstNameChange}
            />
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <TextField
              label="Last Name"
              value={lastName}
              onChange={handleLastNameChange}
            />
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <TextField
              label="Email"
              value={email}
              onChange={handleEmailChange}
            />
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <TextField
              label="Contact Number"
              value={contactNumber}
              onChange={handleContactNumberChange}
            />
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Department</InputLabel>
            <Select value={department} onChange={handleDepartmentChange}>
              <MenuItem value="Department 1">Department 1</MenuItem>
              <MenuItem value="Department 2">Department 2</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <TextField
              label="Username"
              value={username}
              onChange={handleUsernameChange}
            />
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSignup}
            sx={{ marginBottom: 2 }}
          >
            Register
          </Button>
          <Typography align="center">
            Already registered :{' '}
            <Button
              color="secondary"
              onClick={() => setIsRegistering(false)}
              sx={{ textTransform: 'none' }}
            >
              Login
            </Button>
          </Typography>
        </>
      ) : (
        <>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <TextField
              label="Username"
              value={username}
              onChange={handleUsernameChange}
            />
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </FormControl>
          <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Role</InputLabel>
            <Select value={role} onChange={handleRoleChange}>
              <MenuItem value="HOD">HOD</MenuItem>
              <MenuItem value="Staff">Staff</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
            sx={{ marginBottom: 2 }}
          >
            Login
          </Button>
          <Typography align="center">
            If not registered already :{' '}
            <Button
              color="secondary"
              onClick={() => setIsRegistering(true)}
              sx={{ textTransform: 'none' }}
            >
              Register Now
            </Button>
          </Typography>
        </>
      )}
    </Container>
  );
  

  const renderHodDashboard = () => (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        HOD Dashboard
      </Typography>
      <Typography variant="h5" gutterBottom>
        Staff leave applications:
      </Typography>
      {leaveApplications.map((application) => (
        <div key={application.id} style={{ marginBottom: '16px' }}>
          <Typography variant="body1" gutterBottom>
            Staff Name: {application.staffName}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Leave Reason: {application.reason}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Date From: {application.dateFrom}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Date To: {application.dateTo}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Status: {application.status}
          </Typography>
          {application.status === 'Pending' && (
            <div>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleApproveLeave(application.id)}
              >
                Approve
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleRejectLeave(application.id)}
              >
                Reject
              </Button>
            </div>
          )}
        </div>
      ))}
      <Button
        variant="contained"
        color="secondary"
        fullWidth
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Container>
  );


  const renderStaffDashboard = () => (
    <Container maxWidth="sm">
      <Typography variant="h4" align="center" gutterBottom>
        Staff Dashboard
      </Typography>
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <TextField
          label="Leave Reason"
          value={leaveReason}
          onChange={handleLeaveReasonChange}
        />
      </FormControl>
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <TextField
          label="Date From"
          type="date"
          value={leaveDateFrom}
          onChange={handleLeaveDateFromChange}
          InputLabelProps={{
            shrink: true
          }}
        />
      </FormControl>
      <FormControl fullWidth sx={{ marginBottom: 2 }}>
        <TextField
          label="Date To"
          type="date"
          value={leaveDateTo}
          onChange={handleLeaveDateToChange}
          InputLabelProps={{
            shrink: true
          }}
        />
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleLeaveApplication}
        sx={{ marginBottom: 2 }}
      >
        Apply
      </Button>
      <Typography variant="h5" gutterBottom>
        Leave Status:
      </Typography>
      {leaveApplications.map((application) => (
        <div key={application.id} style={{ marginBottom: '16px' }}>
          {application.staffName === username && (
            <div>
              <Typography variant="body1" gutterBottom>
                Leave Reason: {application.reason}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Date From: {application.dateFrom}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Date To: {application.dateTo}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Status: {application.status}
              </Typography>
            </div>
          )}
        </div>
      ))}
      <Button
        variant="contained"
        color="secondary"
        fullWidth
        onClick={handleLogout}
      >
        Logout
      </Button>
    </Container>
  );


  return (
    <div>
      {isLogged ? (
        role === 'HOD' ? (
          renderHodDashboard()
        ) : (
          renderStaffDashboard()
        )
      ) : (
        renderHomePage()
      )}
    </div>
  );
};

export default App;
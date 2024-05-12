import React, { useState } from 'react';
import Profile from './Profile';
import User from './User';

const StudentDashboard = () => {
  let student = User.getUser();

  return (
    <Profile student={student} />
  );
};

export default StudentDashboard;

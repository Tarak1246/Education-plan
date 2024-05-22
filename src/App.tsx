// src/App.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, FormHelperText, Button } from '@mui/material';
import './App.css'; // Import the CSS file

interface FormData {
  educationLevel: string;
  subField: string;
  program: string;
  thesisOption: string;
  semester: string;
}

const educationOptions = [
  { value: '', label: '--Please choose an option--' },
  { value: 'Graduate', label: 'Graduate' },
  { value: 'Undergraduate', label: 'Undergraduate',disabled:true },
];

const graduateOptions = [
  { value: '', label: '--Please choose an option--' },
  { value: 'Masters', label: 'Masters' },
  { value: 'PhD', label: 'PhD' },
];

const undergraduateOptions = [
  { value: '', label: '--Please choose an option--' },
  { value: 'Associate', label: 'Associate' },
  { value: 'Bachelor', label: 'Bachelor' },
];

const mastersPrograms = [
  { value: '', label: '--Please choose an option--' },
  { value: 'CS', label: 'Computer Science' },
  { value: 'CEG', label: 'Computer Engineering' },
  { value: 'BM', label: 'Biomedical' },
  { value: 'BA', label: 'Business Administration' },
];

const thesisOptions = [
  { value: '', label: '--Please choose an option--' },
  { value: 'Thesis', label: 'Thesis' },
  { value: 'Non-Thesis', label: 'Non-Thesis' },
];

const semesterOptions = [
  { value: 'Spring', label: 'Spring' },
  { value: 'Summer', label: 'Summer' },
  { value: 'Fall', label: 'Fall' },
];

const currentYear = new Date().getFullYear();

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    educationLevel: '',
    subField: '',
    program: '',
    thesisOption: '',
    semester: '',
  });

  const [error, setError] = useState({
    educationLevel: false,
    subField: false,
    program: false,
    thesisOption: false,
    semester: false,
  });

  const handleChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === 'educationLevel') {
      setFormData((prev) => ({
        ...prev,
        subField: '',
        program: '',
        thesisOption: '',
        semester: '',
      }));
      setError({
        educationLevel: false,
        subField: false,
        program: false,
        thesisOption: false,
        semester: false,
      });
    } else if (name === 'subField') {
      setFormData((prev) => ({
        ...prev,
        program: '',
        thesisOption: '',
        semester: '',
      }));
      setError((prev) => ({
        ...prev,
        subField: false,
        program: false,
        thesisOption: false,
        semester: false,
      }));
    } else if (name === 'program') {
      setFormData((prev) => ({
        ...prev,
        thesisOption: '',
        semester: '',
      }));
      setError((prev) => ({
        ...prev,
        program: false,
        thesisOption: false,
        semester: false,
      }));
    } else if (name === 'thesisOption') {
      setFormData((prev) => ({
        ...prev,
        semester: '',
      }));
      setError((prev) => ({
        ...prev,
        thesisOption: false,
        semester: false,
      }));
    } else {
      setError((prev) => ({
        ...prev,
        [name]: false,
      }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const newError = {
      educationLevel: formData.educationLevel === '',
      subField: formData.subField === '',
      program: formData.program === '',
      thesisOption: formData.thesisOption === '',
      semester: formData.semester === '',
    };

    setError(newError);

    if (Object.values(newError).some((hasError) => hasError)) {
      return;
    }

    console.log('Form data submitted:', formData);
    // You can send formData to the backend here
  };

  const renderSubFieldDropdown = () => {
    if (formData.educationLevel === 'Graduate') {
      return (
        <FormControl sx={{ width: '15%' }} error={error.subField}>
          <InputLabel id="graduate-subfield-label">Graduate Program</InputLabel>
          <Select
            labelId="graduate-subfield-label"
            id="subField"
            name="subField"
            value={formData.subField}
            label="Graduate Program"
            onChange={handleChange}
          >
            {graduateOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {error.subField && <FormHelperText>Please select a graduate program.</FormHelperText>}
        </FormControl>
      );
    }

    if (formData.educationLevel === 'Undergraduate') {
      return (
        <FormControl sx={{ width: '15%' }} error={error.subField}>
          <InputLabel id="undergraduate-subfield-label">Undergraduate Program</InputLabel>
          <Select
            labelId="undergraduate-subfield-label"
            id="subField"
            name="subField"
            value={formData.subField}
            label="Undergraduate Program"
            onChange={handleChange}
          >
            {undergraduateOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {error.subField && <FormHelperText>Please select an undergraduate program.</FormHelperText>}
        </FormControl>
      );
    }

    return null;
  };

  const renderProgramDropdown = () => {
    if (formData.subField === 'Masters') {
      return (
        <FormControl sx={{ width: '15%' }} error={error.program}>
          <InputLabel id="masters-program-label">Masters Program</InputLabel>
          <Select
            labelId="masters-program-label"
            id="program"
            name="program"
            value={formData.program}
            label="Masters Program"
            onChange={handleChange}
          >
            {mastersPrograms.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {error.program && <FormHelperText>Please select a masters program.</FormHelperText>}
        </FormControl>
      );
    }

    return null;
  };

  const renderThesisOptionDropdown = () => {
    if (formData.program) {
      return (
        <FormControl sx={{ width: '15%' }} error={error.thesisOption}>
          <InputLabel id="thesis-option-label">Thesis Option</InputLabel>
          <Select
            labelId="thesis-option-label"
            id="thesisOption"
            name="thesisOption"
            value={formData.thesisOption}
            label="Thesis Option"
            onChange={handleChange}
          >
            {thesisOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {error.thesisOption && <FormHelperText>Please select a thesis option.</FormHelperText>}
        </FormControl>
      );
    }

    return null;
  };

  const renderSemesterDropdown = () => {
    const currentMonth = new Date().getMonth() + 1; // January is 1, December is 12

  let defaultSemester = '';
  if (currentMonth >= 1 && currentMonth <= 4) {
    defaultSemester = 'Spring';
  } else if (currentMonth >= 5 && currentMonth <= 7) {
    defaultSemester = 'Summer';
  } else if (currentMonth >= 8 && currentMonth <= 12) {
    defaultSemester = 'Fall';
  }
    if (formData.thesisOption === 'Non-Thesis') {
      return (
        <FormControl sx={{ width: '15%' }} error={error.semester}>
          <InputLabel id="semester-label">Semester</InputLabel>
          <Select
            labelId="semester-label"
            id="semester"
            name="semester"
            value={formData.semester || defaultSemester}
            label="Semester"
            onChange={handleChange}
          >
            {semesterOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label} {currentYear}
              </MenuItem>
            ))}
          </Select>
          {error.semester && <FormHelperText>Please select a semester.</FormHelperText>}
        </FormControl>
      );
    }

    return null;
  };

  return (
    <div className="App">
      <h1>Wright State University Grad Plan</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <FormControl sx={{ width: '11%' }} error={error && formData.educationLevel === ''}>
            <InputLabel id="education-level-label">Education Level</InputLabel>
            <Select
              labelId="education-level-label"
              id="educationLevel"
              name="educationLevel"
              value={formData.educationLevel}
              label="Education Level"
              onChange={handleChange}
            >
              {educationOptions.map((option) => (
                <MenuItem key={option.value} value={option.value} disabled={option.disabled}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {error && formData.educationLevel === '' && <FormHelperText>Please select an education level.</FormHelperText>}
          </FormControl>

          {renderSubFieldDropdown()}
          {renderProgramDropdown()}
          {renderThesisOptionDropdown()}
          {renderSemesterDropdown()}
        </div>

        <div className='btnClass'>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default App;

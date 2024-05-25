import React, { useState, ChangeEvent, FormEvent } from 'react';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormHelperText,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
} from '@mui/material';
import './App.css'; // Import the CSS file

interface FormData {
  educationLevel: string;
  subField: string;
  program: string;
  thesisOption: string;
  semester: string;
  certificate: 'None' | 'Big Data' | 'Cybersecurity' | '';
  subject: string;
}

interface DataItem {
  value: string;
  label: string;
}


const educationOptions = [
  { value: '', label: '--Please choose an option--' },
  { value: 'Graduate', label: 'Graduate' },
  { value: 'Undergraduate', label: 'Undergraduate' },
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

const certificateOptions = [
  { value: '', label: '--Please choose an option--' },
  { value: 'None', label: 'None' },
  { value: 'Big Data', label: 'Big Data' },
  { value: 'Cybersecurity', label: 'Cybersecurity' },
];

const subjectOptions: Record<'None' | 'Big Data' | 'Cybersecurity', DataItem[]> = {
  'Big Data': [
    { value: 'BD1', label: 'Big Data Analytics' },
    { value: 'BD2', label: 'Data Mining' },
  ],
  'Cybersecurity': [
    { value: 'CS1', label: 'Network Security' },
    { value: 'CS2', label: 'Cryptography' },
  ],
  'None' : [
    { value: 'ADA', label: 'Algorithm Design and Analysis' },
    { value: 'CS2', label: 'Distributed Computing' },
  ]
};



const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    educationLevel: '',
    subField: '',
    program: '',
    thesisOption: '',
    semester: '',
    certificate: '',
    subject: '',
  });

  const [error, setError] = useState({
    educationLevel: false,
    subField: false,
    program: false,
    thesisOption: false,
    semester: false,
    certificate: false,
    subject: false,
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
        certificate: '',
        subject: '',
      }));
      setError({
        educationLevel: false,
        subField: false,
        program: false,
        thesisOption: false,
        semester: false,
        certificate: false,
        subject: false,
      });
    } else if (name === 'subField') {
      setFormData((prev) => ({
        ...prev,
        program: '',
        thesisOption: '',
        semester: '',
        certificate: '',
        subject: '',
      }));
      setError((prev) => ({
        ...prev,
        subField: false,
        program: false,
        thesisOption: false,
        semester: false,
        certificate: false,
        subject: false,
      }));
    } else if (name === 'program') {
      setFormData((prev) => ({
        ...prev,
        thesisOption: '',
        semester: '',
        certificate: '',
        subject: '',
      }));
      setError((prev) => ({
        ...prev,
        program: false,
        thesisOption: false,
        semester: false,
        certificate: false,
        subject: false,
      }));
    } else if (name === 'thesisOption') {
      setFormData((prev) => ({
        ...prev,
        semester: '',
        certificate: '',
        subject: '',
      }));
      setError((prev) => ({
        ...prev,
        thesisOption: false,
        semester: false,
        certificate: false,
        subject: false,
      }));
    } else if (name === 'certificate') {
      setFormData((prev) => ({
        ...prev,
        subject: '',
      }));
      setError((prev) => ({
        ...prev,
        certificate: false,
        subject: false,
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
      certificate: formData.certificate === '',
      subject: formData.subject === '',
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
        <FormControl sx={{ width: '100%', marginBottom: 2 }} error={error.subField}>
          <InputLabel className="card-text"  id="graduate-subfield-label">Graduate Program</InputLabel>
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
        <FormControl sx={{ width: '100%', marginBottom: 2 }} error={error.subField}>
          <InputLabel className="card-text"  id="undergraduate-subfield-label">Undergraduate Program</InputLabel>
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
        <FormControl sx={{ width: '100%', marginBottom: 2 }} error={error.program}>
          <InputLabel className="card-text"  id="masters-program-label">Masters Program</InputLabel>
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
        <FormControl sx={{ width: '100%', marginBottom: 2 }} error={error.thesisOption}>
          <InputLabel className="card-text"  id="thesis-option-label">Thesis Option</InputLabel>
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
    if (formData.thesisOption) {
      return (
        <FormControl sx={{ width: '100%', marginBottom: 2 }} error={error.semester}>
          <InputLabel className="card-text"  id="semester-label">Semester</InputLabel>
          <Select
            labelId="semester-label"
            id="semester"
            name="semester"
            value={formData.semester}
            label="Semester"
            onChange={handleChange}
          >
            {semesterOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {error.semester && <FormHelperText>Please select a semester.</FormHelperText>}
        </FormControl>
      );
    }

    return null;
  };

  const renderCertificateDropdown = () => {
    if (formData.semester) {
      return (
        <FormControl sx={{ width: '100%', marginBottom: 2 }} error={error.certificate}>
          <InputLabel className="card-text"  id="certificate-label">Certificate</InputLabel>
          <Select
            labelId="certificate-label"
            id="certificate"
            name="certificate"
            value={formData.certificate}
            label="Certificate"
            onChange={handleChange}
          >
            {certificateOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {error.certificate && <FormHelperText>Please select a certificate option.</FormHelperText>}
        </FormControl>
      );
    }

    return null;
  };

  const renderSubjectDropdown = () => {
    if (formData.certificate && formData.certificate !== 'None') {
      return (
        <FormControl sx={{ width: '100%', marginBottom: 2 }} error={error.subject}>
          <InputLabel className="card-text"  id="subject-label">Subject</InputLabel>
          <Select
            labelId="subject-label"
            id="subject"
            name="subject"
            value={formData.subject}
            label="Subject"
            onChange={handleChange}
          >
            {subjectOptions[formData.certificate].map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {error.subject && <FormHelperText>Please select a subject.</FormHelperText>}
        </FormControl>
      );
    }

    return null;
  };

  return (
    <div className="App">
      <h1>Wright State University Education Plan</h1>
      <form onSubmit={handleSubmit}>
        <Grid container justifyContent="center" className="card-container">
          {/* <Grid item xs={12} sm={8} md={6} lg={4}> */}
          <Grid item xs={12} md={4} lg={3}>
            <Card className="card">
              <CardContent className="card-content">
                <Typography variant="h6" align="center" className="card-title">Phase 1</Typography>
                <FormControl sx={{ width: '100%', marginBottom: 2 }} error={error.educationLevel}>
                  <InputLabel className="card-text"  id="education-level-label">Education Level</InputLabel>
                  <Select
                    labelId="education-level-label"
                    id="educationLevel"
                    name="educationLevel"
                    value={formData.educationLevel}
                    label="Education Level"
                    onChange={handleChange}
                  >
                    {educationOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {error.educationLevel && <FormHelperText>Please select an education level.</FormHelperText>}
                </FormControl>

                {renderSubFieldDropdown()}
                {renderProgramDropdown()}
              </CardContent>
            </Card>
          </Grid>

          {formData.educationLevel && formData.subField && formData.program && (
            // <Grid item xs={12} sm={8} md={6} lg={4}>
            <Grid item xs={12} md={4} lg={3}>
              <Card className="card">
                <CardContent className="card-content">
                  <Typography variant="h6" align="center" className="card-title">Phase 2</Typography>
                  {renderThesisOptionDropdown()}
                  {renderSemesterDropdown()}
                </CardContent>
              </Card>
            </Grid>
          )}

          {formData.thesisOption && formData.semester && (
            // <Grid item xs={12} sm={8} md={6} lg={4} >
            <Grid item xs={12} md={4} lg={3}>
              <Card className="card">
                <CardContent className="card-content">
                  <Typography variant="h6" align="center">Phase 3</Typography>
                  {renderCertificateDropdown()}
                  {renderSubjectDropdown()}
                </CardContent>
              </Card>
            </Grid>
          )}
        </Grid>

        {formData.certificate && formData.subject && (
          <Grid container justifyContent="center" sx={{ marginTop: 2 }}>
            <Button variant="contained" color="primary" type="submit">Submit</Button>
          </Grid>
        )}
      </form>
    </div>
  );
};

export default App;

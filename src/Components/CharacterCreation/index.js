import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 900,
    marginTop: "2em"
  },
  margin: {
    height: theme.spacing(3),
  },
  control: {
    padding: theme.spacing(2),
  },
  RadioGroup:{
    display:"flex",
    flexDirection:"row"
  }
}));

function valuetext(value) {
  return value;
}


function CharacterCreation() {
  const classes = useStyles();
  const [gender, setGender] = React.useState('female');

  const handleChange = event => {
    setGender(event.target.value);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container className={classes.root}>
        <Grid container>
          <Grid item sm={12} md={6}>
            <img src="https://via.placeholder.com/350x350" alt="current character"/>
          </Grid>
          <Grid item sm={12} md={6}>
            <FormControl component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup className={classes.RadioGroup} aria-label="gender" name="gender" value={gender} onChange={handleChange}>
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
              </RadioGroup>
            </FormControl>
            <Typography id="body-slider" gutterBottom>
              Body Type:
          </Typography>
            <Slider
              defaultValue={2}
              getAriaValueText={valuetext}
              aria-labelledby="body-slider"
              valueLabelDisplay="auto"
              step={1}
              marks
              min={1}
              max={3}
            />

            <Typography id="hair-slider" gutterBottom>
              Hair Type:
            </Typography>
            <Slider
              defaultValue={2}
              getAriaValueText={valuetext}
              aria-labelledby="hair-slider"
              valueLabelDisplay="auto"
              step={1}
              marks
              min={1}
              max={3}
            />

            <Typography id="color1-slider" gutterBottom>
              Color 1:
            </Typography>
            <Slider
              defaultValue={2}
              getAriaValueText={valuetext}
              aria-labelledby="color1-slider"
              valueLabelDisplay="auto"
              step={1}
              marks
              min={1}
              max={3}
            />

            <Typography id="color2-slider" gutterBottom>
              Color 2:
            </Typography>
            <Slider
              defaultValue={2}
              getAriaValueText={valuetext}
              aria-labelledby="color2-slider"
              valueLabelDisplay="auto"
              step={1}
              marks
              min={1}
              max={3}
            />

          </Grid>
        </Grid>
      </Container>
    </React.Fragment>

  )
}

export default CharacterCreation;
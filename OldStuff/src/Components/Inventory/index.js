import React from 'react';
import CharacterDashboard from "../CharacterDashboard";
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InventoryItem from "../InventoryItem";
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },
  itemContainer: {
    display: 'grid',
    gridTemplateColumns: "1fr 1fr 1fr",
  },
  paper: {
    padding: theme.spacing(3, 2),
    margin: theme.spacing(3, 2),
    justifyContent: "center",
    alignContent: "center",
  },
  h2:{
    padding: theme.spacing(3, 2),
  }
}));


function Inventory(){
  const classes = useStyles();
  const inventory = [{"name": "Monkey", "benefit": "Health"},{"name": "Firebird", "benefit": "Weapon"},{"name": "Elephant", "benefit": "Health"},{"name": "Elephant", "benefit": "Health"}]
  return(
      <Container className={classes.root} maxWidth="md">
        <CharacterDashboard />
        <Paper >
          <Typography variant="h2">
            Inventory:
          </Typography>
          <Grid container spacing={3}>
          {inventory.map((item) => (
            <InventoryItem item={item} key={Math.random()}/>
        ))}
          </Grid>
        </Paper>
      </Container>
  )
}


export default Inventory;
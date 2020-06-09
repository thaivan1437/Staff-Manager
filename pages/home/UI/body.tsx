import React from 'react';
import { Button, Container, Typography, Grid, Card, CardContent, CardActions } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { decrement } from '../logic/counter_actions';
import { addVehicle } from '../logic/vehicle_actions';

import { NextPage } from '../logic/counter_reducer';

interface DataType {
  title: string;
}

type BodyProps = DataType;

const Body: React.FunctionComponent<BodyProps> = ({ title }) => {
  const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const vehicle = useSelector((state) => state.reducerVehicle);
  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  const FormVehicle = () => {
    return (
      <React.Fragment>
        <Grid item xs={2}>
          <Button color='primary' size='medium' onClick={() => dispatch(addVehicle('Bike'))}>
            Bike
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Typography variant='h4'>
            {/* {t('home:hello')}  */}
            {vehicle.vehicle}
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Button color='primary' size='medium' onClick={() => dispatch(addVehicle('Car'))}>
            Car
          </Button>
        </Grid>
      </React.Fragment>
    );
  };

  const FormCount = () => {
    return (
      <React.Fragment>
        <Grid item xs={2}>
          <Button color='primary' size='medium' onClick={() => dispatch(NextPage(counter))}>
            +
          </Button>
        </Grid>
        <Grid item xs={2}>
          <Typography variant='h4'>{counter.number}</Typography>
        </Grid>
        <Grid item xs={2}>
          <Button color='primary' size='medium' onClick={() => dispatch(decrement())}>
            -
          </Button>
        </Grid>
      </React.Fragment>
    );
  };

  return (
    <main>
      <div className='hero-content'>
        <Container maxWidth='sm'>
          <Typography component='h1' variant='h2' align='center' color='textPrimary' gutterBottom>
            {title}
          </Typography>
          <Typography variant='h5' align='center' color='textSecondary' paragraph>
            Something short and leading about the collection below—its contents, the creator, etc. Make it short and
            sweet, but not too short so folks don&apos;t simply skip over it entirely.
          </Typography>
          <div className='hero-buttons'>
            <Grid container spacing={2} justify='center'>
              <Grid item>
                <Button variant='contained' color='primary'>
                  Main call to action
                </Button>
              </Grid>
              <Grid item>
                <Button variant='outlined' color='primary'>
                  Secondary action
                </Button>
              </Grid>
            </Grid>
          </div>
        </Container>
      </div>
      <Container className='card-grid' maxWidth='md'>
        <Grid container spacing={4}>
          {cards.map((card) => (
            <Grid item key={card} xs={12} sm={6} md={4}>
              <Card className='card'>
                <CardContent className='card-content'>
                  <Typography gutterBottom variant='h5' component='h2'>
                    Heading
                  </Typography>
                  <Typography>This is a media card. You can use this section to describe the content.</Typography>
                </CardContent>
                <CardActions>
                  <Button size='small' color='primary'>
                    View
                  </Button>
                  <Button size='small' color='primary'>
                    Edit
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <div className='root'>
          <Grid container spacing={1}>
            <Grid container item xs={12} spacing={1}>
              <FormVehicle />
            </Grid>
            <Grid container item xs={12} spacing={1}>
              <FormCount />
            </Grid>
          </Grid>
        </div>
      </Container>
    </main>
  );
};

export default Body;

import { Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <div className='not-found-page'>
      <Typography variant='h3' component='h1' align='center' gutterBottom>
        Woops!
      </Typography>
      <Typography variant='body1' component='p' align='center' gutterBottom>
        An error occured.
      </Typography>
      <div className='center'>
        <Button
          component={Link}
          to='/boards'
          variant='contained'
          color='primary'
          size='large'
          sx={{
            margin: 2,
          }}
        >
          Go back to all boards
        </Button>
      </div>
    </div>
  );
}

export { ErrorPage };

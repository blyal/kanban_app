import { Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className='not-found-page'>
      <Typography variant='h3' component='h1' align='center' gutterBottom>
        404 Page Not Found
      </Typography>
      <Typography variant='body1' component='p' align='center' gutterBottom>
        The page you are looking for does not exist.
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
          See all boards
        </Button>
      </div>
    </div>
  );
}

export { NotFoundPage };

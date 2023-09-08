import { Box, Container, Stack, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/UI';

interface NotFoundPageProps {}

const NotFoundPage: React.FC<NotFoundPageProps> = ({}) => {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate('/');
  };

  return (
    <Container
      sx={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Stack alignItems='center' sx={{ marginTop: '64px' }}>
        <Typography variant='h2' color='textPrimary' gutterBottom>
          404 Not Found
        </Typography>
        <Button variant='outlined' size='large' onClick={navigateToHome}>
          Go to Home
        </Button>
      </Stack>
    </Container>
  );
};

export default NotFoundPage;

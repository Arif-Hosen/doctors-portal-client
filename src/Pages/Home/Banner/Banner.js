import React from 'react';
import Grid from '@mui/material/Grid';
import chair from '../../../images/chair.png';
import bg from '../../../images/bg.png';
import { Button, Typography, Container, Box } from '@mui/material';
// import { Box } from '@mui/system';

// object declare for style
const bannerBg = {
    background: `url(${bg})`
}

const verticalCenter = {
    display: 'flex',
    alignItems: 'center',
    height: '450px'
}
const Banner = () => {
    return (
        <Container style={bannerBg} sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                <Grid style={{ ...verticalCenter, textAlign: 'left' }} item xs={12} md={6} >
                    <Box>
                        <Typography variant='h3'>
                            Your New Smile <br />
                            Start Here
                        </Typography>
                        <Typography variant='h6' sx={{ my: 5, fontSize: 14, fontWeight: 300, color: 'gray' }}>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius tenetur rem eligendi alias ratione officia excepturi. Corporis accusantium itaque similique!
                        </Typography>
                        <Button style={{ backgroundColor: '#54EAD1' }} variant="contained">Get Appointment</Button>
                    </Box>

                </Grid>
                <Grid item xs={4} md={6} style={verticalCenter}>
                    <img style={{ width: '350px' }} src={chair} alt="" />
                </Grid>

            </Grid>
        </Container>
    );
};

export default Banner;
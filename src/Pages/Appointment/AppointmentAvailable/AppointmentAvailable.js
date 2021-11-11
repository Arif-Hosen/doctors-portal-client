import React, { useState } from 'react';
import { Alert, Container, Grid } from '@mui/material';
import Booking from '../Booking/Booking';
import { Typography } from '@mui/material';


const bookings = [
    {
        id: 1,
        name: 'Teeth Orthodonics',
        time: '08.00 AM - 09.00 AM',
        space: 10
    },
    {
        id: 2,
        name: 'Cosmetic Dentristy',
        time: '09.00 AM - 10.00 AM',
        space: 8
    },
    {
        id: 3,
        name: 'Teeth Clenning',
        time: '10.00 AM - 11.00 AM',
        space: 10
    },
    {
        id: 4,
        name: 'Cavity Protection',
        time: '11.00 AM - 12.00 PM',
        space: 5
    },
    {
        id: 5,
        name: 'Pediatric Dental',
        time: '06.00 PM - 07.00 PM',
        space: 9
    },
    {
        id: 6,
        name: 'Oral Surgery',
        time: '07.00 PM - 8.00 PM',
        space: 10
    }

]

const AppointmentAvailable = ({ date }) => {
    const [bookingSuccess, setBookingSuccess] = useState(false);

    return (
        <Container>
            <Typography variant='h4' sx={{ mb: 3, color: 'info.main' }} >Appointment Available on {date.toDateString()}
                {bookingSuccess && <Alert severity="success">Appointment booked successfully!</Alert>}
            </Typography>
            <Grid container spacing={4}>
                {
                    bookings.map(booking => <Booking
                        key={booking.id}
                        booking={booking}
                        date={date}
                        setBookingSuccess={setBookingSuccess}
                    >
                    </Booking>)
                }

            </Grid>
        </Container>
    );
};

export default AppointmentAvailable;
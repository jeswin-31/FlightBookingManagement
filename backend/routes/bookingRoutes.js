const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const Flight = require('../models/Flight');
const Tour = require('../models/Tour');
const { protect } = require('../middleware/authMiddleware');

// ✅ Route to book a flight with seat selection
router.post('/flight', protect, async (req, res) => {
    const { flightId, seats = 1, seatNumbers = [] } = req.body;
  
    try {
      const flight = await Flight.findById(flightId);
      if (!flight) return res.status(404).json({ message: 'Flight not found' });
  
      if (flight.seatsAvailable < seats) {
        return res.status(400).json({ message: 'Not enough seats available' });
      }
  
      const booking = new Booking({
        user: req.user.id,
        flight: flightId,
        seats,
        seatNumbers
      });
  
      await booking.save();
  
      flight.seatsAvailable -= seats;
      await flight.save();
  
      res.status(201).json({ message: 'Flight booked successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Booking failed', error: err.message });
    }
  });
  
// DELETE /api/bookings/:id
router.delete('/:id', protect, async (req, res) => {
    try {
      const booking = await Booking.findById(req.params.id);
      if (!booking) return res.status(404).json({ message: 'Booking not found' });
  
      // Optional: Restore seat count if flight booking
      if (booking.flight && booking.seats) {
        const flight = await Flight.findById(booking.flight);
        if (flight) {
          flight.seatsAvailable += booking.seats;
          await flight.save();
        }
      }
  
      await booking.remove();
      res.json({ message: 'Booking cancelled' });
    } catch (err) {
      res.status(500).json({ message: 'Cancel failed', error: err.message });
    }
  });
  
// ✅ Route to book a tour
router.post('/tour', protect, async (req, res) => {
  const { tourId } = req.body;
  if (!tourId) return res.status(400).json({ message: 'Tour ID is required' });

  try {
    const tour = await Tour.findById(tourId);
    if (!tour) return res.status(404).json({ message: 'Tour not found' });

    if (tour.availableSeats < 1) {
      return res.status(400).json({ message: 'No seats left in this tour' });
    }

    const booking = new Booking({
      user: req.user.id,
      tour: tourId,
      seats: 1
    });

    await booking.save();

    tour.availableSeats -= 1;
    await tour.save();

    res.status(201).json({ message: 'Tour booked successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Booking failed', error: err.message });
  }
});

// ✅ Route to get user's bookings
router.get('/my', protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate('flight')
      .populate('tour');

    const formatted = bookings.map(b => {
      if (b.flight) {
        return {
          _id: b._id,
          type: 'flight',
          flightNumber: b.flight.flightNumber,
          airline: b.flight.airline,
          source: b.flight.source,
          destination: b.flight.destination,
          departureTime: b.flight.departureTime,
          arrivalTime: b.flight.arrivalTime,
          price: b.flight.price,
          seats: b.seats,
          seatNumbers: b.seatNumbers
        };
      } else if (b.tour) {
        return {
          _id: b._id,
          type: 'tour',
          tourTitle: b.tour.title,
          location: b.tour.location,
          startDate: b.tour.startDate,
          endDate: b.tour.endDate,
          price: b.tour.price,
          seats: b.seats
        };
      }
    });

    res.json(formatted);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

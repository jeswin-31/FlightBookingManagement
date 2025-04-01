const mongoose = require('mongoose');
const request = require('supertest');
const expect = require('chai').expect;
const app = require('../server');

let createdFlightId;

before(async () => {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/flight_test');
});

after(async () => {
  await mongoose.connection.close();
});

describe('✈️ Flight API CRUD', function () {
  this.timeout(10000); // extend timeout just in case

  it('POST /api/flights ➡️ should create a new flight', async () => {
    const res = await request(app)
      .post('/api/flights')
      .send({
        flightNumber: 'QA101',
        airline: 'Qatar Airways',
        source: 'Doha',
        destination: 'Sydney',
        departureTime: '2025-05-01T10:00:00Z',
        arrivalTime: '2025-05-01T20:00:00Z',
        price: 850,
        seatsAvailable: 100
      });

    expect(res.statusCode).to.equal(201);
    expect(res.body.flightNumber).to.equal('QA101');
    createdFlightId = res.body._id;
  });

  it('GET /api/flights ➡️ should list all flights', async () => {
    const res = await request(app).get('/api/flights');
    expect(res.statusCode).to.equal(200);
    expect(res.body).to.be.an('array');
  });

  it('PUT /api/flights/:id ➡️ should update flight info', async () => {
    const res = await request(app)
      .put(`/api/flights/${createdFlightId}`)
      .send({ price: 999 });
    expect(res.statusCode).to.equal(200);
    expect(res.body.price).to.equal(999);
  });

  it('DELETE /api/flights/:id ➡️ should delete the flight', async () => {
    const res = await request(app).delete(`/api/flights/${createdFlightId}`);
    expect(res.statusCode).to.equal(200);
    expect(res.body.message).to.include('deleted');
  });
});

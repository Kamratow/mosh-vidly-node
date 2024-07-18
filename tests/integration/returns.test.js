const request = require("supertest");
const mongoose = require("mongoose");
const { Rental } = require("../../models/rental");
const { User } = require("../../models/user");
const { Movie } = require("../../models/movie");

describe("/api/returns", () => {
  let server;
  let customerId;
  let movieId;
  let rental;
  let token;
  let movie;

  const exec = async () => {
    return await request(server)
      .post("/api/returns")
      .set("x-auth-token", token)
      .send({ customerId, movieId });
  };

  beforeEach(async () => {
    server = require("../../index");

    customerId = new mongoose.Types.ObjectId();
    movieId = new mongoose.Types.ObjectId();
    token = new User().generateAuthToken();

    movie = new Movie({
      _id: movieId,
      title: "12345",
      dailyRentalRate: 2,
      genre: { name: "12345" },
      numberInStock: 10,
    });

    await movie.save();

    rental = new Rental({
      customer: {
        _id: customerId,
        name: "12345",
        phone: "12345",
      },
      movie: {
        _id: movieId,
        title: "12345",
        dailyRentalRate: 2,
      },
    });

    await rental.save();
  });

  afterEach(async () => {
    await server.close();
    await Rental.deleteMany({});
    await Movie.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("should return 401 if client is not logged in", async () => {
    token = "";

    const res = await exec();

    expect(res.status).toBe(401);
  });

  it("should return 400 if customerId is not provided", async () => {
    customerId = "";

    const res = await exec();

    expect(res.status).toBe(400);
  });

  it("should return 400 if movieId is not provided", async () => {
    movieId = "";

    const res = await exec();

    expect(res.status).toBe(400);
  });

  it("should return 404 if no rental is found", async () => {
    // Alternative approach instead of removing rental saved in beforeEach we can simply use different movieId
    // movieId = new mongoose.Types.ObjectId();

    await Rental.deleteMany({});

    const res = await exec();

    expect(res.status).toBe(404);
  });

  it("should return 400 if rental is already processed", async () => {
    // Alternative approach for setting rental dateReturned
    // rental.dateReturned = new Date();
    // await rental.save();

    await Rental.findByIdAndUpdate(rental._id, {
      dateReturned: new Date(),
    });

    const res = await exec();

    expect(res.status).toBe(400);
  });

  it("should return 200 if input is valid", async () => {
    const res = await exec();

    expect(res.status).toBe(200);
  });

  it("should set the return date if input is valid", async () => {
    await exec();

    const rentalInDb = await Rental.findById(rental._id);
    const diff = new Date() - rentalInDb.dateReturned;
    expect(diff).toBeLessThan(10 * 1000);
  });

  it("should calculate the rental fee if input is valid", async () => {
    rental.dateOut = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000);
    rental.save();

    await exec();

    const rentalInDb = await Rental.findById(rental._id);
    expect(rentalInDb.rentalFee).toBe(4);
  });

  it("should increase the movie stock if input is valid", async () => {
    await exec();

    const movieInDb = await Movie.findById(movieId);
    expect(movieInDb.numberInStock).toBe(movie.numberInStock + 1);
  });

  it("should return updated rental if input is valid", async () => {
    const res = await exec();

    const rentalInDb = await Rental.findById(rental._id);
    expect(Object.keys(res.body)).toEqual(
      expect.arrayContaining([
        "dateOut",
        "dateReturned",
        "customer",
        "movie",
        "rentalFee",
      ])
    );
  });
});

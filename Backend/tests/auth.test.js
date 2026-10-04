require("dotenv").config();

const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../app");

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();

    const mongoUri = mongoServer.getUri();

    await mongoose.connect(mongoUri);
});

afterAll(async () => {
    await mongoose.connection.close();

    if (mongoServer) {
        await mongoServer.stop();
    }
});

describe("Auth API", () => {

    test("GET / should return backend running", async () => {
        const res = await request(app).get("/");

        expect(res.statusCode).toBe(200);
        expect(res.text).toBe("Backend Running");
    });

    test("POST /api/auth/register should reject missing data", async () => {
        const res = await request(app)
            .post("/api/auth/register")
            .send({});

        expect(res.statusCode).toBeGreaterThanOrEqual(400);
        expect(res.statusCode).toBeLessThan(500);
    });

    test("POST /api/auth/login should reject invalid credentials", async () => {
        const res = await request(app)
            .post("/api/auth/login")
            .send({
                email: "invalid@example.com",
                password: "wrongpassword"
            });

        expect(res.statusCode).toBeGreaterThanOrEqual(400);
        expect(res.statusCode).toBeLessThan(500);
    });

    test("GET /api/auth/me should reject unauthenticated request", async () => {
        const res = await request(app)
            .get("/api/auth/me");

        expect(res.statusCode).toBe(401);
    });

});
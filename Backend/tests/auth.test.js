require("dotenv").config();

const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app");
const db = require("../src/config/database");

beforeAll(async () => {
    await db();
});

afterAll(async () => {
    await mongoose.connection.close();
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
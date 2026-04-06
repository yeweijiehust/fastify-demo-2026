import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { buildApp } from "../src/app.js";

describe("app", () => {
  const app = buildApp();

  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("returns app metadata on GET /", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/",
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toMatchObject({
      success: true,
      data: {
        name: "fastify-latest-demo",
        version: "0.1.0",
      },
    });
  });

  it("returns ok on GET /health", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/health",
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toMatchObject({
      success: true,
      data: {
        status: "ok",
      },
    });
  });

  it("returns ready on GET /ready", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/ready",
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toMatchObject({
      success: true,
      data: {
        status: "ready",
      },
    });
  });

  it("serves OpenAPI JSON on GET /docs/json", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/docs/json",
    });

    const body = response.json();

    expect(response.statusCode).toBe(200);
    expect(body).toMatchObject({
      openapi: "3.1.0",
      info: {
        title: "fastify-latest-demo",
      },
    });
    expect(body.paths).toHaveProperty("/");
    expect(body.paths).toHaveProperty("/health");
    expect(body.paths).toHaveProperty("/ready");
    expect(body.paths).toHaveProperty("/api/v1/system/echo/{name}");
    expect(body.paths).toHaveProperty("/api/v1/system/todos");
    expect(body.paths).toHaveProperty("/api/v1/system/todos/{id}");
  });

  it("returns a structured 404 on unknown routes", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/missing",
    });

    expect(response.statusCode).toBe(404);
    expect(response.json()).toMatchObject({
      success: false,
      error: {
        code: "NOT_FOUND",
        message: "Route not found",
      },
    });
  });

  it("validates params and query on GET /api/v1/system/echo/:name", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/api/v1/system/echo/fastify?uppercase=true&repeat=2",
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toMatchObject({
      success: true,
      data: {
        message: "FASTIFY FASTIFY",
        repeat: 2,
      },
    });
  });

  it("creates and reads a todo with body and params validation", async () => {
    const createResponse = await app.inject({
      method: "POST",
      url: "/api/v1/system/todos",
      payload: {
        title: "Study Fastify TypeBox",
        priority: "high",
      },
    });

    expect(createResponse.statusCode).toBe(201);
    expect(createResponse.json()).toMatchObject({
      success: true,
      data: {
        id: expect.any(Number),
        title: "Study Fastify TypeBox",
        priority: "high",
      },
    });

    const todoId = createResponse.json().data.id;
    const getResponse = await app.inject({
      method: "GET",
      url: `/api/v1/system/todos/${todoId}?includeMeta=true`,
    });

    expect(getResponse.statusCode).toBe(200);
    expect(getResponse.json()).toMatchObject({
      success: true,
      data: {
        todo: {
          id: todoId,
          title: "Study Fastify TypeBox",
          priority: "high",
        },
        meta: {
          includeMeta: true,
        },
      },
    });
  });

  it("returns 400 when request body fails TypeBox validation", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/api/v1/system/todos",
      payload: {
        title: "",
        priority: "urgent",
      },
    });

    expect(response.statusCode).toBe(400);
    expect(response.json()).toMatchObject({
      success: false,
      error: {
        code: "REQUEST_VALIDATION_ERROR",
      },
    });
  });

  it("returns 400 when query validation fails", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/api/v1/system/echo/fastify?repeat=9",
    });

    expect(response.statusCode).toBe(400);
    expect(response.json()).toMatchObject({
      success: false,
      error: {
        code: "REQUEST_VALIDATION_ERROR",
      },
    });
  });

  it("returns a business 404 when todo is not found", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/api/v1/system/todos/99999",
    });

    expect(response.statusCode).toBe(404);
    expect(response.json()).toMatchObject({
      success: false,
      error: {
        code: "TODO_NOT_FOUND",
        message: "Todo not found",
      },
    });
  });
});

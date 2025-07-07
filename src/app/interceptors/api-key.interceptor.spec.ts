import { beforeEach, describe, expect, it } from "vitest";

import {
  HttpClient,
  HttpParams,
  provideHttpClient,
  withInterceptors,
} from "@angular/common/http";
import {
  HttpTestingController,
  provideHttpClientTesting,
} from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";

import { provideZonelessChangeDetection } from "@angular/core";
import { apiKeyInterceptor } from "./api-key.interceptor";

describe("apiKeyInterceptor", () => {
  let http: HttpClient;
  let controller: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([apiKeyInterceptor])),
        provideHttpClientTesting(),
        provideZonelessChangeDetection(),
      ],
    });

    http = TestBed.inject(HttpClient);
    controller = TestBed.inject(HttpTestingController);
  });

  it("adds access_key param to weatherstack requests", () => {
    http
      .get("http://api.weatherstack.com/current", {
        params: new HttpParams().set("query", "42,21"),
      })
      .subscribe();

    const req = controller.expectOne(
      (r) =>
        r.url === "http://api.weatherstack.com/current" &&
        r.params.has("access_key"),
    );

    expect(req.request.params.get("access_key")).toBeDefined();
    req.flush({});
  });

  it("does NOT add access_key to unrelated URLs", () => {
    http
      .get("http://api.example.com/data", {
        params: new HttpParams().set("foo", "bar"),
      })
      .subscribe();

    const req = controller.expectOne(
      (r) => r.url === "http://api.example.com/data",
    );

    expect(req.request.params.has("access_key")).toBe(false);
    req.flush({});
  });
});

import { HttpInterceptorFn } from "@angular/common/http";
import { environment } from "src/environments/environment";

export const apiKeyInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.includes("api.weatherstack.com")) {
    return next(req);
  }

  const cloned = req.clone({
    setParams: {
      access_key: environment.apiKey,
    },
  });

  return next(cloned);
};

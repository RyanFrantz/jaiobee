// Return the milliseconds since epoch.
const epoch = () => {
  return Date.now();
};

/*
> e = new Date(1689627698000)
2023-07-17T21:01:38.000Z
> e.toLocaleString()
'7/17/2023, 5:01:38 PM'
> e.toLocaleString('en-GB', {timeZone: 'UTC'})
'17/07/2023, 21:01:38'
> e.toLocaleString('en-US', {timeZone: 'UTC'})
'7/17/2023, 9:01:38 PM'
> e.toLocaleString('en-US', {timeZone: 'US/Eastern'})
'7/17/2023, 5:01:38 PM'
> e.toLocaleString('en-US', {timeZone: 'US/Pacific'})
'7/17/2023, 2:01:38 PM'
*/
const epochToLocale = (epoch: string): string => {
  const millis = parseInt(epoch);
  const d = new Date(millis);
  return d.toLocaleString(); // TODO: You know! Timezones!
};

/* A set of regular expressions representing routes we'll use to check for
 * the presence of a cookie.
 * NOTE: This being the top-level middleware, we'll omit some routes we
 * want to protect and instead do something similar in lower-level
 * middleware.
 * For example, /api routes will be protected in in routes/api/_middleware.ts.
 */
const protectedRoutes = [
  /^\/role/,
];

// Returns truthy if a URL path matches a protected route; falsy otherwise.
// Useful to avoid doing work like validating JWTs on resources like static
// assets and /_frsh/
const isProtectedRoute = (path) => {
  return protectedRoutes.find((re) => path.match(re));
};

export { epoch, epochToLocale, isProtectedRoute };

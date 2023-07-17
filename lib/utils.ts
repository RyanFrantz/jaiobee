// Return the seconds since epoch.
const epoch = () => {
  return Date.parse(new Date()) / 1000; // Strip millis
}

export { epoch };

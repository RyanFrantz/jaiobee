// Return the milliseconds since epoch.
const epoch = () => {
  return Date.now();
}

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
}

export { epoch, epochToLocale };

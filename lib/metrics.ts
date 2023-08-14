const orlySecret = Deno.env.get("ORLY_SECRET") || "";
const orlyBaseUrl = "https://orly.relaymetrics.pro";

const headers = {
  "Authorization": `Bearer ${orlySecret}`
};

// Given a string representing a counter we want to increment, issue a request
// to our OpenTelemetry relay service.
const sendMetric = async(metricName: string) => {
  console.log(`Sending metric '${metricName}'`);
  const url = `${orlyBaseUrl}/${metricName}`;
  try {
    await fetch(url, {
      headers: headers
    })
  } catch (error) {
    console.log(`Failed to send metric '${metricName}': ${error}`);
  }
};

export { sendMetric };

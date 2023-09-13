////// TO BE DEPRECATED SOON

const orlySecret = Deno.env.get("ORLY_SECRET") || "";
const orlyBaseUrl = "https://orly.relaymetrics.pro";

const headers = {
  "Authorization": `Bearer ${orlySecret}`
};

// Given a string representing a counter we want to increment, issue a request
// to our OpenTelemetry relay service.
const sendMetric = async(metricName: string) => {
  const url = `${orlyBaseUrl}/${metricName}`;
  try {
    await fetch(url, {
      headers: headers
    })
  } catch (error) {
    console.log(`Failed to send metric '${metricName}': ${error}`);
  }
};

//////

import { metrics } from "https://esm.sh/@opentelemetry/api@1.6.0";
import { Resource } from "https://esm.sh/@opentelemetry/resources@1.17.0";
import {
  AggregationTemporality,
  MeterProvider,
  PeriodicExportingMetricReader,
} from "https://esm.sh/@opentelemetry/sdk-metrics@1.17.0";
// Had to fallback to an npm specifier. Deno Deploy now supports npm specifiers!
import { OTLPMetricExporter } from "npm:@opentelemetry/exporter-metrics-otlp-proto@0.43.0";

const honeycombTeam = Deno.env.get("HONEYCOMB_TEAM");
const honeycombDataset = Deno.env.get("HONEYCOMB_DATASET");
const denoRegion = Deno.env.get("DENO_REGION") || "local-dev-or-digital-ocean";

// Initialize our OTLP rig and return a Meter that we can use to register
// instruments.
const initOTLP = () => {
  // Register a service.name so this isn't set as 'unknown_service'.
  const resource = Resource.default().merge(
    new Resource({
      "service.name": "jaiobee",
    }),
  );

  // Ship to Honeycomb.
  const metricExporter = new OTLPMetricExporter({
    url: "https://api.honeycomb.io/v1/metrics",
    headers: {
      "x-honeycomb-team": honeycombTeam,
      "x-honeycomb-dataset": honeycombDataset, // Where is this reflected?
    },
    temporalityPreference: AggregationTemporality.DELTA,
  });

  // Export every minute.
  const metricReader = new PeriodicExportingMetricReader({
    exporter: metricExporter,
    exportIntervalMillis: 60000,
  });

  const meterProvider = new MeterProvider({ resource: resource });
  meterProvider.addMetricReader(metricReader);
  metrics.setGlobalMeterProvider(meterProvider);

  const meter = metrics.getMeter("webapp");
  return meter;
};

const meter = initOTLP();

// Given a string representing a counter, register an instrument by that name
// and increment it.
const sendMetricDirect = (counterName: string): void => {
  const counter = meter.createCounter(counterName);
  // Annotate with the Deno region.
  counter.add(1, { denoRegion: denoRegion });
};

export { sendMetric, sendMetricDirect };

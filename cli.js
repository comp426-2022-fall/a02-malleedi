#!/usr/bin/env node

import minimist from "minimist";
import fetch from "node-fetch";
import moment from "moment-timezone";

const args = minimist(process.argv.slice(2));
const timezone = moment.tz.guess();

if (args.h) {
  try {
    console.log(`Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE
    -h            Show this help message and exit.
    -n, -s        Latitude: N positive; S negative.
    -e, -w        Longitude: E positive; W negative.
    -z            Time zone: uses tz.guess() from moment-timezone by default.
    -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.
    -j            Echo pretty JSON from open-meteo API and exit.`)
    process.exit(0)
  }
  catch {
    process.exit(1)
  }
}


let latitude = '35.91';
// declare latitude
if (args.n) {
  latitude = args.n
}
if (args.s) {
  latitude = args.s
}


let longitude = '-79.05';
// declare longitude
if (args.e) {
  longitude = args.e
}
if (args.w) {
  longitude = args.w
}

//declare timezone
if (args.t) {
  timezone = args.t
}

// Make a request
const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&daily=precipitation_hours&current_weather=true&timezone=America%2FNew_York');
// Get the data from the request
const data = await response.json();

if (!args.h) {
  console.log(data)

  const days = args.d

  if (days == 0) {
    console.log("today.")
  } else if (days > 1) {
    console.log("in " + days + " days.")
  } else {
    console.log("tomorrow.")
  }
}

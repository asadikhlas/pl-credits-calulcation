# SMS Credit Calculator

> This NPM library provides utility functions to calculate the credits of sending SMS and MMS messages, taking into account various factors such as text content, subscriber count, and the presence of multimedia content.

## Prerequisites

This project requires NodeJS and NPM.
[Node](http://nodejs.org/) and [NPM](https://npmjs.org/) are really easy to install.
To make sure you have them available on your machine,
try running the following command.

```sh
$ npm -v && node -v
```

## Installation

To install and set up the library, run:

```sh
$ npm install sms-credit-calculator
```

Or if you prefer using Yarn:

```sh
$ yarn add --dev sms-credit-calculator
```

## Usage

### Importing the Library

```js
import { getCreditsCostAndStats } from 'sms-credit-calculator';
```

### Counting Extended GSM Characters

```js
const text = "Hello World ~^|\\[]{}€";
const extendedGsmCount = getExtGsmCharactersCount(text);
console.log(extendedGsmCount); // Output will be the count of extended GSM characters
```

### Calculating SMS/MMS Credits Cost

```js
const text = "Your message content here";
const unicodeEncoding = false; // true for Unicode, false for standard GSM encoding
const senderNumber = { sms_cost: 1, mms_cost: 1 }; // example costs
const subscribersCount = 100;
const imagesAndVideos = []; // Add image or video details if any
const withSegmentLogic = true; // Set to true to consider segment logic

const stats = getCreditsCostAndStats(text, unicodeEncoding, senderNumber, subscribersCount, imagesAndVideos, withSegmentLogic);

console.log(stats);

```

## API Reference

### getExtGsmCharactersCount(text)

Counts the extended GSM characters in the provided text.

### Parameters

* `text` (string): The text string to analyze.

### Returns:

* (number): Count of extended GSM characters.

### getCreditsCostAndStats(text, unicodeEncoding, senderNumber, subscribersCount, imagesAndVideos,withSegmentLogic)

Calculates the cost and provides statistics for sending SMS/MMS messages.

* ### Parameters:
  * `text` (string): The text of the message.
  * `unicodeEncoding` (boolean): Indicates Unicode encoding.
  * `senderNumber` (object): Contains the costs of sending SMS and MMS.
  * `subscribersCount` (number): Number of subscribers.
  * `imagesAndVideos` (array): Multimedia content.
  * `withSegmentLogic` (boolean): Flag for segment logic consideration.

### Returns:

* (object): An object containing calculated credits, character count, SMS count, MMS count, and a warning for long messages.

## Contributing

Contributions, issues, and feature requests are welcome. Feel free to check [issues page](https://github.com/asadikhlas/pl-credits-calulcation/issues) if you want to contribute.


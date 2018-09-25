Vidal Service Discovery for Angular
===

![alt travis](https://travis-ci.org/vidal-community/ng2-discovery.svg?branch=master)

# Use It

Install this library :

    npm install @vidal-community/ng2-discovery

## Angular compatibility

You have to use the `ng2-discovery` version that is compatible with your version of [Angular](https://github.com/angular/angular).
Here is the compatibility matrix:

| ng2-discovery | Angular |
| ------------- | ------- |
| ^1            | <=4     |
| ^2            | ^6      |

See compatible versions on [npm semver calculator](https://semver.npmjs.com).

# Build It

    npm install

# How to build and publish

To publish a pre-release, run:

    npm run prepare-prerelease
    npm run build-and-publish
    
To publish a release, run:

    npm run prepare-release
    npm run build-and-publish
    
It will increase version with chosen strategy, then build and package your 
local workspace, and finally publish it on `npm`.

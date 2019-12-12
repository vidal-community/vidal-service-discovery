Vidal Service Discovery for Angular
===

![alt travis](https://travis-ci.org/vidal-community/ng2-discovery.svg?branch=master)

# Use It

Install this library :

    npm install @vidal-community/ng2-discovery

## Angular compatibility

You have to use the `ng2-discovery` version that is compatible with your version of [Angular](https://github.com/angular/angular).

You need `@angular` dependencies in your application to use this library.

Here is the compatibility matrix:

| ng2-discovery | Angular |
| ------------- | ------- |
| ^1            | <=4     |
| ^2            | >=6      |
| ^3            | >=8.2.0      |
See compatible versions on [npm semver calculator](https://semver.npmjs.com).

# Build It

    npm install

# How to build and publish

To publish a pre-release, run:

    npm run build-and-publish-prerelease
    
To publish a release, run:

    npm run publish-<major/minor/patch>
    
It will increase version with chosen strategy, then build and package your 
local workspace, and finally publish it on `npm`.

Then you may use it (for testing purpose) in any project, installing it running:

    npm install @vidal-community/ng2-discovery@<VERSION>

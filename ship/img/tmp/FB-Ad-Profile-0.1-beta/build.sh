#!/bin/bash

watchify --debug -t [ babelify --presets [ es2015 react ] --plugins [transform-object-rest-spread] ] src/app/app.js -o extension/js/bundle.js & watchify --debug -t [ babelify --presets [ es2015 react ] --plugins [transform-object-rest-spread] ] src/contentscripts/inspector.js -o extension/js/inspector.js

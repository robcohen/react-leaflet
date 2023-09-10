#!/bin/sh

wget -i geo.json.url -O geo.json.new

if cmp -s geo.json geo.json.net #returns 0 if identical
then
echo No change in GeoJSON
exit 1
fi
echo GeoJSON is NEW
rm geo.json
mv geo.json.new geo.json
exit 0

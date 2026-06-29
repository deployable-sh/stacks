#!/bin/sh
cd /etc/logto || exit 1
export CI=true
npm run cli db seed -- --swe || echo "seed: already applied or skipped"
npm run alteration deploy latest || echo "alteration deploy: nothing to do or failed"
exec npm start

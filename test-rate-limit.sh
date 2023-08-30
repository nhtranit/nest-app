#!/bin/bash

# Loop to send multiple requests
for i in {1..11}; do
  curl http://localhost:3000/get
done

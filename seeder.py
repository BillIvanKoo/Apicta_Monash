import json
import requests
import sys
import time

with open(sys.argv[1], "r") as f:
    data = json.load(f)["data"]

url = 'http://localhost:8888/packets/'
for i in data:
    requests.post(url, json=i)
    time.sleep(1)
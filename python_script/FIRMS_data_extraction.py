# Extraction of actual fire data through FIRMS API
import pandas as pd
import json
import datetime

# Parameters
MAP_KEY = "7b7e31df56348b80ea3a445366b5c576"
DAY_RANGE = '7'
OUTPUT_FILE = "fire_dataset.json"
         

# We want to access the VIIRS_NOAA20_NRT data 
fire_dataset_url = 'https://firms.modaps.eosdis.nasa.gov/api/area/csv/' + MAP_KEY + '/VIIRS_NOAA20_NRT/world/' + DAY_RANGE
df = pd.read_csv(fire_dataset_url)

# Convert 'acq_time' to the desired format and later generate the date format
df['acq_time'] = df['acq_time'].astype(str).str.zfill(4)



df['date'] = df['acq_date'].astype(str) + 'T' + df['acq_time'].str[:2] + ':' + df['acq_time'].str[2:4] + ':00'

# Generate the list containing the JSON objects representing each fire
json_list_fires = []
for index, row in df.iterrows():
    # Generate JSON object for each file
    json_obj = {
        "type": "Feature",
        "geometry": {
            "type": "Point",
            "coordinates": [
                row['longitude'],
                row['latitude']
                ]
            },
        "properties": {
            "date": row['date']
            }
        }
    json_list_fires.append(json_obj)
    

# Generate final JSON object 
final_json_fires = {
    "type": "FeatureCollection",
    "features": json_list_fires
}

# Write json file
with open(OUTPUT_FILE, 'w') as json_file:
    json.dump(final_json_fires, json_file, indent=4)

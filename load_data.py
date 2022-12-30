import os
import pandas as pd
from demoapp.models import City

df = pd.read_csv(os.path.join('data', 'POPS.csv'), 
        usecols=['City', 'State', 'Population', 'Metropolitan', 'Sexratio', 'Literacy'])

numeric_cols = ['Population', 'Metropolitan', 'Sexratio', 'Literacy']
for col in numeric_cols:
    df[col] = pd.to_numeric(df[col].apply(lambda s: str(s).replace(',', '')))

db_cols = ['city', 'state', 'population', 'metropolitan', 'sex_ratio', 'literacy']


df = df.rename(columns={x:y for x,y in zip(df.columns, db_cols)})

for z in df.to_dict(orient='records'):
    City.objects.create(**z)

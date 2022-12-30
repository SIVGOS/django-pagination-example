## Demo Application - Django
This is a demo application to explain the working of Django.
## Requirements
* Python 3 (Preferrably python>3.8)
* SQLITE3 (Database)
## Steps to start the project (On Linux)
### Create a Python Virtual Environment
```
python3 -m venv env
```
### Activate the Python Virtual Environment
```
source env/bin/activate
```
### Install dependency
```
pip install -r requirements.txt
```
### Perform migration
Migration will automatically create the tables in the SQLITE Database
```
python manage.py migrate
```
### Load Population dataset to the SQLITE Database
```
python manage.py < load_data.py
```

### Start the server
```
python manage.py runserver
```
## Open the project in Browser
Follow the link:
<a href="http://127.0.0.1:8000">http://127.0.0.1:8000</a>
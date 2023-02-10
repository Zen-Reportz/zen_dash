First clone repo and create new branch from main branch.

for example: git checkout -b demo

# Setup Frontend:
Open frontend folder as project

## pre-requesite
 - node.js 
 - npm
 - angular

install node.js and npm from here: https://nodejs.org/en/

install angular cli from here: https://angular.io/cli

```
npm install .
```

## how to run frontend:
```
ng serve
```

# Setup backend 

## pre-requesite
- python
- poetry

Install poetry from here: https://python-poetry.org/docs/

run following command from project root directory
```
poetry install
pip install -e .
```

run demo server:
```
make run_demo
```


## How to develop togather.
We will use reverse proxy using apache to develop to gather.

for linux:
copy app.config file from dev folder to `/etc/apache2/sites-enabled`, then restart apache2

```
sudo systemctl restart apache2.service
```

Once you restart server, backend demo server and front end will start communicating it.

# How to build it for deployment
1. Compile from front end by running following command from fronend folder
    ```
    sh run.sh
    ```
    this will complie frontend code into zen_dash/zen_dash/static folder.
2. push code to branch
3. create pull request


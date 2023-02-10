First, clone the repo and create a new branch from the main branch.

For example:

```git checkout -b demo```

## Setup Frontend:
Open the frontend folder as the project.

### pre-requisite
* node.js
* npm
* angular

install node.js and npm from here: https://nodejs.org/en/
install angular cli from here: https://angular.io/cli

```
npm install .
```

### how to run frontend:
```
ng serve
```

## Setup backend 

## pre-requesite
- Python
- poetry

Install poetry from here: https://python-poetry.org/docs/

run the following command from the project root directory

```
poetry install
pip install -e .
```

run demo server:
```
make run_demo
```

### How to build communication between the frontend and backend?
We will use reverse proxy using apache to develop to gather.
for Linux: copy app.config file from the dev folder to `/etc/apache2/sites-enabled`, then restart apache2.

```
sudo systemctl restart apache2.service
```

Once you restart the server, the backend demo server and front end will start communicating it.


# How to build it for deployment
1. Compile from the frontend by running the following command from the frontend folder.
    ```
    sh run.sh
    ```
    this will complie frontend code into zen_dash/zen_dash/static folder.
2. push code to branch
3. create pull request


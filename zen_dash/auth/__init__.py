from datetime import datetime, timedelta
from typing import Union
from jose import jwt
from fastapi import Cookie, Response, HTTPException
import os

def login_support(response: Response, data: dict, 
                  expires_delta: Union[timedelta, None] = None
                  ):
    
    secret_key = os.environ['SECRET_KEY']
    algorithm = os.environ.get('ALGORITHM', 'HS256')
    secure = os.environ.get('secure', True)

    # algorithm:str="HS256", 
    to_encode = data.copy()
    if expires_delta:
        expire = (datetime.utcnow() + expires_delta).strftime('%s')
    else:
        expire = (datetime.utcnow() + timedelta(minutes=24*60*60)).strftime('%s')
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, secret_key, algorithm=algorithm)
    response.set_cookie("auth_token", encoded_jwt, expires=expire, 
                        samesite='strict', secure=secure )
    return

async def auth_required(auth_token:str =  Cookie(None)):
    secret_key = os.environ['SECRET_KEY']

    algorithm = os.environ.get('ALGORITHM', 'HS256')

    x = HTTPException( status_code=401, detail="UnAuthorized")
    if not auth_token:
        print("User is Not logged in")
        raise x
    try:
        jw = jwt.decode(auth_token,key=secret_key, algorithms=algorithm)
        if datetime.fromtimestamp(int(jw.get("exp"))) < datetime.utcnow():
            print("Token Expired")
            raise x

    except Exception as e:
        print("cant parsed JWT")
        print(e)
        raise x

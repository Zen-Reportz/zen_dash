from datetime import datetime, timedelta
from typing import Union
from fastapi.responses import JSONResponse
from jose import JWTError, jwt
from fastapi import Response, Request, HTTPException
from enum import Enum

class Env(Enum):
    """ Docstring for class InstanceType
    Instance Type required for ReturnData

    :return: Instance Type for Enum
    :rtype: Enum

    """
    LOCAL= False
    PROD = True


def login_support(response: Response, data: dict, secret_key: str, 
                  env: Env, 
                  algorithm:str="HS256", expires_delta: Union[timedelta, None] = None
                  ):
    to_encode = data.copy()
    if expires_delta:
        expire = (datetime.utcnow() + expires_delta).strftime('%s')
    else:
        expire = (datetime.utcnow() + timedelta(minutes=24*60*60)).strftime('%s')
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, secret_key, algorithm=algorithm)
    response.set_cookie("auth_token", encoded_jwt, expires=expire, 
                        samesite='strict', secure=env.value )
    return




class LoginMiddleWare:
    def __init__(self, secret_key:str, algorithm:str="HS256"):
        self.secret_key = secret_key
        self.algorithm = algorithm
        pass 
    
    async def __call__(self, request: Request, call_next):
        # do something with the request object
        token = request.cookies.get('auth_token')
        x = JSONResponse({"detail": "Authorized"}, status_code=401)
        
        if token is None:
            raise x
        x.delete_cookie("auth_token")
        try:
            jw = jwt.decode(token,key=self.secret_key, algorithms=self.algorithm)
            if datetime.fromtimestamp(jw.get("exp")) > datetime.utcnow():
                return await call_next(request)
            else:
                raise x

        except:
            raise x
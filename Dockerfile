FROM python:3.8.17

COPY demo/requirements.txt /demo/requirements.txt
RUN pip install -r /demo/requirements.txt

COPY demo /demo
WORKDIR /demo
EXPOSE 8888
ENV PYTHONPATH /demo

CMD ["/bin/bash", "demo.sh"]
# uvicorn main:app --workers 10
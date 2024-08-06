#!/usr/bin/env python 
# -*- coding: utf-8 -*- 
# @Time     : 2024/7/31 10:16
# @Author   : Github@AXYZdong
# @File     : app.py
# @Software : PyCharm
from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from websocket_handler import websocket_endpoint

app = FastAPI()

app.mount("/static", StaticFiles(directory="static"), name="static")


@app.get("/", response_class=HTMLResponse)
async def get_form():
    with open("static/index.html") as f:
        html_content = f.read()
    return HTMLResponse(content=html_content)


app.websocket("/ws")(websocket_endpoint)

if __name__ == "__main__":
    import uvicorn

    uvicorn.run("app:app", host="127.0.0.0", port=5001, reload=True)

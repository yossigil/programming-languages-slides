#!/bin/sh

jupyter notebook --NotebookApp.tornado_settings='{"headers":{"Access-Control-Allow-Origin": "*", "Content-Security-Policy": "frame-ancestors self http://localhost:8000/"}}' --NotebookApp.token='' --NotebookApp.password='' --NotebookApp.allow_origin='*' --NotebookApp.disable_check_xsrf="True" --no-browser --NotebookApp.port=16789
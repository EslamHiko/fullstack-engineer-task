# Imports
from flask import Flask, flash, request, redirect, url_for
from flask_cors import CORS,cross_origin
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import create_engine
import sqlite3
import os

# app initialization
app = Flask(__name__)
CORS(app)

app.debug = True
conn = sqlite3.connect('data.sqlite')
cur = conn.cursor()

basedir = os.path.abspath(os.path.dirname(__file__))

# Configs
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'data.sqlite')
app.config['SQLALCHEMY_COMMIT_ON_TEARDOWN'] = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
app.config['UPLOAD_FOLDER'] = basedir+"/uploads"
app.config['DOWNLOAD_FOLDER'] = os.path.dirname(os.path.abspath(__file__)) + '/downloads/'
# Modules
db = SQLAlchemy(app)
engine = create_engine("sqlite:///"+os.path.join(basedir, 'data.sqlite'))

# Setting up the database
if not engine.dialect.has_table(engine, "candidates"):
    db.create_all()

from .models import *
from .routes import *
from flask import Flask
from flask_migrate import Migrate
from .config import Config

app = Flask(__name__)
app.config.from_object(Config)

migrate = Migrate(app, db, render_as_batch=True)
db.init_app(app)
rest.init_app(app)

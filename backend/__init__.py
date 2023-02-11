from flask import Flask
from flask_migrate import Migrate
from flask_cors import CORS
from .config import Config
from .routes import *
from .models import *

app = Flask(__name__)
CORS(app, supports_credentials=True)
app.config.from_object(Config)

migrate = Migrate(app, db, render_as_batch=True)
db.init_app(app)
rest.init_app(app)

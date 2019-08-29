# Imports
from graphene_sqlalchemy import SQLAlchemyObjectType, SQLAlchemyConnectionField
from sqlalchemy import create_engine
from settings import db, basedir
import graphene
import os

# Models
class Candidate(db.Model):
    __tablename__ = 'candidates'
    uuid = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(256))
    first_name = db.Column(db.String(256))
    last_name = db.Column(db.String(256))
    logic_test_score = db.Column(db.Integer)
    job = db.Column(db.String(256))

# Schema Objects
class CandidateObject(SQLAlchemyObjectType):
    class Meta:
        model = Candidate
        interfaces = (graphene.relay.Node, )
# Schema Query
class Query(graphene.ObjectType):
    node = graphene.relay.Node.Field()
    candidates = SQLAlchemyConnectionField(CandidateObject)

# Creating database tables
engine = create_engine("sqlite:///"+os.path.join(basedir, 'data.sqlite'))
if not engine.dialect.has_table(engine, "candidates"):
    db.create_all()

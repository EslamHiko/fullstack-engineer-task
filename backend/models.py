# Imports
from graphene_sqlalchemy import SQLAlchemyObjectType, SQLAlchemyConnectionField
from settings import db
import graphene

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

# Imports
from models import CandidateObject, Candidate
from settings import db
import graphene

# Mutations
'''
 * CreateOrUpdateCandidate
 * graphql mutation to create new candidates or update existing ones
 * @return {graphql query}
'''
class CreateOrUpdateCandidate(graphene.Mutation):
    class Arguments:
        uuid = graphene.Int()
        email = graphene.String(required=True)
        firstName = graphene.String(required=True)
        lastName = graphene.String(required=True)
        logic_test_score = graphene.Int()
        job = graphene.String(required=True)

    candidate = graphene.Field(lambda: CandidateObject)
    def mutate(self, info ,email, firstName, lastName, logic_test_score,job, **kwargs):
        uuid = kwargs.get('uuid',None)
        candidate = Candidate.query.filter_by(uuid=uuid).first()
        # create variable to determine if we are going to add new candidate or edit existing one
        create = 0
        if candidate is None:
            candidate = Candidate()
            create = 1
        candidate.email = email
        candidate.first_name = firstName
        candidate.last_name = lastName
        candidate.logic_test_score = 10 if logic_test_score > 10 else logic_test_score
        candidate.job = job
        print(candidate.job)
        if create is 1:
            db.session.add(candidate)
        else:
            db.session.merge(candidate)
        db.session.commit()
        return CreateOrUpdateCandidate(candidate=candidate)
'''
 * RemoveCandidate
 * graphql mutation to remove candidates by their uuid
 * @return {graphql query}
'''
class RemoveCandidate(graphene.Mutation):
    class Arguments:
        uuid = graphene.Int()

    ok = graphene.Boolean()
    def mutate(self, info , uuid):
        candidate = Candidate.query.filter_by(uuid=uuid).first()
        db.session.delete(candidate)
        db.session.commit()
        return RemoveCandidate(ok=True)

'''
 * TruncateCandidates
 * graphql mutation to remove all candidates
 * @return {graphql query}
'''
class TruncateCandidates(graphene.Mutation):
    ok = graphene.Boolean()
    def mutate(self, info):
        Candidate.query.delete()
        db.session.commit()
        return RemoveCandidate(ok=True)

class Mutation(graphene.ObjectType):
    CreateOrUpdateCandidate = CreateOrUpdateCandidate.Field()
    RemoveCandidate = RemoveCandidate.Field()
    TruncateCandidates = TruncateCandidates.Field()

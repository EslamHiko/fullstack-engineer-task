# Imports
from models import Candidate
from settings import db
import csv

'''
 * getCandidates
 * function to get all candidates sotred by their logic test score
 * @return {graphql query}
'''
def getCandidates():
    candidates = [];
    for candidate in Candidate.query.all():
        candidates.append({
        'uuid':candidate.uuid,
        'email':candidate.email,
        'first_name': candidate.first_name,
        'last_name': candidate.last_name,
        'logic_test_score': candidate.logic_test_score,
        'job': candidate.job
        });
    candidates.sort(key=lambda x: x['logic_test_score'], reverse=True)
    return candidates

'''
 * storeCSV
 * function to store data from csv files
 * @return {boolean}
'''
def storeCSV(filePath):
    with open(filePath) as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        for (index,row) in enumerate(csv_reader):
            if index != 0:
                candidate = Candidate()
                candidate.email = row[0]
                candidate.first_name = row[1]
                candidate.last_name = row[2]
                candidate.logic_test_score = row[3]
                candidate.job = row[4]
                db.session.add(candidate)
    db.session.commit()
    return True

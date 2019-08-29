# Imports
from flask import Flask, flash, request, send_file
from flask_graphql import GraphQLView
from settings import db, app, basedir
from models import Query,Candidate
from mutations import Mutation
import graphene
import helpers
import json
import csv

# Routes
'''
 * Route {/}
 * index route to get candidates sorted by their logic test score
 * @return {json}
'''
@app.route('/')
def index():
    return {'candidates':helpers.getCandidates()}

'''
 * Route {/import-csv}
 * route to import candidates from csv files
 * @return {json}
'''
@app.route('/import-csv', methods=['POST'])
def importCSV():
    file = request.files['file']
    # moving csv file to uploads folder
    uploadPath = basedir+'/uploads/'+file.filename
    file.save(uploadPath)
    # helper function to store data from csv files
    helpers.storeCSV(uploadPath)


    candidates = helpers.getCandidates()
    return {'candidates':candidates}

'''
 * Route {/export}
 * route to export candidates from sqlite database as csv file
 * @return {file}
'''
@app.route('/export')
def exportCSV():
    with open('export.csv', 'w+') as csvFile:
        writer = csv.writer(csvFile)
        row = ['uid','email','first_name','last_name','logic_test_score','job','rate'];
        writer.writerow(row)
        candidates = helpers.getCandidates()
        for candidate in candidates:
            row = [candidate['uuid'],candidate['email'],candidate['first_name'],candidate['last_name'],candidate['logic_test_score'],candidate['job']]
            writer.writerow(row)
        csvFile.close()
        return send_file('export.csv', as_attachment=True, attachment_filename="candidates.csv")


# loading graphql Schema
schema = graphene.Schema(query=Query,mutation=Mutation)


'''
 * Route {/graphql}
 * route to manage graphql mutations and queries
 * @return {graphql query}
'''
app.add_url_rule(
    '/graphql',
    view_func = GraphQLView.as_view(
        'graphql',
        schema=schema,
        graphiql=True
    )
)

'''
 * Route {/reset}
 * a function to truncate data from the database and import the default csv file
 * @return {json}
'''
@app.route('/reset')
def reset():
    Candidate.query.delete()
    db.session.commit()
    helpers.storeCSV('default.csv')
    return 'ok'

if __name__ == '__main__':
     app.run()

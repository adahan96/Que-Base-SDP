from copy import deepcopy
from datetime import datetime, timedelta

from .question import Question
from app.utils.db import getDb
from app.helpers.query import CustomQueryGenerator
from app.helpers.constant import LIMIT


COLLECTION_NAME = "searchedQuestions"
EXPIRE_TIME = 120

'''
    Model class for cache for searching
'''
class SearchedQuestion():

    '''
        Initializing a searched question

        :param: (string) data - the question with its properties
    '''
    def __init__(self, data):
        self.body = data['body']


    '''
        Inserting a question with its analysis to DB

        :return: (tuple) (status, message)
    '''
    def insert_one(self):
        db = getDb()

        # Temporay document indexing
        db[COLLECTION_NAME].create_index([('createdAt', 1), ("expireAfterSeconds", EXPIRE_TIME)])

        if self.check_exists():
            return False, "This question has already been searched"
        else:
            insertData = deepcopy(vars(self))
            insertData['createdAt'] = datetime.utcnow() + timedelta(hours = 3)

            db[COLLECTION_NAME].insert_one(insertData)

        return True, "Question is inserted into searched collection"


    '''
        Determining whether a questions is searched before

        :return: (bool) status
    '''
    def check_exists(self):
        db = getDb()

        existing = db[COLLECTION_NAME].find_one({"body": self.body})

        if existing is not None:
            # Setting the existing data
            self.questionsData = existing['questionsData']

            return True

        return False


    '''
        Setting the cache data
    '''
    def setCacheData(self, questionsData):
        self.questionsData = questionsData


    '''
        Static method for returning the results with the given query
    '''
    def get(self, threshold, pageNumber = 1, filterData = None):
        db = getDb()

        if self.questionsData:
            # Filtering according to threshold
            filterThreshold = list(filter(lambda x: x['similarityRate'] >= threshold, self.questionsData))

            # Splitting according to ids and rates
            questionsIds = list(map(lambda x: x['questionId'], filterThreshold))
            similarityRates = list(map(lambda x: x['similarityRate'], filterThreshold))

            if len(questionsIds) == 0:
                return {"data": []}

            # Generatin query
            finalQuery = None
            queryGen = CustomQueryGenerator()
            queryGen.addIdFields(questionsIds[(pageNumber * LIMIT) - LIMIT: pageNumber * LIMIT])
            status, queryDict = queryGen.getCompleteQuery()

            if not status:
                return None

            # Adding filter query
            if filterData:
                filterDict, sortingAttr, sortOrder = filterData

                # Merging two queries
                mergedQueryDict = CustomQueryGenerator.appendTwoQueries(queryDict, filterDict)

                if mergedQueryDict:
                    finalQuery = mergedQueryDict
                else:
                    finalQuery = queryDict
            else:
                finalQuery = queryDict

            numberOfPages = len(questionsIds) // LIMIT
            print(numberOfPages)

            # Sending final query
            results = Question.find(finalQuery, pageNumber = 1, numberOfPages = numberOfPages)
            questions = list(results["data"])

            print("value", results['numberOfPages'])

            # Adding the similarity rates to the result
            for i in range(len(questions)):
                idx = questionsIds.index(questions[i]['_id'])
                questions[i]['similarityRate'] = similarityRates[idx]

            # Updating the questions in the dict
            results["data"] = questions

            return results
        else:
            return None

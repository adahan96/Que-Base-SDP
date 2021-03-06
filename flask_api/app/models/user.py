from copy import deepcopy

from app.models import Model
from app.utils.db import getDb
from app.utils.encrypt import hashPassword, validatePassword

COLLECTION_NAME = "users"


'''
    Model class for user
'''
class User(Model):
    '''
        Creating a user

        :param: (dict) userObj - object contains the properties of the user
    '''
    def __init__(self, userObj):

        super().__init__(userObj, COLLECTION_NAME)

        if vars(self) == {}:
            self.firstname = userObj["firstname"]
            self.lastname = userObj["lastname"]
            self.username = userObj["username"]
            self.email = userObj["email"]
            self.password = hashPassword(userObj["password"])
            self.favoriteQuestions = []
            self.friends = []
            self.feedList = []


    '''
        Inserting into db (Registering)
    '''
    def insert_one(self):
        db = getDb()

        # Statuses for existence
        usernameExists, emailExists = self.check_exists()

        if usernameExists is True:
            return False, "Username already exists"
        elif emailExists is True:
            return False, "Email already exists"
        else:
            # Insertion
            db[COLLECTION_NAME].insert_one(vars(self))

            return True, "User is created successfully"

    '''
        Updating the question properties

        :param: updateValues - new values for update
    '''
    def update_one(self, updateValues):

        temp = deepcopy(updateValues)
        if updateValues.get('password') != vars(self).get('password'):
            temp['password'] = hashPassword(temp['password'])

        return super().update_one(temp, COLLECTION_NAME)


    '''
        Getting the user
    '''
    @staticmethod
    def find_one(email, password):
        db = getDb()

        # Fetching...
        user = db[COLLECTION_NAME].find_one({"email": email})

        # If no user
        if user is None:
            return None

        userPassword = user['password']

        # Password validation
        isCorrectPassword = validatePassword(userPassword, password)

        if isCorrectPassword is True:
            userData = deepcopy(user)
            del userData['password']     # Removing the password

            return userData
        else:
            return None


    '''
        Determining whether a user with such username/email exists in DB

        :return: (bool, bool) statuses for username and email
    '''
    def check_exists(self):
        db = getDb()

        usernameExisting = db[COLLECTION_NAME].find_one({"username": self.username})
        emailExisting = db[COLLECTION_NAME].find_one({"email": self.email})

        usernameResult = True if usernameExisting is not None else False
        emailResult = True if emailExisting is not None else False

        return usernameResult, emailResult


    '''
        Static method for returning the result (users) with the given query

        :param: query - the given query (Mongo)
        :param: pageNumber - page number for pagination
    '''
    def find(query, sortingAttr = "_id", sortOrder = 1, pageNumber = 1):

        return Model.find(COLLECTION_NAME, query, sortingAttr, sortOrder, pageNumber)


    '''
        Getting the model data: user data (by deleting unnecessary attributes)
    '''
    def data(self):

        try:
            delattr(self, 'password')
        except AttributeError as e:
            print("No such attribute")

        return super().data()


    '''
        Adding user feed
    '''
    def addFeed(self, postId):

        feedList = None
        try:
            feedList = getattr(self, 'feedList')
        except Exception as e:
            pass

        feedList = feedList if feedList else []

        feedList.append(postId)
        setattr(self, 'feedList', feedList)

        self.update_one(vars(self))

        return True

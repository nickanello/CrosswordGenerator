from dictionary import*

def getBadKeys():
    alphabet = "abcdefghijklmnopqrstuvwxyz"
    badKeys = []

    for key in dictionary:
        for ch in key:
            if ch not in alphabet:
                badKeys.append(key)
                break

    for key in badKeys:
        print(key)

def removeKeysWithBadChar():
    newDict = {}
    badChar = "1234567890&/."
    for key in dictionary:
        hasBadChar = False
        for ch in key:
            if ch in badChar:
                hasBadChar = True
                break
        if not hasBadChar:
            newDict[key] = dictionary[key]

    with open("newDictionary.py", "w") as newDictionary:
        newDictionary.write("newDictionary = {")
        for key in newDict:
            newDictionary.write('\'' + key.replace('\'', '\\\'') + '\'' + ': ' + '\'' + newDict[key].replace('\'', '\\\'') + '\',\n')
        newDictionary.write('}')

def getKeysWithSpaceOrDash():
    keysWithSpace = []
    for key in dictionary:
        if ' ' in key or '-' in key:
            keysWithSpace.append(key)

    for key in keysWithSpace:
        print(key)

def removeSpaceAndDash():
    newDict = {}
    for key in dictionary:
        newKey = ''
        for ch in key:
            if ch != ' ' and ch != '-' and ch != '\'' and ch != '(' and ch != ')' and ch != '!' and ch != ',':
                newKey += ch
        newDict[newKey] = dictionary[key]

    with open("newDictionary.py", "w") as newDictionary:
        newDictionary.write("newDictionary = {")
        for key in newDict:
            newDictionary.write('\'' + key.replace('\'', '\\\'') + '\'' + ': ' + '\'' + newDict[key].replace('\'', '\\\'') + '\',\n')
        newDictionary.write('}')

def makeWordsList():
    wordsList = []
    for key in dictionary:
        wordsList.append(key)

    with open("words.py", "w") as words:
        words.write("words = [")
        for key in wordsList:
            words.write('\'' + key + '\',\n')
        words.write(']')

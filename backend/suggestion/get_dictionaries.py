import csv

movies = {} # dico {movieID : {"Name_Year":x, "genre":y, "ratings":{userID:rating}}}
dic_users = {} # dico {userID:{name_year:rating}}

with open('movies.txt', newline='', encoding='utf8') as csvfile:
    reader = csv.reader(csvfile, delimiter=',', quotechar='"')
    next(reader)
    for row in reader:
        movies[row[0]] = {"Name_Year":row[1],"genre":row[2],"ratings":{}}

with open('ratings.txt', newline='', encoding='utf8') as csvfile:
    reader = csv.reader(csvfile, delimiter=',', quotechar='"')
    next(reader)
    for row in reader:
        
        movies[row[1]]["ratings"][row[0]] = row[2]
        
        if not row[0] in dic_users.keys():
            dic_users[row[0]] = {}
 
        dic_users[row[0]][movies[row[1]]["Name_Year"].replace("'","`")] = row[2]


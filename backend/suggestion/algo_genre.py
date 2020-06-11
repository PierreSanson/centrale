import numpy as np
from get_dictionaries import *
import pandas as pd

def meilleur_score(d,n):
    liste=[]
    new_d={}
    for k, v in sorted(d.items(), key=lambda x: x[1]):
        liste.append([k,v])
    liste.reverse()
    for i in range(n):
        new_d[liste[i][0]]=liste[i][1]
    return new_d

def average_popular(movies,movie):
    n=len(movies[movie]['ratings'])
    if n<20:
        return 0
    average=sum([float(movies[movie]['ratings'][rating]) for rating in movies[movie]['ratings']])
    return average/n

def best_average_per_genre(movies):
    genres={}
    for movie in movies:
        movie_genres=movies[movie]['genre']
        movie_genres=movie_genres.split('|')
        for genre in movie_genres:
            if genre in genres:
                genres[genre][movies[movie]['Name_Year']]=average_popular(movies,movie) #a def
            else:
                genres[genre]={}
                genres[genre][movies[movie]['Name_Year']]=average_popular(movies,movie)
    return genres

def suggestion(user,dic_users,movies,average_genres):
    dic_user=dic_users[user]

    #Cherche le genre favori de l'utilisateur
    genres={}
    for movie in dic_user:
        if float(dic_user[movie])>=4:
            id=[key for key in movies if movies[key]['Name_Year']==movie]
            if len(id)==1:
                genre=movies[id[0]]['genre']
                genre=genre.split('|')
                for word in genre :
                    if word in genres:
                        genres[word]+=1
                    else:
                        genres[word]=1
    best_genre=[key for key in meilleur_score(genres,1)][0]
    print(best_genre)
    suggestion=average_genres[best_genre]
    for movie in dic_user:
        if movie in suggestion:
            del suggestion[movie]

    suggestion= meilleur_score(suggestion,10)

    #Transformer les données en dataframe Panda
    result={'movies':[],'score':[]}
    for movie in suggestion:
        result['movies'].append(movie)
        result['score'].append(suggestion[movie])
    result['movies'].append(best_genre)
    result['score'].append('0')
    result=pd.DataFrame(result)


    #Créer objet de type JSON
    result.to_json ('.\Genre_p.json')

    return result

dic_users['josephine']={'The Boss Baby (2017)':'4.5','Coco (2017)':'3.5',  'Shrek the Third (2007)':'4.5','Incredibles 2 (2018)':'4','Princess and the Frog, The (2009)':'5','Finding Nemo (2003)':'4','WALL·E (2008)':'4'}
dic_users['victor']={'Howl`s Moving Castle (Hauru no ugoku shiro) (2004)':'3','Pom Poko (a.k.a. Raccoon War, The) (Heisei tanuki gassen pompoko) (1994)':'4.5','My Neighbor Totoro (Tonari no Totoro) (1988)':'4','Spirited Away (Sen to Chihiro no kamikakushi) (2001)':'5','Your Name. (2016)':'5',"Kiki's Delivery Service (Majo no takkyûbin) (1989)":'3.5',}
dic_users['pierre']={'Spider-Man 2 (2004)':'4','Inception (2010)':'4','Captain America: The First Avenger (2011)':'3.5','Superman/Batman: Public Enemies (2009)':'2','Star Wars: The Last Jedi (2017)':'4.5', 'Matrix Reloaded, The (2003)':'4','Lord of the Rings: The Return of the King, The (2003)':'3','Avengers: Infinity War - Part I (2018)':'5', 'Iron Man 3 (2013)':'3.5','Thor: Ragnarok (2017)':'5',}
print(suggestion('josephine',dic_users,movies,best_average_per_genre(movies)))



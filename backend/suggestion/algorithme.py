import numpy as np
from get_dictionaries import *
import pandas as pd

def moy_dic(d):
    length=len(d)-len([d[key] for key in d if d[key]==0])
    return sum([d[key] for key in d])/length

def meilleur_score(d,n):
    liste=[]
    new_d={}
    for k, v in sorted(d.items(), key=lambda x: x[1]):
        liste.append([k,v])
    liste.reverse()
    for i in range(n):
        new_d[liste[i][0]]=liste[i][1]
    return new_d

def str_to_float(dic_users):
    for user in dic_users:
        for movie in dic_users[user]:
            dic_users[user][movie]=float(dic_users[user][movie])
    return dic_users

def suggestion(current_user,dic_users): #utilisateur courant, dictionnaires, liste des films
    
    #Transformer les notes de str en float
    dic_users=str_to_float(dic_users)

    #Créer la liste des films
    dic_movies={}
    for user in dic_users :
        for movie in dic_users[user]:
            if movie not in dic_movies:
                dic_movies[movie]={}

    #Rajouter 0 pour les films non notés, et retrancher la moyenne pour les films notés
    for user in dic_users:
        moy_user=moy_dic(dic_users[user])
        for movie in dic_movies:
            if movie in dic_users[user]:
                dic_users[user][movie]-=moy_user
            else:
                dic_users[user][movie]=0
        
    #Calculer les scores de similarité pour chaque user avec l'user courant
    sim={}
    score_current_user=sum(dic_users[current_user][movie]**2 for movie in dic_users[current_user])
    for user in dic_users:
        score_user=0
        sim[user]=0
        for movie in dic_movies:
            sim[user]+=dic_users[user][movie]*dic_users[current_user][movie]
            score_user+=dic_users[user][movie]**2
        if score_current_user*score_user==0:
            sim[user]=0
        else:
            sim[user]/=np.sqrt(score_current_user*score_user)
    
    # Sélection des plus proches voisins
    voisins=meilleur_score(sim,10)

    #Sélection des meilleurs films pour l'user courant
    recommandations={}
    somme=sum(abs(voisins[user]) for user in voisins)
    for movie in [movie for movie in dic_users[current_user] if dic_users[current_user][movie]==0]:
        recommandations[movie]=0
        for user in voisins:
            recommandations[movie]+=voisins[user]*dic_users[user][movie]
        recommandations[movie]/=somme

    #Sélectionner des films recommandés : trier recommandations par score décroissante et en garder que 10 par ex
    meilleures_recommandations=meilleur_score(recommandations,10)

    #Transformer les données en dataframe Panda
    result={'movies':[],'score':[]}
    for movie in meilleures_recommandations:
        result['movies'].append(movie)
        result['score'].append(meilleures_recommandations[movie])
    result=pd.DataFrame(result)

    print('je suis là')
    #Créer objet de type JSON
    result.to_json ('.\Export_DataFrame.json')

    return result


dic_users['jo']={'Howl`s Moving Castle (Hauru no ugoku shiro) (2004)':'3','WALL·E (2008)':'4','Iron Man (2008)':'3','My Neighbor Totoro (Tonari no Totoro) (1988)':'3','Amelie (Fabuleux destin d`Amélie Poulain, Le) (2001)':'3.5','Inception (2010)':'5','Toy Story (1995)':'4.5','Prestige, The (2006)':'5','Mask, The (1994)':'3','Back to the Future Part III (1990)':'4','Django Unchained (2012)':'3','Spirited Away (Sen to Chihiro no kamikakushi) (2001)':'5','Pirates of the Caribbean: The Curse of the Black Pearl (2003)':'5'}
dic_users['bb']={'The Lego Batman Movie (2017)':'3.5','The Boss Baby (2017)':'4.5','Princess and the Frog, The (2009)':'5','Princess Diaries 2: Royal Engagement, The (2004)':'3.5','Finding Nemo (2003)':'4','WALL·E (2008)':'4',}
print(suggestion("bb",dic_users))

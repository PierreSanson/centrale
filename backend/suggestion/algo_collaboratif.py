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

    #Moyenne du l'utilisateur courant qui servira à la fin
    moy_current_user=moy_user=moy_dic(dic_users[current_user])

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
    for movie in [movie for movie in dic_users[current_user] if dic_users[current_user][movie]==0]:
        somme=0
        recommandations[movie]=0
        for user in voisins:
            if dic_users[user][movie]!=0:
                recommandations[movie]+=voisins[user]*dic_users[user][movie]
                print(recommandations[movie])
                somme+=abs(voisins[user])
        if somme!=0:
            print(recommandations[movie])
            print(somme)
            recommandations[movie]=moy_current_user+recommandations[movie]/somme
        else:
            recommandations[movie]=0

    #Sélectionner des films recommandés : trier recommandations par score décroissante et en garder que 10 par ex
    meilleures_recommandations=meilleur_score(recommandations,10)

    #Transformer les données en dataframe Panda
    result={'movies':[],'score':[]}
    for movie in meilleures_recommandations:
        result['movies'].append(movie)
        result['score'].append(meilleures_recommandations[movie])
    result=pd.DataFrame(result)

    #Créer objet de type JSON
    result.to_json ('.\Collaboratif_p.json')

    return result


dic_users['victor']={'Howl`s Moving Castle (Hauru no ugoku shiro) (2004)':'3','Pom Poko (a.k.a. Raccoon War, The) (Heisei tanuki gassen pompoko) (1994)':'4.5','My Neighbor Totoro (Tonari no Totoro) (1988)':'4','Spirited Away (Sen to Chihiro no kamikakushi) (2001)':'5','Your Name. (2016)':'5',"Kiki's Delivery Service (Majo no takkyûbin) (1989)":'3.5'}
dic_users['josephine']={'The Boss Baby (2017)':'4.5','Coco (2017)':'3.5',  'Shrek the Third (2007)':'4.5','Incredibles 2 (2018)':'4','Princess and the Frog, The (2009)':'5','Finding Nemo (2003)':'4','WALL·E (2008)':'4'}
dic_users['pierre']={'Spider-Man 2 (2004)':'4','Inception (2010)':'4','Captain America: The First Avenger (2011)':'3.5','Superman/Batman: Public Enemies (2009)':'2','Star Wars: The Last Jedi (2017)':'4.5', 'Matrix Reloaded, The (2003)':'4','Lord of the Rings: The Return of the King, The (2003)':'3','Avengers: Infinity War - Part I (2018)':'5', 'Iron Man 3 (2013)':'3.5','Thor: Ragnarok (2017)':'5'}
# print(suggestion("pierre",dic_users))



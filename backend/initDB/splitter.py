# pour movies.json

with open("movies.json", 'r') as f:
    lines = f.readlines()[2:-2]
    n = len(lines)
f.close()

compteur_ligne_total = 0
compteur_ligne = 0
compteur_fichier = 0
while compteur_fichier < int(n/250):
    with open("movies"+"_"+str(compteur_fichier)+".json", 'w') as f:
        f.write("{\n")
        f.write('   "cs-group-4-Pierre-dynamodb": [\n')
        while compteur_ligne < 249 and compteur_ligne_total < n:
                f.write(lines[compteur_ligne_total])
                compteur_ligne_total += 1
                compteur_ligne += 1
        compteur_ligne_total += 1
        f.write("           }\n")
        f.write("   ]\n")
        f.write("}")
        compteur_fichier += 1
        compteur_ligne = 0
        f.close()

                
# pour users.json

with open("users.json", 'r') as f:
    lines = f.readlines()[2:-2]
    n = len(lines)
f.close()

compteur_ligne_total = 0
compteur_ligne = 0
compteur_fichier = 0
while compteur_fichier < int(n/250):
    with open("users"+"_"+str(compteur_fichier)+".json", 'w') as f:
        f.write("{\n")
        f.write('   "cs-group-4-Pierre-dynamodb": [\n')
        while compteur_ligne < 249 and compteur_ligne_total < n:
                f.write(lines[compteur_ligne_total])
                compteur_ligne_total += 1
                compteur_ligne += 1
        compteur_ligne_total += 1
        f.write("           }\n")
        f.write("   ]\n")
        f.write("}")
        compteur_fichier += 1
        compteur_ligne = 0
        f.close()
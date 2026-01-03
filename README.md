# 🎲 Salon des Jeux Mathématiques — Lycée Jacques Prévert

Ce dépôt contient le code source du site web officiel du **Salon des Jeux Mathématiques 2025** du **lycée Jacques Prévert** à Saint-Christol-les-Alès.  
Le site présente l’événement, les jeux interactifs développés par les élèves, les partenaires, et les informations pratiques.

👉 [Accéder au site](https://https://crazzynel-devs.github.io/crazzynel.github.io/)


## 🧮 À propos du projet

Le **Salon des Jeux Mathématiques** est une initiative pédagogique et ludique portée par les élèves de Terminale NSI 2024-2025, sous la direction de **M. Martinez**.  
L’objectif est de faire découvrir les mathématiques autrement, à travers des jeux web, des énigmes, et des ateliers ouverts à tous.

- 📅 **Date** : 22 mars 2025  
- 🕙 **Horaires** : 10h à 18h  
- 📍 **Lieu** : Lycée Jacques Prévert — 1 place Lucie Aubrac, 30380 Saint-Christol-les-Alès  
- 🌐 **Site web** : [prevert-maths.cyborgbulls.fr](https://crazzynel-devs.github.io/crazzynel.github.io/)
> [!WARNING]
> Domaine en cours de changement. Celui-ci n'est que temporaire


## 🔒 Confidentialité & RGPD

La protection de la vie privée est absolue sur ce projet :

- **Aucune donnée collectée :** Ce site ne récupère aucune information personnelle.
- **Aucun cookie :** Pas de traceurs publicitaires ni de cookies de session.
- **Aucune statistique :** Nous n'utilisons aucun outil d'analyse de trafic (type Google Analytics).

Le site est purement statique et informatif.


## 🧩 Structure du dépôt

L'architecture du site est modulaire. Chaque activité possède son propre dossier pour faciliter la maintenance :

```text
.
├── index.html               # Page d’accueil principale
├── assets/                  # Ressources globales
│   ├── css/                 # Styles (style.css, sudoku.css, pi.css...)
│   ├── js/                  # Scripts (sudoku.js, pi.js, calcul-mental.js...)
│   ├── img/ & logos/        # Images du site et partenaires
│   ├── créateur/            # Photos de l'équipe
│   ├── PSL/                 # Photos souvenirs (Galerie)
│   └── vidéos/              # Vidéos de présentation
├── calcul-mental/           # Module : Jeu de calcul mental
├── galerie/                 # Module : Galerie photos
├── geometrie/               # Module : Activités géométriques
├── jeux/                    # Hub central des mini-jeux
├── memoire/                 # Module : Jeu de mémoire
├── pi/                      # Module : Autour du nombre Pi
├── programme/               # Page du programme détaillé
├── sudoku/                  # Module : Jeu Sudoku
└── suite-logique/           # Module : Jeu de suites logiques

````


## 💻 Technologies utilisées

* **HTML5 / CSS3 / JavaScript (Vanilla)**
* Pas de framework lourd : chargement rapide et maintenance simple.
* Hébergement statique (GitHub Pages / Serveur web standard).
* Architecture modulaire (chaque jeu est indépendant).


## 🚀 Installation et contribution

Tu veux modifier ou contribuer au site ? Voici comment faire :

1. Clone le dépôt :

```bash
git clone https://github.com/Crazzynel-Devs/crazzynel.github.io.git
```

2. Ouvre le dossier du projet :

```bash
cd crazzynel.github.io
```

3. Lance le site localement :

* Ouvre simplement `index.html` dans ton navigateur.
* *Conseil : Utilise l'extension "Live Server" sur VS Code pour un rechargement automatique.*

4. Crée ta branche avant toute modification :

```bash
git checkout -b feature/nom_de_ta_modif
```

5. Envoie tes changements :

```bash
git commit -m "feat: ajoute un nouveau jeu mathématique"
git push origin feature/nom_de_ta_modif
```


## 📜 Licence

Ce projet est distribué sous la licence **Apache License 2.0**.

Tu peux consulter le texte complet dans le fichier [`LICENSE`](https://www.google.com/search?q=./LICENSE).

> © 2025-2026 Lycée Jacques Prévert / Équipe du projet Salon des Jeux Mathématiques / Fabre-Chardounaud Antoine <br>
> Tu es libre de réutiliser, modifier ou partager le contenu dans le respect de la licence.

---

## 🙌 Crédits

**Équipe de développement (Terminale NSI 2024-2025) :**

* **Chambeu Mathis**
* **Eli Jardin**
* **Zakaria Bekkar**
* **Yildiz Berat**
* **Fabre-Chardounaud Antoine**

Sous la direction de **M. Martinez**, professeur de NSI.

**Partenaires & soutiens :**

* Région Occitanie / Département du Gard
* Musée Fermat
* Casa Jeux
* Clubs d’échecs et associations locales


## 📬 Contacts & Support Technique

**Pour le Salon (Infos générales) :**

* 📧 [Contact via le site](https://prevert-maths.cyborgbulls.fr/#contact)
* 📍 1 place Lucie Aubrac, 30380 Saint-Christol-les-Alès

**Support Technique & Architecture :**
En cas de problème sur l'architecture du site ou de bug technique, merci de contacter le développeur principal du projet (Année 2024-2025) OU si vous êtes étudiant de vous rapprocher de Mr. Martinez:

* 👤 **Antoine Fabre-Chardounaud**
* 📧 **[antoinef30350@icloud.com](mailto:antoinef30350@icloud.com)**

---

**✨ “Les mathématiques sont un jeu… à toi de jouer !”**

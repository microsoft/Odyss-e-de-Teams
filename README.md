# Microsoft – L&#39;Odyssée de Teams - README FR


#### Ce sont nos clients qui en parlent le mieux !

- Même les plus aguerris ont découvert de nouvelles fonctionnalités. En plus cela a permis de créer de la discussion et de l&#39;échange entre les équipes.
- Kiabi a osé, Kiabi a joué ! C&#39;est plus de 447 « Kiabers » qui ont embarqué à bord de l&#39;Odyssée, un jeu qui a permis de créer du lien entre les équipes des différents magasins du réseau.
- Le jeu a permis de créer du challenge et de l&#39;échange entre les équipes qui ont beaucoup apprécié l&#39;aspect gamification


# L&#39;Odyssée de Teams

## Introduction

L&#39;Odyssée de Teams est une formation ludique conçue par Microsoft sous la forme d&#39;une application web. Ce jeu, mis à la disposition des formateur·ice·s, a pour objectif de consolider l&#39;adoption et les usages de Microsoft Teams auprès des utilisateur·ice·s de leur organisation.

![1](https://user-images.githubusercontent.com/57418005/148470794-33cb7847-ede5-4508-8460-c6a649544b15.png)

Au cours d&#39;une saison de 4 semaines, répondez à plus de 200 questions réparties en 8 thématiques et sous 3 niveaux de difficulté différents (45 questions uniques accessibles uniquement pendant la semaine en cours). Collectionnez les médailles d&#39;accomplissement ainsi que les points au classement de votre entreprise tout en approfondissant vos connaissances de Teams.

L&#39;application propose une interface pour les Joueur·euse·s, une interface de gestion de jeu spécialement dédiée aux Maîtres du jeu, ainsi qu&#39;un kit d&#39;assets de communication clé en main pour soutenir vos actions de communication.

Plusieurs étapes sont nécessaires pour correctement installer puis déployer le jeu et vous sont détaillées dans ce document read.me :

- Installation de l&#39;application sur votre tenant Teams.
- Configuration de votre environnement de jeu sur Azure, paramétrage des Maîtres du jeu et activation du jeu pour l&#39;ensemble des utilisateur·ice·s ciblé·e·s.
- Lancement d&#39;une saison L&#39;Odyssée de Teams.

#### Bénéfices

Une fois l&#39;application installée sur le tenant de votre organisation, les utilisateur·ice·s pourront se lancer dans l&#39;aventure en cliquant simplement sur l&#39;icône de l&#39;application. Aucune installation ou connexion ne leur est nécessaire ou demandée compte tenu qu&#39;ils sont déjà connectés à leur tenant Teams au lancement de l&#39;application. Un disclaimer devra néanmoins être accepté pour pouvoir accéder au jeu.

Jouer à L&#39;Odyssée de Teams, c&#39;est découvrir et apprendre les usages et bonnes pratiques de Microsoft Teams tout en s&#39;amusant.

#### Coût

L&#39;application l&#39;Odyssée de Teams est mise à disposition gratuitement. Il vous suffit de télécharger le package à disposition pour accéder aux dossiers du jeu et au guide d&#39;installation. Cependant, l&#39;application requiert une souscription à Azure dont la consommation associée reste à votre charge.

#### Prérequis

Afin d&#39;installer et de configurer l&#39;application L&#39;Odyssée de Teams, vous avez besoin des prérequis suivants :

- Un tenant Azure (ainsi qu&#39;une souscription active) et un administrateur.
- Un Administrateur de base de données (PostgreSQL) pour créer et alimenter la base de données du jeu (qui sera hébergée sur Azure le temps du jeu).
- Un Administrateur Teams pour installer l&#39;application sur votre tenant et rendre l&#39;application disponible
- Accès à la console Admin Microsoft Teams avec les droits nécessaires à l&#39;importation d&#39;une application et à la gestion des policies (règles d&#39;attribution d&#39;accès d&#39;une application).
- Accès à votre plateforme Microsoft Azure pour y créer un environnement de jeu et attribuer les rôles de Maître du jeu.
- Anticiper les questions suivantes et en obtenir les données :
  - Est-ce que le déploiement du jeu est destiné à tou·te·s les collaborateur·ice·s du tenant Microsoft Teams ou seulement à une population spécifique ?
  - Quelles seront les personnes qui devront être déclarées Maître du jeu pour la saison de jeu à venir ? Il est fortement recommandé d&#39;obtenir l&#39;adresse email professionnelle d&#39;au moins deux Maîtres du jeu. Cela permet d&#39;avoir un backup en cas d&#39;indisponibilité de l&#39;un·e des Maîtres du jeu. Attention : une personne déclarée Maître du jeu aura accès à une interface différente de celle des joueur·euse·s et ne pourra donc pas jouer au jeu (répondre aux questions, collecter des points et médailles, etc.).
  - L&#39;Odyssée de Teams est pensée comme une campagne de 4 semaines. Définir la bonne date de lancement de la saison L&#39;Odyssée de Teams est donc fortement recommandé. Il est recommandé de lancer le jeu un lundi, et d&#39;éviter tout lancement en période de fêtes ou de fortes activités.

## Glossaire

L&#39;Odyssée de Teams est un jeu qui propose un champ lexical propre à son univers. Voici les termes que vous rencontrerez le plus au cours de la lecture de ce guide :

| **Terme** | **Définition** |
| --- | --- |
| **Administrateur tenant Microsoft Teams** | Utilisateur·ice ayant un accès à la console Microsoft Teams pour installer et configurer L&#39;Odyssée en tant que Maître du jeu |
| **Cockpit** | Le cockpit est le nom de l&#39;interface d&#39;accueil du jeu L&#39;Odyssée de Teams, que ce soit pour les joueur·euse·s ou les Maîtres du jeu |
| **Explorateur·ice** | Utilisateur·ice ayant le rôle de joueur·euse avec un accès standard à L&#39;Odyssée |
| **L&#39;Odyssée de Teams** | Serious game destiné à l&#39;apprentissage des usages et bonnes pratiques de Microsoft Teams |
| **Maître du jeu/ Commandant** | Utilisateur·ice ayant le rôle d&#39;administrateur de jeu avec un accès à l&#39;interface Maître du jeu |
| **Mission** | Module de 45 questions hebdomadaire activable et désactivable par le Maître du jeu |
| **Outillage** | Onglet disponible sur l&#39;interface Maître du jeu donnant la possibilité d&#39;ajouter le logo de votre organisation ou d&#39;arrêter le jeu en cours |

## Sommaire

- I. [Configuration du tenant Azure](#configuration-du-tenant-azure)
  - [Schéma d&#39;architecture](#introduction)
  - [Configuration de votre tenant Azure](#configuration-de-votre-tenant-azure)
    - [Création dans Azure Active Directory](#création-de-votre-application-dans-azure-active-directory)
    - [Microsoft Azure](#microsoft-azure)
    - [Création de la base de données](#création-de-la-base-de-données)
- II. [Installation du jeu Odyssée de Teams sur votre tenant Teams](#installation-du-jeu-odyssée-de-teams-sur-votre-tenant-teams)
  - [Avant-propos](#avant-propos)
  - [Un pare-feu bloque votre installation](#un-pare-feu-bloque-votre-installation)
  - [5 étapes pour une installation réussie](#5-étapes-pour-une-installation-réussie)
- III. [Premiers pas pour activer le jeu](#premiers-pas-pour-activer-le-jeu)
  - [Introduction](#introduction)
  - [Devenir Maître du jeu et configuration d&#39;une saison](#devenir-maître-du-jeu-et-configuration-de-la-saison)
  - [Première connexion](#première-connexion)
- IV. [Mise en production Azure](#Mise-en-production-Azure)

- [FAQ](#faq)

# Configuration du tenant Azure

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

1. Schéma d&#39;architecture

#### Introduction

L&#39;application et sa base de données seront toutes deux hébergées sur Azure. L&#39;Odyssée de Teams sera embarquée dans Teams en tant qu&#39;application.

![2](https://user-images.githubusercontent.com/57418005/148471073-8e72ddf5-2024-4210-aeb5-1f8610f57447.png)


\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

## Configuration de votre tenant Azure

Introduction

Le prérequis pour suivre le guide pas-à-pas ci-dessous est de disposer **des droits**** Administrateur ****du tenant Azure** de votre organisation.

### Création de votre application dans Azure Active Directory

Informations supplémentaires avant de commencer : [Documentation Microsoft](https://docs.microsoft.com/fr-fr/azure/active-directory/develop/quickstart-register-app)

1. Rendez-vous sur Azure Active Directory.
2. Depuis le tableau de bord vous pouvez créer une nouvelle application.
![3](https://user-images.githubusercontent.com/57418005/148472057-4f86142b-47ea-47f0-844e-40a1c65c2b0b.png)

3. Cliquez sur « Nouvelle Application ». Vous serez redirigé·e vers la page ci-dessous.
![4](https://user-images.githubusercontent.com/57418005/148471329-eedd82e8-c1b6-4543-bbc1-cd5b393aaa5f.png)

4. Sur cette page, cliquez sur « Créer votre propre application ».
![5](https://user-images.githubusercontent.com/57418005/148472084-b502c838-4f3e-484c-8cbd-8b28c9cd0cbb.png)

5. Donnez-lui le nom que vous souhaitez - par exemple « ODYSSEEDETEAMS » et veillez à cocher le deuxième bouton radio « Register an application to integrate with Azure AD »
6. Appuyez ensuite sur le bouton « Créer » en bas de l&#39;onglet.
![6](https://user-images.githubusercontent.com/57418005/148472118-a42c1c9b-e7f7-45fd-a6b5-94c28f60c80b.png)


7. À présent, renseignez le nom que vous souhaitez à l&#39;application.
8. Choisissez le groupe de personnes qui pourra accéder à cette application.
9. Enfin, indiquez l&#39;URL de redirection suivante : [http://localhost:8080](http://localhost:8080/)
10. Cliquez sur le bouton « S&#39;inscrire » pour terminer cette étape.
![7](https://user-images.githubusercontent.com/57418005/148472137-ea5384d5-5d1e-47eb-aa89-c251814721a9.png)


Vous pouvez désormais voir votre application dans la liste.

11. Cliquez maintenant sur le nom de l&#39;application nouvellement apparue.
![8](https://user-images.githubusercontent.com/57418005/148472153-9fc47ffe-5a81-4a6d-8057-26b31729a51e.png)


12. Rendez-vous dans la partie « API autorisées » via le menu latéral de gauche.
![9](https://user-images.githubusercontent.com/57418005/148472169-68351d40-bd17-4fde-af8b-2822a20e4c27.png)


13. Ajoutez la liste des autorisations ci-dessus en **délégué**.
14. Toujours via le menu latéral de gauche, cliquez sur « Authentification ».
![10](https://user-images.githubusercontent.com/57418005/148472240-9d2865a7-8d8f-42d5-aa9c-ae73d30dd096.png)

15. Ajoutez une plateforme de type « Application à page unique » en cliquant sur le bouton « Ajouter une plateforme ».
![11](https://user-images.githubusercontent.com/57418005/148472258-d95a97db-bb03-46bc-9f51-b9fa73120905.png)


16. Ajoutez deux URL de redirections qui correspondent à l&#39;URL de l&#39;app service qui sera créée dans les étapes suivantes : [https://odysseetest.azurewebsites.net](https://odysseetest.azurewebsites.net/)et [https://odysseetest.azurewebsites.net/callback/v2](https://odysseetest.azurewebsites.net/callback/v2)
![12](https://user-images.githubusercontent.com/57418005/148472278-de5c2d00-361a-488f-922b-71eeda5e626f.png)


17. En bas de la page actuelle, cochez les deux boutons à cocher puis cliquez sur « enregistrer ».
18. Ensuite, cliquez sur « Certificat &amp; secrets » dans le menu latéral de gauche. Il faut désormais ajouter un « client secret » qui nous servira par la suite.

![13](https://user-images.githubusercontent.com/57418005/148472298-3ac99277-a6e6-44b3-bef7-bd62cf325ce1.png)
![14](https://user-images.githubusercontent.com/57418005/148472304-afed63a7-f81e-4171-9101-acc9fa9dbd9c.png)

18-1. Rendez vous dans le fichier server.js et ajoutez le client id, secret id et l'id de votre tenant Azure à cet endroit.
![Capture2](https://user-images.githubusercontent.com/67316441/148567447-85ebe015-1a9a-4d65-93a5-5638556c3dff.PNG)

19. À présent, rendez-vous dans le menu « Exposer une API » du menu latéral de gauche.
![15](https://user-images.githubusercontent.com/57418005/148472315-b00ef19d-f79e-4d2c-89ce-f1a9acd76cef.png)


20. Cliquez sur « Ajouter une étendue ».
![16](https://user-images.githubusercontent.com/57418005/148472326-5872c636-defb-469f-8ccc-cea04b5268fe.png)


21. Dans la fenêtre qui vient de s&#39;ouvrir (ci-dessus), veillez à bien renseigner les personnes qui pourront consentir à « Administrateurs et Utilisateurs ».
22. Cliquez sur « Add scope » pour fermer la fenêtre.

La partie Azure Active Directory est maintenant terminée. Retournez sur Microsoft Azure où nous irons ajouter un groupe de ressources.

### Microsoft Azure

Informations supplémentaires avant de commencer : [Documentation Microsoft](https://docs.microsoft.com/fr-fr/azure/azure-resource-manager/management/manage-resource-groups-portal)

1. Rendez-vous sur la partie « Groupes de ressources » depuis l&#39;accueil.
![17](https://user-images.githubusercontent.com/57418005/148472435-91d882da-0e26-4311-b884-c3f89e9f6121.png)

![18](https://user-images.githubusercontent.com/57418005/148472438-47fbc3f5-8186-4333-b830-2767433fe635.png)

![19](https://user-images.githubusercontent.com/57418005/148472462-b64e1570-3e9d-499d-ad2d-1ca3b6bb8c48.png)

2. Choisissez et renseignez un nom pour ce groupe de ressources. Validez-le.
![20](https://user-images.githubusercontent.com/57418005/148472478-a20b37d9-c0c5-4d79-82a2-cb1c9542b2de.png)

3. Une fois la confirmation de la bonne création de votre groupe de ressources, sélectionnez-le et cliquez sur « Créer » pour créer une application web.

Informations supplémentaires avant de commencer cette étape : [Documentation Microsoft](https://docs.microsoft.com/en-us/azure/app-service/app-service-plan-manage)
![21](https://user-images.githubusercontent.com/57418005/148472502-fea3f156-7575-4790-b094-0d1c6c9d0f5a.png)
![22](https://user-images.githubusercontent.com/57418005/148472513-ef0a491b-cb88-4012-9b79-fa6b0a93469d.png)

4. Sélectionnez « Web app » dans la liste proposée.
![23](https://user-images.githubusercontent.com/57418005/148472539-7aa76ed4-109e-49a9-aa42-50747abe10a6.png)


5. Entrez le nom de votre application, ici « OdysseeTest ».
6. **Conservez** la méthode de publication « Code » et choisissez **Node 14 LTS** comme pile d&#39;exécution.
7. Conservez le Système d&#39;exploitation Linux et utilisez le plan Linux qui vous convient le mieux (_en fonction de la fréquentation attendue/ estimée sur l&#39;application L&#39;Odyssée de Teams_).
8. Cliquez sur « Vérifier + créer » pour créer la ressource.
![24](https://user-images.githubusercontent.com/57418005/148472571-bec62945-453d-474e-a32d-0ec6abd750ce.png)

Maintenant vous avez accès à votre « app service », il vous faut renseigner ses variables d&#39;environnements. Pour ce faire, rendez-vous dans le menu « configuration » dans le menu latéral de gauche.
![25](https://user-images.githubusercontent.com/57418005/148472592-8c86b967-c118-471e-9e68-731a17bb2d74.png)

9. Sur l&#39;onglet, cliquez sur « Nouveau paramètre d&#39;application ».
![26](https://user-images.githubusercontent.com/57418005/148472614-87656e86-6ec2-444d-afeb-ad755bde647a.png)

10. Ajoutez les paramètres suivants :

Nom : **DATABASE\_URL**

Valeur : **postgres://\&lt;nom\_utilisateur\&gt;:\&lt;mot\_de\_passe\&gt;@\&lt;host\&gt;5432/odyssee\_teams?ssl=true**

11. Cliquez sur « ok ».
12. Remplacez les informations comprises entre « \&lt; \&gt; » par les informations du serveur Postgres **que vous**  **allez créer juste après**.
![27](https://user-images.githubusercontent.com/57418005/148472638-fcd27d30-978c-4c4e-9b62-3c1051d39af2.png)

13. Renseignez ensuite le paramètre suivant **MICROSOFT\_PROVIDER\_AUTHENTICATION\_SECRET**
14. Cette fois-ci, cochez la case « paramètre de l&#39;emplacement de déploiement ».
15. Cliquez sur « ok » pour valider.
16. Répétez la même manipulation avec les paramètres ci-dessous :
![28](https://user-images.githubusercontent.com/57418005/148472669-2f56dadb-4fb2-44a8-a2e1-92b8bc6cad0b.png)

![29](https://user-images.githubusercontent.com/57418005/148472670-f5e3376b-d470-4be8-82de-70d4b6616323.png)

![30](https://user-images.githubusercontent.com/57418005/148472671-f2c2c373-7102-41a7-bb56-5ced7dfa8aa9.png)


### Création de la base de données

Informations supplémentaires avant de commencer cette étape : [Documentation Microsoft](https://docs.microsoft.com/en-us/azure/postgresql/quickstart-create-server-database-portal)

1. Pour le bon fonctionnement de l&#39;application il est nécessaire d&#39;avoir une base de données. Créez une nouvelle ressource en recherchant : Azure Database pour PostgreSQL.
![31](https://user-images.githubusercontent.com/57418005/148472732-51fb5d1d-0a33-4530-9ad1-a130239e7270.png)

![32](https://user-images.githubusercontent.com/57418005/148472735-2d5f1d1b-6bc7-46b6-97d3-b8b56f041b17.png)

2. Sélectionnez « Serveur unique ».
![33](https://user-images.githubusercontent.com/57418005/148472748-8004f486-a0bf-46ef-b4df-dd7aa4b99fec.png)

3. Sur la page qui s&#39;est ouverte, renseignez le nom du serveur désiré, ici « odyssee-postgres », son emplacement, sa version et le « calcul + stockage » qui convient le mieux à vos besoins.

![34](https://user-images.githubusercontent.com/57418005/148472765-b0d1f678-c29a-4196-a45a-e6490c2a1db6.png)

![35](https://user-images.githubusercontent.com/57418005/148472768-53de01fa-60dc-4447-a73f-7a2340e2e5eb.png)

4. Finissez de remplir les informations de connexions au serveur et cliquez sur « Vérifier + créer ». Votre groupe de ressources devrait maintenant ressembler à cela (ci-dessous) :
![36](https://user-images.githubusercontent.com/57418005/148472789-95b08d1a-ad81-4fa0-8126-1525ea396cee.png)

5. Rendez-vous dans la partie « Sécurité de la connexion » de la ressource odyssee-postgre.
![37](https://user-images.githubusercontent.com/57418005/148472813-ca24bb44-2aa4-45e6-865d-2051d4dc7f70.png)

6. Ajoutez votre adresse IP pour pouvoir accéder au serveur. Pour cela, cliquez sur « Ajouter une adresse IP cliente actuelle ».
![38](https://user-images.githubusercontent.com/57418005/148472838-17240475-6f18-43fc-9644-3a4772d09273.png)

7. Ajoutez également l&#39;adresse IP de l&#39;application que vous avez créée, et qui est disponible dans le menu « propriétés ».
![39](https://user-images.githubusercontent.com/57418005/148472860-2a864998-b0ea-4072-9ab1-79007c11e3d8.png)

8. Enfin, cliquez sur « Enregistrer » pour enregistrer vos changements.

9. Téléchargez et installez **pgAdmin** pour pouvoir accéder à votre serveur et créer des bases de données dessus.

- Version Windows : [lien](https://www.pgadmin.org/download/pgadmin-4-windows/)
- Version Mac : [lien](https://www.pgadmin.org/download/pgadmin-4-macos/)

![40](https://user-images.githubusercontent.com/57418005/148472909-a958919d-e96c-4ac6-b5dc-d76f2fc83b74.png)

10. Lancez **pgAdmin**.

![41](https://user-images.githubusercontent.com/57418005/148472942-e99799d6-8f01-480a-9783-8c9c31375aac.png)

11. Connectez-vous au serveur Postgres que vous avez créé précédemment sur Azure. Pour cela, faites un clic droit sur « Servers » puis « Create » puis « Server ».

![42](https://user-images.githubusercontent.com/57418005/148472950-6b95a452-4a79-400f-8abb-4cd5b541b58e.png)

12. Une modale s&#39;ouvre.
![43](https://user-images.githubusercontent.com/57418005/148472986-ed7ba54b-18a6-46b6-af94-a26c10d82382.png)

13. Inscrivez le nom que vous souhaitez à votre nouveau serveur.
14. Renseignez les informations de connexion qui correspondent à votre serveur Azure. Pour rappel, ces informations sont disponibles dans l&#39;onglet «  **Chaine de connexion »** sur votre serveur Postgre sur Microsoft Azure.
![44](https://user-images.githubusercontent.com/57418005/148472999-c6fbba66-84dc-4052-80b7-4a83a6f791a4.png)

15. Cliquez sur « Save » pour enregistrer les modifications.

Maintenant que l&#39;accès à votre serveur Postgre a été établi depuis pgAdmin, vous allez devoir créer une base de données.
![45](https://user-images.githubusercontent.com/57418005/148473018-96285ada-7607-407f-8ba4-40b53775c842.png)

16. Faites un nouveau clic droit sur votre serveur. Parcourez «  Create » puis sélectionnez « Database ».
17. Donnez-lui le nom « odyssee\_teams ». Attention : par la suite, si vous souhaitez changer son nom, il faudra procéder aux modifications via les fichiers SQL.
![46](https://user-images.githubusercontent.com/57418005/148473032-13bba9e8-5f43-4f77-afab-490bea3a65f8.png)

![47](https://user-images.githubusercontent.com/57418005/148473034-ab5a6881-dff6-4402-895d-1422268f084e.png)

18. À la suite ce cette création, vous aurez accès à cette nouvelle arborescence.

19.
![48](https://user-images.githubusercontent.com/57418005/148473058-238f8970-fea3-4969-a2bd-2df816ea4dbc.png)

20. Faites un clic droit sur votre base de données. Cliquez sur « Query Tool ».
21. Une fenêtre s&#39;ouvre. Copiez-y le contenu du fichier « Schema.sql » fournit avec ce guide d&#39;installation. Veillez à changer le mot de passe du rôle odyssee\_teams\_appli.

Attention : Si vous souhaitez changer le nom du rôle plus tard, il vous faudra le modifier partout.
![49](https://user-images.githubusercontent.com/57418005/148473078-68cea173-96b2-417d-bd5c-b47dbc8ea1e3.png)

22. Pour exécuter la requête, cliquez sur le bouton « Play » de pgAdmin (ci-dessous).
![50](https://user-images.githubusercontent.com/57418005/148473098-1445f2da-7e93-4fcd-b521-30a4b0a449e1.png)

23. Afin de permettre les imports de fichiers CSV par la suite, il vous faut vous rendre sur «  **Configure pgAdmin**  » en cliquant sur « Servers » puis « Dashboard ».
![51](https://user-images.githubusercontent.com/57418005/148473117-f4f6ea4e-463b-4a38-9661-ac4ae32acd97.png)

24. Dans le menu latéral de gauche, cliquez sur « Binary paths ».
25. Ajoutez le chemin jusqu&#39;au répertoire à votre version de postgreSQL.
![52](https://user-images.githubusercontent.com/57418005/148473145-1b8863e0-a723-4f76-835f-12e2d17891f0.png)

26. Sélectionnez la case comme indiqué sur la capture d&#39;écran ci-dessus. Puis cliquez sur le bouton « Save » pour enregistrer.

Vous êtes désormais en mesure d&#39;importer des fichiers et il s&#39;agit de la prochaine étape.

27. Faites un clic droit sur la table « t\_question », puis cliquez sur « Import/ Export ».
![53](https://user-images.githubusercontent.com/57418005/148473202-0b2b054f-6281-486e-a771-077bdee6a54c.png)

28. Veillez à avoir le bouton sur « Import » et non « Export ».
![54](https://user-images.githubusercontent.com/57418005/148473214-27803a3a-ca56-4c87-b7d6-ef71cb9f0ba1.png)

29. Sélectionnez le fichier «  **t\_question.csv**  » fourni avec ce guide d&#39;installation. Sélectionnez « UTF8 » pour l&#39;encodage et le « ; » comme délimiteur.
30. Cliquez sur « OK » pour valider cette étape.
31. La table des questions a été complétée avec toutes les questions. Répétez la procédure d&#39;import avec le fichier «  **t\_reponse.csv**  » cette fois.
![55](https://user-images.githubusercontent.com/57418005/148473239-d59d2e3d-db25-4599-ad97-36cc1d9b9f7a.png)

![56](https://user-images.githubusercontent.com/57418005/148473240-97ef2142-4621-48a8-90ec-7b81a21c557e.png)

32. Ouvrez le fichier data.sql fourni avec ce guide d&#39;installation.
33. Modifiez les valeurs suivantes :
- a. Le « tid\_ad » par votre tenant id Azure.
![57](https://user-images.githubusercontent.com/57418005/148473282-07477400-64a2-499b-91be-80f4fa209142.png)

- b. Le nom de votre organisation.
![58](https://user-images.githubusercontent.com/57418005/148473286-77ddead9-8f4d-4a9b-898f-89cce21dad61.png)

- c. Et les adresses email de vos Maitres du jeu.
![59](https://user-images.githubusercontent.com/57418005/148473301-2fc92a2e-5e5d-405e-8881-05bd4d3dd75a.png)

34. Copiez-collez le contenu de ce fichier dans le «  **Query Tool**  » de **pgAdmin** comme vous l&#39;aviez fait pour le fichier «  **schema.sql**  ».

![60](https://user-images.githubusercontent.com/57418005/148473340-44680f70-a0f8-4a59-b024-a2872a7f9d24.png)

35. À présent et comme pour les questions et les réponses, il vous faut importer la table « t\_libelle\_i18n », via le fichier CSV fourni avec ce guide d&#39;installation. Le processus d&#39;import reste le même que pour les deux précédents fichiers.
![61](https://user-images.githubusercontent.com/57418005/148473365-81287346-2a2f-4d2c-80aa-8e05991c3acc.png)


36. Votre base de données est prête. Il ne vous reste plus qu&#39;à mettre l&#39;application sur l&#39;App service que vous avez précédemment créé. Pour ce faire vous aller avoir besoin de télécharger et d&#39;installer «  **Visual Studio Code ** » : [lien](https://code.visualstudio.com/)
![62](https://user-images.githubusercontent.com/57418005/148473378-a6945d7d-000a-428b-a4ef-799686ecf974.png)

37. Une fois « VSC » installé, lancez-le.
![63](https://user-images.githubusercontent.com/57418005/148473402-ed65fafe-7e55-4da8-b066-d88e2e1feba9.png)

38. Faites « Fichier » puis « Ouvrir le dossier » et allez sélectionner le dossier « Odyssee_teams_pub » de ce repository.
39. Pour la suite vous allez avoir besoin de Node JS dans sa version 12.22.9 (pour des versions plus récente il faudra adapter le code).
40. Pour le télécharger et l'installer rendez vous sur nodejs.org/en/download/releases/ vous devriez trouver vers la page 10 la version correspondante.
![Capture4](https://user-images.githubusercontent.com/67316441/149010916-9d6e0c0c-4ec0-4601-bad1-9689494f6554.PNG)

42. Une fois que c'est fait ouvrez le terminal via l'onglet "terminal"
![Capture3](https://user-images.githubusercontent.com/67316441/149010619-2b0cbb52-5ca5-4e9a-bda2-c73ac1a99425.PNG)
43. Dans le terminal tapez la commande "cd client" et appuyez sur "entrer" pour vous rendre dans le dossier client.
![Capture12](https://user-images.githubusercontent.com/67316441/149011195-7e906a0d-13e4-459c-a798-5fa9d6857b88.PNG)
44. Une fois dans le dossier client tapez la commande "npm i" puis appuyez sur "entrer".
![Capture5](https://user-images.githubusercontent.com/67316441/149013660-0252b5a4-26f8-4be4-a061-244c3b787b54.PNG)
45. Tapez ensuite la commande "npm run build" pour créer le build du front.
![Capture6](https://user-images.githubusercontent.com/67316441/149013613-e84dd1f1-afe1-4213-9a5b-db99bf7cd2da.PNG)
46. Cela devrait vous créer un dossier build dans le dossier client.
![Capture7](https://user-images.githubusercontent.com/67316441/149011538-fda05a81-fa5a-4a2b-ac27-c4ae1e017866.PNG)

47. Créez un nouveau dossier appelé "Prod" dans lequel vous allez copier certains dossiers présents dans "Odyssee_teams_pub/server" le résultat doit ressembler à ça.
![Capture8](https://user-images.githubusercontent.com/67316441/149011893-642530b8-84d9-491e-85ce-20423c11ab2b.PNG)
48. Le fichier .deployement est un fichier que vous devez créer qui ne contient que deux lignes.
![Capture13](https://user-images.githubusercontent.com/67316441/149012174-78c5550a-9518-41ba-b7c9-ca39141c2825.PNG)
49. Dans le dossier "config" ouvrez le fichier "manifest.json" et remplacez le "port":8080, par "port":443. 
![Capture14](https://user-images.githubusercontent.com/67316441/149012874-f0a0aeb3-b845-4a7a-b8aa-10f739ed98a4.PNG)
50. Dans votre nouveau dossier "Prod" allez dans le dossier "public" et copiez le build que vous avez créé précédemment dans le dossier "client".
![Capture9](https://user-images.githubusercontent.com/67316441/149012534-c88a0727-7f61-4c60-be76-d859d2ab76c3.PNG)

51. Ouvrez le fichier Crypto.js et ajoutez une chaine de charactère aléatoire dans la variable CRYPTO_SECRET_KEY.
![Capture](https://user-images.githubusercontent.com/67316441/148568614-673a780a-9ab9-4bf0-b1d1-599e5acae9a1.PNG)

52. Rendez-vous dans les « Extensions » dans la barre latérale de gauche.
53. Recherchez « Azure App Service ».
54. Installez l&#39;application « Azure App Service ».
![65](https://user-images.githubusercontent.com/57418005/148473425-adf436d4-c12c-4fda-bbf2-3a98d4b54dd1.png)

55. Ouvrez l&#39;application « Azure App Service » nouvellement installée.
56. Connectez-vous avec votre compte Microsoft.
57. Votre App service s&#39;affichera et proposera « OdysseeTest » (ou le nom que vous aviez choisi précédemment). Faites un clic droit sur l&#39;application.
58. Cliquez sur « Deploy to Web App ».

**Félicitations, votre application est désormais installée et accessible.**

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

# Installation du jeu Odyssée de Teams sur votre tenant Teams

## Avant-propos

L&#39;Odyssée de Teams est une web application dont le package au format .zip « _LOdysseedeTeams2021.zip_ » doit être récupéré sur le GitHub puis importé sur le store Microsoft Teams de votre organisation. Cette manipulation requiert des droits d&#39;accès spécifiques à la console Admin Microsoft Teams. Si votre organisation a désactivé le store Microsoft Teams, vous trouverez ci-dessous un lien de réactivation afin de vous permettre de procéder à l&#39;installation de l&#39;application sans problème.

[https://docs.microsoft.com/fr-fr/MicrosoftTeams/manage-apps](https://docs.microsoft.com/fr-fr/MicrosoftTeams/manage-apps)

NB : Notez qu&#39;il n&#39;y a aucun port spécifique à ouvrir lors de la manipulation.

### Un pare-feu bloque votre installation

Si un pare-feu ou un proxy quelconque bloque le processus d&#39;installation, le lien ci-dessous vous permet d&#39;ajouter une règle (policy) à votre tenant Teams pour autoriser les appels à cette URL.

[https://odyssee-de-teams.saegus.com/](https://odyssee-de-teams.saegus.com/)


## 5 étapes pour une installation réussie

#### 1ère étape : Accédez à votre console Admin Microsoft Teams

1. Dans un premier temps, ouvrez une page de votre navigateur.
2. Rendez-vous sur votre console Admin Microsoft Teams. L&#39;adresse URL suivante vous permet d&#39;y accéder directement en l&#39;insérant dans votre barre de recherche de navigateur. [https://admin.teams.microsoft.com](https://admin.teams.microsoft.com/)

#### 2ème étape : Manage Apps

3. Sur la barre latérale de gauche de votre interface Admin Teams, cliquez sur le bouton « Teams apps ».
4. Cliquez maintenant sur le bouton « Manage Apps ». La partie de droite de votre interface affiche à présent la liste de vos applications.
![66](https://user-images.githubusercontent.com/57418005/148473581-03249dd4-88c4-461b-b1cd-ccac5f0bf5cb.png)

#### 3ème étape : Uploadez le fichier .zip sur votre tenant

5. Sur la partie droite de votre interface, cliquez sur le bouton « Upload ».

![67](https://user-images.githubusercontent.com/57418005/148473589-ce432cee-4727-4694-9f30-91fc05a59aa5.png)

6. Cliquez sur le bouton « Select a file » proposé par la modale qui vient d&#39;apparaître.

![68](https://user-images.githubusercontent.com/57418005/148473597-e50cb97b-7aaf-4b17-9e1e-dd7f94b3409d.png)

7. Aller sélectionner le fichier « LOdysseedeTeams2021.zip » sur votre ordinateur.
8. Confirmez l&#39;importation. Si l&#39;import est un succès, l&#39;icône et le nom de l&#39;application apparaîtront alors dans la liste des applications.

![69](https://user-images.githubusercontent.com/57418005/148473606-6a87bb90-b258-464b-a68e-9aee57e6ff0c.png)

#### 4ème étape : Policy

9. Maintenant que l&#39;application a été importée avec succès, vous devez lui attribuer une « policy », ou règle en français.

Rappel : Sur Microsoft Teams, il est possible de configurer une policy de sorte à ce que l&#39;application qui lui sera associée ne soit accessible qu&#39;à une seule population précise de votre organisation. Par défaut, une application est accessible à tou·te·s les utilisateur·ice·s avec une policy dite « Global ».

10. Cliquez sur le bouton « Setup policies » dans votre barre de gauche.
![70](https://user-images.githubusercontent.com/57418005/148473655-0c6e5e0b-066b-4681-971a-05d161c092da.png)

11. La fenêtre « App setup policies » s&#39;ouvre sur la droite.
12. Il vous est possible de reprendre et éditer une policy existante qui est proposée dans la liste. Si vous souhaitez configurer une nouvelle policy spécifique à une population, cliquez sur le bouton « + Add » pour en créer une nouvelle.

![71](https://user-images.githubusercontent.com/57418005/148473670-0d7eade3-2e73-42c5-baf6-ad437f25cd78.png)

#### 5ème étape : Configurez une nouvelle policy

13. Sur la fenêtre de création de la policy, veillez à ce que les 2 boutons « Upload custom apps » et « Allow user pinning » soient cochés « on ».

![72](https://user-images.githubusercontent.com/57418005/148473710-669442c6-e785-42bb-a464-b57d513807a1.png)

14. Pour associer votre application L&#39;Odyssée de Teams à cette policy, cliquez sur le bouton « + Add apps » pour ouvrir le volet latéral de recherche.
![73](https://user-images.githubusercontent.com/57418005/148473718-5b0084e4-184c-44db-bd75-9aed307743f3.png)

15. Maintenant que le volet latéral s&#39;est ouvert, recherchez le nom de l&#39;application L&#39;Odyssée de Teams dans le champ de recherche. Celui-ci va remonter.

![74](https://user-images.githubusercontent.com/57418005/148473727-dcb00299-0b4b-4c79-a041-b335935f658a.png)

16. Cliquez sur le bouton « Add » pour confirmer la sélection de cette application.
![75](https://user-images.githubusercontent.com/57418005/148473758-986a0f6a-2d59-4dfb-a881-b1f7441b9505.png)

17. De la même manière, si vous souhaitez que les utilisateur·ice·s puissent accéder facilement à l&#39;application sur leur interface Microsoft Teams, il est possible de l&#39;épingler en accès rapide. Pour cela, cliquez sur « + Add apps » dans la zone « Pinned apps ».
![76](https://user-images.githubusercontent.com/57418005/148473776-5462356e-08b3-4363-8057-bf575559fb4c.png)

18. Pour valider l&#39;ensemble de vos modifications, cliquez sur le bouton « Save » en bas de page.
![77](https://user-images.githubusercontent.com/57418005/148473797-ce4e8050-7b09-4b5b-ad5c-4ccea2e12769.png)

**Félicitations ! L&#39;application l&#39;Odyssée de Teams est maintenant installée et configurée pour utilisation !**

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

# Premiers pas pour activer le jeu

## Introduction

Maintenant que l&#39;application L&#39;Odyssée de Teams a été correctement installée sur votre tenant Microsoft Teams, que votre environnement de jeu a été créé sur Azure et que les Maîtres du jeu ont été paramétrés, il est nécessaire de procéder à l&#39;activation finale.

Pour cela, le rôle de Maître du jeu intervient : tant que le jeu n&#39;a pas été activé par le Maître du jeu, les Explorateur.ice.s (joueur·euse·s) ne pourront pas accéder à leur interface.

## Devenir Maître du jeu et configuration de la saison

Pour rappel, le Maître du jeu a pour objectif de gérer une saison de 4 semaines pendant lesquelles les Explorateur.ice.s répondront à plus de 200 questions. Le Maître du jeu a à sa disposition une interface spécifique qui lui permettra :

- D&#39;installer le logo de son organisation via l&#39;onglet « Outillage » ;
- D&#39;arrêter le jeu via l&#39;onglet « Outillage » ;
- D&#39;activer les modules de 45 questions uniques chaque semaine via l&#39;onglet « Planning » ;
- Accéder aux statistiques de jeu et classements en temps réel via l&#39;onglet « Classements » ;

Un guide « Maîtredujeu.pdf » illustré est disponible dans le package « L&#39;Odyssée\_de\_Teams - Kit\_Maître\_jeu.zip » afin d&#39;accompagner le Maître du jeu dans la prise en main de son interface.

Le Maître du jeu peut également être responsable de la partie communication en interne autour et tout le long d&#39;une saison. Pour cela, un kit d&#39;assets de communication clé en main est mis à sa disposition « Communication – Kit\_assets.zip ». Il est fortement recommandé de :

- Personnaliser les emails à l&#39;identité de L&#39;Odyssée de Teams disponibles dans l&#39;onglet « Planning » en amont du lancement (teasing) et pour rythmer l&#39;événement sur l&#39;ensemble de sa durée. Les emails ne peuvent pas être envoyés directement via la plateforme, il vous faudra les copier/ coller et les envoyer via votre messagerie habituelle ;
- Communiquer à son organisation sur le jeu via les canaux internes Yammer, Teams, Outlook et autres intranets ;
- Envoyer des notifications Teams via la fonctionnalité « Push notification » disponible via l&#39;onglet « Planning ». L&#39;écriture d&#39;une notification est libre mais contrainte à un nombre de 32 caractères. La notification reçue par les utilisateur·ice·s leur permettront d&#39;accéder automatiquement au jeu en cliquant simplement dessus.

À noter : Il n&#39;est pas possible d&#39;extraire le classement des joueur·euse·s. Nous recommandons au Maître du jeu de réaliser une capture d&#39;écran des classements pendant le déroulé du jeu.

## Première connexion

1. Rendez-vous sur votre interface Microsoft Teams. Cliquez sur l&#39;icône L&#39;Odyssée de Teams présente sur votre barre latérale si celle-ci a été épinglée lors de son installation.

![78](https://user-images.githubusercontent.com/57418005/148473900-22dfa960-2275-4ae4-9f69-4dba7c6cb73d.png)

2. Dans le cas contraire, rendez-vous sur votre store d&#39;applications et recherchez « L&#39;Odyssée de Teams » dans la barre de recherche.

![79](https://user-images.githubusercontent.com/57418005/148473922-8e7447d3-b694-444e-a45e-652ad7e31061.png)

3. Cliquez sur ouvrir pour lancer l&#39;application.

4. Vous atterrirez sur la toute première page du jeu. Cliquez sur « Partir en exploration » pour continuer.
![81](https://user-images.githubusercontent.com/57418005/148475620-d5bbd54b-dfc1-4599-8424-6e6c9f34daa3.png)

5. Sur la page suivante, lisez les RGPD, cochez la case « J&#39;ai pris connaissance des conditions du jeu » et cliquez sur le bouton « Accepter et continuer » pour poursuivre le parcours.
![82](https://user-images.githubusercontent.com/57418005/148475639-72ea561e-2dfa-491b-8730-b49e52874072.png)

6. Sur la page de sélection de votre vaisseau (avatar dans le jeu), choisissez l&#39;un des visuels proposés et cliquez sur le bouton « Terminer la configuration ». Le choix du vaisseau n&#39;influencera pas votre expérience.
![83](https://user-images.githubusercontent.com/57418005/148475661-e607b08e-17aa-46fa-a535-2687cba3ccc2.png)

7. Vous êtes alors redirigé·e vers l&#39;onglet principal de votre interface : le cockpit. À partir de ce moment-là, le jeu est activé et accessible pour l&#39;ensemble des Explorateur·ice.s.
![84](https://user-images.githubusercontent.com/57418005/148475687-12e9d21a-b294-471d-8b09-3d4632909400.png)

L&#39;onglet « Cockpit » est votre tableau de bord d&#39;arrivée lorsque vous lancez le jeu. L&#39;onglet « Planning » vous permet d&#39;activer toutes les missions, mais également de récupérer les templates d&#39;emails, réseaux sociaux et d&#39;envoyer des push notifications. L&#39;onglet « Classements » vous permet de consulter en temps réel les statistiques de jeu et les classements de votre organisation. Enfin, dans l&#39;onglet « Outillage », vous pourrez configurer le logo de votre organisation et arrêter le jeu à tout moment via la fonctionnalité « arrêt du jeu ».

## Activer le premier module de questions

Vous avez désormais accès à votre interface de Maître du jeu et les Explorateur·ice·s ont accès au jeu. Cependant, tant qu&#39;aucun des modules de questions n&#39;est activé, les joueur·euse·s ne pourront pas jouer.

Lorsque vous souhaiterez officiellement lancer la première semaine de la saison L&#39;Odyssée de Teams de votre organisation, suivez les étapes suivantes :

8. Rendez-vous dans l&#39;onglet &quot;Planning&quot; de votre interface.
9. Cliquez sur le sous-onglet &quot;Programme et missions&quot;.
![85](https://user-images.githubusercontent.com/57418005/148475714-fc58061c-a386-4ad4-83a3-d192b4b66f20.png)

10. Pour activer le premier module de questions, il vous suffit de cliquer sur le bouton « Mission en attente ». L&#39;ordre des modules est le suivant :

  - « Lancement ! »
  - « Stabilisation ! »
  - « Progression ! »
  - « Amerrissage ! »

Notez que lorsqu&#39;un·e Maître du jeu active une nouvelle semaine, cela désactive la semaine précédente. Il n&#39;est pas possible d&#39;avoir deux semaines d&#39;activées en même temps. Pour éviter de fausser le classement, il n&#39;est pas possible pour les joueur·euse·s de revenir sur une semaine antérieure. Il est donc important de leur rappeler d&#39;être assidu dans le jeu.

## Arrêter ou mettre en pause le jeu

1. Si vous souhaitez mettre le jeu en pause ou l&#39;arrêter, rendez-vous dans l&#39;onglet « Outillage ».
2. Cliquez sur le bouton « Bloquer l&#39;accès au jeu » pour mettre en pause ou arrêter le jeu. Pour réactiver le jeu, sélectionner l&#39;un des modules de questions dans l&#39;onglet « Planning » comme expliqué précédemment.
![86](https://user-images.githubusercontent.com/57418005/148475773-6c58521e-30cc-410f-8983-fee5cbb79ce9.png)

3. En fin de saison, si vous souhaitez garder une trace des classements, nous vous recommandons d&#39;effectuer des captures d&#39;écran car vous ne pourrez pas extraire ces éléments depuis l&#39;application.

## Guide du Maître du jeu - Pour aller plus loin

Toutes les informations spécifiques au rôle de Maître du jeu sont disponibles dans le document &quot;L&#39;Odyssée de Teams - Règles\_Admin.pdf&quot; fourni avec le jeu.

**Félicitations, la saison L&#39;Odyssée de Teams est maintenant lancée !**

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

# FAQ

## Installation &amp; gestion

#### Mon organisation ne dispose pas de toutes les fonctionnalités de Microsoft Teams, est-il possible de ne pas déployer les questions correspondantes aux Explorateur.ice.s ?

Il est possible de désactiver des thématiques de questions propres à chaque grande fonctionnalité de Microsoft Teams. Pour cela, rendez-vous dans l&#39;onglet &quot;Planning&quot; de votre interface Maître du jeu. Dans le sous-onglet &quot;Programme et missions&quot;, cliquez sur &quot;Paramétrage&quot; pour accéder à un menu interactif qui vous permettra de désactiver jusqu&#39;à deux thématiques de questions. Il n&#39;est pas possible de désactiver plus de deux thématiques afin de garantir le bon fonctionnement du jeu.

#### Est-ce qu&#39;une réinstallation est nécessaire si une nouvelle fonctionnalité est ajoutée au jeu ?

Non, aucune nouvelle installation n&#39;est nécessaire pour accéder aux nouvelles fonctionnalités. Si une nouvelle installation est nécessaire, une note sera mise à disposition des organisations avec le détail et la raison.

#### Est-ce que j&#39;ai besoin de créer un compte pour jouer à l&#39;application L&#39;Odyssée de Teams ?

Non, il n&#39;y pas besoin de créer un compte ou de s&#39;authentifier pour accéder au jeu. Il s&#39;agit d&#39;une authentification transparente avec le compte utilisateur connecté sur Microsoft Teams (SSO).

#### Est-il possible de jouer au jeu tout en étant dans le rôle de Maître du jeu ?

Non, il n&#39;est pas possible d&#39;accéder aux interfaces Explorateur.ice en tant que Maître du jeu. Il n&#39;est donc pas possible de participer au jeu. Il est recommandé d&#39;utiliser un autre compte.

## Jeu

#### En combien de temps se joue L&#39;Odyssée de Teams ?

L&#39;Odyssée de Teams est un jeu conçu pour être joué sur 4 semaines de 5 jours ouvrés. Le temps de jeu est évalué à 1h par semaine pour un·e joueur·euse très actif.

#### Est-ce que le jeu est accessible le week-end ?

Non, le jeu est inaccessible le week-end.

#### Est-ce que le jeu est accessible sur l&#39;application Teams mobile ?

Oui, le jeu est accessible sur Teams mobile pour les Explorateur.ice.s, il est même recommandé de jouer via l&#39;application pour une expérience optimisée et immersive. Il est vivement recommandé aux Maîtres du jeu de n&#39;accéder aux interfaces Maîtres du jeu que sur l&#39;application desktop pour une meilleure expérience utilisateur et un confort d&#39;utilisation optimal.

#### Est-il possible de consulter l&#39;ensemble des thématiques et questions du jeu ?

Oui, il est possible de consulter les questions de L&#39;Odyssée de Teams dans le document &quot;Q&amp;A\_FR.xlsx&quot;.

#### Existe-t-il des conseils pour aider les Explorateur.ice.s à comprendre et jouer au jeu ?

Oui, il existe un guide pour aider les joueur.euse.s à comprendre et assimiler le fonctionnement et les mécaniques du jeu. Ce guide se nomme &quot;L&#39;Odyssée de Teams - Guide\_Explorateur.pdf&quot; et est également téléchargeable depuis l&#39;interface de jeu du joueur.euse via l&#39;onglet &quot;Règles du jeu&quot;. De la même manière, il existe un guide pour accompagner les Maîtres du jeu &quot;L&#39;Odyssée de Teams - Guide Maître du jeu.pdf&quot;.

## Sécurité &amp; Data access

#### Est-ce que L&#39;Odyssée de Teams dispose de RGPD et où puis-je les consulter ?

Oui, L&#39;Odyssée de Teams dispose de RGPD qui sont accessibles dès la première connexion au jeu par l&#39;utilisateur·ice· qu&#39;il·elle soit Explorateur·ice ou Maître du jeu. Une validation des conditions est nécessaire pour pouvoir accéder au contenu du jeu. L&#39;ensemble de ces RGPD est également consultable dans le document &quot;Teams\_Odyssey - Disclaimer.pdf&quot;.

#### Existe-t-il un document regroupant l&#39;ensemble des données de sécurité et d&#39;accès pour L&#39;Odyssée de Teams ?

Oui, ce document est disponible sous le nom de &quot;Microsoft - Security and data access.pdf&quot;.

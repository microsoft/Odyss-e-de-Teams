# Microsoft – Teams Odyssey - README EN

#### Our customers say it best!

- Even the most seasoned of them discovered new features. And it helped stimulate discussions and chat between teams.
- Kiabi dared and Kiabi played! Over 447 “Kiabers” joined Odyssey, a game that helped build connections between teams in the chain’s different stores.
- The game created a challenge and discussions between teams who really enjoyed the gameplay

# Teams Odyssey

## Introduction

Teams Odyssey is a fun training course designed by Microsoft as a web app. The game is organised by trainers and its mission is to reinforce users’ adoption and use of Microsoft Teams in their organisation.

![1](https://user-images.githubusercontent.com/57418005/148531468-57b99a49-f8db-45e9-a81b-8e73f40b5cd5.png)

Over a season of 4 weeks, answer over 200 questions in 8 topics and 3 different levels of difficulty (only 45 questions available during one week of training). Collect medals and ranking points for your company while learning more about how to use Teams.

The app has an interface for players, a game management interface for the Game Masters and ready-to-use communication tool kit to promote the app. 

- Installation of the application on your Teams tenant
- Configuration of your game environment in Azure, set-up for the Game Master and game activation for all targets users
- Launch of a Teams Odyssey season.

#### Benefits

Once the app is installed on your organisation’s tenant, users can begin the adventure by simply clicking on the application icon. No installation or login is required or requested given that they are already connected to their Teams tenant when they open the application. A disclaimer still has to be accepted to start the game.

Playing Teams Odyssey means discovering and learning good uses and best practices for Microsoft Teams in a fun way.

#### Cost

The Teams Odyssey app is free. Simply download the package to access the game folders and installation guide. The app does, however, require subscription to Azure, which must be paid for.

#### Prerequisites

The following is required to install and configure the Teams Odyssey application:
- An Azure tenant (and an active subscription) and an administrator.
- A database administrator (PostgreSQL) to create and build the game database (which will be hosted on Azure for the duration of the game).
- A Teams Administrator to install the application on your tenant and make it available
- Access to the Microsoft Teams Admin dashboard with the rights required for importing an application and managing policies (access allocation rules for an application).
- Access to your Microsoft Azure platform to create a game environment and allocate the Game Master roles.
- Ask the following questions and collect the answers.
   - Is this game for all employees of the Microsoft Teams tenant or only a specific group?
   - Which people will be the Game Masters for the coming season? We highly recommend getting the work email addresses for at least two Game Masters. This can be a backup if any of the Game Masters are unavailable. Note: a Game Master will have access to a different interface than the players and will not be able to play the game (answer questions, collect points and medals, etc.).
   - Teams Odyssey is designed as a 4-week campaign. Setting the right date for launching the Teams Odyssey season is highly recommended. We recommend starting the game on a Monday and avoiding any holiday seasons or busy times.

## Glossary

Teams Odyssey is a game that has its own vocabulary. Here are the terms you will encounter most as you read this guide:

| **Term** | **Definition** |
| --- | --- |
| **Microsoft Teams tenant administrator** | User with access to the Microsoft Teams dashboard to install and configure Odyssey as a Game Master |
| --- | --- |
| **Cockpit** | The cockpit is the name of the home interface of the Teams Odyssey game, for players and for Game Masters |
| **Explorer** | The user in the role of the player with standard access to Odyssey |
| **Teams Odyssey** | A serious game to teach good use and best practices for Microsoft Teams |
| **Game Master/ Commander** | User in the role of game administrator with access to the Game Master interface |
| **Mission** | Weekly module with 45 questions that is activated and deactivated by the Game Master |
| **Tools** | A tab available on the Game Master interface with the possibility of adding the logo of your organisation or stopping the ongoing game |

## Contents

-  I. [Configuring your Azure tenant](#configuring-the-azure-tenant)
   - [Architecture](#architecture)
   - [Configuring your Azure tenant](#configuring-your-azure-tenant)
       - [Creating in the Azure Active Directory](#creating-your-application-in-the-azure-active-directory)
       - [Microsoft Azure](#microsoft-azure)
       - [Creating a database](#creating-a-database)
- II. [Installing Teams Odyssey in Teams](#installing-teams-odyssey-on-your-teams-tenant)
   - [Introduction](#introduction)
   - [A firewall is blocking the installation](#a-firewall-is-blocking-the-installation)
   - [5 stages for a successful installation](#5-stages-for-a-successful-installation)
- III. [First steps to activate Teams Odyssey](#first-steps-to-activate-teams-odyssey)
   - [Introduction](#introduction)
   - [Becoming a Game Master and configuring a season of Teams Odyssey](#becoming-a-game-master-and-configuring-a-season)
   - [First login](#first-login)
- [FAQ](#faq)

# Configuring the Azure tenant

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

## Architecture

#### Introduction

The application and its database will both be hosted on Azure. Teams Odyssey will be embedded in Teams as an application.

![2](https://user-images.githubusercontent.com/57418005/148471073-8e72ddf5-2024-4210-aeb5-1f8610f57447.png)

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

## Configuring your Azure tenant

Introduction

To follow this step-by-step guide you must have the **Admin rights of your organisation&#39;s Azure tenant**.

### Creating your application in the Azure Active Directory

Additional information before you begin: [Microsoft documents](https://docs.microsoft.com/fr-fr/azure/active-directory/develop/quickstart-register-app)

1. Go to the Azure Active Directory.
2. You can create a new application in the dashboard.

![3](https://user-images.githubusercontent.com/57418005/148472057-4f86142b-47ea-47f0-844e-40a1c65c2b0b.png)

3. Click &quot;New Application&quot;. The page below will open.

![4](https://user-images.githubusercontent.com/57418005/148471329-eedd82e8-c1b6-4543-bbc1-cd5b393aaa5f.png)

4. On this page, click &quot;Create your own application&quot;.

![5](https://user-images.githubusercontent.com/57418005/148472084-b502c838-4f3e-484c-8cbd-8b28c9cd0cbb.png)

5. Name it whatever you want, for example &quot;TEAMSODYSSEY&quot; and make sure you click the second option &quot;Register an application to integrate with Azure AD&quot;
6. Then click &quot;Create&quot; at the bottom of the page.

![6](https://user-images.githubusercontent.com/57418005/148472118-a42c1c9b-e7f7-45fd-a6b5-94c28f60c80b.png)

7. Now you can enter the name of the application.
8. Chose the group of people who will be able to access the application.
9. Finally, enter the following URL:[http://localhost:8080](http://localhost:8080/)
10. Click on &quot;Register&quot; to complete this stage.

![7](https://user-images.githubusercontent.com/57418005/148472137-ea5384d5-5d1e-47eb-aa89-c251814721a9.png)

You can now see your application in the list.

11. Click on the name of the new application.

![8](https://user-images.githubusercontent.com/57418005/148472153-9fc47ffe-5a81-4a6d-8057-26b31729a51e.png)

12. Go to the &quot;Authorised APIs&quot; section in the left menu.

![9](https://user-images.githubusercontent.com/57418005/148472169-68351d40-bd17-4fde-af8b-2822a20e4c27.png)

13. Add the above authorisations as **delegated**.
14. Click &quot;Authentication&quot; in the left menu.

![10](https://user-images.githubusercontent.com/57418005/148472240-9d2865a7-8d8f-42d5-aa9c-ae73d30dd096.png)

15. Click &quot;Add a platform&quot; and add a &quot;Single page application&quot; platform.

![11](https://user-images.githubusercontent.com/57418005/148472258-d95a97db-bb03-46bc-9f51-b9fa73120905.png)

16. Add two URLs that represent the application service URL which will be created in the following stages: [https://odysseetest.azurewebsites.net](https://odysseetest.azurewebsites.net/)and [https://odysseetest.azurewebsites.net/callback/v2](https://odysseetest.azurewebsites.net/callback/v2)

![12](https://user-images.githubusercontent.com/57418005/148472278-de5c2d00-361a-488f-922b-71eeda5e626f.png)

17. At the bottom of this page, tick the two boxes then click &quot;Save&quot;.
18. Then, click &quot;Certificate &amp; secrets&quot; in the left menu. Add a &quot;secret client&quot; that will be used later.

![13](https://user-images.githubusercontent.com/57418005/148472298-3ac99277-a6e6-44b3-bef7-bd62cf325ce1.png)
![14](https://user-images.githubusercontent.com/57418005/148472304-afed63a7-f81e-4171-9101-acc9fa9dbd9c.png)

19. Open the file server.js and replace auth informations with your IDs.
![Capture2](https://user-images.githubusercontent.com/67316441/148569266-02ded892-0d04-428c-872f-09952847146f.PNG)

20. New, go to &quot;Expose an API&quot; in the left menu.

![15](https://user-images.githubusercontent.com/57418005/148472315-b00ef19d-f79e-4d2c-89ce-f1a9acd76cef.png)

21. Click &quot;Add a scope&quot;.

![16](https://user-images.githubusercontent.com/57418005/148472326-5872c636-defb-469f-8ccc-cea04b5268fe.png)

22. In the window that opens (see above), add all the people who will consent to be &quot;Administrators and Users&quot;.
23. Click &quot;Add a scope&quot; to close the window.

The Azure Active Directory part is now complete. Go back to Microsoft Azure where we will add a resource group.

### Microsoft Azure

Additional information before you begin: [Microsoft documents](https://docs.microsoft.com/fr-fr/azure/azure-resource-manager/management/manage-resource-groups-portal)

1. From home, go to the &quot;Resource groups&quot; page.

![17](https://user-images.githubusercontent.com/57418005/148472435-91d882da-0e26-4311-b884-c3f89e9f6121.png)

![18](https://user-images.githubusercontent.com/57418005/148472438-47fbc3f5-8186-4333-b830-2767433fe635.png)

![19](https://user-images.githubusercontent.com/57418005/148472462-b64e1570-3e9d-499d-ad2d-1ca3b6bb8c48.png)

2. Choose and enter a name for this resource group. Confirm.

![20](https://user-images.githubusercontent.com/57418005/148472478-a20b37d9-c0c5-4d79-82a2-cb1c9542b2de.png)

3. Once you have confirmed the correct creation of your resource group, select it and click &quot;Create&quot; to create a web application.

Additional information before you begin this stage: [Microsoft documents](https://docs.microsoft.com/en-us/azure/app-service/app-service-plan-manage)

![21](https://user-images.githubusercontent.com/57418005/148472502-fea3f156-7575-4790-b094-0d1c6c9d0f5a.png)
![22](https://user-images.githubusercontent.com/57418005/148472513-ef0a491b-cb88-4012-9b79-fa6b0a93469d.png)

4. Select &quot;Web app&quot; from the list.

![23](https://user-images.githubusercontent.com/57418005/148472539-7aa76ed4-109e-49a9-aa42-50747abe10a6.png)

5. Enter the name of your application, here &quot;OdysseeTest&quot;.
6. **Keep**&quot;Code&quot; as the publication method and choose **Node 14 LTS** as the execution stack.
7. Keep Linux as the operating system and use the most suitable Linux plan (_depending on the expected / estimated use of the Teams Odyssey application_).
8. Click &quot;Review + create&quot; to create the resource.

![24](https://user-images.githubusercontent.com/57418005/148472571-bec62945-453d-474e-a32d-0ec6abd750ce.png)

Now you can access your &quot;app service&quot;, you must enter the environment variables. To do this, go to &quot;Configuration&quot; in the left menu.

![25](https://user-images.githubusercontent.com/57418005/148472592-8c86b967-c118-471e-9e68-731a17bb2d74.png)

9. In the tab, click &quot;New application settings&quot;.

![26](https://user-images.githubusercontent.com/57418005/148472614-87656e86-6ec2-444d-afeb-ad755bde647a.png)

10. Add the following:

Name: **DATABASE\_URL**

Value: **postgres://\&lt;nom\_utilisateur\&gt;:\&lt;mot\_de\_passe\&gt;@\&lt;host\&gt;5432/odyssee\_teams?ssl=true**

11. Click &quot;OK&quot;.
12. Replace the information between &quot;\&lt; \&gt;&quot; by the information for the Postegres server **you are going to create right now.**

![27](https://user-images.githubusercontent.com/57418005/148472638-fcd27d30-978c-4c4e-9b62-3c1051d39af2.png)

13. Enter the following:
**MICROSOFT\_PROVIDER\_AUTHENTICATION\_SECRET**
14. This time, tick the &quot;Configure deployment slot&quot; box.
15. Click &quot;OK&quot; to save.
16. Repeat with the configuration below:

![28](https://user-images.githubusercontent.com/57418005/148472669-2f56dadb-4fb2-44a8-a2e1-92b8bc6cad0b.png)

![29](https://user-images.githubusercontent.com/57418005/148472670-f5e3376b-d470-4be8-82de-70d4b6616323.png)

![30](https://user-images.githubusercontent.com/57418005/148472671-f2c2c373-7102-41a7-bb56-5ced7dfa8aa9.png)

### Creating a database

Additional information before you begin this stage: [Microsoft documents](https://docs.microsoft.com/en-us/azure/postgresql/quickstart-create-server-database-portal)

1. A database is required for the application to function correctly. Create a new resource by searching for: Azure Database for PostgreSQL.

![31](https://user-images.githubusercontent.com/57418005/148472732-51fb5d1d-0a33-4530-9ad1-a130239e7270.png)

![32](https://user-images.githubusercontent.com/57418005/148472735-2d5f1d1b-6bc7-46b6-97d3-b8b56f041b17.png)

2. Select &quot;Single server&quot;.

![33](https://user-images.githubusercontent.com/57418005/148472748-8004f486-a0bf-46ef-b4df-dd7aa4b99fec.png)

3. On the page that opened, enter the desired server name, here &quot;odyssee-postgres&quot;, the location, the version and the &quot;compute + storage&quot; that best suits your requirements.

![34](https://user-images.githubusercontent.com/57418005/148472765-b0d1f678-c29a-4196-a45a-e6490c2a1db6.png)

![35](https://user-images.githubusercontent.com/57418005/148472768-53de01fa-60dc-4447-a73f-7a2340e2e5eb.png)

4. Finish by entering the server connection information and click &quot;Review + create&quot;. Your resource group should now look like this (below):

![36](https://user-images.githubusercontent.com/57418005/148472789-95b08d1a-ad81-4fa0-8126-1525ea396cee.png)

5. Go the &quot;Connection security&quot; section in the odyssee-postgre resource.

![37](https://user-images.githubusercontent.com/57418005/148472813-ca24bb44-2aa4-45e6-865d-2051d4dc7f70.png)

6. Add the IP address to access to the server. Click on &quot;Add a current client IP address&quot;.

![38](https://user-images.githubusercontent.com/57418005/148472838-17240475-6f18-43fc-9644-3a4772d09273.png)

7. Also, add the IP address of the application you have created, available in the &quot;Properties&quot; menu.

![39](https://user-images.githubusercontent.com/57418005/148472860-2a864998-b0ea-4072-9ab1-79007c11e3d8.png)

8. Finally, click &quot;Save&quot; to save your changes.

9. Download and install **pgAdmin** to access your server and create the databases below.

- Windows: [link](https://www.pgadmin.org/download/pgadmin-4-windows/)
- Mac: [link](https://www.pgadmin.org/download/pgadmin-4-macos/)

![40](https://user-images.githubusercontent.com/57418005/148472909-a958919d-e96c-4ac6-b5dc-d76f2fc83b74.png)

10. Execute **pgAdmin**.

![41](https://user-images.githubusercontent.com/57418005/148472942-e99799d6-8f01-480a-9783-8c9c31375aac.png)

11. Login to the Postgres server you created in Azure. Right-click &quot;Servers&quot; then &quot;Create&quot; then &quot;Server&quot;.

![42](https://user-images.githubusercontent.com/57418005/148472950-6b95a452-4a79-400f-8abb-4cd5b541b58e.png)

12. A window opens.

![43](https://user-images.githubusercontent.com/57418005/148472986-ed7ba54b-18a6-46b6-af94-a26c10d82382.png)

13. Enter the name of your new server.
14. Enter the connection information for your Azure server. This information is available in the &quot; **Connection string**&quot; tab on your Postgre server in Microsoft Azure.

![44](https://user-images.githubusercontent.com/57418005/148472999-c6fbba66-84dc-4052-80b7-4a83a6f791a4.png)

15. Click &quot;Save&quot; to save the changes.

Now that access to your Postgre server has been enabled through pgAdmin, you must create a database.

![45](https://user-images.githubusercontent.com/57418005/148473018-96285ada-7607-407f-8ba4-40b53775c842.png)

16. Right-click your server. Go to &quot;Create&quot; then &quot;Database&quot;.
17. Name it &quot;odyssey\_teams&quot;. Note: if you want to change its name later, you will have to implement the changes in the SQL files.

![46](https://user-images.githubusercontent.com/57418005/148473032-13bba9e8-5f43-4f77-afab-490bea3a65f8.png)

![47](https://user-images.githubusercontent.com/57418005/148473034-ab5a6881-dff6-4402-895d-1422268f084e.png)

18. After creating the database, you will see this new structure.

19.
![48](https://user-images.githubusercontent.com/57418005/148473058-238f8970-fea3-4969-a2bd-2df816ea4dbc.png)

20. Right-click your database. Click &quot;Query Tool&quot;.
21. A window opens. In it, copy the content of the &quot;Schema.sql&quot; file provided with this installation guide. Make sure you change the password of the odyssee\_teams\_appli role.

Note: If you want to change the role name later, you will need to change it everywhere.

![49](https://user-images.githubusercontent.com/57418005/148473078-68cea173-96b2-417d-bd5c-b47dbc8ea1e3.png)

22. To execute the query, click the &quot;Play&quot; button in pgAdmin (below).
![50](https://user-images.githubusercontent.com/57418005/148473098-1445f2da-7e93-4fcd-b521-30a4b0a449e1.png)

23. To import CSV files, go to &quot; **Configure pgAdmin**&quot; by clicking &quot;Servers&quot; then &quot;Dashboard&quot;.

![51](https://user-images.githubusercontent.com/57418005/148473117-f4f6ea4e-463b-4a38-9661-ac4ae32acd97.png)

24. Click &quot;Binary paths&quot; in the left menu.
25. Add the path to the folder with your version of postgreSQL.

![52](https://user-images.githubusercontent.com/57418005/148473145-1b8863e0-a723-4f76-835f-12e2d17891f0.png)

26. Tick the box as shown in the above screenshot. Then click &quot;Save&quot;.

You can now import the files; this is the next step.

27. Right-click the &quot;t\_question&quot; table then click &quot;Import/Export&quot;.
![53](https://user-images.githubusercontent.com/57418005/148473202-0b2b054f-6281-486e-a771-077bdee6a54c.png)

28. Make sure you click &quot;Import&quot; and not &quot;Export&quot;.
![54](https://user-images.githubusercontent.com/57418005/148473214-27803a3a-ca56-4c87-b7d6-ef71cb9f0ba1.png)

29. Select the &quot; **t\_question.csv**&quot; file provided with this installation guide. Select &quot;UTF8&quot; for the encoding and &quot;;&quot; as the delimiter.
30. Click &quot;OK&quot; to save.
31. The questions table has been filled with all the questions. Repeat the import procedure, this time with the &quot; **t\_response.csv**&quot; file.

![55](https://user-images.githubusercontent.com/57418005/148473239-d59d2e3d-db25-4599-ad97-36cc1d9b9f7a.png)

![56](https://user-images.githubusercontent.com/57418005/148473240-97ef2142-4621-48a8-90ec-7b81a21c557e.png)

32. Open the data.sql file provided with this installation guide.
33. Change the following values:
- a. The &quot;tid\_ad&quot; for your Azure tenant ID.

![57](https://user-images.githubusercontent.com/57418005/148473282-07477400-64a2-499b-91be-80f4fa209142.png)
- b. The name of your organisation.
![58](https://user-images.githubusercontent.com/57418005/148473286-77ddead9-8f4d-4a9b-898f-89cce21dad61.png)

- c. And the email addresses of your Game Masters.
![59](https://user-images.githubusercontent.com/57418005/148473301-2fc92a2e-5e5d-405e-8881-05bd4d3dd75a.png)

34. Copy and paste the content of this file in the &quot; **Query Tool**&quot; in **pgAdmin** as you did for the &quot; **schema.sql**&quot; file.

![60](https://user-images.githubusercontent.com/57418005/148473340-44680f70-a0f8-4a59-b024-a2872a7f9d24.png)

35. For the questions and answers, you need to import the &quot;t\_libelle\_i18n&quot; table from the CSV file provided with this installation guide. The import process is the same as before.

![61](https://user-images.githubusercontent.com/57418005/148473365-81287346-2a2f-4d2c-80aa-8e05991c3acc.png)

36. Your database is ready. All you have to do is put the application on the App service you created before. To do this you will need to download and install &quot;Visual Studio Code&quot;: [link](https://code.visualstudio.com/)

![62](https://user-images.githubusercontent.com/57418005/148473378-a6945d7d-000a-428b-a4ef-799686ecf974.png)
37. Une fois « VSC » d'installé, lancez-le.
![63](https://user-images.githubusercontent.com/57418005/148473402-ed65fafe-7e55-4da8-b066-d88e2e1feba9.png)

38. Go to "File" then "Open folder" and select the "Odyssee_teams_pub" folder from this repository.

40. Next, you will need "Node JS" in its version 12.22.9 (Note that for more recent versions, you will have to adapt the code).

42. To download and install it, go to [node.js] (nodejs.org/en/download/releases/): you should find the corresponding version on page 10.
![Capture4](https://user-images.githubusercontent.com/67316441/149010916-9d6e0c0c-4ec0-4601-bad1-9689494f6554.PNG)

41. Once this step is done, open terminal via the "terminal" tab.
![Capture3](https://user-images.githubusercontent.com/67316441/149010619-2b0cbb52-5ca5-4e9a-bda2-c73ac1a99425.PNG)

42. In the terminal, type the command "cd client" and press "enter" to go to the client folder.
![Capture12](https://user-images.githubusercontent.com/67316441/149011195-7e906a0d-13e4-459c-a798-5fa9d6857b88.PNG)

43. Once in the client folder, type the command "npm i" then press "enter".
![Capture5](https://user-images.githubusercontent.com/67316441/149013660-0252b5a4-26f8-4be4-a061-244c3b787b54.PNG)

44. Next, type the command "npm run build" to create the build of the front.
![Capture6](https://user-images.githubusercontent.com/67316441/149013613-e84dd1f1-afe1-4213-9a5b-db99bf7cd2da.PNG)

45. This should create a build folder for you in the client folder.

![Capture7](https://user-images.githubusercontent.com/67316441/149011538-fda05a81-fa5a-4a2b-ac27-c4ae1e017866.PNG)

46. Create a new folder under the name "Prod" in which you will copy several folders found in "Odyssee_teams_pub / server": the result should look like this.

![Capture8](https://user-images.githubusercontent.com/67316441/149011893-642530b8-84d9-491e-85ce-20423c11ab2b.PNG)

47. The ".deployment" file is a file that you must create and that contains only two lines.
![Capture13](https://user-images.githubusercontent.com/67316441/149012174-78c5550a-9518-41ba-b7c9-ca39141c2825.PNG)

48. In the "config" folder, open the "manifest.json" file and replace "port": 8080 by "port": 443.
![Capture14](https://user-images.githubusercontent.com/67316441/149012874-f0a0aeb3-b845-4a7a-b8aa-10f739ed98a4.PNG)

49. In your new "Prod" folder, go to the "public" folder and copy the build you previously created to the "client" folder.
![Capture9](https://user-images.githubusercontent.com/67316441/149012534-c88a0727-7f61-4c60-be76-d859d2ab76c3.PNG)

50. Once &quot;VSC&quot; is installed, open it, open the file Crypto.js and put a random string in the variable CRYPTO_SECRET_KEY.
![63](https://user-images.githubusercontent.com/57418005/148473402-ed65fafe-7e55-4da8-b066-d88e2e1feba9.png)
![Capture](https://user-images.githubusercontent.com/67316441/148569783-dd02800d-6528-4b9e-8ba8-d979c1658a4f.PNG)

51. Go to &quot;File&quot; then &quot;Open folder&quot; and select the &quot;Prod&quot; folder provided with this installation guide.

![64](https://user-images.githubusercontent.com/57418005/148473407-e15ba56f-5d00-40fb-a15e-941d73b3f77e.png)

52. Go to &quot;Extensions&quot; in the left menu.
53. Find &quot;Azure App Service&quot;.
54. Install the &quot;Azure App Service&quot; application.

![65](https://user-images.githubusercontent.com/57418005/148473425-adf436d4-c12c-4fda-bbf2-3a98d4b54dd1.png)

55. Open the &quot;Azure App Service&quot; application now installed.
56. Login with your Microsoft account.
57. Your App service will appear and suggest &quot;OdysseyTest&quot; or (the name you chose). Right-click the application.
58. Click &quot;Deploy to Web App&quot;.

**Congratulations, your application is now installed and accessible.**

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

# Installing Teams Odyssey on your Teams tenant

## Introduction

Teams Odyssey is a web application. The zip package &quot;_LOdysseedeTeams2021.zip_&quot; must be downloaded from GitHub then imported to your organisation&#39;s Microsoft Teams store. This requires specific access rights to the Microsoft Teams Admin dashboard. If your organisation has deactivated the Microsoft Teams store, you will find a reactivation link below to install the application.

[https://docs.microsoft.com/fr-fr/MicrosoftTeams/manage-apps](https://docs.microsoft.com/fr-fr/MicrosoftTeams/manage-apps)

Note: There is no specific port to open for the installation.

### A firewall is blocking the installation

If a firewall or proxy is blocking the installation process, the link below will add a policy to your Teams tenant authorising calls to this URL.

[https://odyssee-de-teams.saegus.com/](https://odyssee-de-teams.saegus.com/)

## 5 stages for a successful installation

### 1st stage: Open your Microsoft Teams Admin dashboard

1. Open a page in your browser.
2. Go to your Microsoft Teams Admin dashboard. Copy the following URL in your browser search field for direct access to your dashboard. [https://admin.teams.microsoft.com](https://admin.teams.microsoft.com/)

### 2nd stage: Manage Apps

3. In the left menu of your Admin Teams interface, click &quot;Teams apps&quot;.
4. Now click &quot;Manage Apps&quot;. The right section of your interface shows a list of your applications.

![66](https://user-images.githubusercontent.com/57418005/148473581-03249dd4-88c4-461b-b1cd-ccac5f0bf5cb.png)

### 3rd stage: Upload the .zip file on your tenant

5. Open the file "PACKAGE_ODYSSEY_FR / manifest.json" on your computer, and change the URL to the one you created in the app service and the id of your app.

![Capture15](https://user-images.githubusercontent.com/67316441/149138090-a58996d6-7967-429d-a990-d0af99f72f94.PNG)

6. Create a .zip file from the three files "color.png", "manifest.json" (which you just modified) and "outline.png".

7. On the right side of your interface, click on the "Upload" button.

![67](https://user-images.githubusercontent.com/57418005/148473589-ce432cee-4727-4694-9f30-91fc05a59aa5.png)

8. Click on the "Select a file" button offered by the modal that just appeared, and choose the zip you just created.

![69](https://user-images.githubusercontent.com/57418005/148473606-6a87bb90-b258-464b-a68e-9aee57e6ff0c.png)

### 4th stage: Policy

9. Now that the application has been successfully imported, you must give it a policy.

Reminder: On Microsoft Teams, it is possible to configure a policy with an application that is only accessible to one precise group within your organisation. By default, an application is accessible to all users with a so-called &quot;Global&quot; policy.

10. Click &quot;Setup policies&quot; in your left menu.
![70](https://user-images.githubusercontent.com/57418005/148473655-0c6e5e0b-066b-4681-971a-05d161c092da.png)

11. The &quot;App setup policies&quot; window opens on the right.
12. You can copy and edit an existing policy from the list. If you would like to configure a new policy specific to a group of people, click &quot;+ Add&quot; to create a new one.

![71](https://user-images.githubusercontent.com/57418005/148473670-0d7eade3-2e73-42c5-baf6-ad437f25cd78.png)

### 5th stage: Configuring a new policy

13. In the new policy window, make sure that the 2 buttons &quot;Upload custom apps&quot; and &quot;Allow user pinning&quot; are both &quot;on&quot;.

![72](https://user-images.githubusercontent.com/57418005/148473710-669442c6-e785-42bb-a464-b57d513807a1.png)

14. To associate your Teams Odyssey application with this policy, click &quot;+ Add apps&quot; to open the side search window.

![73](https://user-images.githubusercontent.com/57418005/148473718-5b0084e4-184c-44db-bd75-9aed307743f3.png)

15. Now the side search window is open, find the name of the Teams Odyssey application in the search field. It will appear.

![74](https://user-images.githubusercontent.com/57418005/148473727-dcb00299-0b4b-4c79-a041-b335935f658a.png)

16. Click &quot;Add&quot; to confirm your selected application.

![75](https://user-images.githubusercontent.com/57418005/148473758-986a0f6a-2d59-4dfb-a881-b1f7441b9505.png)

17. Similarly, if you want the users to be able to easily access the application on their Microsoft Teams interface, you can pin it for quick access. To do that, click &quot;+Add apps&quot; in the &quot;Pinned apps&quot; section.

![76](https://user-images.githubusercontent.com/57418005/148473776-5462356e-08b3-4363-8057-bf575559fb4c.png)

18. Click &quot;Save&quot; at the bottom of the page to save all your changes.

![77](https://user-images.githubusercontent.com/57418005/148473797-ce4e8050-7b09-4b5b-ad5c-4ccea2e12769.png)

**Congratulations! The Teams Odyssey application is now installed and configured, ready to use!**

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

# First steps to activate Teams Odyssey

## Introduction

Now that the Teams Odyssey application is correctly installed on your Microsoft Teams tenant, your game environment has been created on Azure and the Game Masters have been configured, final activation is required.

Here the role of the Game Master is necessary. If the game has not been activated by the Game Master, the Explorers (players) will not be able to access their interface.

## Becoming a Game Master and configuring a season

The Game Master&#39;s role is to manage a 4-week season during which the Explorers will answer over 200 questions. The Game Master has a specific interface which allows them to:

- Install their organisation&#39;s logo using the &quot;Tool&quot; tab;
- Stop the game using the &quot;Tool&quot; tab;
- Activate the modules of 45 single questions every week using the &quot;Scheduling&quot; tab;
- Access game statistics and rankings in real-time using the &quot;Rankings&quot; tab;

An illustrated &quot;Gamemaster.pdf&quot; file is available in the &quot;GameMasterkit.zip&quot; package to help the Game Master learn how to use their interface.

The Game Master can also be responsible for promoting the game in the organisation before and throughout the season. An out-of-the-box communication tool kit is provided: &quot;Communication – Kit\_assets.zip&quot;. We highly recommend:

- Personalising emails with the Teams Odyssey identity available in the &quot;Scheduling&quot; tab before the launch (teaser) and at regular intervals throughout the event. Emails cannot be sent directly from the platform. You will have to copy/paste them and send them through your regular email system;
- Advertise the game to your organisation through internal channels like Yammer, Teams, Outlook and other intranets;
- Send Teams notifications through the &quot;Push notification&quot; feature using the &quot;Scheduling&quot; tab. You can write whatever you like in a notification but no more than 32 characters. The notification received by users will provide automatic access to the game with a simple click.

Note: It is not possible to extract player rankings. We recommend the Game Master do a screenshot of the rankings as the game progresses.

## First login

1. Go to your Microsoft Teams interface. Click on the Teams Odyssey icon on the side bar, if it was pinned there during installation.

![78](https://user-images.githubusercontent.com/57418005/148473900-22dfa960-2275-4ae4-9f69-4dba7c6cb73d.png)

2. If not, go to your app store and search for &quot;Teams Odyssey&quot;.

![79](https://user-images.githubusercontent.com/57418005/148473922-8e7447d3-b694-444e-a45e-652ad7e31061.png)

3. Click &quot;Open&quot; to launch the application.

4. You will land on the first page of the game. Click on &quot;Play now!&quot; to continue.

![81](https://user-images.githubusercontent.com/57418005/148475620-d5bbd54b-dfc1-4599-8424-6e6c9f34daa3.png)

5. On the next page, read the GDPR, tick the box &quot;I have read the terms and conditions of the game&quot; and click &quot;Confirm and continue!&quot; to continue in the game.

![82](https://user-images.githubusercontent.com/57418005/148475639-72ea561e-2dfa-491b-8730-b49e52874072.png)

6. On the page where you select your spaceship (your avatar in the game), choose one of the images and click on &quot;Complete settings&quot;. Your choice of spaceship will not affect your experience.

![83](https://user-images.githubusercontent.com/57418005/148475661-e607b08e-17aa-46fa-a535-2687cba3ccc2.png)

7. You will then arrive at the main tab of your interface: the cockpit. From this moment, the game is activated and accessible for all Explorers.

![84](https://user-images.githubusercontent.com/57418005/148475687-12e9d21a-b294-471d-8b09-3d4632909400.png)

The &quot;Cockpit&quot; tab is your landing dashboard when you open the game. The &quot;Scheduling&quot; tab is where you activate all the missions. You will find email and social media templates there and you can send push notifications from there too. The &quot;Rankings&quot; tab is where you can check game statistics in real-time and the rankings within your organisation. Finally, in the &quot;Tools&quot; tab you can configure the logo of your organisation and stop the game at any time with the &quot;stop the game&quot; function.

## Activating the first question module

You now have access to the Game Master interface and the Explorers now have access to the game. However, if none of the question modules are activated, the players cannot play the game.

When you want to officially launch the first week in your organisation&#39;s Teams Odyssey season, follow these steps:

8. Go to the &quot;Scheduling&quot; tab in your interface.
9. Open the &quot;Program and missions&quot; tab.

![85](https://user-images.githubusercontent.com/57418005/148475714-fc58061c-a386-4ad4-83a3-d192b4b66f20.png)

10. To activate the first question module, click the &quot;Pending mission&quot; button. The order of the modules is as follows:

  - &quot;Launch! &quot;
  - &quot;Stabilisation! &quot;
  - &quot;Progress! &quot;
  - &quot;Touchdown! &quot;

Note that when a Game Master activates a new week, this deactivates the previous week. It is not possible to have two weeks activated at the same time. To avoid confusing the rankings, it is not possible for players to go back to a previous week&#39;s questions. It is therefore important to remind them to keep up with the game.

## Stopping or pausing the game

11. If you would like to pause or stop the game, go to the &quot;Tools&quot; tab.
12. Click &quot;Block access to the game&quot; to pause or stop the game. To reactivate the game, select one of the question modules in the &quot;Scheduling&quot; tab as explained above.

![86](https://user-images.githubusercontent.com/57418005/148475773-6c58521e-30cc-410f-8983-fee5cbb79ce9.png)

13. At the end of the season, if you would like to keep track of the rankings, we recommend taking screenshots because you will not be able to extract this information from the application.

## Game Master guide - Further information

All the information specific to the role of Game Master is available in the document &quot;Teams\_Odyssey - Game\_Master\_Guide.pdf&quot; provided with the game.

**Congratulations! The Teams Odyssey season is now up and running!**

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

# FAQ

## Installation &amp; management

#### My organisation does not have all the features and functions of Microsoft Teams. Is it possible to not use the questions about these features?

Yes. You can deactivate question topics specific to each major feature of Microsoft Teams. To do this, go to the &quot;Scheduling&quot; tab in your Game Master interface. In the &quot;Programme and missions&quot; tab, click &quot;Settings&quot; to open an interactive menu that will allow you to deactivate up to two question topics. To guarantee the correct function of the game, it is not possible to deactivate more than two topics.

#### Do I need to reinstall the game if a new feature or function is added?

No. No new installation is required to access new features or functions. If a new installation is required, a note will be sent to organisations with the reason and details of the installation.

#### Do I need to create an account to play the Teams Odyssey app?

No. There is no need to create an account or login to access the game. It is a transparent authentication with the user account connected on Microsoft Teams (SSO).

#### Is it possible to play the game if you are a Game Master?

No. You cannot access the Explorer interfaces if you are a Game Master. You therefore cannot play the game. We recommend you use another account.

## Game

#### How long does it take to play Teams Odyssey?

Teams Odyssey is a game designed to be played over 4 weeks of 5 working days. The gameplay time is estimated at 1h per week for a very active player.

#### Is the game accessible over the weekend?

No. The game is not accessible over the weekend.

#### Is the game accessible on the Teams Mobile app?

Yes. Explorers can access the game on Teams Mobile. We recommend that players use the app for a better, more immersive experience. Game Masters are strongly recommended to only use the Game Master application interface on a desktop computer for a better user experience and more comfortable use.

#### Is it possible to see all the game&#39;s topics and questions?

Yes. You will find all the Teams Odyssey questions in the document &quot;Q&amp;A\_EN.xlsx&quot;.

#### Is there any advice to help Explorers understand and play the game?

Yes. There is a guide to help players understand the game and learn its features and mechanisms. The guide is called &quot;Teams\_Odyssey - Explorer\_Guide.pdf&quot; and can be downloaded from the player interface in the &quot;Rules of the game&quot; tab. Similarly, there is a guide for Game Masters: &quot;Teams\_Odyssey - Game\_Master\_Guide.pdf&quot;.

## Security &amp; Data access

#### Does Teams Odyssey have GDPR and where can I find the information?

Yes. Teams Odyssey has GDPR accessible when the user first opens the game, whether they are an Explorer or a Grand Master. Approval is required to access the game content. All GDPR information can be found in the document &quot;Teams\_Odyssey - Disclaimer.pdf&quot;.

#### Is there a document containing all the security and access data for Teams Odyssey?

Yes. This document is called &quot;Microsoft - Security and data access.pdf&quot;.

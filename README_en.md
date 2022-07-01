# Microsoft – Teams Odyssey - README EN

#### Our customers say it best!

- Even the most seasoned of them discovered new features. And it helped stimulate discussions and chat between teams.
- Kiabi dared and Kiabi played! Over 447 “Kiabers” joined Odyssey, a game that helped build connections between teams in the chain’s different stores.
- The game created a challenge and discussions between teams who really enjoyed the gameplay

# Teams Odyssey

## Introduction

Teams Odyssey is a fun training course designed by Microsoft as a web app. The game is organized by trainers and its mission is to reinforce users’ adoption and use of Microsoft Teams in their organization.

![1](https://user-images.githubusercontent.com/57418005/148531468-57b99a49-f8db-45e9-a81b-8e73f40b5cd5.png)

Over 4 weeks, answer over 200 questions organized into 8 various topics and 3 different levels of difficulty (45 unique questions will be available only during the ongoing week). Collect medals and ranking points for your company while learning more about how to use Teams.

The app has an interface for players, a game management interface for the Game Masters and ready-to-use communication tool kit to promote the app. 

- Installation of the application on your Teams tenant
- Configuration of your game environment in Azure, setup for the Game Master and activation of game for all targets users
- Launch of a Teams Odyssey season.

#### Benefits

Once the app is installed on your organization’s tenant, users can begin the adventure by simply clicking on the application icon. No installation or login is required or requested given that they are already connected to their Teams tenant when they open the application. A disclaimer still has to be accepted to start the game.

Playing Teams Odyssey means discovering and learning good uses and best practices for Microsoft Teams in a fun way.

#### Cost

The Teams Odyssey app is free. Simply download the package to access the game folders and installation guide. The app does, however, require subscription to Azure, which must be paid for.

#### Prerequisites

To install and configure the Teams Odyssey application, you need the following prerequisites: 
- An Azure tenant (as well as an active subscription) and an administrator.
- A database administrator (PostgreSQL) to create and build the game database (which will be hosted on Azure for the duration of the game).
- A Teams Administrator to install the application on your tenant and make it available
- Access to the Microsoft Teams Admin dashboard with the rights required for importing an application and managing policies (access allocation rules for an application).
- Access to your Microsoft Azure platform to create a game environment and allocate the Game Master roles.
- Ask the following questions and collect the answers.
   - Is this game for all employees of the Microsoft Teams tenant or only a specific group?
   - Who will be declared Game Masters for the upcoming season? We highly recommend getting the professional email address for at least two Game Masters. This can be a       backup if any of the Game Masters is unavailable. Note: a Game Master will have access to a different interface than the players, thus is the conjunction that         fits more with this context given that we have an event and its relative outcome will not be able to play the game (answer questions, collect points and medals,       etc.).
   - Teams Odyssey is designed as a 4-week campaign. Setting the right date for launching the Teams Odyssey season is highly recommended. We recommend starting the game on a Monday and avoiding any holiday seasons or hectic periods.

## Glossary

Teams Odyssey is a game that has its own vocabulary. Here are the terms you will encounter the most as you read this guide:

| **Term** | **Definition** |
| --- | --- |
| **Microsoft Teams tenant administrator** | User with access to the Microsoft Teams dashboard to install and configure Odyssey as a Game Master |
| --- | --- |
| **Cockpit** | The cockpit is the name of the home interface of the Teams Odyssey game, for players and for Game Masters |
| **Explorer** | The user in the role of the player with standard access to Odyssey |
| **Teams Odyssey** | A serious game to teach good use and best practices for Microsoft Teams |
| **Game Master/ Commander** | User in the role of game administrator with access to the Game Master interface |
| **Mission** | Weekly module with 45 questions that is activated and deactivated by the Game Master |
| **Tools** | A tab available on the Game Master interface with the possibility of adding the logo of your organization or stopping the ongoing game |

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

To follow this step-by-step guide you must have the **Admin rights of your organization Azure tenant**.

### Creating your application in the Azure Active Directory

Additional information before you begin: [Microsoft documents](https://docs.microsoft.com/fr-fr/azure/active-directory/develop/quickstart-register-app)

1. Go to the Azure Active Directory on the Enterprise applications tab.

![1_en](https://user-images.githubusercontent.com/67316441/166934505-c1995207-2600-4d7b-89e8-37d61a4ab19e.PNG)

2. You can create a new application in the dashboard.

![2_en](https://user-images.githubusercontent.com/67316441/167112263-75c4be15-fedc-4aef-a892-1724847ff8f5.PNG)

3. Click on "New Application". The page below will open.

![3_en](https://user-images.githubusercontent.com/67316441/167112291-417738e0-391b-405f-92d8-4a4dc6a12b02.PNG)

4. On this page, click on "Create your own application".

![5](https://user-images.githubusercontent.com/57418005/148472084-b502c838-4f3e-484c-8cbd-8b28c9cd0cbb.png)

5. Name it whatever you want, for example &quot;TEAMSODYSSEY&quot; and make sure you click the second option &quot;Register an application to integrate with Azure AD&quot;
6. Then click on "Create" at the bottom of the page.

![6](https://user-images.githubusercontent.com/57418005/148472118-a42c1c9b-e7f7-45fd-a6b5-94c28f60c80b.png)

7. Now you can enter the name of the application.
8. Chose the group of people who will be able to access the application.
9. Finally, enter the following URL:[http://localhost:8080](http://localhost:8080/)
10. Click on &quot;Register&quot; to complete this step.

![7](https://user-images.githubusercontent.com/57418005/148472137-ea5384d5-5d1e-47eb-aa89-c251814721a9.png)

You can now see your application on the list.

Go back on home page and click on "App registration"

![11_en](https://user-images.githubusercontent.com/67316441/167112449-999bfa42-8222-4ae3-ad53-551048033694.PNG)

![11_bis_en](https://user-images.githubusercontent.com/67316441/167113560-afe4ff03-f90a-41bc-85b7-bbfc5ab41ee8.PNG)

11. Click on the name of the new application.

![8](https://user-images.githubusercontent.com/57418005/148472153-9fc47ffe-5a81-4a6d-8057-26b31729a51e.png)

12. Go to the &quot;API permissions&quot; section in the left menu.

![12_en](https://user-images.githubusercontent.com/67316441/167114951-3a07134c-12c8-4b9b-b041-626a72d3de16.PNG)

13. Add the above authorizations as **delegated**.

First, click on "Add a permission".

![12_en](https://user-images.githubusercontent.com/67316441/166938572-38e8619d-6537-40dc-bc52-b82cd3b37474.PNG)

Second, select "Microsoft Graph".

![12_bis_en](https://user-images.githubusercontent.com/67316441/166938736-d6bee923-7df2-4c36-9d4f-25515c81c0e5.PNG)

Third, select "Delegated permissions".

![12_ter_en](https://user-images.githubusercontent.com/67316441/166938900-42da8492-2072-46c0-87cc-339aaaeadea0.PNG)

Finally, select all delegated permissions as detailed on the 13th picture.

![12_last_en](https://user-images.githubusercontent.com/67316441/166940832-3b03598d-e130-4601-9097-90d56806cce8.PNG)

14. Click on "Authentication" in the left menu.

![14_en](https://user-images.githubusercontent.com/67316441/166941472-5feabcb1-ccdd-4e16-9143-557d6fe40f95.PNG)


15. Click on "Add a platform" and add a "Single page application" platform and configure it.

![14_bis_en](https://user-images.githubusercontent.com/67316441/166941770-a70f76cd-32c6-47bb-b27e-e4c7e07a7ded.PNG)
![14_ter_en](https://user-images.githubusercontent.com/67316441/166942313-82b9de77-d62a-4191-b957-e76c51bd7245.PNG)


16. Add two URLs that represent the application service URL which will be created in the following stages: [https://odysseetest.azurewebsites.net](https://odysseetest.azurewebsites.net/)and [https://odysseetest.azurewebsites.net/callback/v2](https://odysseetest.azurewebsites.net/callback/v2)

![12](https://user-images.githubusercontent.com/57418005/148472278-de5c2d00-361a-488f-922b-71eeda5e626f.png)

17. At the bottom of this page, tick the two boxes then click on "Save".
18. Then, click on "Certificate &amp; secrets" in the left menu. Add a "secret client" that will be used later.

![13](https://user-images.githubusercontent.com/57418005/148472298-3ac99277-a6e6-44b3-bef7-bd62cf325ce1.png)
![14](https://user-images.githubusercontent.com/57418005/148472304-afed63a7-f81e-4171-9101-acc9fa9dbd9c.png)

19. Open the file server.js and replace auth information with your IDs.

![Capture2](https://user-images.githubusercontent.com/67316441/148569266-02ded892-0d04-428c-872f-09952847146f.PNG)

19.1. You need to replace <your url>, <your tenant id> and <your client id> in these files :
  - adal.auth.service.js
  - manifest.json
  - msal.auth.service.js
  - teams.auth.service.js

20. Now, go to "Expose an API" in the left menu.

![20_en](https://user-images.githubusercontent.com/67316441/166944683-4a22791c-e110-4981-a784-7f0b20620086.PNG)

21. Click on "Add a scope".

![21_en](https://user-images.githubusercontent.com/67316441/166945263-b864bffe-3c83-4884-9ca1-448c3e42f6b3.PNG)

22. In the window that opens (see above), add all the people who will consent to be "Administrators and Users".
23. Click on "Add a scope" to close the window.

The Azure Active Directory part is now complete. Go back to Microsoft Azure where we will add a resource group.

### Microsoft Azure

Additional information before you begin: [Microsoft documents](https://docs.microsoft.com/fr-fr/azure/azure-resource-manager/management/manage-resource-groups-portal)

1. From home, go to the "Resource groups" page.

![1_en](https://user-images.githubusercontent.com/67316441/166947100-950f0a63-6f06-4d39-a359-7bbab7bc7221.PNG)

![1_bis_en](https://user-images.githubusercontent.com/67316441/166947158-52ca2e52-1e87-4ba0-b1b0-934f11457623.PNG)

![1_ter_en](https://user-images.githubusercontent.com/67316441/166947239-0b2eb658-e624-48af-bf71-b39bd9c1fef5.PNG)

2. Choose and enter a name for this resource group. Confirm.

![2_en](https://user-images.githubusercontent.com/67316441/166947411-c41fe810-db69-4bc5-a504-6d1686b687a0.PNG)

3. Once you have confirmed the correct creation of your resource group, select it and click "Create" to create a web application.

Additional information before you begin this stage: [Microsoft documents](https://docs.microsoft.com/en-us/azure/app-service/app-service-plan-manage)

![3_en](https://user-images.githubusercontent.com/67316441/166947518-3d3f1ded-913a-4071-84bc-4873b2b78e61.PNG)
![22](https://user-images.githubusercontent.com/57418005/148472513-ef0a491b-cb88-4012-9b79-fa6b0a93469d.png)

4. Select "Web app" from the list.

![4_en](https://user-images.githubusercontent.com/67316441/166947598-864c5682-240d-4263-a77c-17f2d7a3cd64.PNG)

5. Enter the name of your application, here "OdysseeTest".
6. **Keep**"Code as the publication method and choose **Node 14 LTS** as the execution stack.
7. Keep Linux as the operating system and use the most suitable Linux plan (_depending on the expected / estimated use of the Teams Odyssey application_).
8. Click "Review + create" to create the resource.

![8_en](https://user-images.githubusercontent.com/67316441/166947694-099b7be9-b157-4e95-b17b-4744d74ba58a.PNG)
![8_bis_en](https://user-images.githubusercontent.com/67316441/166947760-e9ca540c-92f9-4925-a828-475ce6f58918.PNG)

Now you can access your "app service", you must enter the environment variables. To do so, go to "Configuration" in the left menu.

![8_ter_en](https://user-images.githubusercontent.com/67316441/166947867-0ee432eb-5999-42a2-a89f-3f1f5cd25f20.PNG)

9. In the tab, click on "New application settings".

![9_en](https://user-images.githubusercontent.com/67316441/166947922-934ff1be-3356-4783-8262-d7848495a487.PNG)

10. Add the following:

Name: **DATABASE\_URL**

Value: **postgres://\<nom\_utilisateur>:\<mot\_de\_passe>@\<host>5432/odyssee\_teams?ssl=true**

11. Click on "OK".
12. Replace the information between "<>" by the information for the Postegres server **you are going to create right after.**

13. Repeat with the configuration below:

![28](https://user-images.githubusercontent.com/57418005/148472669-2f56dadb-4fb2-44a8-a2e1-92b8bc6cad0b.png)

![29](https://user-images.githubusercontent.com/57418005/148472670-f5e3376b-d470-4be8-82de-70d4b6616323.png)

![30](https://user-images.githubusercontent.com/57418005/148472671-f2c2c373-7102-41a7-bb56-5ced7dfa8aa9.png)

![31](https://user-images.githubusercontent.com/67316441/174289592-edd1ee71-4600-4c29-8315-a6c553371c81.PNG)

![32](https://user-images.githubusercontent.com/67316441/174289605-ed1440a3-b79a-4987-b9e2-cf0b125f3fc9.PNG)

![33](https://user-images.githubusercontent.com/67316441/174289613-4d31d5ff-0df3-4f05-a03e-47418b6a6ede.PNG)

14. Then we must add an SSL certificate to have a secure URL (https).

![34](https://user-images.githubusercontent.com/67316441/174291737-59b74304-0c51-45d1-8f32-e96e218d97ee.PNG)

Go to TLS/SSL settings, click on "Private Key Certificates (.pfx)" and "Create App Service Managed Certificate".

![35](https://user-images.githubusercontent.com/67316441/174291764-aa6e1ee2-c7b0-40ec-83e8-c48a409be92d.PNG)

Type your URL you want to secure and click on “Create”.

![36](https://user-images.githubusercontent.com/67316441/174291808-aae932bf-7475-4a70-a10a-5378373baee9.PNG)

Go to "Bindings" and click on "Add TLS/SSL Binding".

![37](https://user-images.githubusercontent.com/67316441/174291824-eed2df0f-42c4-408e-83dd-b707ee6f7b05.PNG)

Select your domain, and chose IP Based SSL as TLS/SSL Type.

### Creating a database

Additional information before you begin this step: [Microsoft documents](https://docs.microsoft.com/en-us/azure/postgresql/quickstart-create-server-database-portal)

1. A database is required for the application to function correctly. Create a new resource by searching for: Azure Database for PostgreSQL.

![1_en](https://user-images.githubusercontent.com/67316441/166949699-65eecb0d-ae3f-49ac-a0d5-fa0d95ec905f.PNG)

![1_bis_en](https://user-images.githubusercontent.com/67316441/166949717-521973b7-2d44-49ba-ba2c-6e36afa20305.PNG)

2. Select "Single server".

![2_en](https://user-images.githubusercontent.com/67316441/166949805-fd2eecdc-ae02-4041-9ed8-4004b5665c20.PNG)

3. On the page that opened, enter the desired server name, here "odyssee-postgres", the location, the version and the "compute + storage" that best suits your needs.

![3_en](https://user-images.githubusercontent.com/67316441/166949946-a07de828-8fab-468e-91fa-f7d9979e721b.PNG)

![3_bis_en](https://user-images.githubusercontent.com/67316441/166949958-978f9220-0eae-4b65-b988-e7b609216f15.PNG)

![3_ter_en](https://user-images.githubusercontent.com/67316441/166950040-8c4e2187-d5f1-4c03-96a4-70d329de45dd.PNG)

4. Finish by entering the server connection information and click on "Review + create". Your resource group should now look like this (below):

![4_en](https://user-images.githubusercontent.com/67316441/166950238-dbc5b322-feec-4198-bebc-c7186c005052.PNG)

5. Go the "Connection security" section in the odyssee-postgre resource.

![5_en](https://user-images.githubusercontent.com/67316441/166950309-e45a8f13-9ce7-4955-a034-6279186ece26.PNG)

6. Add the IP address to access the server. Click on "Add a current client IP address".

![6_en](https://user-images.githubusercontent.com/67316441/166950375-7502534d-af9f-4f22-bb20-c3f0c2a338a4.PNG)

7. Also, add the IP address of the application you have created, available in the "Properties" menu.

![7_en](https://user-images.githubusercontent.com/67316441/166950405-486caf7f-5a87-4d0c-a0e7-64d0910bfef2.png)

8. Finally, click on "Save" to save your changes.

9. Download and install **pgAdmin** to access your server and create the databases below.

- Windows version: [link](https://www.pgadmin.org/download/pgadmin-4-windows/)
- Mac version: [link](https://www.pgadmin.org/download/pgadmin-4-macos/)

![40](https://user-images.githubusercontent.com/57418005/148472909-a958919d-e96c-4ac6-b5dc-d76f2fc83b74.png)

10. Execute **pgAdmin**.

![41](https://user-images.githubusercontent.com/57418005/148472942-e99799d6-8f01-480a-9783-8c9c31375aac.png)

11. Login to the Postgres server you created in Azure. Right-click on "Servers" then "Create" then "Server".

![42](https://user-images.githubusercontent.com/57418005/148472950-6b95a452-4a79-400f-8abb-4cd5b541b58e.png)

12. A window opens.

![43](https://user-images.githubusercontent.com/57418005/148472986-ed7ba54b-18a6-46b6-af94-a26c10d82382.png)

13. Enter a name of your new server.
14. Enter the connection information of your Azure server. This information is available in the "**Connection string**" tab on your Postgre server in Microsoft Azure.

![44](https://user-images.githubusercontent.com/57418005/148472999-c6fbba66-84dc-4052-80b7-4a83a6f791a4.png)

15. Click on "Save" to save the changes.

Now that access to your Postgre server has been enabled through pgAdmin, you must create a database.

![45](https://user-images.githubusercontent.com/57418005/148473018-96285ada-7607-407f-8ba4-40b53775c842.png)

16. Right-click on your server. Go to "Create" then "Database".
17. Name it "odyssey\_teams". Note: if you want to change its name later, you will have to make the changes in the SQL files.

![46](https://user-images.githubusercontent.com/57418005/148473032-13bba9e8-5f43-4f77-afab-490bea3a65f8.png)

![47](https://user-images.githubusercontent.com/57418005/148473034-ab5a6881-dff6-4402-895d-1422268f084e.png)

18. After creating the database, you will see this new structure.

![48](https://user-images.githubusercontent.com/57418005/148473058-238f8970-fea3-4969-a2bd-2df816ea4dbc.png)

19. Right-click on your database. Click on "Query Tool".
20. A window opens. In it, copy the content of the "Schema.sql" file provided with this installation guide. Make sure you change the password of the odyssee\_teams\_appli role.

Note: If you want to change the role name later, you will need to change it everywhere.

![49](https://user-images.githubusercontent.com/57418005/148473078-68cea173-96b2-417d-bd5c-b47dbc8ea1e3.png)

21. To execute the query, click on the "Play" button in pgAdmin (below).
![50](https://user-images.githubusercontent.com/57418005/148473098-1445f2da-7e93-4fcd-b521-30a4b0a449e1.png)

22. Right-click on the "t\_question" table then click on "Import/Export".
![53](https://user-images.githubusercontent.com/57418005/148473202-0b2b054f-6281-486e-a771-077bdee6a54c.png)

23. Make sure you click on "Import" and not "Export".
![54](https://user-images.githubusercontent.com/57418005/148473214-27803a3a-ca56-4c87-b7d6-ef71cb9f0ba1.png)

24. Select the "**t\_question.csv**" file provided with this installation guide. Select "UTF8" for the encoding and ";" as the delimiter.
25. Click on "OK" to save.
26. The questions table has been filled with all the questions. Repeat the import procedure, this time with the "**t\_response.csv**" file.

![55](https://user-images.githubusercontent.com/57418005/148473239-d59d2e3d-db25-4599-ad97-36cc1d9b9f7a.png)

![56](https://user-images.githubusercontent.com/57418005/148473240-97ef2142-4621-48a8-90ec-7b81a21c557e.png)

27. Open the data.sql file provided with this installation guide.
28. Change the following values:
- a. The "tid\_ad" by your Azure tenant ID.

![57](https://user-images.githubusercontent.com/57418005/148473282-07477400-64a2-499b-91be-80f4fa209142.png)
- b. The name of your organization.
![58](https://user-images.githubusercontent.com/57418005/148473286-77ddead9-8f4d-4a9b-898f-89cce21dad61.png)

- c. And the email addresses of your Game Masters.
![59](https://user-images.githubusercontent.com/57418005/148473301-2fc92a2e-5e5d-405e-8881-05bd4d3dd75a.png)

29. Copy and paste the content of this file in the "**Query Tool**" in **pgAdmin** as you did for the "**schema.sql**" file.

![60](https://user-images.githubusercontent.com/57418005/148473340-44680f70-a0f8-4a59-b024-a2872a7f9d24.png)

30. For the questions and answers, you need to import the "t\_libelle\_i18n" table from the CSV file provided with this installation guide. The import process is the same as before.

![61](https://user-images.githubusercontent.com/57418005/148473365-81287346-2a2f-4d2c-80aa-8e05991c3acc.png)

31. Your database is ready. All you have to do is put the application on the App service you created before. To do this you will need to download and install "Visual Studio Code": [link](https://code.visualstudio.com/)

![62](https://user-images.githubusercontent.com/57418005/148473378-a6945d7d-000a-428b-a4ef-799686ecf974.png)
32.  Once « VSC » is installed, launch it.
![63](https://user-images.githubusercontent.com/57418005/148473402-ed65fafe-7e55-4da8-b066-d88e2e1feba9.png)

33. Go to "File" then "Open folder" and select the "Odyssee_teams_pub" folder from this repository.

34. Next, you will need "Node JS" in its version 12.22.9 (Note that for more recent versions, you will have to adapt the code).

35. To download and install it, go to [node.js] (nodejs.org/en/download/releases/): you should find the corresponding version on page 10.
![Capture4](https://user-images.githubusercontent.com/67316441/149010916-9d6e0c0c-4ec0-4601-bad1-9689494f6554.PNG)

36. Once this step is done, open terminal via the "terminal" tab.
![Capture3](https://user-images.githubusercontent.com/67316441/149010619-2b0cbb52-5ca5-4e9a-bda2-c73ac1a99425.PNG)

37. In the terminal, type the command "cd client" and press "enter" to go to the client folder.
![Capture12](https://user-images.githubusercontent.com/67316441/149011195-7e906a0d-13e4-459c-a798-5fa9d6857b88.PNG)

38. Once in the client folder, type the command "npm i" then press "enter".
![Capture5](https://user-images.githubusercontent.com/67316441/149013660-0252b5a4-26f8-4be4-a061-244c3b787b54.PNG)

39. Next, type the command "npm run build" to create the build of the front.
![Capture6](https://user-images.githubusercontent.com/67316441/149013613-e84dd1f1-afe1-4213-9a5b-db99bf7cd2da.PNG)

40. This should create a build folder for you in the client folder.

![Capture7](https://user-images.githubusercontent.com/67316441/149011538-fda05a81-fa5a-4a2b-ac27-c4ae1e017866.PNG)

41. Create a new folder under the name "Prod" in which you will copy several folders found in "Odyssee_teams_pub / server": the result should look like this.

![Capture8](https://user-images.githubusercontent.com/67316441/149011893-642530b8-84d9-491e-85ce-20423c11ab2b.PNG)

42. The ".deployment" file is a file that you must create and that contains only two lines.
![Capture13](https://user-images.githubusercontent.com/67316441/149012174-78c5550a-9518-41ba-b7c9-ca39141c2825.PNG)

43. In the "config" folder, open the "manifest.json" file and replace "port": 8080 by "port": 443.
![Capture14](https://user-images.githubusercontent.com/67316441/149012874-f0a0aeb3-b845-4a7a-b8aa-10f739ed98a4.PNG)

44. In your new "Prod" folder, go to the "public" folder and copy the build you previously created in the "client" folder.
![Capture9](https://user-images.githubusercontent.com/67316441/149012534-c88a0727-7f61-4c60-be76-d859d2ab76c3.PNG)

45. Open the "Prod" file using VSCode and open the file Crypto.js and add a random string in the variable CRYPTO_SECRET_KEY.
![Capture](https://user-images.githubusercontent.com/67316441/148569783-dd02800d-6528-4b9e-8ba8-d979c1658a4f.PNG)

47. Go to "Extensions" in the left menu.
48. Find "Azure App Service".
49. Install the "Azure App Service" application.
   
![64](https://user-images.githubusercontent.com/57418005/148473407-e15ba56f-5d00-40fb-a15e-941d73b3f77e.png)

50. Open the "Azure App Service" application freshly installed.
51. Login with your Microsoft account.
52. Your App service will appear and suggest "OdysseyTest" or (the name you chose). Right-click on the application.
53. Click on "Deploy to Web App".
   
![65](https://user-images.githubusercontent.com/57418005/148473425-adf436d4-c12c-4fda-bbf2-3a98d4b54dd1.png)

**Congratulations, your application is now installed and accessible.**

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

# Installing Teams Odyssey on your Teams tenant

## Introduction

Teams Odyssey is a web application. The zip package "_LOdysseedeTeams2021.zip_" must be downloaded from GitHub then imported to your organization&#39;s Microsoft Teams store. This requires specific access rights to the Microsoft Teams Admin dashboard. If your organization has deactivated the Microsoft Teams store, you will find a reactivation link below to install the application.

[https://docs.microsoft.com/fr-fr/MicrosoftTeams/manage-apps](https://docs.microsoft.com/fr-fr/MicrosoftTeams/manage-apps)

Note: There is no specific port to open for the installation.

### A firewall is blocking the installation

If a firewall or proxy is blocking the installation process, the link below will add a policy to your Teams tenant authorizing calls to this URL.

[https://odyssee-de-teams.saegus.com/](https://odyssee-de-teams.saegus.com/)

## 5 steps for a successful installation

### 1st step: Open your Microsoft Teams Admin dashboard

1. Open a page in your browser.
2. Go to your Microsoft Teams Admin dashboard. Copy the following URL in your browser search field for direct access to your dashboard. [https://admin.teams.microsoft.com](https://admin.teams.microsoft.com/)

### 2nd step: Manage Apps

3. In the left menu of your Admin Teams interface, click on "Teams apps".
4. Now click on "Manage Apps". The right section of your interface shows a list of your applications.

![66](https://user-images.githubusercontent.com/57418005/148473581-03249dd4-88c4-461b-b1cd-ccac5f0bf5cb.png)

### 3rd step: Upload the .zip file on your tenant

5. Open the file "PACKAGE_ODYSSEY_FR / manifest.json" on your computer, and change the URL to the one you created in the app service and the id of your app.

![Capture15](https://user-images.githubusercontent.com/67316441/149138090-a58996d6-7967-429d-a990-d0af99f72f94.PNG)

6. Create a .zip file from the three files "color.png", "manifest.json" (which you just modified) and "outline.png".

7. On the right side of your interface, click on the "Upload" button.

![67](https://user-images.githubusercontent.com/57418005/148473589-ce432cee-4727-4694-9f30-91fc05a59aa5.png)

8. Click on the "Select a file" button offered by the modal that has just appeared, and choose the zip you just created.
   
9. Confirm importation. If importation has been done successfully, the application name and icon will appear on the list of applications. 

![69](https://user-images.githubusercontent.com/57418005/148473606-6a87bb90-b258-464b-a68e-9aee57e6ff0c.png)

### 4th step: Policy

10. Now that the application has been successfully imported, you must give it a policy.

Reminder: On Microsoft Teams, it is possible to set a policy in a It is possible to configure a policy so that the application associated with it is only accessible to a specific population within your organization. By default, an application is accessible to all users with a so-called "Global" policy.

11. Click on "Setup policies" in your left menu.
![70](https://user-images.githubusercontent.com/57418005/148473655-0c6e5e0b-066b-4681-971a-05d161c092da.png)

12. The "App setup policies" window opens on the right.
13. You can copy and edit an existing policy from the list. If you would like to configure a new policy specific to a group of people, click "+ Add" to create a new one.

![71](https://user-images.githubusercontent.com/57418005/148473670-0d7eade3-2e73-42c5-baf6-ad437f25cd78.png)

### 5th stage: Configuring a new policy

14. In the new policy window, make sure that the 2 buttons "Upload custom apps" and "Allow user pinning" are both checked "on".

![72](https://user-images.githubusercontent.com/57418005/148473710-669442c6-e785-42bb-a464-b57d513807a1.png)

15. To associate your Teams Odyssey application with this policy, click on "+ Add apps" to open the side search window.

![73](https://user-images.githubusercontent.com/57418005/148473718-5b0084e4-184c-44db-bd75-9aed307743f3.png)

16. Now the side search window is open, look for the name of the Teams Odyssey application in the search field. It will appear.

![74](https://user-images.githubusercontent.com/57418005/148473727-dcb00299-0b4b-4c79-a041-b335935f658a.png)

17. Click on "Add" to confirm your selected application.

![75](https://user-images.githubusercontent.com/57418005/148473758-986a0f6a-2d59-4dfb-a881-b1f7441b9505.png)

18. Similarly, if you want the users to be able to easily access the application on their Microsoft Teams interface, you can pin it for quick access. To do that, click on "+Add apps" in the "Pinned apps" section.

![76](https://user-images.githubusercontent.com/57418005/148473776-5462356e-08b3-4363-8057-bf575559fb4c.png)

19. Click on "Save" at the bottom of the page to save all your changes.

![77](https://user-images.githubusercontent.com/57418005/148473797-ce4e8050-7b09-4b5b-ad5c-4ccea2e12769.png)

**Congratulations! The Teams Odyssey application is now installed and configured, ready to use!**

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

# First steps to activate Teams Odyssey

## Introduction

Now that the Teams Odyssey application is correctly installed on your Microsoft Teams tenant, your game environment has been created on Azure and the Game Masters have been configured, final activation is required.

Here the role of the Game Master is necessary. If the game has not been activated by the Game Master, the Explorers (players) will not be able to access their interface.

## Becoming a Game Master and configuring a season

Reminder: The Game Master&#39;s role is to manage a 4-week season during which the Explorers will answer over 200 questions. The Game Master has a specific interface which allows him/her to:

- Install their organization&#39;s logo using the &quot;Tool&quot; tab;
- Stop the game using the &quot;Tool&quot; tab;
- Activate the modules of 45 unique questions every week using the &quot;Scheduling&quot; tab;
- Access game statistics and rankings in real-time using the &quot;Rankings&quot; tab;

An illustrated &quot;Gamemaster.pdf&quot; file is available in the &quot;GameMasterkit.zip&quot; package to help the Game Master learn how to use their interface.

The Game Master can also be responsible for promoting the game in the organization before and throughout the season. An out-of-the-box communication tool kit is provided: &quot;Communication – Kit\_assets.zip&quot;. We highly recommend:

- Personalizing emails with the Teams Odyssey identity available in the &quot;Scheduling&quot; tab before the launch (teaser) and at regular intervals throughout the event. Emails cannot be sent directly from the platform. You will have to copy/paste them and send them through your regular email system;
- Advertise the game to your organisation through internal channels like Yammer, Teams, Outlook and other intranets;
- Send Teams notifications through the &quot;Push notification&quot; feature using the &quot;Scheduling&quot; tab. You can write whatever you like in a notification but no more than 32 characters. The notification received by users will provide automatic access to the game with a simple click.

Note: It is not possible to extract player rankings. We recommend the Game Master do a screenshot of the rankings as the game progresses.

## First login

1. Go to your Microsoft Teams interface. Click on the Teams Odyssey icon on the side bar if it was pinned there during installation.

![78](https://user-images.githubusercontent.com/57418005/148473900-22dfa960-2275-4ae4-9f69-4dba7c6cb73d.png)

2. If not, go to your app store and search for &quot;Teams Odyssey&quot;.

![79](https://user-images.githubusercontent.com/57418005/148473922-8e7447d3-b694-444e-a45e-652ad7e31061.png)

3. Click on &quot;Open&quot; to launch the application.

4. You will land on the first page of the game. Click on &quot;Play now!&quot; to continue.

![81](https://user-images.githubusercontent.com/57418005/148475620-d5bbd54b-dfc1-4599-8424-6e6c9f34daa3.png)

5. On the next page, read the GDPR, tick the box &quot;I have read the terms and conditions of the game&quot; and click on &quot;Confirm and continue!&quot; to continue in the game.

![82](https://user-images.githubusercontent.com/57418005/148475639-72ea561e-2dfa-491b-8730-b49e52874072.png)

6. On the page where you select your spaceship (your avatar in the game), choose one of the images and click on &quot;Complete settings&quot;. Your choice of spaceship will not affect your experience.

![83](https://user-images.githubusercontent.com/57418005/148475661-e607b08e-17aa-46fa-a535-2687cba3ccc2.png)

7. You will then arrive at the main tab of your interface: the cockpit. From this moment, the game is activated and accessible for all Explorers.

![84](https://user-images.githubusercontent.com/57418005/148475687-12e9d21a-b294-471d-8b09-3d4632909400.png)

The &quot;Cockpit&quot; tab is your landing dashboard when you open the game. The &quot;Scheduling&quot; tab is where you activate all the missions. You will also find email and social media templates there and you can send push notifications from there too. The &quot;Rankings&quot; tab is where you can check game statistics in real-time and the rankings within your organization. Finally, in the &quot;Tools&quot; tab you can configure the logo of your organisation and stop the game at any time with the &quot;stop the game&quot; function.

## Activating the first questions' module

You now have access to the Game Master interface and the Explorers now have access to the game. However, if none of the question modules are activated, the players cannot play the game.

When you want to officially launch the first week in your organization&#39;s Teams Odyssey season, follow these steps:

8. Go to the &quot;Scheduling&quot; tab in your interface.
9. Open the &quot;Program and missions&quot; tab.

![85](https://user-images.githubusercontent.com/57418005/148475714-fc58061c-a386-4ad4-83a3-d192b4b66f20.png)

10. To activate the first questions' module, click on the &quot;Pending mission&quot; button. The order of the modules is as follows:

  - &quot;Launch! &quot;
  - &quot;Stabilisation! &quot;
  - &quot;Progress! &quot;
  - &quot;Touchdown! &quot;

Note that when a Game Master activates a new week, this deactivates the previous week. It is not possible to have two weeks activated at the same time. To avoid confusing the rankings, it is not possible for players to go back to a previous week&#39;s questions. It is therefore important to remind them to remain diligent.

## Stopping or pausing the game

11. If you would like to pause or stop the game, go to the &quot;Tools&quot; tab.
12. Click on &quot;Block access to the game&quot; to pause or stop the game. To reactivate the game, select one of the question modules in the &quot;Scheduling&quot; tab as explained above.

![86](https://user-images.githubusercontent.com/57418005/148475773-6c58521e-30cc-410f-8983-fee5cbb79ce9.png)

13. At the end of the season, if you would like to keep track of the rankings, we recommend taking screenshots because you will not be able to extract this information from the application.

## Game Master guide - Further information

All the information specific to the role of Game Master are available in the document &quot;Teams\_Odyssey - Game\_Master\_Guide.pdf&quot; provided with the game.

**Congratulations! The Teams Odyssey season is now up and running!**

\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

# FAQ

## Installation &amp; management

#### My organization does not have all the features and functions of Microsoft Teams. Is it possible to not use the questions about these features?

Yes. You can deactivate question topics specific to each major feature of Microsoft Teams. To do this, go to the &quot;Scheduling&quot; tab in your Game Master interface. In the &quot;Programme and missions&quot; tab, click on &quot;Settings&quot; to open an interactive menu that will allow you to deactivate up to two question topics. To guarantee the correct function of the game, it is not possible to deactivate more than two topics.

#### Do I need to reinstall the game if a new feature or function is added?

No. No new installation is required to access new features or functions. If a new installation is required, a note will be sent to organizations with the reason and details of the installation.

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

Yes. Explorers can access the game on Teams Mobile. We recommend that players use the app for a better, more immersive experience. We strongly recommend Game Masters to only use the Game Master application interface on a desktop computer for a better user experience and a more comfortable use.

#### Is it possible to see all the game&#39;s topics and questions?

Yes. You will find all the Teams Odyssey questions in the document &quot;Q&amp;A\_EN.xlsx&quot;.

#### Is there any advice to help Explorers understand and play the game?

Yes. There is a guide to help players understand the game and learn its features and mechanisms. The guide is called &quot;Teams\_Odyssey - Explorer\_Guide.pdf&quot; and can be downloaded from the player interface in the &quot;Rules of the game&quot; tab. Similarly, there is a guide for Game Masters: &quot;Teams\_Odyssey - Game\_Master\_Guide.pdf&quot;.

## Security &amp; Data access

#### Does Teams Odyssey have GDPR and where can I find the information?

Yes. Teams Odyssey has GDPR accessible when the user first opens the game, whether they are an Explorer or a Grand Master. Approval is required to access the game content. All GDPR information can be found in the document &quot;Teams\_Odyssey - Disclaimer.pdf&quot;.

#### Is there a document containing all the security and access data for Teams Odyssey?

Yes. This document is called &quot;Microsoft - Security and data access.pdf&quot;.

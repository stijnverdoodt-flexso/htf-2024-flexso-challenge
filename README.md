# Is anybody out there?

 Today we will be answering the age old question 'Is there anybody out there?' and how else could we do it if not by building a cool app for just that purpose?

 Three things will be provided for you (besides the initial app scaffolding) to help you kickstart the development of our Intergalactic Cockpit:

## Raw data

 If we ever hope to find sentient life, we have to know where to look for it, luckily we already have plenty of data about our 100 nearest galaxies and the most common types of alien life.
 We can find all of this in our application at /db/data , to give a short overview:

 | Data source            | Content                                                                                                              | 
|------------------------|-----------------------------------------------------------------------------------------------------------------------|
| AlienCivilisations.csv | No entries yet except for the extinct civilisation that once populated Andromeda.                                     | 
| AlienStatus.csv        | Not every alien civilisation will be as technologically advanced as us, luckily we have made a classification system. |
| AlienTypes.csv         | Our scientists have detected several common Alien types that we might meet.                                           | 
| CompabilityScores.csv  | Not every alien type can survive on every type of planet, this matrix should give the likelyhood of that happening    |
| Galaxies.csv           | Data about the galaxy and its most common stars, planets and most probable alien type                                 |
| HabitableZones.csv     | Not every star is as hospitable as our sun, this gives an overview of the survivability                               |
| PlanetTypes.csv        | The ten most common planet types found in the universe                                                                |
| StarTypes.csv          | The seven types of stars                                                                                              |

## The Drake Equation

Ofcourse our data is only as good as our methods of interpreting it.
Luckily for us our most advanced staticians have found a way to calculate the likelyhood of alien life, based on the Drake Equation by the late Frank Drake.

Our base Drake value is 1 if our Galaxy has more than 100000000000 planets, or 0.66 if it does not.
Then we multiply this value by the survivability of the stars and the likelyhood that the most common alien type can survive on the most common planet type.
This should give us a rough chance of finding sentient life.

## Our Exploration Team

Once we know where to find intelligent team we can send out orders to our dedicated team of explorers to do their job.
Unfortunately galactic bureaucracy prevents us from communicating directly with them, we can find their address in the .env file of our application.
Fortunately, no further authentication is needed when sending our orders.

To illustrate what they are capable of, here are their orders and report when they explored the Andromeda galaxy:

```
GET - /exploreGalaxy(galaxy_ID='6889783c-6d0b-40e1-8fe3-e17ec92b7328')
```

```javascript
{
    "@odata.context": "$metadata#Galaxy/$entity",
    "ID": "6889783c-6d0b-40e1-8fe3-e17ec92b7328",
    "name": "Andromeda",
    "explorationReport": "Our closest neighbour though we were too late to get to know them",
    "alienCivilisation": {
        "ID": "a14f8d1f-b56d-42a2-81e1-eabada34f3eb",
        "name": "Geitonias Civilisation",
        "alienType_ID": "9ecad35c-355d-4837-8d7b-7f0d87f2e81a",
        "alienStatus_ID": "0373a9a5-7023-472b-8ca5-7626ab1e4dd5",
        "message": "Pm ol ohk hufaopun jvumpkluaphs av zhf, ol dyval pa pu jpwoly, aoha pz, if zv johunpun aol vykly vm aol slaalyz vm aol hswohila, aoha uva h dvyk jvbsk il thkl vba."
    }
}
```

As you can see aliens do not speak plain English, however they tend to limit themselves to commonly used ciphers on the planet Earth. Lucky!

## Useful links

The scaffolding of this app is made with a UI5 frontend - in the /app/frontend folder - and a CAP middleware.
Since these are two of the modern SAP technologies, they enjoy our preference and we will release partial code snippets for them throughout the day.
However you're totally free to just use the .csv files (or the deployed sqlite database) along with the external service and go to work in a model of your choice.

For those working in ui5 and CAP we would like to refer to the following sources:

- [About CAP](https://cap.cloud.sap/docs/about/)
- [Start with CAP](https://cap.cloud.sap/docs/get-started/jumpstart)
- [Get started in-a-nutshell](https://cap.cloud.sap/docs/get-started/in-a-nutshell)
- [CAP with Typescript](https://cap.cloud.sap/docs/node.js/typescript)
- [UI5 API](https://ui5.sap.com/#/api)
- [UI5 ODATA V4 guide](https://sapui5.hana.ondemand.com/sdk/#/topic/bcdbde6911bd4fc68fd435cf8e306ed0)
- [Setup for VSCode](https://community.sap.com/t5/technology-blogs-by-members/how-to-set-up-visual-studio-code-for-cap-development/ba-p/13477590)

## Running the final version
During the Hackaton the participants could make calls to an external server (as definied in the .env file), since this external server won't be available forever, the code of the external server has also been provided at /external-server. 
Whether you want to run this locally or deployed, you will have to change the url to target the new location.
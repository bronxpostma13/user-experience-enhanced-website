
# Enhanced website
Ontwerp en maak een interactieve website die snel laadt en prettig te gebruiken is.

De instructie vind je in: [INSTRUCTIONS.md](https://github.com/fdnd-task/enhanced-website/blob/main/docs/INSTRUCTIONS.md)


## Inhoudsopgave

  * [Beschrijving](#beschrijving)
  * [Gebruik](#gebruik)
  * [Kenmerken](#kenmerken)
  * [Installatie](#installatie)
  * [Bronnen](#bronnen)
  * [Licentie](#licentie)

## Beschrijving
De opdracht die ik heb gekregen is het maken van een app/site voor de bloementuin Fraekendal.
Zij hadden nog helemaal geen site, wat betekent dat wij deze zelf hebben moeten opbouwen inclusief data.
De site maakt inmiddels volledig gebruik van een database en alle pagina's zijn gebouwd.
Wij hebben een grote styleguide aangeleverd gekregen waar veel ontwerpen instonden. 
Het doel van de site is dat mensen op de tuin afkomen en hier de spelletjes spelen om zo hun collectie van planten uit te breiden.
Ook is er nog een nieuwspagina voor nieuwsupdates over het bloemenveld.
Voor mijn ontwerpkeuzes ga ik grotendeels van de aangeleverde styling af.
Wel probeer ik op bepaalde plekken er iets anders van te maken als ik denk dat dit beter is.

## Gebruik
### responsive
Door het doeleinde van de site/app ben ik vooral gefocusseerd op het design van ipad en telefoon view.
Hier zijn screenshots van de thuispagina op ipad en telefoon <img width="879" height="907" alt="Scherm­afbeelding 2026-06-21 om 19 27 09" src="https://github.com/user-attachments/assets/0ecaf6be-922e-4f2f-ae62-9118a031db0f" />

<img width="596" height="908" alt="Scherm­afbeelding 2026-06-21 om 19 26 47" src="https://github.com/user-attachments/assets/515e5dab-8778-4b40-a7be-c9c148fcb390" />



### toegankelijk
Mijn site is ook goed toegankelijk. Zo heeft de site goede kleurcontrasten, een deels darkmode, focus states en een goede tab-structuur.

## Kenmerken
Ik heb voor deze site gebruikgemaakt van onder andere Liquid, Node.js, Express en een database.

### interactie
Met deze dingen heb ik uiteindelijk een interactie moeten maken met een POST route.
De eerste interactie die ik tijdens deze sprint wou bouwen, zou een bepaalde plant aan je collectie toevoegen als je een vraag over deze plant goed hebt beantwoord.
Vlak voor het einde van de sprint merkte ik dat dit nog iets te lastig was. Toen heb ik ervoor gekozen om van functie te switchen naar de interactie waarbij gebruikers reacties op nieuwsberichten kunnen achterlaten. Deze functie is inmiddels afgerond.
<img width="620" height="731" alt="Scherm­afbeelding 2026-06-21 om 19 27 29" src="https://github.com/user-attachments/assets/957cab5b-e267-456c-87b9-d57075d5439b" />


## Installatie
Stap 1. Fork en clone de repository
Stap 2. Open de repo in je code editor
Stap 3. Open de terminal (command + j op mac) en type daar npm install
Stap 4. Nadat de node modules zijn gedownload kan je met npm start de localhost openen en daar je site zien (je moet hem wel in je terminal herstarten als je aanpassingen in je Node.js maakt).

This project is licensed under the terms of the [MIT license](./LICENSE).

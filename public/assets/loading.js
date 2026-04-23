 const reactieForm = document.querySelector("form")
  const formKnop = document.querySelector("form button")
  const reactieLijst = document.querySelector(".reactie-list li")

  // Als er op de submit button wordt geklikt ...
  scoreForm.addEventListener("submit", async function(event) {
    // Voorkom de standaard submit van de browser
    // Let op: hiermee overschrijven we de default Loading state van de browser...
    event.preventDefault()
    
    //Loading state tonen:
    formButton.classList.add("loading")
    formButton.textContent = "loading..."

    //formdata voorbereiden:
    let formData = new FormData(reactieForm);    

    // Data fetchen:
    // Doe een fetch naar de server, net als hoe de browser dit normaal zou doen
    // Gebruik daarvoor het action en method attribuut van het formulier
    // Stuur de formulierelementen mee
    const response = await fetch(reactieForm.action, {
      method: reactieForm.method, // Neemt de post over 
      body: new URLSearchParams(formData) // <<< Dit moet omdat server.js anders niet met de formulier data kan werken
    })

    // Data verwerken:
    // Jouw server.js geeft data terug als het posten goed gaat
    const responseData = await response.text()

    // Normaal zou de browser die HTML parsen en weergeven.
    // Maar omdat we dit nu in client-side JS doen moeten we dit zelf doen:
    // Parse de nieuwe HTML en maak onderwater een nieuw Document Object Model aan
    const parser = new DOMParser()
    const responseDOM = parser.parseFromString(responseData, 'text/html')

    // Zoek in de onderwater DOM de nieuwe state op
    const newState = responseDOM.querySelector('.reactie-list li')

    // Overschrijf de HTML met de nieuwe HTML
    // We gaan de nieuwe state toevoegen aan de DOM, aan de scorelijst in de ol
    reactieLijst.innerHTML = newState.innerHTML

    // Loading state weghalen
    // Hier kan de loading state vervangen worden met een succes state 
    console.log("Loading state weghalen")
    formButton.classList.remove("loading")
    formButton.textContent = "Save score"

  })
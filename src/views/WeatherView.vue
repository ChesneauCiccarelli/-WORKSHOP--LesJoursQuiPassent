<script setup>
//import éléments de vue
import { reactive } from 'vue'

const coordMe = reactive({ latitude: 0, longitude: 0 })

//Fonction de détection de la géolocalisation via navigateur
const locMe = () => {
  navigator.geolocation.watchPosition(
    //fonction à appeler en cas de success
    showLocation
  )
}
//Fonction de sa localisation si elle réussit
const showLocation = (position) => {
  //Récupération latitude et longitude
  coordMe.latitude = position.coords.latitude
  coordMe.longitude = position.coords.longitude

  console.log(getEnseign(coordMe.latitude, coordMe.longitude))
}

const getEnseign = (latitude, longitude) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=fr&appid=50c7f1c20b813764c0e648ea2b791165&units=metric`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      return response.json()
    })
    .then((data) => {
      // Handle the JSON response data here
      console.log(data)
      //données
      const meteo = document.getElementById('meteo')
      const temperature = data.main.temp
      const weatherDescription = data.weather[0].description
      const ville = data.name
      //phrase
      meteo.textContent = `Vous vous trouvez à ${ville}. La température est actuellement de ${temperature}. Le temps est ${weatherDescription}.`
      // Use the data as needed in your application
    })
    .catch((error) => {
      console.error('Fetch Error:', error)
    })
}
</script>

<template>
  <RouterLink to="/">Home Page</RouterLink>
  <main>
    <br />
    <button type="button" @click="locMe()">Se localiser</button>
    <span v-if="coordMe"> coordonnées : {{ coordMe.latitude }} - {{ coordMe.longitude }}</span>
    <span v-else>Pas de coordonnées</span>
    <hr />
    <button type="button" @click="getEnseign(coordMe.latitude, coordMe.longitude)">données</button>
    <p id="meteo"></p>
  </main>
</template>

<style>
#map {
  width: 100%;
  height: 70vh;
}
</style>

<!--
<script setup donnees="latitude">
//import éléments de vue
import { reactive } from 'vue'

//Hors de onMounted
//Coordonnées de l'utilisateur
const coordMe = reactive({ latitude: 0, longitude: 0 })

const getEnseign = (latitude, longitude) => {
  let rq = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=fr&appid=50c7f1c20b813764c0e648ea2b791165&units=metric`
  // Requête concernée
  return (
    fetch(rq) // on renvoie la requête à qui la demande
      .then((response) => response.json())
      //let data = JSON.parse(response)
      //let dataF = JSON.stringify(response)
      .catch((error) => {
        throw error
      })
  ) // Cas d'erreur
}
//Fonction de détection de la géolocalisation via navigateur
const locMe = () => {
  navigator.geolocation.watchPosition(
    //fonction à appeler en cas de success
    showLocation
  )
}
//Fonction de sa localisation si elle réussit
const showLocation = (position) => {
  //Récupération latitude et longitude
  coordMe.latitude = position.coords.latitude
  coordMe.longitude = position.coords.longitude

  console.log(getEnseign(coordMe.latitude, coordMe.longitude))
}
</script>

<template>
  <div>
    <button type="button" @click="locMe()">Se localiser</button>
    <span v-if="coordMe"> coordonnées : {{ coordMe.latitude }} - {{ coordMe.longitude }}</span>
    <span v-else>Pas de coordonnées</span>
    <hr />
    <button type="button" @click="getEnseign(coordMe.latitude, coordMe.longitude)">données</button>
    <p id="meteo"></p>
  </div>
</template>

<style>
#map {
  width: 100%;
  height: 70vh;
}
</style>
</script>-->

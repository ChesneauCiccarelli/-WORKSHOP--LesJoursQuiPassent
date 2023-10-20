<!-- <template>
  <RouterLink to="/">Home Page</RouterLink>
  <div>
    <h3>Choisissez un mois</h3>
    <select id="jours"></select>

    <h3>Choisissez un jour</h3>
    <select id="mois"></select>

    <button @click="recupererDonneeDeSelect">Lancer la recherche</button>

    <div id="events">
      <h4>Résultats :</h4>
      <p v-html="wikiData"></p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const wikiData = ref('') // Créez une référence pour stocker les données

function recupererDonneeDeSelect() {
  const daySelector = document.getElementById('jours')
  const monthSelector = document.getElementById('mois')
  const jour = daySelector.value
  const mois = monthSelector.value

  getWiki(jour, mois)
}

const getWiki = (jour, mois) => {
  fetch(`https://api.wikimedia.org/core/v1/wikipedia/fr/page/${jour}_${mois}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      return response.json()
    })
    .then((data) => {
      // Traitez les données ici et mettez-les à jour dans la référence wikiData
      console.log(data)
      wikiData.value = data.source
    })
    .catch((error) => {
      console.error('Fetch Error:', error)
    })
}

onMounted(() => {
  const daySelector = document.getElementById('jours')
  const monthSelector = document.getElementById('mois')

  for (let i = 1; i <= 31; i++) {
    const option = document.createElement('option')
    option.value = i
    option.text = i
    daySelector.appendChild(option)
  }

  const months = [
    'janvier',
    'février',
    'mars',
    'avril',
    'mai',
    'juin',
    'juillet',
    'août',
    'septembre',
    'octobre',
    'novembre',
    'décembre'
  ]
  for (let i = 0; i < months.length; i++) {
    const option = document.createElement('option')
    option.value = months[i].toLowerCase()
    option.text = months[i]
    monthSelector.appendChild(option)
  }
})
</script>

<style>
#map {
  width: 100%;
  height: 70vh;
}
</style> -->

<template>
  <div>
    <h1>Section "Sciences et techniques" du 2 février sur Wikipédia</h1>
    <div v-if="sectionData">
      <h2>{{ sectionData.title }}</h2>
      <div v-html="sectionData.content"></div>
    </div>
  </div>

  <br />

  <div>
    <h1>Section "Sciences et techniques" du 2 février sur Wikipédia</h1>
    <div v-if="ee">
      <h2>{{ ee.title }}</h2>
      <div v-html="ee.content"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      sectionData: null,
      ee: null
    }
  },
  mounted() {
    // Appel à l'API Wikipédia pour récupérer la section "Sciences et techniques" du 2 février
    axios
      .get('https://fr.wikipedia.org/w/api.php', {
        params: {
          action: 'parse',
          page: '2_février',
          section: '13', // L'ID de la section "Sciences et techniques" peut varier
          format: 'json',
          origin: '*'
        }
      })
      .then((response) => {
        if (response.data && response.data.parse) {
          this.sectionData = {
            title: response.data.parse.title,
            content: response.data.parse.text['*']
          }
        }
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données :', error)
      })

    axios
      .get('https://fr.wikipedia.org/w/api.php', {
        params: {
          action: 'parse',
          page: '3_février',
          section: '13', // L'ID de la section "Sciences et techniques" peut varier
          format: 'json',
          origin: '*'
        }
      })
      .then((response) => {
        if (response.data && response.data.parse) {
          this.ee = {
            title: response.data.parse.title,
            content: response.data.parse.text['*']
          }
        }
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données :', error)
      })
  }
}
</script>

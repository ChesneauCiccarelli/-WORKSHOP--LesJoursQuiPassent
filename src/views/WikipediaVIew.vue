<script setup>
import { onMounted, ref } from 'vue'
import { client } from '@/utils/axios'

function recupererDonneeDeSelect() {
  const events = ref([])
  //jours
  var daySelector = document.getElementById('jours')
  var jours = daySelector.value

  //mois
  var monthSelector = document.getElementById('mois')
  var mois = monthSelector.value

  //annees
  var anneesSelector = document.getElementById('annees')
  var annees = parseInt(anneesSelector.value)

  // Faites quelque chose avec la valeur, par exemple, affichez-la dans la console
  console.log('La valeur sélectionnée est : ' + jours + ' ' + mois + ' ' + annees)

  //fonction
  events.value = getEvents(jours, mois, annees)
  console.log('events value =', events.value)
}

async function getEvents(jour, mois, annee) {
  try {
    const response = await client.get(`/search/${jour}/${mois}/${annee}`)
    const data = response.data

    // Assuming you want to display all descriptions in the events div
    const eventsDiv = document.getElementById('events')
    eventsDiv.innerHTML = '' // Clear existing content

    for (let i = 0; i < data.length; i++) {
      const description = data[i].description

      // Create a new paragraph element for each description
      const paragraph = document.createElement('p')
      paragraph.textContent = description

      // Append the paragraph to the events div
      eventsDiv.appendChild(paragraph)
    }
  } catch (error) {
    // Handle errors
    console.error(error)
  }
}

onMounted(async () => {
  const daySelector = document.getElementById('jours')
  const monthSelector = document.getElementById('mois')
  const yearSelector = document.getElementById('annees')

  // Remplir les sélecteurs avec des options pour les jours, les mois et les années
  for (let i = 1; i <= 31; i++) {
    const option = document.createElement('option')
    if (i < 10) {
      option.value = '0' + i
      option.text = '0' + i
    } else {
      option.value = i
      option.text = i
    }

    daySelector.appendChild(option)
  }

  const months = [
    'Janvier',
    'Fevrier',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Decembre'
  ]
  for (let i = 0; i < months.length; i++) {
    const option = document.createElement('option')
    option.text = months[i]
    option.value = months[i]
    monthSelector.appendChild(option)
  }

  const currentYear = new Date().getFullYear()
  for (let i = currentYear; i >= currentYear - 100; i--) {
    const option = document.createElement('option')
    option.value = i
    option.text = i
    yearSelector.appendChild(option)
  }
})
</script>

<template>
  <div>
    <h3>Choississez un mois</h3>
    <select id="jours"></select>

    <h3>Choississez un jour</h3>
    <select id="mois"></select>

    <h3>Choississez une année</h3>
    <select id="annees"></select>

    <button @click="recupererDonneeDeSelect()">Lancer la recherche</button>

    <div id="events"></div>
  </div>
</template>

<style>
#map {
  width: 100%;
  height: 70vh;
}
</style>

<template>
  <RouterLink to="/">Home Page</RouterLink>
  <div>
    <h2>Sélectionnez une date :</h2>
    <div>
      <select v-model="selectedDay">
        <option v-for="day in days" :key="day">{{ day }}</option>
      </select>
      <select v-model="selectedMonth">
        <option v-for="(month, index) in months" :key="month" :value="index + 1">
          {{ month }}
        </option>
      </select>
      <select v-model="selectedYear">
        <option v-for="year in years" :key="year">{{ year }}</option>
      </select>
      <button @click="fetchApod">Rechercher</button>
    </div>
    <div v-if="apodData">
      <h3>{{ apodData.title }}</h3>
      <p>{{ apodData.explanation }}</p>
      <img :src="apodData.url" alt="NASA APOD" />
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      selectedDay: '',
      selectedMonth: '',
      selectedYear: '',
      days: Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0')),
      months: [
        'Janvier',
        'Février',
        'Mars',
        'Avril',
        'Mai',
        'Juin',
        'Juillet',
        'Août',
        'Septembre',
        'Octobre',
        'Novembre',
        'Décembre'
      ],
      years: Array.from({ length: 101 }, (_, i) => (2020 - i).toString()), // De 2023 à 1920
      apodData: null
    }
  },
  methods: {
    async fetchApod() {
      const date = `${this.selectedYear}-${this.selectedMonth}-${this.selectedDay}`
      try {
        const response = await axios.get(
          `https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=${date}`
        )
        this.apodData = response.data
      } catch (error) {
        console.error('Error fetching APOD:', error)
        this.apodData = null
      }
    }
  },
  created() {
    this.fetchApod()
  }
}
</script>

<style></style>

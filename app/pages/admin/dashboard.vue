const { data, status, error, refresh } = await useAsyncData<DashboardData>(
  'admin-dashboard-data',
  async () => {
    // ቀጥታ ወደ API Call እናደርጋለን (ለምሳሌ ፖርት 8000 ላይ ላለ ላራቬል ፕሮጀክት)
    return await $fetch('http://localhost:8000/api/dashboard', {
      headers: {
        'Authorization': `Bearer ${userToken.value}` // (Auth ካለህ)
      }
    })
  }
)
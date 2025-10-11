export default defineNuxtRouteMiddleware(() => {
  const { loggedIn } = useUserSession()
  console.log('Middleware check, loggedIn:', loggedIn.value)
  if (!loggedIn.value) {
    return navigateTo('/panel/login')
  }
})

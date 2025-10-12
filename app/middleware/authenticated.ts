export default defineNuxtRouteMiddleware((to) => {
  const { loggedIn } = useUserSession()

  if (to.path === '/admin/login') {
    if (loggedIn.value) {
      return navigateTo('/admin')
    }
    return // 允许访问登录页
  }
  
  if (!loggedIn.value) {
    return navigateTo('/admin/login')
  }
})

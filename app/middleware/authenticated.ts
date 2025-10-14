export default defineNuxtRouteMiddleware((to) => {
  const { loggedIn } = useUserSession()

  if (to.path === '/admin/login') {
    if (loggedIn.value) {
      return navigateTo('/admin/posts')
    }
    return // 允许访问登录页
  }

  if (loggedIn.value && to.path === '/admin') {
    return navigateTo('/admin/posts')
  }
  
  if (!loggedIn.value) {
    return navigateTo('/admin/login')
  }
})

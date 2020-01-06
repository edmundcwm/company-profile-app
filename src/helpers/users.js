// redirect users to their respective home page based on user role
export default function getHomePath(roles, userRole) {
  if (Object.keys(roles).includes(userRole)) {
    const { homePath } = roles[userRole];
    return homePath ? homePath : '/404';
  } else {
    return '/404';
  }
}

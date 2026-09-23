// Autenticação simulada (não há back-end de usuários). Usuários de teste descritos no README.
const USERS = [
  { name: 'Aluno Demo', email: 'aluno@fiap.com.br', password: 'jovi123', role: 'Estudante' },
  { name: 'Professor Demo', email: 'professor@fiap.com.br', password: 'jovi123', role: 'Professor' },
]

export const demoUsers = USERS.map(({ email, password, role }) => ({ email, password, role }))

export async function login(email, password) {
  await new Promise((resolve) => setTimeout(resolve, 500))
  const found = USERS.find((u) => u.email === email.trim().toLowerCase() && u.password === password)
  if (!found) throw new Error('E-mail ou senha inválidos. Use um dos usuários de teste.')
  const { password: _omit, ...user } = found
  return { user, token: btoa(`${user.email}:${Date.now()}`), loggedAt: new Date().toISOString() }
}

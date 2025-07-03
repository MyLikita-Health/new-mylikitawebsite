import { cookies } from "next/headers"
import type { NextRequest } from "next/server"

export interface User {
  id: string
  email: string
  name: string
  role: "admin" | "editor"
}

// Simple auth for demo - in production, use proper JWT/session management
const ADMIN_CREDENTIALS = {
  email: "admin@mylikita.com",
  password: "MyLikita2024!",
  name: "MyLikita Admin",
  role: "admin" as const,
}

export async function authenticate(email: string, password: string): Promise<User | null> {
  if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
    return {
      id: "1",
      email: ADMIN_CREDENTIALS.email,
      name: ADMIN_CREDENTIALS.name,
      role: ADMIN_CREDENTIALS.role,
    }
  }
  return null
}

export async function createSession(user: User) {
  const cookieStore = cookies()
  const sessionData = JSON.stringify(user)

  cookieStore.set("admin-session", sessionData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  })
}

export async function getSession(): Promise<User | null> {
  try {
    const cookieStore = cookies()
    const sessionCookie = cookieStore.get("admin-session")

    if (!sessionCookie) return null

    const user = JSON.parse(sessionCookie.value)
    return user
  } catch {
    return null
  }
}

export async function destroySession() {
  const cookieStore = cookies()
  cookieStore.delete("admin-session")
}

export function getSessionFromRequest(request: NextRequest): User | null {
  try {
    const sessionCookie = request.cookies.get("admin-session")
    if (!sessionCookie) return null

    return JSON.parse(sessionCookie.value)
  } catch {
    return null
  }
}

// API configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export const API_ENDPOINTS = {
  auth: {
    register: `${API_BASE_URL}/api/auth/register`,
    login: `${API_BASE_URL}/api/auth/login`,
  },
  sweets: {
    list: `${API_BASE_URL}/api/sweets`,
    detail: (id: number) => `${API_BASE_URL}/api/sweets/${id}`,
    create: `${API_BASE_URL}/api/sweets`,
    update: (id: number) => `${API_BASE_URL}/api/sweets/${id}`,
    delete: (id: number) => `${API_BASE_URL}/api/sweets/${id}`,
    purchase: (id: number) => `${API_BASE_URL}/api/sweets/${id}/purchase`,
    restock: (id: number) => `${API_BASE_URL}/api/sweets/${id}/restock`,
  },
}

// Helper function to check if backend is available
export async function checkBackendHealth(): Promise<boolean> {
  try {
    const response = await fetch(API_BASE_URL, {
      method: "GET",
      signal: AbortSignal.timeout(5000), // 5 second timeout
    })
    return response.ok
  } catch (error) {
    console.error("[v0] Backend health check failed:", error)
    return false
  }
}

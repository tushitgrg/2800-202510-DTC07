export async function getUserClient() {
    try {
      const res = await fetch('/api/me');
      if (!res.ok) return null;
  
      const data = await res.json();
      return data.user || null;
    } catch {
      return null;
    }
  }
  
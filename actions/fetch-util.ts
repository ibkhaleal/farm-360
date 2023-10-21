export async function fetcher(body: any, endpoint: string) {

    try {
      const response = await fetch(`https://asibiti.ng/farm360/api/${endpoint}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
  
      if (!response.ok) {
        throw new Error(`Error fetching ${endpoint}`);
      }
  
      return response.json();
    } catch (error) {
      throw error;
    }
  }

export async function GET(endpoint: string) {

    try {
      const response = await fetch(`https://asibiti.ng/farm360/api/${endpoint}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error fetching ${endpoint}`);
      }
  
      return response.json();
    } catch (error) {
      throw error;
    }
  }
  
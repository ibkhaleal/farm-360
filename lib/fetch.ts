export const fetchData = async (body: any, endpoint: string) => {
    try {
      const myHeaders = new Headers();
  
      const requestOptions: RequestInit = {
        method: 'POST',
        headers: myHeaders,
        body: body,
        redirect: 'follow',
      };
  
      const response = await fetch(`${process.env.NEXT_PUBLIC_FARM360_API_ROUTE}/${endpoint}`, requestOptions);
      const data = await response.json();
  
      return data;
    } catch (error) {
      console.error(error);
      return {};
    }
  };
  


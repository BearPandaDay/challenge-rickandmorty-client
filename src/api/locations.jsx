export class Apilocations {
    async getLocations(page) {
        const url = `https://rickandmortyapi.com/api/location?page=${page}`;
        
        const params = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            // body: JSON.stringify()
        }

        const response = await fetch(url, params);
        const result = await response.json();
        if (result?.results.length == 0) return [];

        return (result);
    }
}
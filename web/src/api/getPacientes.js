const BASE = 'http://localhost:5000/api';

export default async function getPacientes() {
    try {
        const response = await fetch(`${BASE}/pacientes`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error al obtener pacientes:", error);
    }
}




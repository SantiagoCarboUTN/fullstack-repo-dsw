import { useEffect, useState } from "react";

interface Client {
  id: string;
  name: string;
  contraseña: string;
  mail: string;
  telefono: string;
  dni: number;
}

export const AdminDashboard = () => {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    fetch("/api/clients")
      .then((res) => res.json())
      .then((json) => setClients(json.data))
      .catch((err) => console.error("Error:", err));
  }, []);

  return (
    <div>
      <h1>Clientes</h1>

      {clients.length === 0 ? (
        <p>No hay clientes cargados.</p>
      ) : (
        <ul>
          {clients.map((client) => (
            <li key={client.id}>
              <strong>{client.name}</strong> <br />
              📧 {client.mail} <br />
              📞 {client.telefono} <br />
              🆔 DNI: {client.dni}
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
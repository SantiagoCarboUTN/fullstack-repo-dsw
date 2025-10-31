import { useCuotas } from '../../hooks/Cuota/useCuotas';

export const TestCuotas = () => {
  const { cuotas, loading, error } = useCuotas(); // sin filtro de estado

  if (loading) return <p>Cargando cuotas...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Cuotas cargadas ({cuotas.length})</h2>
      <ul>
        {cuotas.map((c) => (
          <li key={c.id}>
            <strong>ID:</strong> {c.id} — 
            <strong>Monto:</strong> {c.monto} — 
            <strong>Fecha pago:</strong> {c.fechaPago || 'pendiente'}
          </li>
        ))}
      </ul>
    </div>
  );
};
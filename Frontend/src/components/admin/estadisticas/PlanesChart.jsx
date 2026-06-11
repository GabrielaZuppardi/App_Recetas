import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js'

import { Pie, Bar } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement)

const PlanesChart = ({ usuarios = [] }) => {
  const usuariosNormales = usuarios.filter((usuario) => usuario.rol === 'usuario')
  const usuariosAdmin = usuarios.filter((usuario) => usuario.rol === 'administrador').length

  const usuariosPlus = usuariosNormales.filter((usuario) => usuario.plan === 'plus').length
  const usuariosPremium = usuariosNormales.filter((usuario) => usuario.plan === 'premium').length

  const dataRoles = {
    labels: ['Usuarios', 'Administradores'],
    datasets: [
      {
        label: 'Cantidad',
        data: [usuariosNormales.length, usuariosAdmin],
        backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 0.5
      }
    ]
  }

  const dataPlanes = {
    labels: ['Planes'],
    datasets: [
      {
        label: 'Plus',
        data: [usuariosPlus],
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 0.5
      },
      {
        label: 'Premium',
        data: [usuariosPremium],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 0.5
      }
    ]
  }

  return (
    <section className="analytics card">
      <h3>📊 Analíticas Usuarios</h3>
      <div className="charts-container">
        <div className="chart-card">
          <h3>Usuarios por rol</h3>
          <Pie data={dataRoles} />
        </div>

        <div className="chart-card">
          <h3>Usuarios por plan</h3>
          <Bar data={dataPlanes} />
        </div>
      </div>
    </section>
  )
}

export default PlanesChart

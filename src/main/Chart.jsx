
import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


    const Chart = ({ userData }) => {
  // Génère des données pour les 7 derniers jours
  const today = new Date();
  const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  const dates = [];
  for (let date = lastWeek; date <= today; date.setDate(date.getDate() + 1)) {
    dates.push(new Date(date));
  }

  // Génère des données pour chaque utilisateur
  const userChartData = userData.map(user => {
    const userProgress = [];
    dates.forEach(date => {
      const progress = user.progressions.find(p => new Date(p.date).toDateString() === date.toDateString());
      userProgress.push({
        date: date.toDateString(),
        progression: progress ? progress.progression : 0
      });
    });
    return { nom: `${user.prenom} ${user.nom}`, progressions: userProgress };
  });

  // Définit la configuration du graphique
  const chartConfig = {
    width: 600,
    height: 400,
    margin: { top: 20, right: 20, bottom: 20, left: 20 },
    data: userChartData,
    xAxis: {
      dataKey: 'date'
    },
    yAxis: {
      label: { value: 'Progression', angle: -90, position: 'insideLeft' }
    },
    tooltip: {
      formatter: (value, name, props) => [`${props.payload.date}`, `${props.payload.progression}%`]
    },
    legend: {
      layout: 'horizontal',
      verticalAlign: 'bottom',
      align: 'center'
    },
    lines: {
      stroke: '#8884d8',
      strokeWidth: 2,
      activeDot: { r: 6 }
    }
  };
 
  return (
    <div>
      <h2>Évolution de la progression des utilisateurs sur les derniers 7 jours</h2>
      <LineChart {...chartConfig}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        {userChartData.map(user => (
          <Line key={user.nom} dataKey="progression" data={user.progressions} name={user.nom} />
        ))}
      </LineChart>
    </div>
  );
};

export default Chart;
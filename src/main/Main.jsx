import React from 'react'
import Dashbordcard from  '../main/Dashbordcard';
import '../main/main.css';
import { useState } from 'react';
import {apprenant } from '../data'
import { modules } from '../data'
import { Link } from 'react-router-dom';

const Main = () => {
   // Définir les états pour les données de tableau de bord
   //const [totalUsers, setTotalUsers] = useState(0);
   //const [activeUsers, setActiveUsers] = useState(0);
   const [totalCourses, setTotalCourses] = useState(0);
   //const [campaignProgress, setCampaignProgress] = useState([]);
   const [userActivity, setUserActivity] = useState([]);
   const [topActiveUsers, setTopActiveUsers] = useState([]);
   const [topCampaigns, setTopCampaigns] = useState([]);
   //const [topCampaigns, setTopCampaigns] = useState(campagnes);
   const [userData, setUserData] = useState([6]);
   //const [deptProgress, setDeptProgress] = useState([]);
   const [userProfileProgress, setUserProfileProgress] = useState([]);
   const [certificationLevels, setCertificationLevels] = useState([]);
   //const [quizFailures, setQuizFailures] = useState([]);


   //pourcentage nombre actif apprenant sur les 30jours 
  const apprenantActifs = 4;
  const totalApprenants = 6;
  const pourcentageActifs = (apprenantActifs / totalApprenants) * 100;
  //Nombre total de cours/modules enregistrés 
  const totalModules = modules.length;

  //Niveau de progression des utilisateurs par campagnes et par cours
   const utilisateurs = [  { id: 1, nom: 'Dupont', prenom: 'Pierre', campagneId: 1, coursId: 2, progression: 50 },  { id: 2, nom: 'Martin', prenom: 'Marie', campagneId: 1, coursId: 1, progression: 80 },  { id: 3, nom: 'Dubois', prenom: 'Jean', campagneId: 2, coursId: 3, progression: 25 },  { id: 4, nom: 'Lefebvre', prenom: 'Sophie', campagneId: 2, coursId: 2, progression: 100 },  { id: 5, nom: 'Rousseau', prenom: 'Pierre', campagneId: 2, coursId: 1, progression: 70 }];
   const campagnes = [  { id: 1, nom: 'Campagne A' },{ id: 2, nom: 'Campagne B' },{ id: 2, nom: 'Campagne C' }];
   const cours = [  { id: 1, titre: 'Les bases de JavaScript' },  { id: 2, titre: 'Introduction à React' },  { id: 3, titre: 'Les fondamentaux de HTML et CSS' }];

  const campaignProgress = campagnes.map(campagne => {
    const coursProgress = cours.map(cours => {
      const users = utilisateurs.filter(user => user.campagneId === campagne.id && user.coursId === cours.id);
      const progressionSum = users.reduce((acc, user) => acc + user.progression, 0);
      const averageProgression = users.length ? progressionSum / users.length : 0;
      return { cours: cours.titre, progression: averageProgression };
    });
    const campaignProgressionSum = coursProgress.reduce((acc, cours) => acc + cours.progression, 0);
    const campaignAverageProgression = campaignProgressionSum / coursProgress.length;
    return { campagne: campagne.nom, progression: campaignAverageProgression, cours: coursProgress };
  });
    
  const CampaignProgress = ({ progressData }) => (
    <ul className="campaign-progress">
      {progressData.map(campaign => (
        <li key={campaign.campagne}>
          <h2>{campaign.campagne}</h2>
          <p>Progression moyenne: {campaign.progression}%</p>
          <ul>
            {campaign.cours.map(cours => (
              <li key={cours.cours}>
                <p>{cours.cours}: {cours.progression}%</p>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );

// Evolution des activités des utilisateurs sur les derniers 7 jours


//top 5 apprenant les plus actifs
// const topActiveUsersData = userData
//   .map(user => {
//     // Calcule la somme totale de progression de l'utilisateur
//     const totalProgress = user.progressions.reduce((total, p) => total + p.progression, 0);
//     return {
//       name: `${user.prenom} ${user.nom}`,
//       totalProgress,
//     };
//   })
//   .sort((a, b) => b.totalProgress - a.totalProgress) // Trie les utilisateurs par progression totale décroissante
//   .slice(0, 5); // Garde uniquement les 5 premiers utilisateurs

//Niveau de progression par departement 
const [deptProgress, setDeptProgress] = useState([
  {    department: "Marketing", progress: 75 },
  {    department: "Ventes",    progress: 90  },
  {    department: "Ressources humaines",progress: 60 },
  {    department: "Développement",  progress: 85 }]);
  const deptProgressCards = deptProgress.map((dept) => (
    <Dashbordcard key={dept.department} title={dept.department} value={`${dept.progress}%`}>
    </Dashbordcard>
  ));
  //NIveaux de progression par profil utulisateurs
  const users = [  {    nom: "Alice",    niveau: 75  },  {    nom: "Bob",    niveau: 50  },  {    nom: "Charlie",    niveau: 90  },  {    nom: "Dave",    niveau: 20  }];

let totalNiveau = 0;
for (let i = 0; i < users.length; i++) {
  totalNiveau += users[i].niveau;
}

//Pourcentage global d'utilisateurs par niveaux de certification


const users2 = [
  { name: 'Alice', certificationLevel: 'Niveau 1' },
  { name: 'Bob', certificationLevel: 'Niveau 2' },
  { name: 'Charlie', certificationLevel: 'Niveau 1' },
  { name: 'Dave', certificationLevel: 'Niveau 3' },
  { name: 'Eve', certificationLevel: 'Niveau 2' }
];

// 1. Calculer le nombre total d'utilisateurs
const totalUsers = users2.length;

// 2. Calculer le nombre d'utilisateurs par niveau de certification
const certificationCounts = users2.reduce((counts, user) => {
  counts[user.certificationLevel] = (counts[user.certificationLevel] || 0) + 1;
  return counts;
}, {});

// 3. Calculer le pourcentage d'utilisateurs par niveau de certification
const certificationPercentages = Object.entries(certificationCounts).reduce((percentages, [level, count]) => {
  percentages[level] = ((count / totalUsers) * 100).toFixed(2) + '%';
  return percentages;
}, {});

// 4. Afficher les résultats dans la ligne de commande
console.log(`<Dashbordcard title="Pourcentage global d'utilisateurs par niveaux de certification" value=${JSON.stringify(certificationPercentages)} />`);





//Pourcentage d'échecs aux quizz par profil et par département



const quizData = [
  { profile: "A", department: "1", passed: true },
  { profile: "A", department: "1", passed: false },
  { profile: "A", department: "2", passed: false },
  { profile: "B", department: "1", passed: true },
  { profile: "B", department: "2", passed: false },
  { profile: "B", department: "2", passed: false },
  { profile: "C", department: "1", passed: false },
  { profile: "C", department: "2", passed: false },
];

// Calculate failure percentages for each profile and department
const quizFailures = quizData.reduce((acc, cur) => {
  const { profile, department, passed } = cur;
  const key = `${profile}_${department}`;
  if (!acc[key]) {
    acc[key] = { profile, department, total: 0, failures: 0 };
  }
  acc[key].total++;
  if (!passed) {
    acc[key].failures++;
  }
  return acc;
}, {});
Object.values(quizFailures).forEach((entry) => {
  entry.percentage = ((entry.failures / entry.total) * 100).toFixed(2) + "%";
});
const quizFailuresArray = Object.values(quizFailures);

// Map quizFailuresArray to an array of React components
const quizFailuresList = quizFailuresArray.map((entry, index) => (
  <li key={index}>
    {entry.profile} - {entry.department}: {entry.percentage} échecs
  </li>
));


  
  

  return (
    <div className="dashboard">
      <h1>Tableau de bord</h1>
      <div className="dashboard-grid">
        <Dashbordcard title="Nombre total d'apprenants enregistrés" value={apprenant.length} />
        <Dashbordcard title="Pourcentage en nombre d'apprenants actifs sur les 30 derniers jours" value={`${pourcentageActifs.toFixed(2)}%`} />
        <Dashbordcard title="Nombre total de cours/modules enregistrés" value={totalModules} />
        <Dashbordcard title="Niveau de progression des utilisateurs par campagnes et par cours" value={<CampaignProgress progressData={campaignProgress} />} />
        {/* <Dashbordcard title="Evolution des activités des utilisateurs sur les derniers 7 jours" value={userActivity} /> */}
        <Dashbordcard title="Evolution des activités des utilisateurs sur les derniers 7 jours">
  <Link to="/chart">Voir l'évolution</Link>
</Dashbordcard>
        {/* <Dashbordcard title="Top 5 des apprenants les plus actifs" value={
  <ul>
    {topActiveUsersData.map(user => (
      <li key={user.name}>
        {user.name} - {user.totalProgress}%
      </li>
    ))}
  </ul>
} /> */}
        {/* <Dashbordcard title="Top 10 des campagnes les plus suivies" value={topCampaigns} /> */}
        <Dashbordcard title="Top 10 des campagnes les plus suivies" value={topCampaigns}>
      <ul>
        {topCampaigns.map(campagnes => (
          <li key={campagnes.id}>{campagnes.nom}</li>
        ))}
      </ul>
    </Dashbordcard>
       
        <Dashbordcard title="Niveaux de progression par département" value= {deptProgressCards}  />
        {/* <Dashbordcard title="Niveaux de progression par profil d'utilisateurs" value={userProfileProgress} /> */}
        <Dashbordcard title="Niveaux de progression par profil d'utilisateurs"  value={`${totalNiveau / users.length}%`} />
        <Dashbordcard title="Pourcentage global d'utilisateurs par niveaux de certification" value='"Niveau 1": "40.00%", "Niveau 2": "40.00%", "Niveau 3": "20.00%"' />

        <Dashbordcard title="Pourcentage d'échecs aux quizz par profil et par département" value={<ul>{quizFailuresList}</ul>}/>
      </div>
    </div>
  )
}

export default Main


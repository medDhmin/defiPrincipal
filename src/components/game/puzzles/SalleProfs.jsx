import React, { useState } from 'react';
import { useGame } from '../GameContext';
import { User, MessageCircle, CheckCircle2, XCircle, BookOpen, Cpu, Globe } from 'lucide-react';

const SalleProfs = () => {
  const { completeStage, goToMap } = useGame();
  
  const teachers = [
    {
      id: 1,
      name: "Mme Martin (Lettres)",
      icon: <BookOpen size={40} className="text-purple-500" />,
      dialogue: "J'ai peur de perdre tous mes cours tapés sur Word si on change de système...",
      options: [
        { text: "Il faut tout réécrire à la main, désolé.", correct: false, feedback: "Quoi ?! Mais c'est impossible, j'ai des années de travail !" },
        { text: "LibreOffice ouvre et enregistre vos fichiers Word sans problème !", correct: true, feedback: "Ah bon ? Si je peux garder mes fichiers, alors ça me va !" },
        { text: "Word fonctionne avec Wine mais c'est instable.", correct: false, feedback: "Je ne veux pas d'un système instable, j'ai besoin de fiabilité." }
      ]
    },
    {
      id: 2,
      name: "M. Durand (Maths)",
      icon: <Cpu size={40} className="text-blue-500" />,
      dialogue: "J'utilise des logiciels spécifiques comme GeoGebra ou Python. Ça existe sur Linux ?",
      options: [
        { text: "Oui ! GeoGebra et Python sont natifs et plus performants sous Linux.", correct: true, feedback: "Excellent ! Si c'est plus performant, mes élèves vont adorer." },
        { text: "Non, c'est que pour faire du traitement de texte.", correct: false, feedback: "C'est bien ce que je pensais, ce n'est pas pour les scientifiques." },
        { text: "Il faut payer une licence spéciale.", correct: false, feedback: "Payer ? Mais le budget du lycée est déjà serré..." }
      ]
    },
    {
      id: 3,
      name: "Mme Petit (Histoire)",
      icon: <Globe size={40} className="text-amber-500" />,
      dialogue: "C'est bien beau, mais les élèves ne vont rien comprendre, c'est trop compliqué !",
      options: [
        { text: "C'est réservé aux informaticiens.", correct: false, feedback: "Donc inutile pour 90% de nos élèves. Mauvaise idée." },
        { text: "Ils utilisent déjà Linux tous les jours : Android est basé dessus ! L'interface est très intuitive.", correct: true, feedback: "C'est vrai... s'ils savent utiliser leur téléphone, ils sauront utiliser ça." },
        { text: "On leur donnera des cours de ligne de commande.", correct: false, feedback: "De la ligne de commande ? Ils décrochent déjà quand je parle de Louis XIV..." }
      ]
    },
    {
      id: 4,
      name: "M. Tice (Informatique)",
      icon: <Cpu size={40} className="text-green-600" />,
      dialogue: "Et la maintenance ? Si ça plante, qui répare ? Windows on a un contrat...",
      options: [
        { text: "Linux est très stable et les mises à jour sont gratuites et automatiques.", correct: true, feedback: "Moins de pannes et pas de licences à gérer ? Vous marquez un point." },
        { text: "C'est gratuit donc il n'y a pas de support.", correct: false, feedback: "Pas de support = danger. Je ne peux pas prendre ce risque." },
        { text: "On demandera aux élèves de réparer.", correct: false, feedback: "Les élèves ? Ils cassent plus qu'ils ne réparent !" }
      ]
    },
    {
      id: 5,
      name: "Mme CDI (Doc)",
      icon: <BookOpen size={40} className="text-teal-500" />,
      dialogue: "J'ai besoin d'un logiciel pour gérer la base de données des livres. BCDI ne marche que sur Windows.",
      options: [
        { text: "PMB est une excellente alternative libre et web pour les CDI.", correct: true, feedback: "PMB ? J'en ai entendu parler. Si c'est web, je peux même y accéder de chez moi !" },
        { text: "Gardez un vieux PC Windows juste pour ça.", correct: false, feedback: "Ce n'est pas très cohérent avec votre projet de tout changer..." },
        { text: "On fera une liste sur papier.", correct: false, feedback: "Retour au Moyen-Âge ? Non merci." }
      ]
    }
  ];

  const [convincedTeachers, setConvincedTeachers] = useState([]);
  const [currentTeacher, setCurrentTeacher] = useState(null); // ID of teacher currently talking
  const [feedback, setFeedback] = useState(null);
  const [failedAttempts, setFailedAttempts] = useState({}); // Track failed attempts per teacher

  const handleTeacherClick = (teacher) => {
    if (convincedTeachers.includes(teacher.id)) return;
    setCurrentTeacher(teacher.id);
    setFeedback(null);
  };

  const handleOptionClick = (option) => {
      if (option.correct) {
          setFeedback({ type: 'success', text: option.feedback });
          setTimeout(() => {
              setConvincedTeachers([...convincedTeachers, currentTeacher]);
              setCurrentTeacher(null);
              setFeedback(null);
          }, 2000);
      } else {
          setFeedback({ type: 'error', text: option.feedback });
          setFailedAttempts(prev => ({
              ...prev,
              [currentTeacher]: (prev[currentTeacher] || 0) + 1
          }));
      }
  };

  const isComplete = convincedTeachers.length === teachers.length;

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white rounded-xl shadow-xl min-h-[600px] flex flex-col">
      <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-primary-600">Étape 3 : Salle des Profs</h2>
          <button onClick={goToMap} className="text-sm text-gray-500 hover:text-gray-700">Retour Carte</button>
      </div>

      <p className="text-center mb-8 text-gray-600">
          Les professeurs sont sceptiques. <strong>Répondez à leurs inquiétudes pour les rallier à la cause !</strong>
          <br/><span className="text-sm text-gray-400">({convincedTeachers.length}/{teachers.length} convaincus)</span>
      </p>

      <div className="flex flex-wrap justify-center gap-8 mb-8 border-b-4 border-slate-200 pb-6 relative">
          {teachers.map((teacher) => {
              const isConvinced = convincedTeachers.includes(teacher.id);
              const isTalking = currentTeacher === teacher.id;
              const attempts = failedAttempts[teacher.id] || 0;
              
              return (
                <div 
                    key={teacher.id} 
                    className={`relative cursor-pointer transition-all duration-300 flex flex-col items-center group
                        ${isConvinced ? 'opacity-100 scale-105' : isTalking ? 'scale-110 z-10' : 'opacity-80 hover:opacity-100 hover:scale-105'}
                    `}
                    onClick={() => handleTeacherClick(teacher)}
                >
                    {/* Bubble for status */}
                    <div className="absolute -top-8 transition-transform duration-300 group-hover:-translate-y-2">
                        {isConvinced ? 
                            <CheckCircle2 className="text-green-500 w-8 h-8 drop-shadow-md bg-white rounded-full" /> : 
                            isTalking ? <MessageCircle className="text-blue-500 w-8 h-8 drop-shadow-md bg-white rounded-full animate-pulse" /> : 
                            attempts > 0 ? <XCircle className="text-red-400 w-6 h-6 drop-shadow-md bg-white rounded-full" /> :
                            null
                        }
                    </div>

                    {/* Avatar */}
                    <div className={`w-20 h-20 rounded-full border-4 flex items-center justify-center bg-slate-100 overflow-hidden shadow-md transition-colors
                        ${isConvinced ? 'border-green-500 bg-green-50' : isTalking ? 'border-blue-500 bg-blue-50' : 'border-slate-300 group-hover:border-blue-300'}
                    `}>
                        {teacher.icon}
                    </div>
                    <p className="font-bold mt-2 text-xs bg-white px-2 py-1 rounded shadow-sm border border-slate-100 whitespace-nowrap z-20">
                        {teacher.name}
                    </p>
                </div>
              );
          })}
      </div>

      {/* Dialogue Area */}
      <div className="flex-grow bg-slate-50 rounded-xl p-6 border border-slate-200 relative min-h-[250px] shadow-inner">
          {currentTeacher ? (
              <div className="animate-fadeIn flex flex-col h-full justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center border-2 border-blue-200">
                            {teachers.find(t => t.id === currentTeacher).icon}
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-slate-800">{teachers.find(t => t.id === currentTeacher).name}</h3>
                            <span className="text-xs text-slate-500 uppercase tracking-wide">Dialogue en cours...</span>
                        </div>
                    </div>
                    
                    <div className="bg-white p-4 rounded-tl-none rounded-tr-xl rounded-br-xl rounded-bl-xl shadow-sm border border-slate-200 mb-6 relative ml-6 before:content-[''] before:absolute before:top-0 before:-left-3 before:w-0 before:h-0 before:border-t-[15px] before:border-t-white before:border-l-[15px] before:border-l-transparent">
                         <p className="text-lg text-slate-700 italic">"{teachers.find(t => t.id === currentTeacher).dialogue}"</p>
                    </div>
                  </div>
                  
                  {feedback ? (
                      <div className={`p-4 rounded-lg text-center font-bold text-lg shadow-md transform transition-all duration-300 ${feedback.type === 'success' ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'}`}>
                          {feedback.text}
                          {feedback.type === 'error' && (
                              <button 
                                  onClick={() => setFeedback(null)}
                                  className="block mx-auto mt-2 text-sm underline opacity-80 hover:opacity-100"
                              >
                                  Réessayer
                              </button>
                          )}
                      </div>
                  ) : (
                      <div className="grid gap-3">
                          {teachers.find(t => t.id === currentTeacher).options.map((opt, idx) => (
                              <button 
                                  key={idx}
                                  onClick={() => handleOptionClick(opt)}
                                  className="text-left p-4 bg-white border-2 border-slate-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 hover:shadow-md transition-all group"
                              >
                                  <span className="font-bold text-blue-500 mr-2 group-hover:text-blue-600">{String.fromCharCode(65 + idx)}.</span>
                                  {opt.text}
                              </button>
                          ))}
                      </div>
                  )}
              </div>
          ) : isComplete ? (
              <div className="text-center h-full flex flex-col justify-center items-center animate-fadeIn p-8">
                   <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
                        <CheckCircle2 size={64} className="text-green-600" />
                   </div>
                   <h3 className="text-3xl font-bold text-green-600 mb-4">Salle Conquise !</h3>
                   <p className="mb-8 text-lg text-slate-600 max-w-lg">Tous les professeurs sont convaincus et prêts à installer Linux. La salle des profs est maintenant un bastion du logiciel libre !</p>
                   <button 
                      onClick={() => completeStage(3)}
                      className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-10 rounded-full text-xl shadow-xl transition-transform transform hover:scale-105 flex items-center gap-2"
                  >
                      Continuer l'Aventure →
                  </button>
              </div>
          ) : (
              <div className="text-center h-full flex flex-col justify-center items-center text-slate-400">
                  <MessageCircle size={64} className="mb-4 opacity-30" />
                  <p className="text-xl font-medium">Sélectionnez un professeur pour commencer le débat.</p>
              </div>
          )}
      </div>
    </div>
  );
};

export default SalleProfs;

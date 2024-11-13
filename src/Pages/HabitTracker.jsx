import React, {useState, } from 'react'
import { FaCheck, FaTimes, FaTrash } from "react-icons/fa";


const HabitTracker = () => {

    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    const [habits, setHabits] = useState([  
        {id: 1, name: 'Exercise', progress: Array(7).fill(false)},
        {id: 2, name: 'Reading', progress: Array(7).fill(false)},
        {id: 3, name: 'Coding', progress: Array(7).fill(false)},
        {id: 4, name: 'Meditation', progress: Array(7).fill(false)},
    ])


    


// Actualiza el estado del hábito realizado. 
// Busca por el id del hábito (habit.id) y actualiza el progreso del hábito (index) a true o false.
    const handleCheckHabit = (index, id) => {
        setHabits(prevHabits => 
            prevHabits.map(habit => 
                habit.id === id 
                    ? { ...habit, progress: habit.progress.map((p, i) => i === index ? !p : p) }
                    : habit
            )
        );
    };


    const addNewHabit = () => {
        setHabits(prevHabits => [...prevHabits, {id: prevHabits.length + 1, name: 'New Habit', progress: Array(7).fill(false)}]);
    }

    const deleteHabit = (id) => {  

        setHabits(prevHabits => prevHabits.filter(habit => habit.id !== id));
    }

    // Actualiza el nombre del hábito. 
    // Busca por el id del hábito (habit.id) y actualiza el progreso del hábito (index) a true o false.
    const handlemodifyHabit = (id, name) => {

        setHabits(prevHabits =>
            prevHabits.map(habit =>
                habit.id === id
                ? { ...habit, name: name }
                : habit
            ));    
    
    }
    
  return (
    <div className='min-h-screen bg-gray-100 p-8 '>

        <div className='max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6'>
            
            <div className='flex items-center justify-around mb-8'>

                <h1 className='text-3xl font-blod text-gray-800 text-center'> 
                    Habit Tracker
                </h1>

                <button 
                    className='bg-gray-500 text-white w-10 h-10 rounded-full hover:bg-gray-700'
                    onClick={addNewHabit}
                    >
                    +
                </button>


            </div>

            <div className='overflow-x-auto'>
                <table className='w-full'>
                    <thead>
                        <tr>
                            <th className='px-4 py-2 text-left'>Habit</th>
                            {daysOfWeek.map(day => (
                                <th className='px-4 py-2 text-center'>{day}</th>
                            ))}                           
                            
                            <th className='px-4 py-2 text-center'>Progress</th>
                            
                        </tr>
                    </thead>
                    
                    <tbody>

                        {habits.map(habit => (

                            <tr key={habit.id} className='' id={habit.id} >  
                                
                                <td> 
                                    <input 
                                        type="text" 
                                        value={habit.name}
                                        id={habit.id}
                                        onChange={(e) => handlemodifyHabit(habit.id, e.target.value)}
                                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        
                                        />  
                                </td>

                                {habit.progress.map((progress, index) => (
                                    <td className="px-4 py-4 text-center">

                                        <button 
                                            onClick={() => handleCheckHabit(index, habit.id)} 
                                            className={`w-8 h-8 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 ${
                                                progress
                                                  ? "bg-green-500 hover:bg-green-600 focus:ring-green-500"
                                                  : "bg-gray-200 hover:bg-gray-300 focus:ring-gray-400"
                                              }`}
                                        >

                                          
                                                                                   
                                            {progress 
                                             ? <FaCheck className='w-4 h-4 mx-auto text-white'/> 
                                             : <FaTimes className='w-4 h-4 mx-auto text-gray-500'/>
                                            
                                            }        
                                        
                                        
                                        </button>
                                        
                                    </td>
                                ))} 


                                <td className='px-4 py-4'>
                                    <div className='flex justify-center gap-3 items-center'>                                    
                                        <div className='spaces-y-2'>                                            
                                            {/* Barra de progreso */}
                                            <div className='w-full bg-gray-200 rounded h-2.5'>
                                                <div> 
                                                    {/* Se muestra la barra progreso azul en funcion del porcentaje de dias completado. Se usa el % para la propiedad width con los dias  */}
                                                    <div className='bg-blue-500 h-2.5 rounded' style={{width: `${habit.progress.filter(progress => progress).length / habit.progress.length * 100}%`}}></div>
                                                </div>
                                            </div>
                                            
                                            {/* Tanto por ciento */}
                                            <div className='text-sm text-gray-500 text-center'>
                                                {habit.progress.filter(progress => progress).length} / {habit.progress.length} days                                                
                                            </div>

                                        </div>
                                        <button
                                            onClick={() => deleteHabit(habit.id)}
                                        >
                                            <FaTrash className='flex items-center w-5 h-5' />
                                        </button>
                                    </div>

                                    


                                </td>

                            
                            
                            </tr>
                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    </div>
    
  )
}

export default HabitTracker
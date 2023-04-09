import React, {Component} from 'react'
import { render } from 'react-dom'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Survey from './Survey.jsx'

// import styled from ''
import Dashboard from './Dashboard.jsx'
// import Graphs from 

import '../style.css'

// const App = () => {
// 	return (
// 	<div>
// 			<h1>Employee Survey</h1>
// 			<QuestionRow />
// 	</div>
// 	)
// }


const App = () => {
    return (
        
		<div className='container'>
			<Routes>
				{/* <Route path='/' element={<h1>My App</h1>}/> */}
          <Route path='/survey' element={<Survey/> }/>
				{/* <Route path='/graph' element={ <Graph /> }/> */}
				<Route path='/' element={ <Dashboard /> } />
			</Routes>
		</div>
)
//   render() {
//     return (

//       <BrowserRouter>
// 		<div className='mainButtons'>
//         	<Link to='/survey'> <button>EMPLOYEE</button> </Link>
//         	<Link to='/survey'> <button>EMPLOYER</button> </Link>
// 		</div>
//         <Routes>
//           <Route path='/survey' element={ <QuestionRow/> } />
//         </Routes>
      
//       </BrowserRouter>

//     )
//   }
}



  export default App;
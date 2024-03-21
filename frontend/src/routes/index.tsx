import { Routes, Route } from 'react-router-dom'
import React from 'react';

import Home from '../pages/Home/index'
import Cadastrados from '../pages/Cadastrados';
import AniversariantesMes from '../pages/AniversariantesMes';
import AniversariantesDia from '../pages/AniversariantesDia';

export default function RoutesApp(){
    return(
        <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="/cadastrados" element={ <Cadastrados /> } /> 
            <Route path="/aniversariosMes" element={ <AniversariantesMes /> } /> 
            <Route path="/aniversariosDia" element={ <AniversariantesDia /> } /> 
        </Routes>
    )   
}
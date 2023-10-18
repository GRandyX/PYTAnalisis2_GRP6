import {createPool} from 'mysql2/promise'

//Cambiar las configuraciones según las bd
export const pool = createPool({
    host: 'localhost',
    user: 'root', 
    password: 'admin',
    port: 3306,
    database: 'analisis_past'   
});





 

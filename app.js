var express = require('express');
var mysql = require('mysql');
var cors = require('cors');

var app = express();
app.use(express.json());
app.use(cors());

//password:'Dell1986',

var conexion = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'pietra'
});
conexion.connect(function(error){
    if(error){
        throw error;
    } else {
        console.log("conexion exitosa");
    }
})

app.get('/',function(req,res){
    res.send('Ruta inicio');
});

// /*******************Categorias************************* */
//listar
app.get('/api/categorias',(req,res)=>{
    conexion.query('SELECT * FROM categorias', (error,filas)=>{
        if(error){
            console.log('aqui')
            throw error;
        } else {
            res.send(filas);
        }
    })
}); 
//crear
app.post('/api/categorias', (req,res)=>{
    let data = {IdCate:req.body.IdCate, Nombre:req.body.Nombre};
    let sql = "INSERT INTO categorias SET ?";
    conexion.query(sql, data, function(error, results){
        if(error){
            throw error;
        } else {
            res.send(results);
        }
    });
});
//editar-modificar
app.put('/api/categorias/:id', (req,res)=>{
    let id = req.params.id;
    let IdCate = req.body.IdCate;
    let Nombre = req.body.Nombre;
    console.log ('IdCate' + this.IdCate);
    let sql = "UPDATE categorias SET IdCate = ?, Nombre = ? WHERE id = ?";
    conexion.query(sql, [IdCate,Nombre,id], function(error,results){
        if(error){
            throw error;
        } else {
            res.send(results);
        }    
    });
});

//eliminar 
app.delete('/api/categorias/:id', (req,res)=>{
    conexion.query('DELETE FROM categorias WHERE id = ?', [req.params.id], function(error, filas){
        if(error){
            throw error;
        } else {
            res.send(filas);
        }     
    });
  });




app.use((error,req,res,next) => {
    res.status(400).json({
        status: 'error',
        message: error.message,
    });
});



const puerto = process.env.PUERTO || 8500;

app.listen(puerto,function(){
    console.log("Servidor ok en puerto:"+puerto);
});


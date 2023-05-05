const app = require('express')();
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const database = require('./db.connection');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/employee', async (req, res) => {
    if(req.body.name != undefined || req.body.email != undefined ){
        let employee = req.body;
        employee.id = uuidv4();
        let url = 'INSERT INTO employees(id,name,email,address, phone) VALUES (?,?,?,?,?);';
        let values = [employee.id, employee.name, employee.email, employee.address, employee.phone ];
        const [rows] = await database.query(url, values);
        if(rows.affectedRows > 0){
            res.status(200).send({ message: "Usuario criado com sucesso !" })    
        }
    }else{
        res.status(400).send({ message: "Conteudo incompleto para o cadastro" })
    }
})

app.get('/employees', async (req, res) => {
    let url = 'select * from employees';
    const [rows] = await database.query(url);
    if(rows.length > 0){
        res.status(200).send(rows);    
    }else{
        res.status(200).send({ message: "Banco vazio, não ha dados salvos" }); 
    }
})

app.listen(3000, () => {
  console.log(`Example app listening on port 3000`)
})
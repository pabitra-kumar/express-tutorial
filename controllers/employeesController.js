
const data = {
    employees: require('../data/employees.json'),
    setEmployees: function(data) {this.employees = data}
}


const getAllEmployee = (req , res) => {
    res.json(data.employees)
}

const createEmployee = (req,res) => {
      const  newEmployee = {
            id: data.employees[data.employees.length-1].id + 1 || 1 ,
            firstname: req.body.firstname,
            lastname: req.body.lastname
        }
        if(!newEmployee.firstname || !newEmployee.lastname){
            res.status(404).json({"message": "first and last name are required"})
        }

        data.setEmployees([...data.employees,newEmployee])
        res.status(201).json(data.employees)
}

const updateEmployee = (req,res) => {
    const employee = data.employees.find(emp => emp.id == parseInt(req.body.id))
    if(!employee){
        res.status(400).json({"message": `Employee ID ${req.body.id} not Found`})
    }
    if(req.body.firstname) employee.firstname = req.body.firstname
    if(req.body.lastname) employee.lastname = req.body.lastname
    const filteredArray = data.employees.filter(emp => emp.id !== req.body.id)
    const unSortedArray = [...filteredArray , employee]
    data.setEmployees(unSortedArray.sort((a,b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
    res.json(data.employees)
}

const deleteEmployee = (req,res) => {
    const employee = data.employees.find(emp => emp.id == parseInt(req.body.id))
    if(!employee){
        res.status(400).json({"message": `Employee ID ${req.body.id} not Found`})
    }
    const filteredArray = data.employees.filter(emp => emp.id !== req.body.id)
    data.setEmployees([...filteredArray])
    res.json(data.employees)
}

const getEmployee = (req , res) => {
    const employee = data.employees.find(emp => emp.id == parseInt(req.params.id))
    if(!employee){
        res.status(400).json({"message": `Employee ID ${req.params.id} not Found`})
    }
    res.json(employee)
}

module.exports = {
    getAllEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}
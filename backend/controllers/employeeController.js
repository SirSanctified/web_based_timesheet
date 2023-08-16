import { Employee, Timesheet } from "../models/association.js";

export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll({
      attributes: {
        exclude: ["password"],
      },
    });
    res.status(200).json(employees);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id, {
      attributes: {
        exclude: ["password", "refreshToken", "resetToken"],
      },
    });
    const tasks = await employee.getTasks();
    const timesheets = await Timesheet.findAll({
      where: { employeeId: employee.id },
    });
    employee.tasks = tasks;
    employee.timesheets = timesheets;
    res.status(200).json({...employee.dataValues, timesheets: timesheets, tasks: tasks});
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, nationalId, role, isActive } =
      req.body;

    const updatedEmployee = {
      firstName,
      lastName,
      email,
      phone,
      nationalId,
      role,
      isActive,
    };
    await Employee.update(updatedEmployee, { where: { id: req.params.id } });
    res.status(200).json({ ...updatedEmployee, id: req.params.id });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    await Employee.destroy({ where: { id: req.params.id } });
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

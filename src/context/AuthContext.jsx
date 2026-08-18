import React, { createContext, useContext, useState, useEffect } from 'react';
import { ADMIN_USER, EMPLOYEES_DATA } from '../data/employeesData';

const AuthContext = createContext(null);

const STORAGE_KEY = 'cdt_crm_auth_session_active';

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      console.error("Failed to load auth session", e);
      return null;
    }
  });

  useEffect(() => {
    try {
      if (currentUser) {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(currentUser));
      } else {
        sessionStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch (e) {
      console.error("Failed to save auth session", e);
    }
  }, [currentUser]);

  // Strict Admin Login (Only Owner / Admin)
  const loginAdmin = async (username, password) => {
    const cleanUser = username.trim().toLowerCase();

    // Check if an employee tried logging into admin portal
    const isEmployee = EMPLOYEES_DATA.some(
      emp => emp.username.toLowerCase() === cleanUser
    );

    if (isEmployee) {
      throw new Error("Access Denied: Employee accounts are strictly prohibited from accessing the Admin Portal.");
    }

    if (
      cleanUser === ADMIN_USER.username.toLowerCase() &&
      password === ADMIN_USER.password
    ) {
      const authUser = {
        id: ADMIN_USER.id,
        name: ADMIN_USER.name,
        username: ADMIN_USER.username,
        email: ADMIN_USER.email,
        role: "ADMIN",
        designation: ADMIN_USER.designation,
        status: ADMIN_USER.status
      };
      setCurrentUser(authUser);
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(authUser));
      return authUser;
    }

    throw new Error("Invalid administrator username or password.");
  };

  // Strict Employee Login (Only 10 Predefined Employees)
  const loginEmployee = async (username, password) => {
    const cleanUser = username.trim().toLowerCase();

    // Check if admin is trying to login to employee portal
    if (cleanUser === ADMIN_USER.username.toLowerCase()) {
      throw new Error("Access Restricted: Admin credentials cannot be used on the Employee Portal. Please use the Admin Portal.");
    }

    const employee = EMPLOYEES_DATA.find(
      emp => emp.username.toLowerCase() === cleanUser
    );

    if (!employee) {
      throw new Error("Employee account not found. Please check your username.");
    }

    if (employee.password !== password) {
      throw new Error("Incorrect password for employee account.");
    }

    if (employee.status !== "Active") {
      throw new Error("This employee account is currently inactive. Contact Administrator.");
    }

    const authUser = {
      id: employee.id,
      employeeId: employee.employeeId,
      name: employee.name,
      username: employee.username,
      email: employee.email,
      department: employee.department,
      designation: employee.designation,
      role: "EMPLOYEE",
      avatar: employee.avatar,
      status: employee.status
    };

    setCurrentUser(authUser);
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(authUser));
    return authUser;
  };

  const logout = () => {
    setCurrentUser(null);
    sessionStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('cdt_crm_auth_session');
  };

  const value = {
    currentUser,
    isAuthenticated: !!currentUser,
    isAdmin: currentUser?.role === 'ADMIN',
    isEmployee: currentUser?.role === 'EMPLOYEE',
    loginAdmin,
    loginEmployee,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

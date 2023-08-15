const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
      // El usuario es un administrador
      next();
    } else {
      // El usuario no tiene los permisos de administrador
      res.status(403).json({ message: 'Acceso no autorizado' });
    }
  };
  
  const isUser = (req, res, next) => {
    if (req.user && !req.user.isAdmin) {
      // El usuario es un usuario normal
      next();
    } else {
      // El usuario no tiene los permisos de usuario normal
      res.status(403).json({ message: 'Acceso no autorizado' });
    }
  };
  
  const applyPolicy = (roles) => {
    return (req, res, next) => {
      if (roles[0].toUpperCase() === "PUBLIC") return next();
      if (!req.user) return res.status(401).send({ status: "error", error: "Not authenticated" });
      if (!roles.includes(req.user.role.toUpperCase())) return res.status(403).send({ status: "error", error: "Not authorized" });
      next();
    };
  };
  
  export { isAdmin, isUser, applyPolicy };
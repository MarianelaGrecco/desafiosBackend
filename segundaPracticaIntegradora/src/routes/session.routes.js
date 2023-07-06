import { sessionsModel } from './models/Sessions.js';

sessionsRouter.get('/current', (req, res) => {

  if (req.session.userId) {
  
    const userId = req.session.userId;
    
    
    sessionsModel.findById(userId, (err, session) => {
      if (err) {
        
        return res.status(500).json({ error: 'Error al buscar la sesión actual' });
      }
      
      if (!session) {
       
        return res.json({});
      }
      
    
      res.json({ user: session.user });
    });
  } else {
  
    res.json({});
  }
});

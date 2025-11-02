import { Request, Response, NextFunction } from 'express';
import { orm} from '../shared/db/orm.js';
import { Admin } from './admin.entity.js';
import { TipoServicio } from '../tipoServicio/tserv.entity.js';

const em = orm.em

function sanitizedAdminInput(req: Request, res: Response, next: NextFunction) {
  req.body.sanitizedInput = {
    complete_name: req.body.complete_name,
    email: req.body.email,
    password: req.body.password,
    id: req.body.id
  } 
  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key]
    }
  }) 
  next()
}

async function findAll(req: Request, res: Response) {
  try {
    const admins = await em.find(Admin, {});
    
    if(admins.length === 0){
        res.status(404).json({message:'admins not found'})
      }else{
         res.status(200).json({message: 'Lista de administradores', data: admins });
      }
  } catch (error: any) {
    res.status(500).json({message: error.message}); 
  }
}

async function findOne(req: Request, res: Response) {
  try{
    const id = Number.parseInt(req.params.id);

    const admin = await em.findOneOrFail(Admin, {id}); 
    res.status(200).json({message: 'Administrador encontrado', data: admin })
  }catch (error: any) {
    res.status(500).json({ message: error.message });
  } 
}

async function add(req: Request, res: Response) {
  try {
    
    const admin = em.create(Admin, req.body.sanitizedInput);
    /* Creo servicios por defecto */
    const servicios:{denom:string, cantCuotas:number, precioCuota:number}[] = [
      {denom:"mensual", cantCuotas:1,precioCuota:100 },
      {denom:"trimestral", cantCuotas:3,precioCuota:90 },
      {denom:"anual", cantCuotas:12,precioCuota:80 }
    ]
    for (let i = 0; i < servicios.length; i++) {
        const tserv = em.create(TipoServicio, {
          admin,
          cantCuotas:servicios[i].cantCuotas,
          precioCuota:servicios[i].precioCuota,
          nombre:servicios[i].denom,
          reservas:[]
        });
        admin.TiposServicio.add(tserv)
      }
    
    await em.persistAndFlush(admin);
    res.status(201).json({ message: 'Administrador creado', data: admin });
  }catch (error:any) { 
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const updatedAdmin = await em.findOneOrFail(Admin,  id );

    em.assign(updatedAdmin, req.body.sanitizedInput);
    await em.flush();

    res.status(200).json({ message: 'Administrador actualizado', data: updatedAdmin });
  } catch (error:any) { 
    res.status(500).json({ message: error.message });
}
}

async function remove(req: Request, res: Response) {
  try { 
    const id = Number.parseInt(req.params.id);
    const deletedAdmin = await em.findOneOrFail(Admin,  id , {populate:['cocheras']});

    await em.removeAndFlush(deletedAdmin);

    res.status(200).json({ message: 'Administrador eliminado' });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
  }
}

export { findAll, findOne, add, update, remove, sanitizedAdminInput};
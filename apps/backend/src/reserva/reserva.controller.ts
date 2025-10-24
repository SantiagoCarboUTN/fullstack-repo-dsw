import { Request, Response, NextFunction } from "express"
import { Reserva } from "./reserva.entity.js"
import { orm } from '../shared/db/orm.js'
import { Vehiculo } from "../vehiculo/vehiculo.entity.js";
import { TipoServicio } from "../tipoServicio/tserv.entity.js";
import { Cuota } from "../cuotas/cuotas.entity.js";
import { Admin } from "../admin/admin.entity.js";
import { Cochera } from "../cochera/cochera.entity.js";

const em = orm.em
function sanitizedReservaInput(req: Request,res: Response,next: NextFunction) {
  req.body.sanitizedInput = {
    cochera: req.body.cochera,   
    vehiculo: req.body.vehiculo, 
    tipoServicio: req.body.tipoServicio, 
    fechaInicio: req.body.fechaInicio,       
    fechaFin: req.body.fechaFin,
    state: req.body.state              
  };


  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });

  next();
}

async function findAll(req: Request, res: Response) {
  try{
    const {client,state,admin}= req.query //Query params para los filtros
    const filters: any = {};
    
    if (admin) {
     filters.cochera = { admin: { id: Number(admin) } };
    }


    if (client) {
     filters.vehiculo = { client: { id: Number(client) } };
    }

    if (state) {
     filters.state = state; 
    }

    if(!state && !client){ //Todas las reservas
      const reservas = await em.find(Reserva, {} ,{ populate: ['vehiculo', 'cochera', 'vehiculo.client'] })
      if(reservas.length === 0){
        res.status(404).json({message:'reservas not found'})
      }else{
        res.status(200).json({message: `found all reservas`, data:reservas})
      }
      return ;
    }
    
    const reservas = await em.find(Reserva, filters,{ populate: ['vehiculo', 'vehiculo.client',"cuotas"] }) //listado filtrado 
    
    if(reservas.length === 0){ 
      res.status(404).json({message:'reservas not found'})
    }else{
      res.status(200).json({message: `found all ${req.params.state || ''} client reservas`, data:reservas})
    }

  }catch(error:any){
    res.status(500).json({message: error.message})
  }
} 

async function findOne(req: Request, res: Response) {
  try{
    const patenteVehiculo = req.params.vehiculo
    const numberCochera = Number.parseInt(req.params.cochera)
    const fechaini = new Date(req.params.fechaInicio)
    const reserva = await em.findOneOrFail(Reserva, {
      cochera: { number:numberCochera },
      vehiculo: { patente: patenteVehiculo },
      fechaInicio: fechaini}
    )
    res.status(200).json({message: 'found reserva', data:reserva})
  }catch(error:any){
    res.status(500).json({ message: error.message })
  }
}

async function add(req: Request, res: Response) {
    try {
    await em.transactional(async (tem) => {
      const { tipoServicio } = req.body.sanitizedInput;

      const ts = await tem.findOne(TipoServicio, { id: tipoServicio });
      if (!ts) {
        res.status(400).json({ message: "Tipo de servicio no encontrado" });
        return;
      }

      const adminRef = tem.getReference(Admin,req.body.cochera.admin)
      const cocheraRef = await tem.findOne(Cochera,{
        admin:adminRef,
        number:Number.parseInt(req.body.cochera.number)
      })
      if(!cocheraRef){
        res.status(404).json({ message: "Cochera no encontrada" })
        return;
      }

      const fechaFin= new Date(req.body.sanitizedInput.fechaInicio)
      const cantMeses = ts.cantCuotas
      fechaFin.setMonth(fechaFin.getMonth() + cantMeses)
      const reserva = tem.create(Reserva, {
        ...req.body.sanitizedInput,
        tipoServicio:ts,
        cochera: cocheraRef,
        fechaFin: fechaFin
      });
      
      const fechaInicio = new Date(reserva.fechaInicio);

      for (let i = 0; i < ts.cantCuotas; i++) {
        const fechaPago = new Date(fechaInicio);
        fechaPago.setMonth(fechaPago.getMonth() + i);

        const cuota = tem.create(Cuota, {
          reserva,
          fechaPago,
          monto: ts.precioCuota,
          state: "pendiente",
        });

        reserva.cuotas.add(cuota);
      }
      
      await tem.persistAndFlush(reserva);

      res.status(201).json({
        message: "Reserva creada con sus cuotas",
        data: reserva,
      });
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try{
    const patenteVehiculo = req.params.vehiculo
    const numberCochera = Number.parseInt(req.params.cochera)
    const fechaini = new Date(req.params.fechaInicio)
    const reservaUpdated = await em.findOneOrFail(Reserva, {
        cochera: { number:numberCochera },
        vehiculo: { patente: patenteVehiculo },
        fechaInicio: fechaini}
    )
  em.assign(reservaUpdated, req.body.sanitizedInput)
  await em.flush()
  }catch(error:any){
    res.status(500).json({ message: error.message })
  }
}

async function remove(req: Request, res: Response) {
  try{
    const patenteVehiculo = req.params.vehiculo
    const numberCochera = Number.parseInt(req.params.cochera)
    const fechaini = new Date(req.params.fechaInicio)
    const reservaDeleted = await em.findOneOrFail(Reserva, {
      cochera: { number:numberCochera },
      vehiculo: { patente: patenteVehiculo },
      fechaInicio: fechaini}
    )
    await em.removeAndFlush(reservaDeleted)
    return res.status(200).json({ message: "Se eliminó la reserva", data: reservaDeleted })
}catch(error:any){
  res.status(500).json({ message: error.message })
}
}  

export { findAll,findOne, add,sanitizedReservaInput, update, remove };


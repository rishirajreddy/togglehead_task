import Faq, {IFaq} from "../models/Faq";
import { Request, Response } from "express";

export const create = async (req: Request, res: Response) => {
    try {
        const body: IFaq = req.body;
        const max_order = await Faq.find().sort({ order: -1 }).limit(1).then(faqs => (faqs[0] ? faqs[0].order : 0));
        body["order"] = max_order + 1 
        const new_faq = await Faq.create(body)
        return res.status(200).send({ data: new_faq })

    } catch (error: any) {
        return res.status(500).send({ message: error?.message })
    }
}

export const findAll = async (req: Request, res: Response) => {
        try {        
        const faqs = await Faq.find().sort({ order: 1 });        
        return res.status(200).send({ data: faqs })
    } catch (error: any) {
        return res.status(500).send({ message: error?.message })
    }
}

export const reOrderFaqs = async (req: Request, res: Response) => {
    try {
        const faq = await Faq.findById(req.params.id);
        const new_order = req.body.order;
        if (!faq) {
            return res.status(400).send({ message: "NO FAQ found with the given ID" })
        }

  const original_order = faq.order;
  if (new_order === original_order) {return res.status(200).send({ message: "FAQs ReOrdered" })};

  if (new_order < original_order) {
    await Faq.updateMany({ order: { $gte: new_order, $lt: original_order } }, { $inc: { order: 1 } });
  } else {
    await Faq.updateMany({ order: { $gt: original_order, $lte: new_order } }, { $inc: { order: -1 } });
  }

  faq.order = new_order;
  await faq.save();
  return res.status(201).send({ message: "FAQs ReOrdered" })
    } catch (error: any) {
        return res.status(500).send({ message: error?.message })
    }
}

export const updateFaq = async (req: Request, res: Response) => {
    try {        
        const id = req.params.id;
        const body:IFaq = req.body
            
        const faq = await Faq.findByIdAndUpdate(id, body, {new: true});

    if (!faq) {
      return res.status(400).send({ message: 'No FAQ Found' });
    }
    
    return res.status(200).send({ message: 'FAQ Updated Successfully' });   
    } catch (error:any) {
        console.log(error.message);
        return res.status(500).send({ message: error?.message })        
    }
}


export const deleteFaq = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const faq = await Faq.findById(id);
    if (!faq) {
      return res.status(400).send({ message: 'No FAQ Found' });
    }
    await Faq.deleteOne({_id: id})
    return res.status(200).send({ message: 'FAQ Deleted Successfully' });   
} catch (error:any) {
        console.log(error.message);
        return res.status(500).send({ message: error?.message })
    }
}

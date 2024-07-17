import { Request, Response } from "express";
import Banner, {IBanner} from "../models/Banner";

export const create = async (req: Request, res: Response) => {
    try {        
        const body: IBanner = req.body;
          const max_order = await Banner.find().sort({ order: -1 }).limit(1).then(banners => (banners[0] ? banners[0].order : 0));
          if (!req.file) {
    return res.status(400).json({ message: 'No file selected' });
  }
        const filePath = req.file.path.split("\\").join("/");
        const image_url =  "/" + filePath
        body["order"] = max_order + 1 
        body["image_url"] = image_url 

        const newBanner = await Banner.create(body)
        return res.status(200).send({ data: newBanner })
    } catch (error: any) {
        return res.status(500).send({ message: error?.message })
    }
}

export const findAll = async (req: Request, res: Response) => {
        try {        
        const banners = await Banner.find().sort({ order: 1 });        
        return res.status(200).send({ data: banners })
    } catch (error: any) {
        return res.status(500).send({ message: error?.message })
    }
}

export const reOrderBanners = async (req: Request, res: Response) => {
    try {
        const banner = await Banner.findById(req.params.id);
        const new_order = req.body.order;
        if (!banner) {
            return res.status(400).send({ message: "NO Banners found with the given ID" })
        }

  const original_order = banner.order;
  if (new_order === original_order) {return res.status(200).send({ message: "Banner ReOrdered" })};
  
  if (new_order < original_order) {
    await Banner.updateMany({ order: { $gte: new_order, $lt: original_order } }, { $inc: { order: 1 } });
  } else {
    await Banner.updateMany({ order: { $gt: original_order, $lte: new_order } }, { $inc: { order: -1 } });
  }

  banner.order = new_order;
  await banner.save();
  return res.status(201).send({ message: "Banner ReOrdered" })
    } catch (error: any) {
        return res.status(500).send({ message: error?.message })
    }
}

export const updateBanner = async (req: Request, res: Response) => {
    try {        
        const id = req.params.id;
        const body:IBanner = req.body
            
        if (req.file) {
            const filePath = req.file.path.split("\\").join("/");
            const image_url =  "/" + filePath
            body["image_url"] = image_url 
        }
        const banner = await Banner.findByIdAndUpdate(id, body, {new: true});

    if (!banner) {
      return res.status(400).send({ message: 'No Banner Found' });
    }
    
    return res.status(200).send({ message: 'Banner Updated Successfully' });   
    } catch (error:any) {
        console.log(error.message);
        return res.status(500).send({ message: error?.message })        
    }
}

export const deleteBanner = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const banner = await Banner.findById(id);

    if (!banner) {
      return res.status(400).send({ message: 'No Banner Found' });
    }
await Banner.deleteOne({_id: id})
    return res.status(200).send({ message: 'Banner Deleted Successfully' });   
} catch (error:any) {
        console.log(error.message);
        return res.status(500).send({ message: error?.message })
    }
}
import Jimp from "jimp";
import fs from "fs";

const imagecontainer=async(req,res)=>{
  try {
    const imagelocapath=req.files?.Image?.[0]?.path;
    const image = await Jimp.read(imagelocapath);

    // Resize the image if necessary
    image.resize(Jimp.AUTO, 800);

    // Detect 10 colors on the strip
    const colors = detectStripColors(image);

    // Clean up and delete the uploaded file
    fs.unlinkSync(imagelocapath);
    console.log("the given color is ",colors);
    res.json({ colors:colors });

  } catch (error) {
    console.error('Error processing image:', error);
    res.status(500).json({ error: 'Failed to process image' });
  }
}



 function detectStripColors(image) {
    const regions = 10;
    const regionHeight = Math.floor(image.bitmap.height / regions);
  
    const keys = ['URO', 'BIL', 'KET', 'BLD', 'PRO', 'NIT', 'LEU', 'GLU', 'SG', 'PH'];
    const colors = {};
  
    for (let i = 0; i < regions; i++) {
      const region = image.clone().crop(0, i * regionHeight, image.bitmap.width, regionHeight);
      const dominantColor = region.resize(1, 1).color([{ apply: 'mix', params: ['#000000', 50] }]).getPixelColor(0, 0);
  
      const rgba = Jimp.intToRGBA(dominantColor);
      colors[keys[i]] = [rgba.r, rgba.g, rgba.b];
    }
  
    return colors;
  }
  
export {imagecontainer}
import fs from "fs";
import { fileTypeFromBuffer } from "file-type";

const saveImage = async (imageUrl: string, location: string, name: string) => {
  const response = await fetch(imageUrl);
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const fileType = await fileTypeFromBuffer(buffer);

  if(!fileType?.ext) return undefined;

  const returnName = `/${location}/${name}.${fileType.ext}`;
  const dir = `public/${location}`;
  const fileName = `${dir}/${name}.${fileType.ext}`;

  if (!fs.existsSync(dir))
    fs.mkdirSync(dir, { recursive: true });

  fs.createWriteStream(fileName).write(buffer);
  return returnName;
}


export default saveImage;
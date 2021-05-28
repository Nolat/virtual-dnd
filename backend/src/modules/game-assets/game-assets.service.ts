import { Storage } from "@google-cloud/storage";
import { Injectable } from "@nestjs/common";
import { FileUpload } from "graphql-upload";

const storage = new Storage({ keyFilename: "key.json" });
const bucketName = "virtual-dnd";

@Injectable()
export class GameAssetsService {
  uploadAssets({ createReadStream, filename }: FileUpload) {
    createReadStream()
      .pipe(
        storage.bucket(bucketName).file(filename).createWriteStream({
          resumable: false,
          gzip: true
        })
      )
      .on("finish", () =>
        storage
          .bucket(bucketName)
          .file(filename)
          .makePublic()
          .then((e) => {
            console.log(e[0].object);
            console.log(`https://storage.googleapis.com/${bucketName}/${e[0].object}`);
          })
      );

    return true;
  }
}

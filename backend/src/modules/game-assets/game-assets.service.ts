import { Storage } from "@google-cloud/storage";
import { Injectable } from "@nestjs/common";
import { FileUpload } from "graphql-upload";

const storage = new Storage({
  keyFilename: "google-cloud-keys.json",
  projectId: "virtual-dnd-312612"
});
const bucketName = "virtual-dnd";

@Injectable()
export class GameAssetsService {
  uploadAssets({ createReadStream, filename }: FileUpload) {
    // TODO : Changer le filename et y ajouter un hash aléatoire
    // ? Si 2 personnes upload une image différente avec un même nom, la 2e image remplacera la première sur GCloud
    const nameSplit = filename.split(".");
    const name = nameSplit[0] + "-" + new Date().getTime() + "." + nameSplit[1];
    createReadStream()
      .pipe(
        storage.bucket(bucketName).file(name).createWriteStream({
          resumable: false,
          gzip: true
        })
      )
      .on("finish", () =>
        storage
          .bucket(bucketName)
          .file(name)
          .get()
          .then((e) => console.log({ e }))
      );

    return true;
  }
}

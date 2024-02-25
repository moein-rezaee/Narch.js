import { FormFileType } from "narch/src/types";

export const MeliCode: FormFileType = {
    fieldName: "meliCode",
    saveTo: "public/uploads",
    validMimeTypes: ["image/jpeg", "image/png", "image/jpg"],
    validFilesCount: 2,
    validSizeInMB: 1,
    isRequire: true
}

export const Profile: FormFileType = {
    fieldName: "profile",
    saveTo: "public/uploads/users",
    validMimeTypes: ["image/jpeg", "image/png", "image/jpg"],
    validSizeInMB: 1
}
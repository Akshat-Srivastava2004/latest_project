import { Router } from "express"
import { imagecontainer } from "../controller/image_controller.js"
import { upload } from "../middlewares/multer.middleware.js"
const router=Router()

router.route("/image").post(
    upload.fields([
        {
            name:"Image",
            maxCount:1
        }
    ]),imagecontainer)

export default router

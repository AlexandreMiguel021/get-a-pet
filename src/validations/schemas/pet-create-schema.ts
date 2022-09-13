import requiredMessage from "utils/required-message"
import { array, object, string } from "yup"

const createPetSchema = object().shape({
  name: string().required(requiredMessage("nome")).min(3),
  images: array()
    .required()
    .min(2, "Adicione pelo menos 2 imagens de seu pet."),
  age: string().required(requiredMessage("idade")),
  weight: string().required(requiredMessage("peso")),
  color: string().required(requiredMessage("cor"))
})

export { createPetSchema }

"use server"
import { prisma } from "@/lib/prisma"


export const getPlacesAll = async () => {
  try {
    const data = await prisma.places.findMany()
    // console.log("getPlacesAll")
    return data
  } catch (error) {
    console.error("Error fetching places:", error)
    return null
  }
}

export const getPlacesByCreatorsubject = async (id: string) => {
  // console.log("getPlacesByCreatorsubject: ", id)
  try {
    const data = await prisma.places.findMany({
      where: {
        creatorsubject: id,
      },
    })
    // console.log("getPlacesByCreatorsubject:", data)
    return data
  } catch (error) {
    console.error("Error fetching pictures:", error)
    return null
  }
}

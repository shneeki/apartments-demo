import React, { RefObject } from "react"
import { Group } from "three"
import Box from "../elements/Box"
import apartmentData from "data.json"

interface ApartmentSelectionProps {
  modelRef: RefObject<Group>
}
const dummyApartments = {
  apartments: [
    { id: 0, available: true, label: "Cool apartment" },
    { id: 1, available: true, label: "Grey apartment" },
    { id: 2, available: true, label: "Top apartment" },
    { id: 3, available: true, label: "Bright apartment" },
    { id: 4, available: true, label: "Dark apartment" },
    { id: 5, available: true, label: "Hot apartment" },
    { id: 6, available: true, label: "Light apartment" },
  ],
}
const ApartmentSelection = ({ modelRef }: ApartmentSelectionProps) => {
  const apartments = dummyApartments.apartments
  if (modelRef && modelRef.current) {
    apartments.forEach(({ id }) => {
      //@ts-ignore
      console.log(modelRef.current.children)
    })
  }
  //   console.log("JSON PARSE", obj)
  //For each element find it in modelRef group, substitute material with glow material, color based on availability
  return <Box />
}

export default ApartmentSelection

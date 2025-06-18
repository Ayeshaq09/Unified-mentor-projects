import { useEffect } from "react"
import { initMap } from "./LeafletMap"


export default function Map() {
    useEffect(() => {
        initMap();
    }, [])
  return (
    <div id="map"></div>
  )
}
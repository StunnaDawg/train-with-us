import supabase from "../../lib/supabase"

const parsePostGISPoint = async (
  pointString: any
): Promise<{ latitude: number; longitude: number } | null> => {
  if (!pointString) {
    console.log("didn't work")
    return null
  }

  try {
    // Use Supabase function to convert WKB to text
    const { data, error } = await supabase.rpc("st_astext", {
      wkb: pointString,
    })

    if (error) throw error

    // Now parse the POINT format
    const matches = data.match(/POINT\(([-\d.]+) ([-\d.]+)\)/)
    if (!matches) return null

    return {
      latitude: parseFloat(matches[2]),
      longitude: parseFloat(matches[1]),
    }
  } catch (error) {
    console.error("Error parsing location:", error)
    return null
  }
}

export default parsePostGISPoint

import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

Deno.serve(async (req) => {
  try {
    // Create admin client
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    )

    // Get user_id from request
    const { user_id } = await req.json()

    if (!user_id) {
      return new Response(JSON.stringify({ error: "user_id is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    // Fetch communities in a single query using joins
    const { data: communities, error } = await supabase
      .from("communities")
      .select("*")
      .in(
        "id",
        supabase
          .from("community_members")
          .select("community_id")
          .eq("user_id", user_id)
      )

    if (error) throw error

    return new Response(JSON.stringify({ communities }), {
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
})
